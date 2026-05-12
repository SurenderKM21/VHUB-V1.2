import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Button, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCalendarCheck, faTools, faWrench } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler
);

const DashboardOverview = () => {
    const [usersCount, setUsersCount] = useState(0);
    const [mechanicsCount, setMechanicsCount] = useState(0);
    const [bookingsCount, setBookingsCount] = useState(0);
    const [statusCounts, setStatusCounts] = useState({ pending: 0, inProgress: 0, completed: 0 });
    const [weeklyData, setWeeklyData] = useState({ labels: [], data: [] });
    const [dateRange, setDateRange] = useState('7'); // '7', '30', 'custom'
    const [customDates, setCustomDates] = useState({ 
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
        end: new Date().toISOString().split('T')[0] 
    });
    const [loading, setLoading] = useState(true);
    const [rawBookings, setRawBookings] = useState([]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { 'Authorization': `Bearer ${token}` };

            const [usersRes, bookingsRes] = await Promise.all([
                axios.get('http://localhost:8080/api/users', { headers }),
                axios.get('http://localhost:8080/api/bookings/get', { headers })
            ]);

            setUsersCount(usersRes.data.filter(user => user.role === 'User').length);
            setMechanicsCount(usersRes.data.filter(user => user.role === 'Mechanic').length);
            
            const bookings = bookingsRes.data;
            setRawBookings(bookings);
            setBookingsCount(bookings.length);
            
            let pending = 0, inProgress = 0, completed = 0;
            bookings.forEach(b => {
                if (b.status === 'Completed') completed++;
                else if (b.status === 'In Progress') inProgress++;
                else pending++;
            });
            setStatusCounts({ pending, inProgress, completed });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (rawBookings.length === 0) return;

        let daysToFetch = [];
        if (dateRange === 'custom') {
            const start = new Date(customDates.start);
            const end = new Date(customDates.end);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            
            daysToFetch = [...Array(diffDays)].map((_, i) => {
                const d = new Date(customDates.start);
                d.setDate(d.getDate() + i);
                return d.toISOString().split('T')[0];
            });
        } else {
            const days = parseInt(dateRange);
            daysToFetch = [...Array(days)].map((_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - i);
                return d.toISOString().split('T')[0];
            }).reverse();
        }

        const countsPerDay = daysToFetch.map(date => {
            return rawBookings.filter(b => b.date === date).length;
        });

        setWeeklyData({
            labels: daysToFetch.map(date => {
                const [y, m, d] = date.split('-');
                return `${d}/${m}`;
            }),
            data: countsPerDay
        });
    }, [dateRange, customDates, rawBookings]);

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
            title: 'Total Mechanics',
            value: mechanicsCount,
            icon: faWrench,
            color: '#f59e0b', // amber
            bg: 'rgba(245, 158, 11, 0.1)',
            description: 'Available service technicians'
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
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: '1.25rem',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                bgcolor: '#0f172a',
                                height: '100%',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 24px rgba(0,0,0,0.4)'
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

                            <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', mb: 1 }}>
                                {loading ? '...' : stat.value}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                {stat.description}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 5, mb: 2 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={7}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
                                Booking Volume Trend
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button size="small" variant={dateRange === '7' ? 'contained' : 'text'} onClick={() => setDateRange('7')} sx={{ color: dateRange === '7' ? 'white' : '#94a3b8' }}>7D</Button>
                                <Button size="small" variant={dateRange === '30' ? 'contained' : 'text'} onClick={() => setDateRange('30')} sx={{ color: dateRange === '30' ? 'white' : '#94a3b8' }}>30D</Button>
                                <Button size="small" variant={dateRange === 'custom' ? 'contained' : 'text'} onClick={() => setDateRange('custom')} sx={{ color: dateRange === 'custom' ? 'white' : '#94a3b8' }}>Custom</Button>
                            </Box>
                        </Box>

                        {dateRange === 'custom' && (
                            <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                                <TextField
                                    type="date"
                                    size="small"
                                    value={customDates.start}
                                    onChange={(e) => setCustomDates({ ...customDates, start: e.target.value })}
                                    sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1, '& input': { color: 'white' } }}
                                />
                                <Typography sx={{ color: '#94a3b8' }}>to</Typography>
                                <TextField
                                    type="date"
                                    size="small"
                                    value={customDates.end}
                                    onChange={(e) => setCustomDates({ ...customDates, end: e.target.value })}
                                    sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1, '& input': { color: 'white' } }}
                                />
                            </Box>
                        )}

                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: '1.25rem',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                bgcolor: '#0f172a',
                                height: '350px'
                            }}
                        >
                            {!loading && (
                                <Line 
                                    data={{
                                        labels: weeklyData.labels,
                                        datasets: [{
                                            label: 'New Bookings',
                                            data: weeklyData.data,
                                            fill: true,
                                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                            borderColor: '#3b82f6',
                                            tension: 0.4,
                                            pointBackgroundColor: '#3b82f6',
                                            pointBorderColor: '#fff',
                                            pointHoverRadius: 6
                                        }]
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                                                ticks: { color: '#94a3b8', stepSize: 1 }
                                            },
                                            x: {
                                                grid: { display: false },
                                                ticks: { 
                                                    color: '#94a3b8',
                                                    maxRotation: 45,
                                                    minRotation: 45,
                                                    autoSkip: true,
                                                    maxTicksLimit: 15
                                                }
                                            }
                                        },
                                        plugins: {
                                            legend: { display: false },
                                            tooltip: {
                                                backgroundColor: '#1e293b',
                                                titleColor: '#fff',
                                                bodyColor: '#cbd5e1',
                                                padding: 12,
                                                borderRadius: 8
                                            }
                                        }
                                    }}
                                />
                            )}
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white', pt: 1 }}>
                            Booking Status
                        </Typography>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: '1.25rem',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                bgcolor: '#0f172a',
                                height: '350px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {!loading && (
                                <Doughnut 
                                    data={{
                                        labels: ['Pending', 'In Progress', 'Completed'],
                                        datasets: [
                                            {
                                                data: [statusCounts.pending, statusCounts.inProgress, statusCounts.completed],
                                                backgroundColor: [
                                                    'rgba(100, 116, 139, 0.8)',
                                                    'rgba(234, 179, 8, 0.8)',
                                                    'rgba(34, 197, 94, 0.8)'
                                                ],
                                                borderColor: '#0f172a',
                                                borderWidth: 2,
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                                labels: { color: '#94a3b8', padding: 20 }
                                            }
                                        }
                                    }}
                                />
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default DashboardOverview;
