import { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from '../features/auth/authSlice';
import './MechanicDashboard.css';

const MechanicDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchBookings = async () => {
        try {
            const { data: bookingsData } = await axios.get('http://localhost:8080/api/bookings/mechanic', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            });
            setBookings(bookingsData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching mechanic bookings:', error);
            setError('Failed to load assigned bookings');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:8080/api/bookings/${id}/status`, { status: newStatus }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            });
            toast.success("Status updated successfully");
            fetchBookings();
        } catch (error) {
            console.error("Error updating status", error);
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="mechanic-dashboard mechanic-only-dashboard">
            <div className="mechanic-side-panel">
                <h2>Mechanic Panel</h2>
                <ul>
                    <li className="active">
                        <FontAwesomeIcon icon={faWrench} className="icon" /> My Tasks
                    </li>
                    <li onClick={handleLogout} className="logout-item">
                        <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Logout
                    </li>
                </ul>
            </div>
            <div className="mechanic-content">
                <div className="content-container">
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', mb: 3, display: 'flex', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faWrench} style={{ marginRight: '16px', color: '#60a5fa' }} />
                        Assigned Bookings
                    </Typography>

                    {loading ? (
                        <p>Loading assigned bookings...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : bookings.length === 0 ? (
                        <Typography color="text.secondary">You have no assigned bookings.</Typography>
                    ) : (
                        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '1rem', overflow: 'hidden', bgcolor: 'transparent' }}>
                            <Table aria-label="mechanic task table">
                                <TableHead sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700, color: 'white' }}>Name</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: 'white' }}>Phone</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: 'white' }}>Vehicle</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: 'white' }}>Service</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: 'white' }}>Problem</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: 'white' }}>Date & Time</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: 'white' }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookings.map((booking) => (
                                        <TableRow key={booking.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.03)' }, transition: 'background-color 0.2s' }}>
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
                                            <TableCell sx={{ color: '#e2e8f0' }}>{booking.date} at {booking.time}</TableCell>
                                            <TableCell>
                                                <Select
                                                    value={booking.status || 'Pending'}
                                                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                                    size="small"
                                                    sx={{
                                                        color: 'white',
                                                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                                                        '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                                    }}
                                                >
                                                    <MenuItem value="Pending">Pending</MenuItem>
                                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                                    <MenuItem value="Completed">Completed</MenuItem>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default MechanicDashboard;
