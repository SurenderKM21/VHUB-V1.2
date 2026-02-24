import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCalendarCheck, faTools } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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
                    axios.get('http://localhost:8080/api/users', { headers }),
                    axios.get('http://localhost:8080/api/bookings/get', { headers })
                ]);

                setUsersCount(usersRes.data.filter(user => user.role === 'User').length);
                setBookingsCount(bookingsRes.data.length);
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

export default DashboardOverview;
