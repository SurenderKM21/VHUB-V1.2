import { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button, TextField, InputAdornment, TableSortLabel } from '@mui/material';
import { Search, FileDownload, PictureAsPdf } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const localizer = momentLocalizer(moment);

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [mechanics, setMechanics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        const fetchBookingsAndMechanics = async () => {
            try {
                const token = localStorage.getItem('token');
                const [bookingsRes, mechanicsRes] = await Promise.all([
                    axios.get('http://localhost:8080/api/bookings/get', { headers: { 'Authorization': `Bearer ${token}` } }),
                    axios.get('http://localhost:8080/api/users/role/Mechanic', { headers: { 'Authorization': `Bearer ${token}` } })
                ]);
                setBookings(bookingsRes.data);
                setMechanics(mechanicsRes.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load bookings or mechanics');
                setLoading(false);
            }
        };

        fetchBookingsAndMechanics();
    }, []);

    const handleAssignMechanic = async (bookingId, mechanicId) => {
        try {
            await axios.put(`http://localhost:8080/api/bookings/${bookingId}/assign/${mechanicId}`, {}, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            });
            // Update local state
            setBookings(bookings.map(b => b.id === bookingId ? { ...b, mechanicName: mechanics.find(m => m.uid === mechanicId)?.name } : b));
            toast.success('Mechanic assigned successfully');
        } catch (error) {
            console.error('Error assigning mechanic:', error);
            toast.error('Failed to assign mechanic');
        }
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["S.No", "Customer", "Vehicle", "Service", "Date", "Time", "Status", "Mechanic"];
        const tableRows = [];

        processedBookings.forEach((booking, index) => {
            const bookingData = [
                index + 1,
                booking.name,
                booking.vehicleNumber,
                booking.service,
                booking.date,
                booking.time,
                booking.status || 'Pending',
                booking.mechanicName || 'Unassigned'
            ];
            tableRows.push(bookingData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
            theme: 'grid',
            styles: { fontSize: 7 },
            headStyles: { fillColor: [37, 99, 235] }
        });
        doc.text("VHUB Booking Management Report", 14, 15);
        doc.save(`VHUB_Bookings_Report_${new Date().toLocaleDateString()}.pdf`);
    };

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(processedBookings.map((booking, index) => ({
            "S.No": index + 1,
            "Customer": booking.name,
            "Vehicle Number": booking.vehicleNumber,
            "Service": booking.service,
            "Date": booking.date,
            "Time": booking.time,
            "Status": booking.status || 'Pending',
            "Assigned Mechanic": booking.mechanicName || 'Unassigned'
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
        XLSX.writeFile(workbook, `VHUB_Bookings_Report_${new Date().toLocaleDateString()}.xlsx`);
    };

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p className="error-message">{error}</p>;

    const calendarEvents = bookings.map(b => {
        const start = new Date(`${b.date}T${b.time}`);
        const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hr duration
        return {
            id: b.id,
            title: `${b.service} - ${b.vehicleNumber} (${b.mechanicName || 'Unassigned'})`,
            start,
            end,
            status: b.status || 'Pending'
        };
    });

    const eventStyleGetter = (event) => {
        let backgroundColor = '#64748b'; // Gray for Pending
        if (event.status === 'Completed') backgroundColor = '#22c55e'; // Green
        if (event.status === 'In Progress') backgroundColor = '#eab308'; // Yellow

        return {
            style: {
                backgroundColor,
                borderRadius: '5px',
                opacity: 0.9,
                color: 'white',
                border: '0px',
                display: 'block'
            }
        };
    };

    const getProcessedBookings = () => {
        let processed = [...bookings];

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            processed = processed.filter(booking => 
                (booking.name && booking.name.toLowerCase().includes(lowerQuery)) ||
                (booking.phone && String(booking.phone).toLowerCase().includes(lowerQuery)) ||
                (booking.vehicleNumber && booking.vehicleNumber.toLowerCase().includes(lowerQuery)) ||
                (booking.service && booking.service.toLowerCase().includes(lowerQuery)) ||
                (booking.problemDescription && booking.problemDescription.toLowerCase().includes(lowerQuery)) ||
                (booking.date && booking.date.toLowerCase().includes(lowerQuery)) ||
                (booking.status && booking.status.toLowerCase().includes(lowerQuery)) ||
                (booking.mechanicName && booking.mechanicName.toLowerCase().includes(lowerQuery))
            );
        }

        if (sortConfig.key) {
            processed.sort((a, b) => {
                const aVal = String(a[sortConfig.key] || '').toLowerCase();
                const bVal = String(b[sortConfig.key] || '').toLowerCase();
                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return processed;
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const processedBookings = getProcessedBookings();

    return (
        <div className="booking-management">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCalendarCheck} style={{ marginRight: '16px', color: '#60a5fa' }} />
                    Booking Management
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                        placeholder="Search bookings..."
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: '#94a3b8' }} />
                                </InputAdornment>
                            ),
                            sx: { color: 'white', bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem', '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' } }
                        }}
                    />
                    <Button
                        variant="outlined"
                        startIcon={<PictureAsPdf />}
                        onClick={exportPDF}
                        sx={{ color: '#f87171', borderColor: '#f87171', '&:hover': { borderColor: '#ef4444', bgcolor: 'rgba(248, 113, 113, 0.1)' } }}
                    >
                        PDF
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<FileDownload />}
                        onClick={exportExcel}
                        sx={{ color: '#34d399', borderColor: '#34d399', '&:hover': { borderColor: '#10b981', bgcolor: 'rgba(52, 211, 153, 0.1)' } }}
                    >
                        Excel
                    </Button>
                    <Box>
                        <Button 
                            variant={viewMode === 'list' ? 'contained' : 'outlined'} 
                            onClick={() => setViewMode('list')}
                            sx={{ mr: 1, whiteSpace: 'nowrap' }}
                        >
                            List View
                        </Button>
                        <Button 
                            variant={viewMode === 'calendar' ? 'contained' : 'outlined'} 
                            onClick={() => setViewMode('calendar')}
                            sx={{ whiteSpace: 'nowrap' }}
                        >
                            Calendar View
                        </Button>
                    </Box>
                </Box>
            </Box>
            {processedBookings.length === 0 ? (
                <Typography color="text.secondary">No bookings available.</Typography>
            ) : viewMode === 'list' ? (
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '1rem', overflowX: 'auto', bgcolor: 'transparent' }}>
                    <Table aria-label="booking management table" size="small">
                        <TableHead sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, color: 'white' }}>S.No</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'white' }}>
                                    <TableSortLabel active={sortConfig.key === 'name'} direction={sortConfig.key === 'name' ? sortConfig.direction : 'asc'} onClick={() => handleSort('name')} sx={{ '&.MuiTableSortLabel-root, &.MuiTableSortLabel-active': { color: '#ffffff' }, '& .MuiTableSortLabel-icon': { color: '#ffffff !important' } }}>
                                        Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'white' }}>
                                    <TableSortLabel active={sortConfig.key === 'phone'} direction={sortConfig.key === 'phone' ? sortConfig.direction : 'asc'} onClick={() => handleSort('phone')} sx={{ '&.MuiTableSortLabel-root, &.MuiTableSortLabel-active': { color: '#ffffff' }, '& .MuiTableSortLabel-icon': { color: '#ffffff !important' } }}>
                                        Phone
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'white' }}>
                                    <TableSortLabel active={sortConfig.key === 'vehicleNumber'} direction={sortConfig.key === 'vehicleNumber' ? sortConfig.direction : 'asc'} onClick={() => handleSort('vehicleNumber')} sx={{ '&.MuiTableSortLabel-root, &.MuiTableSortLabel-active': { color: '#ffffff' }, '& .MuiTableSortLabel-icon': { color: '#ffffff !important' } }}>
                                        Vehicle Number
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'white' }}>
                                    <TableSortLabel active={sortConfig.key === 'service'} direction={sortConfig.key === 'service' ? sortConfig.direction : 'asc'} onClick={() => handleSort('service')} sx={{ '&.MuiTableSortLabel-root, &.MuiTableSortLabel-active': { color: '#ffffff' }, '& .MuiTableSortLabel-icon': { color: '#ffffff !important' } }}>
                                        Service
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'white' }}>Problem</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'white' }}>
                                    <TableSortLabel active={sortConfig.key === 'date'} direction={sortConfig.key === 'date' ? sortConfig.direction : 'asc'} onClick={() => handleSort('date')} sx={{ '&.MuiTableSortLabel-root, &.MuiTableSortLabel-active': { color: '#ffffff' }, '& .MuiTableSortLabel-icon': { color: '#ffffff !important' } }}>
                                        Date
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'white' }}>Time</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'white' }}>
                                    <TableSortLabel active={sortConfig.key === 'status'} direction={sortConfig.key === 'status' ? sortConfig.direction : 'asc'} onClick={() => handleSort('status')} sx={{ '&.MuiTableSortLabel-root, &.MuiTableSortLabel-active': { color: '#ffffff' }, '& .MuiTableSortLabel-icon': { color: '#ffffff !important' } }}>
                                        Status
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'white' }}>Assigned Mechanic</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {processedBookings.map((booking, index) => (
                                <TableRow key={booking.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.03)' }, transition: 'background-color 0.2s' }}>
                                    <TableCell sx={{ color: '#ffffff' }}>{index + 1}</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>{booking.name}</TableCell>
                                    <TableCell sx={{ color: '#e2e8f0' }}>{booking.phone}</TableCell>
                                    <TableCell>
                                        <Box component="span" sx={{
                                            bgcolor: 'rgba(220, 38, 38, 0.15)',
                                            color: '#f87171',
                                            px: 1.5, py: 0.5,
                                            borderRadius: '0.5rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            border: '1px solid rgba(220, 38, 38, 0.2)'
                                        }}>
                                            {booking.vehicleNumber}
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: '#e2e8f0' }}>{booking.service}</TableCell>
                                    <TableCell sx={{ color: '#e2e8f0', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {booking.problemDescription}
                                    </TableCell>
                                    <TableCell sx={{ color: '#e2e8f0' }}>{booking.date}</TableCell>
                                    <TableCell sx={{ color: '#e2e8f0' }}>{booking.time}</TableCell>
                                    <TableCell sx={{ color: '#e2e8f0' }}>
                                        <Box component="span" sx={{
                                            bgcolor: booking.status === 'Completed' ? 'rgba(34, 197, 94, 0.15)' : booking.status === 'In Progress' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                                            color: booking.status === 'Completed' ? '#4ade80' : booking.status === 'In Progress' ? '#facc15' : '#cbd5e1',
                                            px: 1.5, py: 0.5, borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700
                                        }}>
                                            {booking.status || 'Pending'}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value=""
                                            displayEmpty
                                            onChange={(e) => handleAssignMechanic(booking.id, e.target.value)}
                                            size="small"
                                            sx={{
                                                color: 'white',
                                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                                minWidth: '140px',
                                                '.MuiOutlinedInput-notchedOutline': { border: 0 }
                                            }}
                                        >
                                            <MenuItem value="" disabled>
                                                {booking.mechanicName && booking.mechanicName !== "Unassigned" ? booking.mechanicName : "Assign Mechanic"}
                                            </MenuItem>
                                            {mechanics.map(m => (
                                                <MenuItem key={m.uid} value={m.uid}>{m.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Box sx={{ height: 600, bgcolor: 'rgba(255, 255, 255, 0.95)', p: 2, borderRadius: '1rem' }}>
                    <Calendar
                        localizer={localizer}
                        events={calendarEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '100%', color: 'black' }}
                        eventPropGetter={eventStyleGetter}
                    />
                </Box>
            )}
        </div>
    );
};

export default BookingManagement;
