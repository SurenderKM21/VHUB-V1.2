import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    gender: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile'); // Update with your API endpoint
        setUser(response.data);
        setEditedUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  // Handle input changes for the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Save edited user details
  const handleSaveClick = async () => {
    try {
      await axios.put('/api/user/profile', editedUser); // Update with your API endpoint
      setUser(editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Grid container spacing={2}>
        {/* Name */}
        <Grid item xs={12}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={isEditing ? editedUser.name : user.name}
            onChange={handleInputChange}
            InputProps={{ readOnly: !isEditing }}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={isEditing ? editedUser.email : user.email}
            onChange={handleInputChange}
            InputProps={{ readOnly: !isEditing }}
          />
        </Grid>

        {/* Address */}
        <Grid item xs={12}>
          <TextField
            label="Address"
            name="address"
            fullWidth
            value={isEditing ? editedUser.address : user.address}
            onChange={handleInputChange}
            InputProps={{ readOnly: !isEditing }}
          />
        </Grid>

        {/* Phone */}
        <Grid item xs={12}>
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            value={isEditing ? editedUser.phone : user.phone}
            onChange={handleInputChange}
            InputProps={{ readOnly: !isEditing }}
          />
        </Grid>

        {/* Gender */}
        <Grid item xs={12}>
          <TextField
            label="Gender"
            name="gender"
            fullWidth
            value={isEditing ? editedUser.gender : user.gender}
            onChange={handleInputChange}
            InputProps={{ readOnly: !isEditing }}
          />
        </Grid>

        {/* Buttons */}
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveClick}
                style={{ marginRight: '10px' }}
              >
                Save
              </Button>
              <Button variant="outlined" onClick={handleEditClick}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" color="secondary" onClick={handleEditClick}>
              Edit
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserProfile;
