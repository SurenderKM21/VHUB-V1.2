import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import axios from 'axios';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data: bookingsData } = await axios.get('http://localhost:8080/api/bookings/get', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                });
                const userBookings = bookingsData.filter(booking => booking.email === user.email);
                setBookings(userBookings);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Failed to load bookings');
                setLoading(false);
            }
        };

        if (user?.email) fetchBookings();
    }, [user.email]);

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="booking-management">
            <h3>
                <FontAwesomeIcon icon={faCalendarCheck} style={{ marginRight: '12px', color: 'var(--primary-color)' }} />
                My Bookings
            </h3>
            {bookings.length === 0 ? (
                <p>No bookings available.</p>
            ) : (
                <div className="table-responsive">
                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Vehicle Number</th>
                                <th>Service</th>
                                <th>Problem Description</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={booking.id}>
                                    <td>{index + 1}</td>
                                    <td><span className="badge">{booking.vehicleNumber}</span></td>
                                    <td>{booking.service}</td>
                                    <td>{booking.problemDescription}</td>
                                    <td>{booking.date}</td>
                                    <td>{booking.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BookingHistory;
