import { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment, TableSortLabel } from '@mui/material';
import { Search, FileDownload, PictureAsPdf } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const MechanicManagement = () => {
    const [mechanics, setMechanics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMechanicId, setCurrentMechanicId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });

    const fetchMechanics = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('http://localhost:8080/api/users/role/Mechanic', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            });
            setMechanics(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching mechanics:', error);
            setError('Failed to load mechanics');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMechanics();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOpenDialog = (mechanic = null) => {
        if (mechanic) {
            setIsEditing(true);
            setCurrentMechanicId(mechanic.uid);
            setFormData({
                name: mechanic.name,
                email: mechanic.email,
                password: '', // Do not prefill password for edits
                phone: mechanic.phone,
                address: mechanic.address
            });
        } else {
            setIsEditing(false);
            setCurrentMechanicId(null);
            setFormData({ name: '', email: '', password: '', phone: '', address: '' });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSubmit = async () => {
        try {
            if (isEditing) {
                // Remove password from payload if it's empty during edit
                const payload = { ...formData };
                if (!payload.password) {
                    delete payload.password;
                }
                await axios.patch(`http://localhost:8080/api/users/${currentMechanicId}`, payload, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                });
                toast.success('Mechanic updated successfully!');
            } else {
                await axios.post('http://localhost:8080/api/users/mechanic', formData, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                });
                toast.success('Mechanic created successfully!');
            }
            handleCloseDialog();
            fetchMechanics();
        } catch (error) {
            console.error('Error saving mechanic:', error);
            const errorMessage = error.response?.data?.message || (typeof error.response?.data === 'string' ? error.response?.data : null) || 'Failed to save mechanic';
            toast.error(errorMessage);
        }
    };

    const handleDelete = async (mechanicId) => {
        if (!window.confirm("Are you sure you want to delete this mechanic?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/users/${mechanicId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            });
            toast.success('Mechanic deleted successfully!');
            fetchMechanics();
        } catch (error) {
            console.error('Error deleting mechanic:', error);
            toast.error('Failed to delete mechanic');
        }
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["S.No", "Name", "Email", "Phone", "Address"];
        const tableRows = [];

        processedMechanics.forEach((mechanic, index) => {
            const mechanicData = [
                index + 1,
                mechanic.name,
                mechanic.email,
                mechanic.phone,
                mechanic.address
            ];
            tableRows.push(mechanicData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
            theme: 'grid',
            styles: { fontSize: 8 },
            headStyles: { fillColor: [37, 99, 235] }
        });
        doc.text("VHUB Mechanic Management Report", 14, 15);
        doc.save(`VHUB_Mechanics_Report_${new Date().toLocaleDateString()}.pdf`);
    };

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(processedMechanics.map((mechanic, index) => ({
            "S.No": index + 1,
            "Name": mechanic.name,
            "Email": mechanic.email,
            "Phone": mechanic.phone,
            "Address": mechanic.address
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Mechanics");
        XLSX.writeFile(workbook, `VHUB_Mechanics_Report_${new Date().toLocaleDateString()}.xlsx`);
    };

    if (loading && mechanics.length === 0) return <p>Loading mechanics...</p>;
    if (error) return <p className="error-message">{error}</p>;

    const getProcessedMechanics = () => {
        let processed = [...mechanics];

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            processed = processed.filter(mechanic => 
                (mechanic.name && mechanic.name.toLowerCase().includes(lowerQuery)) ||
                (mechanic.email && mechanic.email.toLowerCase().includes(lowerQuery)) ||
                (mechanic.phone && String(mechanic.phone).toLowerCase().includes(lowerQuery)) ||
                (mechanic.address && mechanic.address.toLowerCase().includes(lowerQuery))
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

    const processedMechanics = getProcessedMechanics();

    return (
        <div className="admin-user-management">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faTools} style={{ marginRight: '16px', color: '#60a5fa' }} />
                    Mechanic Management
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        placeholder="Search mechanics..."
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
                    <Button 
                        variant="contained" 
                        startIcon={<FontAwesomeIcon icon={faPlus} />}
                        sx={{ bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' }, whiteSpace: 'nowrap' }}
                        onClick={() => handleOpenDialog()}
                    >
                        Add Mechanic
                    </Button>
                </Box>
            </Box>

            {processedMechanics.length === 0 ? (
                <Typography color="text.secondary">No mechanics available.</Typography>
            ) : (
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '1rem', overflow: 'hidden', bgcolor: 'transparent' }}>
                    <Table aria-label="mechanic management table">
                        <TableHead sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, color: '#ffffff' }}>S.No</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#ffffff' }}>
                                    <TableSortLabel active={sortConfig.key === 'name'} direction={sortConfig.key === 'name' ? sortConfig.direction : 'asc'} onClick={() => handleSort('name')} sx={{ '&.MuiTableSortLabel-root, &.MuiTableSortLabel-active': { color: '#ffffff' }, '& .MuiTableSortLabel-icon': { color: '#ffffff !important' } }}>
                                        Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#ffffff' }}>
                                    <TableSortLabel active={sortConfig.key === 'email'} direction={sortConfig.key === 'email' ? sortConfig.direction : 'asc'} onClick={() => handleSort('email')} sx={{ '&.MuiTableSortLabel-root, &.MuiTableSortLabel-active': { color: '#ffffff' }, '& .MuiTableSortLabel-icon': { color: '#ffffff !important' } }}>
                                        Email
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#ffffff' }}>
                                    <TableSortLabel active={sortConfig.key === 'phone'} direction={sortConfig.key === 'phone' ? sortConfig.direction : 'asc'} onClick={() => handleSort('phone')} sx={{ '&.MuiTableSortLabel-root, &.MuiTableSortLabel-active': { color: '#ffffff' }, '& .MuiTableSortLabel-icon': { color: '#ffffff !important' } }}>
                                        Phone
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#ffffff' }}>
                                    <TableSortLabel active={sortConfig.key === 'address'} direction={sortConfig.key === 'address' ? sortConfig.direction : 'asc'} onClick={() => handleSort('address')} sx={{ '&.MuiTableSortLabel-root, &.MuiTableSortLabel-active': { color: '#ffffff' }, '& .MuiTableSortLabel-icon': { color: '#ffffff !important' } }}>
                                        Address
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#ffffff', textAlign: 'right' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {processedMechanics.map((mechanic, index) => (
                                <TableRow key={mechanic.uid} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.03)' }, transition: 'background-color 0.2s' }}>
                                    <TableCell sx={{ color: '#ffffff' }}>{index + 1}</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>{mechanic.name}</TableCell>
                                    <TableCell>
                                        <Box component="span" sx={{
                                            bgcolor: 'rgba(59, 130, 246, 0.1)',
                                            color: '#60a5fa',
                                            px: 1.2, py: 0.4,
                                            borderRadius: '0.4rem',
                                            fontSize: '0.8rem',
                                            fontWeight: 500,
                                            border: '1px solid rgba(59, 130, 246, 0.2)'
                                        }}>
                                            {mechanic.email}
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: '#e2e8f0' }}>{mechanic.phone}</TableCell>
                                    <TableCell sx={{ color: '#e2e8f0' }}>{mechanic.address}</TableCell>
                                    <TableCell sx={{ textAlign: 'right' }}>
                                        <Button 
                                            variant="text" 
                                            size="small" 
                                            color="info"
                                            sx={{ mr: 1 }}
                                            onClick={() => handleOpenDialog(mechanic)}
                                            title="Edit"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button 
                                            variant="text" 
                                            size="small" 
                                            color="error"
                                            onClick={() => handleDelete(mechanic.uid)}
                                            title="Delete"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{ sx: { bgcolor: '#1e293b', color: 'white', border: '1px solid #334155' } }}>
                <DialogTitle>{isEditing ? 'Edit Mechanic' : 'Add New Mechanic'}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" name="name" label="Full Name" type="text" fullWidth variant="outlined" value={formData.name} onChange={handleInputChange} sx={{ mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#475569' }, color: 'white' }, '& .MuiInputLabel-root': { color: '#94a3b8' } }} />
                    <TextField margin="dense" name="email" label="Email Address" type="email" fullWidth variant="outlined" value={formData.email} onChange={handleInputChange} disabled={isEditing} sx={{ mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#475569' }, color: 'white' }, '& .MuiInputLabel-root': { color: '#94a3b8' } }} />
                    {!isEditing && (
                        <TextField margin="dense" name="password" label="Password" type="password" fullWidth variant="outlined" value={formData.password} onChange={handleInputChange} sx={{ mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#475569' }, color: 'white' }, '& .MuiInputLabel-root': { color: '#94a3b8' } }} />
                    )}
                    <TextField margin="dense" name="phone" label="Phone Number" type="tel" fullWidth variant="outlined" value={formData.phone} onChange={handleInputChange} sx={{ mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#475569' }, color: 'white' }, '& .MuiInputLabel-root': { color: '#94a3b8' } }} />
                    <TextField margin="dense" name="address" label="Address" type="text" fullWidth variant="outlined" value={formData.address} onChange={handleInputChange} sx={{ mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#475569' }, color: 'white' }, '& .MuiInputLabel-root': { color: '#94a3b8' } }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ color: '#94a3b8' }}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#3b82f6' }}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MechanicManagement;
