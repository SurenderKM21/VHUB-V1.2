import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { TextField, Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCalendarCheck, faTools, faComments } from '@fortawesome/free-solid-svg-icons';
import Services from './Services';
import MediaCard from './Card';
import MediaCard3 from './MediaCard3';
import MediaCard2 from './MediaCard2';
import TechManagement from './TechManangement';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Function to render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'bookings':
        return <BookingManagement />;
      case 'technicians':
        return <TechManagement />;
      // case 'feedback':
      //   return <FeedbackSection />;
      case 'services':
        return <Services></Services>;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-side-panel">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActiveSection('dashboard')} className={activeSection === 'dashboard' ? 'active' : ''}>
            <FontAwesomeIcon icon={faTachometerAlt} className="icon" /> Dashboard Overview
          </li>
          <li onClick={() => setActiveSection('users')} className={activeSection === 'users' ? 'active' : ''}>
            <FontAwesomeIcon icon={faUsers} className="icon" /> User Management
          </li>
          <li onClick={() => setActiveSection('bookings')} className={activeSection === 'bookings' ? 'active' : ''}>
            <FontAwesomeIcon icon={faCalendarCheck} className="icon" /> Booking Management
          </li>
          <li onClick={() => setActiveSection('technicians')} className={activeSection === 'technicians' ? 'active' : ''}>
            <FontAwesomeIcon icon={faTools} className="icon" /> Technician Management
          </li>
          {/* <li onClick={() => setActiveSection('feedback')} className={activeSection === 'feedback' ? 'active' : ''}>
            <FontAwesomeIcon icon={faComments} className="icon" /> Feedback
          </li> */}
          <li onClick={() => setActiveSection('services')} className={activeSection === 'feedback' ? 'active' : ''}>
            <FontAwesomeIcon icon={faComments} className="icon" /> Services
          </li>
        </ul>
      </div>
      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const [dataCounts, setDataCounts] = useState({
    users: 0,
    bookings: 0,
    technicians: 0,
  });
  const [error, setError] = useState(null);
  if (error) return <p>{error}</p>;

return (
  <div className="dashboard-overview">
  <h3>Dashboard Overview</h3>
  <div className="progress-container">
    <div className="progress-item">
      <MediaCard />
    </div>
    <div className="progress-item">
      <MediaCard2 />
    </div>
    <div className="progress-item">
      <MediaCard3 />
    </div>
  </div>
</div>
);
};

// Component for User Management
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch bookings');

        const userData = await response.json();

        // Filter users whose role is 'User'
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
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Users Management</h3>
      {users.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td>{user.uid}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Component for Booking Management
const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/bookings/get', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch bookings');

        const bookingsData = await response.json();
        console.log('Bookings Data:', bookingsData); // Log the data
        setBookings(bookingsData); // Ensure this is the correct data structure
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
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Booking Management</h3>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Vehicle Number</th>
              <th>Service</th>
              <th>Problem Description</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.name}</td>
                <td>{booking.phone}</td>
                <td>{booking.vehicleNumber}</td>
                <td>{booking.service}</td>
                <td>{booking.problemDescription}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/feedback', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch feedbacks');

        const feedbacksData = await response.json();
        setFeedbacks(feedbacksData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setError('Failed to load feedbacks');
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) return <p>Loading feedbacks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Feedback Management</h3>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Feedback</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.id}</td>
                <td>{feedback.name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.feedback}</td>
                <td>{feedback.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


export default AdminDashboard;
