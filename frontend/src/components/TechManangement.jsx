import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const TechManagement = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    tech_id: '',
    name: '',
    phone: '',
    expert: '',
    gender: '',
    email: '',
    age: '',
    experience: '',
    joindate: '',
    address: '',
    password: '',
  });

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await fetch('http://localhost:8080/Technicians', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch technicians');

        const servicesData = await response.json();
        setTechnicians(servicesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching technicians:', error);
        setError('Failed to load technicians');
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add technician
      const response = await fetch('http://localhost:8080/Technicians', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error('Failed to add technician');
  
      const newTechnician = await response.json();
  
      // Now, register the user (create a user in the User table) with role "Technician"
      const userResponse = await fetch('http://localhost:8080/api/auth/register/tech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          password: formData.password, // Set the role as Technician
        }),
      });
      setTechnicians([...technicians, newTechnician]);
      handleClose();
      setFormData({
        tech_id: '',
        name: '',
        phone: '',
        expert: '',
        gender: '',
        email: '',
        age: '',
        experience: '',
        joindate: '',
        address: '',
        password: '',
      });
    } catch (error) {
      console.error('Error adding technician or user:', error);
      setError('Failed to add technician or user');
    }
  };
  
  

  const handleDelete = async (tech_id) => {
    try {
      // Fetch the technician to get the user information (e.g., email)
      const technicianResponse = await fetch(`http://localhost:8080/Technicians/${tech_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!technicianResponse.ok) throw new Error('Failed to fetch technician');
  
      const technician = await technicianResponse.json();
  
      // Assuming the technician object contains the user's email
      const userEmail = technician.email;  // Get the technician's associated email
  
      // Delete the technician
      const deleteTechnicianResponse = await fetch(`http://localhost:8080/Technicians/${tech_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!deleteTechnicianResponse.ok) throw new Error('Failed to delete technician');
  
      // Now, delete the associated user by email (no password needed)
      const deleteUserResponse = await fetch(`http://localhost:8080/api/users/email/${userEmail}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!deleteUserResponse.ok) throw new Error('Failed to delete user');
  
      // Remove the technician from the state
      setTechnicians(technicians.filter((tech) => tech.tech_id !== tech_id));
  
    } catch (error) {
      console.error('Error deleting technician or user:', error);
      setError('Failed to delete technician or user');
    }
  };
  
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <p>Loading Technicians...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      
      <h3>Technicians Management</h3>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Technician
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Technician</DialogTitle>
        <DialogContent>
          <TextField
            label="Technician ID"
            name="tech_id"
            value={formData.tech_id}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Expert"
            name="expert"
            value={formData.expert}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Join Date"
            name="joindate"
            type="date"
            value={formData.joindate}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Technician
          </Button>
        </DialogActions>
      </Dialog>

      <table className="service-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Expert</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Age</th>
            <th>Experience</th>
            <th>Join Date</th>
            <th>Address</th>
            <th>Actions</th> {/* Add this column for actions like delete */}
          </tr>
        </thead>
        <tbody>
          {technicians.map((tech) => (
            <tr key={tech.tech_id}>
              <td>{tech.tech_id}</td>
              <td>{tech.name}</td>
              <td>{tech.phone}</td>
              <td>{tech.expert}</td>
              <td>{tech.gender}</td>
              <td>{tech.email}</td>
              <td>{tech.age}</td>
              <td>{tech.experience}</td>
              <td>{tech.joindate}</td>
              <td>{tech.address}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(tech.tech_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TechManagement;
