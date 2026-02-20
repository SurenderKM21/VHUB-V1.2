import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, TextField, Button, Typography, Paper, Container,
  Tabs, Tab, InputAdornment, IconButton
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faUserCircle, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
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
  const [activeTab, setActiveTab] = useState(0); // 0 for User, 1 for Admin
  const [showPassword, setShowPassword] = useState(false);

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
        const response = await axios.post("http://localhost:8080/api/auth/login", formData);
        const { accessToken, role } = response.data;

        // Role-based access control based on active tab
        if (activeTab === 0 && role === "Admin") {
          toast.error("Admins must use the Admin Login tab.");
          return;
        }
        if (activeTab === 1 && role !== "Admin") {
          toast.error("Access denied. Admin privileges required.");
          return;
        }

        dispatch(login({
          email: formData.email,
          token: accessToken,
          role: role,
        }));

        if (role === "Admin") {
          navigate("/admin-dashboard");
        } else {
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
      <Container maxWidth="sm">
        <Paper elevation={0} className="login-paper">
          <Box className="brand-section">
            <Typography variant="h4" className="brand-name">
              VHUB<span className="brand-dot">.</span>
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>
              {activeTab === 0 ? 'Welcome back! Please enter your details.' : 'Admin secure access portal'}
            </Typography>
          </Box>

          <Box className="tab-container">
            <Tabs
              value={activeTab}
              onChange={(e, val) => setActiveTab(val)}
              variant="fullWidth"
              className="login-tabs"
            >
              <Tab label="User Login" icon={<FontAwesomeIcon icon={faUserCircle} />} iconPosition="start" />
              <Tab label="Admin Access" icon={<FontAwesomeIcon icon={faShieldAlt} />} iconPosition="start" />
            </Tabs>
          </Box>

          <Box component="form" className="login-form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errors.email ? 'Valid email is required' : ''}
              className="input-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faEnvelope} style={{ color: '#94a3b8' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              helperText={errors.password ? 'Password is required' : ''}
              className="input-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faLock} style={{ color: '#94a3b8' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ fontSize: '0.9rem' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="submit-button"
              color="primary"
            >
              {activeTab === 0 ? 'Sign In' : 'Secure Login'}
            </Button>

            {activeTab === 0 && (
              <Box className="signup-link">
                Don't have an account? <a href="/register">Create an account</a>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Login;
