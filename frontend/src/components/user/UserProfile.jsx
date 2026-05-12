import { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography, Grid, Avatar, Divider, Container } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const UserProfile = () => {
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
                const { data: userData } = await axios.get(`http://localhost:8080/api/users/email/${user.email}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                });
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
            const { data: updatedUser } = await axios.patch(`http://localhost:8080/api/users/${fetchedUser.uid}`, editableUser, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
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

        const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!_\-`~();:'"<>?,./|*[\]{}\\]).{10,}$/;
        if (!passwordPattern.test(passwords.newPassword)) {
            toast.error("Password must be at least 10 chars, with upper, lower, digit, and symbol.");
            return;
        }

        try {
            await axios.post(`http://localhost:8080/api/users/${fetchedUser.uid}/change-password`,
                { oldPassword: passwords.oldPassword, newPassword: passwords.newPassword },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            );
            toast.success('Password changed successfully!');
            setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            toast.error('Enter correct old password');
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
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', mb: 1, display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: '16px', color: '#60a5fa' }} />
                    Account Settings
                </Typography>
                <Typography variant="body1" sx={{ color: '#94a3b8', mb: 4 }}>
                    Manage your personal information and account preferences
                </Typography>
            </Box>

            <Container maxWidth="md" sx={{ px: 0 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: '1.25rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        bgcolor: '#0f172a', // Deep dark blue
                        mb: 4,
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 5 }}>
                        <Avatar
                            sx={{
                                width: 90,
                                height: 90,
                                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                                fontSize: '2rem',
                                mx: 'auto',
                                mb: 2,
                                boxShadow: '0 8px 16px rgba(59, 130, 246, 0.2)'
                            }}
                        >
                            {getInitials(editableUser.name)}
                        </Avatar>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#ffffff' }}>
                            {editableUser.name || 'User Name'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                            {user.email}
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                    <Box component="form">
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'white' }}>
                            Personal Information
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', mb: 1, display: 'block' }}>
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
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': { 
                                            borderRadius: '0.75rem', 
                                            bgcolor: 'rgba(2, 6, 23, 0.5)', 
                                            color: 'white',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                                            '&:hover fieldset': { borderColor: 'rgba(59, 130, 246, 0.5)' },
                                        } 
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', mb: 1, display: 'block' }}>
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
                                    placeholder="+91 00000 00000"
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': { 
                                            borderRadius: '0.75rem', 
                                            bgcolor: 'rgba(2, 6, 23, 0.5)', 
                                            color: 'white',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                                            '&:hover fieldset': { borderColor: 'rgba(59, 130, 246, 0.5)' },
                                        } 
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', mb: 1, display: 'block' }}>
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
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': { 
                                            borderRadius: '0.75rem', 
                                            bgcolor: 'rgba(2, 6, 23, 0.5)', 
                                            color: 'white',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                                            '&:hover fieldset': { borderColor: 'rgba(59, 130, 246, 0.5)' },
                                        } 
                                    }}
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
                                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                                            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                                            '&:hover': {
                                                filter: 'opacity(0.9)',
                                                transform: 'translateY(-1px)'
                                            }
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
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        bgcolor: '#0f172a',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <Box component="form">
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                            Security
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 4 }}>
                            Update your password to keep your account secure
                        </Typography>

                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', mb: 1, display: 'block' }}>
                                    Current Password
                                </Typography>
                                <TextField
                                    fullWidth
                                    type="password"
                                    variant="outlined"
                                    value={passwords.oldPassword}
                                    onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                                    placeholder="Enter current password"
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': { 
                                            borderRadius: '0.75rem', 
                                            bgcolor: 'rgba(2, 6, 23, 0.5)', 
                                            color: 'white',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                                            '&:hover fieldset': { borderColor: 'rgba(59, 130, 246, 0.5)' },
                                        } 
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', mb: 1, display: 'block' }}>
                                    New Password
                                </Typography>
                                <TextField
                                    fullWidth
                                    type="password"
                                    variant="outlined"
                                    value={passwords.newPassword}
                                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                    placeholder="Enter new password"
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': { 
                                            borderRadius: '0.75rem', 
                                            bgcolor: 'rgba(2, 6, 23, 0.5)', 
                                            color: 'white',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                                            '&:hover fieldset': { borderColor: 'rgba(59, 130, 246, 0.5)' },
                                        } 
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', mb: 1, display: 'block' }}>
                                    Confirm New Password
                                </Typography>
                                <TextField
                                    fullWidth
                                    type="password"
                                    variant="outlined"
                                    value={passwords.confirmPassword}
                                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                    placeholder="Confirm new password"
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': { 
                                            borderRadius: '0.75rem', 
                                            bgcolor: 'rgba(2, 6, 23, 0.5)', 
                                            color: 'white',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                                            '&:hover fieldset': { borderColor: 'rgba(59, 130, 246, 0.5)' },
                                        } 
                                    }}
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
                                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                                            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                                            '&:hover': {
                                                filter: 'opacity(0.9)',
                                                transform: 'translateY(-1px)'
                                            }
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

export default UserProfile;
