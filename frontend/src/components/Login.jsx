import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import './Login.css';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: false, password: false });
  const [activeTab, setActiveTab] = useState('user'); // State for tab selection

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {
      email: !validateEmail(formData.email),
      password: !formData.password,
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).includes(true)) {
      try {
        // Single login endpoint for all roles
        const response = await axios.post("http://localhost:8080/api/auth/login", formData);
        const { accessToken, role } = response.data;

        // Save token, role, and email to localStorage
        localStorage.setItem("token", accessToken);
        localStorage.setItem("role", role);
        localStorage.setItem('userEmail', formData.email);

        dispatch(login({ 
          email: formData.email, 
          isAdmin: role === "Admin", 
          token: accessToken, 
          role: role, 
          isTech: role === "Technician" 
        }));

        // Navigate based on the role
        switch (role) {
          case "Admin":
            navigate("/admin-dashboard");
            break;
          case "Technician":
            navigate("/technician");
            break;
          default:
            navigate("/");
        }
      } catch (error) {
        toast.error("Invalid credentials");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='l-body'>
      <Box className="login-container">
        {/* Tab Navigation */}
        <Box className="tab-container">
          <Button 
            className={`tab-button ${activeTab === 'user' ? 'active' : ''}`} 
            onClick={() => setActiveTab('user')}
          >
            User Login
          </Button>
          <Button 
            className={`tab-button ${activeTab === 'technician' ? 'active' : ''}`} 
            onClick={() => setActiveTab('technician')}
          >
            Technician
          </Button>
          <Button 
            className={`tab-button ${activeTab === 'admin' ? 'active' : ''}`} 
            onClick={() => setActiveTab('admin')}
          >
            Admin
          </Button>
        </Box>

        {/* Form for Login */}
        <Box component="form" className="login-form" noValidate autoComplete="off" onSubmit={handleLogin}>
          <Typography variant="h4" component="h1" gutterBottom className="h">
            {activeTab === 'user' 
              ? 'User Login' 
              : activeTab === 'technician' 
              ? 'Technician Login' 
              : 'Admin Login'}
          </Typography>
          <FormControl variant="filled" error={errors.email}>
            <InputLabel htmlFor="component-filled-email">Email</InputLabel>
            <FilledInput
              id="component-filled-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <FormHelperText>Valid email is required</FormHelperText>}
          </FormControl>
          <FormControl variant="filled" error={errors.password}>
            <InputLabel htmlFor="component-filled-password">Password</InputLabel>
            <FilledInput
              id="component-filled-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <FormHelperText>Password is required</FormHelperText>}
          </FormControl>
          <Button type="submit" variant="contained" color="primary" className="submit-button">
            {activeTab === 'user' 
              ? 'Login' 
              : activeTab === 'technician' 
              ? 'Technician Login' 
              : 'Admin Login'}
          </Button>
          <br />
          {activeTab === 'user' && (
            <Typography variant="body2" className="signup-text">
              Don't have an account? <Link href="/register">Sign Up</Link>
            </Typography>
          )}
        </Box>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default Login;
