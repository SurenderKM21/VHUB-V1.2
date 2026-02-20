import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import {
  Box, TextField, Button, Typography, Card, CardContent, CardMedia,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Grid, Avatar, Divider, Container
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCalendarCheck, faTools, faComments, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from '../features/auth/authSlice';
import Services from './Services';


const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem('admin_active_section') || 'dashboard';
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('admin_active_section', activeSection);
  }, [activeSection]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Function to render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'bookings':
        return <BookingManagement />;
      case 'services':
        return <Services isAdminView={true} />;
      case 'profile':
        return <AdminProfile />;
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

          <li onClick={() => setActiveSection('services')} className={activeSection === 'services' ? 'active' : ''}>
            <FontAwesomeIcon icon={faTools} className="icon" /> Services
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

const AdminProfile = () => {
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

    if (user?.email) fetchUser();
  }, [user]);

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
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Box className="user-management-v2">
      <Box className="profile-section-header">
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faUser} style={{ marginRight: '12px', color: 'var(--primary-color)' }} />
          Admin Profile
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--text-muted)', mt: -2, mb: 4 }}>
          Manage your admin account details and security settings
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
              {editableUser.name || 'Admin'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
              {user?.email}
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

const DashboardOverview = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };

        const [usersRes, bookingsRes] = await Promise.all([
          fetch('http://localhost:8080/api/users', { headers }),
          fetch('http://localhost:8080/api/bookings/get', { headers })
        ]);

        if (usersRes.ok) {
          const userData = await usersRes.json();
          setUsersCount(userData.filter(user => user.role === 'User').length);
        }

        if (bookingsRes.ok) {
          const bookingsData = await bookingsRes.json();
          setBookingsCount(bookingsData.length);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: 'Total Users',
      value: usersCount,
      icon: faUsers,
      color: '#3b82f6', // blue
      bg: 'rgba(59, 130, 246, 0.1)',
      description: 'Registered users on platform'
    },
    {
      title: 'Total Bookings',
      value: bookingsCount,
      icon: faCalendarCheck,
      color: '#dc2626', // primary red
      bg: 'rgba(220, 38, 38, 0.1)',
      description: 'Successful vehicle service bookings'
    },
    {
      title: 'Active Services',
      value: '12',
      icon: faTools,
      color: '#10b981', // green
      bg: 'rgba(16, 185, 129, 0.1)',
      description: 'Currently offered repair services'
    }
  ];

  return (
    <Box className="dashboard-overview">
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center' }}>
        <FontAwesomeIcon icon={faTachometerAlt} style={{ marginRight: '12px', color: 'var(--primary-color)' }} />
        Dashboard Overview
      </Typography>

      <Grid container spacing={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: '1.25rem',
                border: '1px solid var(--border-color)',
                bgcolor: 'white',
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.05)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: stat.bg,
                    color: stat.color,
                    fontSize: '1.25rem'
                  }}
                >
                  <FontAwesomeIcon icon={stat.icon} />
                </Box>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {stat.title}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 800, color: 'var(--text-main)', mb: 1 }}>
                {loading ? '...' : stat.value}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
                {stat.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
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
            'Authorization': `Bearer ${localStorage.getItem('token')} `,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch users');

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
            'Authorization': `Bearer ${localStorage.getItem('token')} `,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch bookings');

        const bookingsData = await response.json();
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


export default AdminDashboard;
