import { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <p>Loading users...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="admin-user-management">
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faUsers} style={{ marginRight: '12px', color: 'var(--primary-color)' }} />
                User Management
            </Typography>
            {users.length === 0 ? (
                <Typography color="text.secondary">No users available.</Typography>
            ) : (
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid var(--border-color)', borderRadius: '1rem', overflow: 'hidden' }}>
                    <Table aria-label="user management table">
                        <TableHead sx={{ bgcolor: '#f8fafc' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, color: 'var(--text-main)' }}>S.No</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'var(--text-main)' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'var(--text-main)' }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'var(--text-main)' }}>Phone</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'var(--text-main)' }}>Address</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={user.uid} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f1f5f9' }, transition: 'background-color 0.2s' }}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{user.name}</TableCell>
                                    <TableCell>
                                        <Box component="span" sx={{
                                            bgcolor: '#f1f5f9',
                                            color: 'var(--text-main)',
                                            px: 1.2, py: 0.4,
                                            borderRadius: '0.4rem',
                                            fontSize: '0.8rem',
                                            fontWeight: 500,
                                            border: '1px solid var(--border-color)'
                                        }}>
                                            {user.email}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.address}</TableCell>
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
