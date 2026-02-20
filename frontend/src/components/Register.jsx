import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Paper, Container,
  Checkbox, FormControlLabel, InputAdornment, IconButton, Grid
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faPhone, faMapMarkerAlt, faLock,
  faEye, faEyeSlash, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
    password: false,
    confirmPassword: false,
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone) => {
    const phonePattern = /^[6-9]\d{9}$/;
    return phonePattern.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: !formData.name,
      email: !validateEmail(formData.email),
      phone: !validatePhone(formData.phone),
      address: !formData.address,
      password: !validatePassword(formData.password),
      confirmPassword: !formData.confirmPassword || formData.password !== formData.confirmPassword,
      termsAccepted: !formData.termsAccepted,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/register",
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            password: formData.password,
          }
        );

        if (response.data.includes('User already exists with email id')) {
          toast.error('User already exists with email id');
          return;
        }

        toast.success("Registered successfully");
        navigate('/login');
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className='r-body'>
      <Container maxWidth="md">
        <Paper elevation={0} className="signup-paper">
          <Box className="brand-section">
            <Typography variant="h3" className="brand-name">
              VHUB<span className="brand-dot">.</span>
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', mt: 1 }}>
              Join our community and keep your vehicle in top shape.
            </Typography>
          </Box>

          <Box
            component="form"
            className="signup-form"
            noValidate
            autoComplete="off"
            onSubmit={handleSignup}
          >
            <Box className="form-grid">
              <TextField
                fullWidth
                variant="outlined"
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                helperText={errors.name ? 'Name is required' : ''}
                className="input-field"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faUser} style={{ color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                }}
              />

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
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                helperText={errors.phone ? 'Phone number must be 10 digits and start with 6, 7, 8, or 9' : ''}
                className="input-field"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faPhone} style={{ color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                variant="outlined"
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
                helperText={errors.address ? 'Address is required' : ''}
                className="input-field"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#94a3b8' }} />
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
                helperText={errors.password ? 'Password must be at least 8 characters' : ''}
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

              <TextField
                fullWidth
                variant="outlined"
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                helperText={errors.confirmPassword ? 'Passwords do not match' : ''}
                className="input-field"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} style={{ fontSize: '0.9rem' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box className="terms-section">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    name="termsAccepted"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    I agree to the terms and conditions
                  </Typography>
                }
              />
              {errors.termsAccepted && (
                <Typography variant="caption" color="error" sx={{ display: 'block', ml: 4 }}>
                  Terms and conditions must be accepted
                </Typography>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="submit-button"
              color="primary"
            >
              Create Account
            </Button>

            <Box className="login-link">
              Already have an account? <a href="/login">Sign In</a>
            </Box>
          </Box>
        </Paper>
      </Container>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Register;
