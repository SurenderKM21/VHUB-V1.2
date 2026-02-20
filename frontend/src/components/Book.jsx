import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Typography, MenuItem } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Book.css';
import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'http://localhost:8080' });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userEmail');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const Book = () => {
  const location = useLocation();
  const selectedService = location.state?.selectedService || '';

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    service: selectedService,
    date: '',
    time: '',
    problemDescription: '',
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get('/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        toast.error('Failed to load services list');
      }
    };
    fetchServices();
  }, []);

  // Update formData.service if selectedService from navigation changes or services list loads
  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { time, date } = formData;
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour, 10);

    const today = new Date();
    const selectedDate = new Date(date);

    if (hourInt < 9 || hourInt > 16) {
      toast.warning('Please select a time between 9 AM and 4 PM.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      toast.warning('Please select a current or future date.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    if (isAuthenticated) {
      try {
        const response = await axiosInstance.post('/api/bookings/new', formData);

        // Show a success toast message
        toast.success("Booking confirmed - we will contact you shortly", {
          position: 'top-right',
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Delay the navigation to give time for the toast to fulfill its progress bar
        setTimeout(() => {
          localStorage.setItem('user_active_section', 'bookings');
          navigate('/userdashboard');
        }, 7000);

        console.log('Booking response:', response.data);
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        toast.error('Failed to book a service. Please try again later.', {
          position: 'top-right',
          autoClose: 5000,
        });
      }
    } else {
      navigate('/login');
    }
  };

  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <div className='b-body'>
      <ToastContainer />
      <div className="booking-container">
        <Typography variant="h3" component="h1" gutterBottom className="booking-title">
          Book a Service
        </Typography>
        <form className="booking-form" onSubmit={handleSubmit}>
          <TextField
            label="Vehicle Number"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            select
            label="Service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            fullWidth
          >
            {services.map((service) => (
              <MenuItem key={service.id || service.title} value={service.title}>
                {service.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
            InputProps={{ inputProps: { min: todayDate } }}
            fullWidth
          />
          <TextField
            label="Time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            helperText="Working hours: 9 AM - 4 PM"
          />
          <TextField
            label="Describe Your Problem"
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Book Now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Book;
