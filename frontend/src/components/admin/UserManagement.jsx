import { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, InputAdornment, TableSortLabel } from '@mui/material';
import { Search, FileDownload, PictureAsPdf } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data: userData } = await axios.get('http://localhost:8080/api/users', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                });
                const filteredUsers = userData.filter(user => user.role === 'User');
                setUsers(filteredUsers);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to load users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const getProcessedUsers = () => {
        let processed = [...users];

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            processed = processed.filter(user => 
                (user.name && user.name.toLowerCase().includes(lowerQuery)) ||
                (user.email && user.email.toLowerCase().includes(lowerQuery)) ||
                (user.phone && String(user.phone).toLowerCase().includes(lowerQuery)) ||
                (user.address && user.address.toLowerCase().includes(lowerQuery))
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

    const exportPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["S.No", "Name", "Email", "Phone", "Address"];
        const tableRows = [];

        processedUsers.forEach((user, index) => {
            const userData = [
                index + 1,
                user.name,
                user.email,
                user.phone,
                user.address
            ];
            tableRows.push(userData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
            theme: 'grid',
            styles: { fontSize: 8 },
            headStyles: { fillColor: [37, 99, 235] }
        });
        doc.text("VHUB User Management Report", 14, 15);
        doc.save(`VHUB_Users_Report_${new Date().toLocaleDateString()}.pdf`);
    };

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(processedUsers.map((user, index) => ({
            "S.No": index + 1,
            "Name": user.name,
            "Email": user.email,
            "Phone": user.phone,
            "Address": user.address
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        XLSX.writeFile(workbook, `VHUB_Users_Report_${new Date().toLocaleDateString()}.xlsx`);
    };

    const processedUsers = getProcessedUsers();

    if (loading) return <p>Loading users...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="admin-user-management">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faUsers} style={{ marginRight: '16px', color: '#60a5fa' }} />
                    User Management
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        placeholder="Search users..."
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
                </Box>
            </Box>
            {processedUsers.length === 0 ? (
                <Typography color="text.secondary">No users available.</Typography>
            ) : (
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '1rem', overflow: 'hidden', bgcolor: 'transparent' }}>
                    <Table aria-label="user management table">
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {processedUsers.map((user, index) => (
                                <TableRow key={user.uid} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.03)' }, transition: 'background-color 0.2s' }}>
                                    <TableCell sx={{ color: '#ffffff' }}>{index + 1}</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>{user.name}</TableCell>
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
                                            {user.email}
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: '#e2e8f0' }}>{user.phone}</TableCell>
                                    <TableCell sx={{ color: '#e2e8f0' }}>{user.address}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default UserManagement;
