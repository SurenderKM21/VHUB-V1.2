
import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCalendarCheck, faTools, faComments, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import Services from './Services';
const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem('user_active_section') || 'dashboard';
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('user_active_section', activeSection);
  }, [activeSection]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'bookings':
        return <BookingManagement />;
      case 'profile':
        return <UserManagement />;

      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-side-panel">
        <h2>User Panel</h2>
        <ul>
          <li onClick={() => setActiveSection('dashboard')} className={activeSection === 'dashboard' ? 'active' : ''}>
            <FontAwesomeIcon icon={faTachometerAlt} className="icon" /> User Overview
          </li>

          <li onClick={() => setActiveSection('bookings')} className={activeSection === 'bookings' ? 'active' : ''}>
            <FontAwesomeIcon icon={faCalendarCheck} className="icon" /> Booking Management
          </li>
          <li onClick={() => setActiveSection('profile')} className={activeSection === 'profile' ? 'active' : ''}>
            <FontAwesomeIcon icon={faUser} className="icon" /> Profile
          </li>
          <li onClick={handleLogout} className="logout-item">
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Logout
          </li>
        </ul>
      </div>
      <div className="admin-content">
        <div className="content-container">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Component for Dashboard Overview
const DashboardOverview = () => (
  <div className="dashboard-overview">
    <h3>
      <FontAwesomeIcon icon={faTachometerAlt} style={{ marginRight: '12px', color: 'var(--primary-color)' }} />
      User Overview
    </h3>
    <p>Welcome to your VHUB dashboard. Here you can track your service bookings and manage your profile.</p>
  </div>
);

import { Box, TextField, Button, Paper, Typography, Grid, Avatar, Divider, Container } from '@mui/material';

const UserManagement = () => {
  const user = useSelector((state) => state.auth.user);
  const [fetchedUser, setFetchedUser] = useState(null);
  const [editableUser, setEditableUser] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    phone: false,
    address: false
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/email/${user.email}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch user');
        const userData = await response.json();
        setFetchedUser(userData);
        setEditableUser({
          name: userData.name,
          phone: userData.phone,
          address: userData.address
        });
        setLoading(false);
      } catch (error) {
        setError('Failed to load user');
        setLoading(false);
      }
    };

    fetchUser();
  }, [user.email]);

  const handleSave = async () => {
    // Validation
    const newFieldErrors = {
      name: !editableUser.name.trim(),
      phone: !/^[6-9]\d{9}$/.test(editableUser.phone),
      address: !editableUser.address.trim()
    };

    setFieldErrors(newFieldErrors);

    if (newFieldErrors.name || newFieldErrors.phone || newFieldErrors.address) {
      if (newFieldErrors.phone && !editableUser.phone.trim()) {
        toast.error('Phone number is required');
      } else if (newFieldErrors.phone) {
        toast.error('Phone number must be 10 digits and start with 6, 7, 8, or 9');
      } else {
        toast.error('Please fill in all required fields');
      }
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users/${fetchedUser.uid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(editableUser),
      });

      if (!response.ok) throw new Error('Failed to update user');
      const updatedUser = await response.json();
      setFetchedUser(updatedUser);
      toast.success('Profile updated successfully!');
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users/${fetchedUser.uid}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword
        }),
      });

      if (!response.ok) {
        throw new Error('Enter correct old password');
      }

      toast.success('Password changed successfully!');
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Box className="user-management-v2">
      <Box className="profile-section-header">
        <h3>
          <FontAwesomeIcon icon={faUser} style={{ marginRight: '12px', color: 'var(--primary-color)' }} />
          Account Settings
        </h3>
        <Typography variant="body2" sx={{ color: 'var(--text-muted)', mt: -2, mb: 4 }}>
          Manage your personal information and account preferences
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ px: 0 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: '1.25rem',
            border: '1px solid var(--border-color)',
            bgcolor: 'white',
            mb: 4
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Avatar
              sx={{
                width: 90,
                height: 90,
                bgcolor: 'var(--primary-color)',
                fontSize: '2rem',
                mx: 'auto',
                mb: 2,
                boxShadow: '0 8px 16px rgba(220, 38, 38, 0.15)'
              }}
            >
              {getInitials(editableUser.name)}
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--text-main)' }}>
              {editableUser.name || 'User Name'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
              {user.email}
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box component="form">
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'var(--text-main)' }}>
              Personal Information
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', mb: 1, display: 'block' }}>
                  Full Name
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={editableUser.name}
                  onChange={(e) => {
                    setEditableUser({ ...editableUser, name: e.target.value });
                    if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: false });
                  }}
                  error={fieldErrors.name}
                  helperText={fieldErrors.name ? 'Name is required' : ''}
                  placeholder="Enter your full name"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.75rem', bgcolor: '#f8fafc' } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', mb: 1, display: 'block' }}>
                  Phone Number
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={editableUser.phone}
                  onChange={(e) => {
                    setEditableUser({ ...editableUser, phone: e.target.value });
                    if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: false });
                  }}
                  error={fieldErrors.phone}
                  helperText={fieldErrors.phone ? 'Phone number must be 10 digits and start with 6, 7, 8, or 9' : ''}
                  placeholder="+1 (555) 000-0000"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.75rem', bgcolor: '#f8fafc' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', mb: 1, display: 'block' }}>
                  Complete Address
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  value={editableUser.address}
                  onChange={(e) => {
                    setEditableUser({ ...editableUser, address: e.target.value });
                    if (fieldErrors.address) setFieldErrors({ ...fieldErrors, address: false });
                  }}
                  error={fieldErrors.address}
                  helperText={fieldErrors.address ? 'Address is required' : ''}
                  placeholder="Enter your street address, city, state, and zip"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.75rem', bgcolor: '#f8fafc' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{
                      px: 6,
                      py: 1.5,
                      borderRadius: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'none',
                      fontSize: '1rem',
                      boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)'
                    }}
                  >
                    Update Info
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: '1.25rem',
            border: '1px solid var(--border-color)',
            bgcolor: 'white'
          }}
        >
          <Box component="form">
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'var(--text-main)' }}>
              Security
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 4 }}>
              Update your password to keep your account secure
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', mb: 1, display: 'block' }}>
                  Current Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  variant="outlined"
                  value={passwords.oldPassword}
                  onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                  placeholder="Enter current password"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.75rem', bgcolor: '#f8fafc' } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', mb: 1, display: 'block' }}>
                  New Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  variant="outlined"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  placeholder="Enter new password"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.75rem', bgcolor: '#f8fafc' } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', mb: 1, display: 'block' }}>
                  Confirm New Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  variant="outlined"
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.75rem', bgcolor: '#f8fafc' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={handleChangePassword}
                    sx={{
                      px: 6,
                      py: 1.5,
                      borderRadius: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'none',
                      fontSize: '1rem',
                      boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
                      bgcolor: '#334155', // Slate color for security secondary action
                      '&:hover': { bgcolor: '#1e293b' }
                    }}
                  >
                    Change Password
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <ToastContainer position="bottom-right" />
      </Container>
    </Box>
  );
};



const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.auth.user);

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
        // Filter bookings for the current user
        const userBookings = bookingsData.filter(booking => booking.email === user.email);
        setBookings(userBookings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings');
        setLoading(false);
      }
    };

    fetchBookings();
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



export default UserDashboard;
