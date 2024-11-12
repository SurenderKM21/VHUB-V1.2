import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Book.css';
import { axiosInstance } from './api';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom'
const services = [
  'Oil Change',
  'Brake Repair',
  'Tire Replacement',
  'Battery Replacement',
  'Engine Diagnostics',
  'Transmission Repair',
  'Air Conditioning Service',
  'Suspension Repair',
  'Detailing',
  'Battery Testing',
  'General Maintenance',
];

const Book = () => {
   const location = useLocation();
  const selectedService = location.state?.selectedService || '';

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token); // Access token from Redux store
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicleNumber: '',
    service: '',
    date: '',
    time: '',
    problemDescription: '',
    email:'',
  });

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
      alert('Please select a time between 9 AM and 4 PM.');
      return;
    }

    if (selectedDate < today) {
      alert('Please select a current or future date.');
      return;
    }
    console.log(formData);
    if (isAuthenticated) {
      try {
        const response = await axios.post('http://localhost:8080/api/bookings/new', formData, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });
        // toast.success("Booking confirmed"); 
        toast.success("Booking confirmed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        // Delay the navigation to give time for the toast to appear
        setTimeout(() => {
          navigate('/');
        }, 1000);
        console.log('Booking response:', response.data); // Log response data
        // alert('Booking confirmed!');
        navigate('/');
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        toast.error("Failed to book a service");
      }
    } 
    else {
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
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <TextField
            label="Vehicle Number"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
          />
          <TextField
            select
            label="Service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            {services.map((service, index) => (
              <MenuItem key={index} value={service}>
                {service}
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
          />
          <TextField
            label="Time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Describe Your Problem"
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
           <TextField
  label="Email"
  name="email"  // Change this from "Email" to "email"
  value={formData.email}
  onChange={handleChange}
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
