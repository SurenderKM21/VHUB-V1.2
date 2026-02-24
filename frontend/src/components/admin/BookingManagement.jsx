import { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data: bookingsData } = await axios.get('http://localhost:8080/api/bookings/get', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                });
                setBookings(bookingsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Failed to load bookings');
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="booking-management">
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faCalendarCheck} style={{ marginRight: '12px', color: 'var(--primary-color)' }} />
                Booking Management
            </Typography>
            {bookings.length === 0 ? (
                <Typography color="text.secondary">No bookings available.</Typography>
            ) : (
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid var(--border-color)', borderRadius: '1rem', overflow: 'hidden' }}>
                    <Table aria-label="booking management table">
                        <TableHead sx={{ bgcolor: '#f8fafc' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, color: 'var(--text-main)' }}>S.No</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'var(--text-main)' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'var(--text-main)' }}>Phone</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'var(--text-main)' }}>Vehicle Number</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'var(--text-main)' }}>Service</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'var(--text-main)' }}>Problem</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'var(--text-main)' }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'var(--text-main)' }}>Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking, index) => (
                                <TableRow key={booking.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f1f5f9' }, transition: 'background-color 0.2s' }}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{booking.name}</TableCell>
                                    <TableCell>{booking.phone}</TableCell>
                                    <TableCell>
                                        <Box component="span" sx={{
                                            bgcolor: 'rgba(220, 38, 38, 0.1)',
                                            color: 'var(--primary-color)',
                                            px: 1.5, py: 0.5,
                                            borderRadius: '0.5rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 700
                                        }}>
                                            {booking.vehicleNumber}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{booking.service}</TableCell>
                                    <TableCell sx={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {booking.problemDescription}
                                    </TableCell>
                                    <TableCell>{booking.date}</TableCell>
                                    <TableCell>{booking.time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default BookingManagement;
