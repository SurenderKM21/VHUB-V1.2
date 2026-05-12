import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faClock, faTools, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Box, Typography, Grid, Paper, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient( 95deg,rgb(33, 150, 243) 0%,rgb(33, 203, 243) 50%,rgb(34, 197, 94) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient( 95deg,rgb(33, 150, 243) 0%,rgb(33, 203, 243) 50%,rgb(34, 197, 94) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: '#334155',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: '#1e293b',
    zIndex: 1,
    color: '#94a3b8',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #334155',
    ...(ownerState.active && {
        backgroundImage: 'linear-gradient( 136deg, #3b82f6 0%, #60a5fa 100%)',
        color: 'white',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        border: 'none',
    }),
    ...(ownerState.completed && {
        backgroundImage: 'linear-gradient( 136deg, #22c55e 0%, #4ade80 100%)',
        color: 'white',
        border: 'none',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <FontAwesomeIcon icon={faClock} />,
        2: <FontAwesomeIcon icon={faTools} />,
        3: <FontAwesomeIcon icon={faCheckCircle} />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const UserOverview = () => {
    const [statusCounts, setStatusCounts] = useState({ pending: 0, inProgress: 0, completed: 0 });
    const [latestBooking, setLatestBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.auth.user);

    const steps = ['Pending', 'In Progress', 'Completed'];

    const getActiveStep = (status) => {
        switch (status) {
            case 'Pending': return 0;
            case 'In Progress': return 1;
            case 'Completed': return 2;
            default: return 0;
        }
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await axios.get('http://localhost:8080/api/bookings/get', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                });
                
                const userBookings = data.filter(booking => booking.email === user?.email);
                
                // Set status counts for chart
                let pending = 0, inProgress = 0, completed = 0;
                userBookings.forEach(b => {
                    if (b.status === 'Completed') completed++;
                    else if (b.status === 'In Progress') inProgress++;
                    else pending++;
                });
                setStatusCounts({ pending, inProgress, completed });

                // Find the latest active or most recent booking
                if (userBookings.length > 0) {
                    const sorted = [...userBookings].sort((a, b) => b.id - a.id);
                    const active = sorted.find(b => b.status !== 'Completed') || sorted[0];
                    setLatestBooking(active);
                }
            } catch (error) {
                console.error('Error fetching bookings for overview:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) fetchBookings();
    }, [user]);

    const hasBookings = statusCounts.pending > 0 || statusCounts.inProgress > 0 || statusCounts.completed > 0;

    return (
        <div className="dashboard-overview">
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faTachometerAlt} style={{ marginRight: '12px', color: 'var(--primary-color)' }} />
                User Overview
            </Typography>
            <p style={{ color: '#94a3b8' }}>Welcome to your VHUB dashboard. Here you can track your service bookings and manage your profile.</p>

            <Grid container spacing={4} sx={{ mt: 2 }}>
                {/* Visual Progress Tracker */}
                <Grid item xs={12}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: '1.25rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            bgcolor: '#0f172a',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 4, color: 'white' }}>
                            Current Vehicle Repair Progress
                        </Typography>

                        {loading ? (
                            <Typography color="text.secondary">Loading progress...</Typography>
                        ) : !latestBooking ? (
                            <Typography sx={{ color: '#94a3b8' }}>No active bookings to track. Book a service to see progress here!</Typography>
                        ) : (
                            <Box sx={{ width: '100%', mt: 2 }}>
                                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography sx={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.875rem', mb: 0.5 }}>
                                            VEHICLE: {latestBooking.vehicleNumber}
                                        </Typography>
                                        <Typography variant="h5" sx={{ color: 'white', fontWeight: 800 }}>
                                            {latestBooking.service}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                                            Status: <span style={{ color: latestBooking.status === 'Completed' ? '#22c55e' : '#eab308', fontWeight: 700 }}>{latestBooking.status}</span>
                                        </Typography>
                                        <Typography sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                                            Date: {latestBooking.date}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Stepper alternativeLabel activeStep={getActiveStep(latestBooking.status)} connector={<ColorlibConnector />}>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel StepIconComponent={ColorlibStepIcon}>
                                                <Typography sx={{ color: 'white', fontWeight: 600, mt: 1 }}>{label}</Typography>
                                            </StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                {/* Booking Status Chart */}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: '1.25rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            bgcolor: '#0f172a',
                            height: '350px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'white', alignSelf: 'flex-start' }}>
                            Service Distribution
                        </Typography>
                        {loading ? (
                            <Typography color="text.secondary">Loading chart...</Typography>
                        ) : !hasBookings ? (
                            <Typography color="text.secondary">You have no bookings yet.</Typography>
                        ) : (
                            <Box sx={{ flex: 1, width: '100%', position: 'relative' }}>
                                <Doughnut 
                                    data={{
                                        labels: ['Pending', 'In Progress', 'Completed'],
                                        datasets: [
                                            {
                                                data: [statusCounts.pending, statusCounts.inProgress, statusCounts.completed],
                                                backgroundColor: [
                                                    'rgba(100, 116, 139, 0.8)', // Slate (Pending)
                                                    'rgba(234, 179, 8, 0.8)',   // Yellow (In Progress)
                                                    'rgba(34, 197, 94, 0.8)'    // Green (Completed)
                                                ],
                                                borderColor: [
                                                    'rgba(100, 116, 139, 1)',
                                                    'rgba(234, 179, 8, 1)',
                                                    'rgba(34, 197, 94, 1)'
                                                ],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'right',
                                                labels: { color: 'white', font: { weight: 'bold' } }
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default UserOverview;
