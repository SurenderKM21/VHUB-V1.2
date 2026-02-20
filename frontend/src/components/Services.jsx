import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaOilCan, FaCarCrash, FaCog, FaBatteryFull, FaWrench, FaSnowflake, FaCompressArrowsAlt, FaCarSide, FaCarBattery, FaTools, FaCar, FaTaxi, FaPaintBrush } from 'react-icons/fa';
import './Services.css';

const API_URL = 'http://localhost:8080/api/services';

// Map icon names to actual icons
const iconMapping = {
  'FaCar': <FaCar />,
  'FaTaxi': <FaTaxi />, 'FaPaints': <FaPaintBrush />,
  'FaOilCan': <FaOilCan />,
  'FaCarCrash': <FaCarCrash />,
  'FaCog': <FaCog />,
  'FaBatteryFull': <FaBatteryFull />,
  'FaWrench': <FaWrench />,
  'FaSnowflake': <FaSnowflake />,
  'FaCompressArrowsAlt': <FaCompressArrowsAlt />,
  'FaCarSide': <FaCarSide />,
  'FaCarBattery': <FaCarBattery />,
  'FaTools': <FaTools />,
};

const Services = ({ isAdminView = false }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentService, setCurrentService] = useState({ id: '', title: '', description: '', icon: '', cost: '' });

  // Fetch services from backend and store in local storage
  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const fetchedServices = await response.json();

        // Store fetched services in local storage
        localStorage.setItem('services', JSON.stringify(fetchedServices));

        // Set services state
        setServices(fetchedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Retrieve services from local storage
  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem('services')) || [];
    console.log('Stored Services:', storedServices); // Debug log
    setServices(storedServices);
  }, []);

  const handleBookNow = (serviceTitle) => {
    if (isAuthenticated) {
      navigate('/book', { state: { selectedService: serviceTitle } });
    } else {
      navigate('/login');
    }
  };

  const handleAddService = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(currentService),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newService = await response.json();
      const updatedServices = [...services, newService];

      // Update local storage with the new service
      localStorage.setItem('services', JSON.stringify(updatedServices));

      setServices(updatedServices);
      setCurrentService({ id: '', title: '', description: '', icon: '', cost: '' });
      setOpen(false);
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Failed to add service');
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Filter out the deleted service
      const updatedServices = services.filter(service => service.id !== id);

      // Update local storage with the remaining services
      localStorage.setItem('services', JSON.stringify(updatedServices));

      setServices(updatedServices);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleEditService = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/${currentService.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(currentService),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedService = await response.json();
      const updatedServices = services.map(service =>
        service.id === updatedService.id ? updatedService : service
      );

      // Update local storage with the updated services
      localStorage.setItem('services', JSON.stringify(updatedServices));

      setServices(updatedServices);
      setCurrentService({ id: '', title: '', description: '', icon: '', cost: '' });
      setOpen(false);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleOpenDialog = (service = { id: '', title: '', description: '', icon: '', cost: '' }) => {
    setCurrentService(service);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const content = (
    <>
      <Box
        className={isAdminView ? "service-container-admin" : "service-container"}
      >
        <Typography variant="h3" component="h1" gutterBottom className={isAdminView ? "service-title-admin" : "service-title"}>
          Our Services
        </Typography>
        {isAdmin && (
          <Box display="flex" justifyContent="center" mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenDialog()}
              className="add-service-button"
              style={{ width: 'auto', minWidth: '200px' }}
            >
              Add Service
            </Button>
          </Box>
        )}
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Card className="service-card">
                <CardContent>
                  <div className="service-icon">
                    {iconMapping[service.icon] || <FaWrench />} {/* Default icon if not found */}
                  </div>
                  <Typography variant="h5" component="h2">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {service.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Cost: ₹{service.cost}
                  </Typography>
                  {isAdmin && (
                    <Typography variant="body2" color="textSecondary" component="p">
                      Service ID: {service.id} {/* Ensure ID is displayed */}
                    </Typography>
                  )}
                  <br />
                  {!isAdmin && (
                    <Button
                      variant="contained"
                      color="primary"
                      className="book-now-button"
                      onClick={() => handleBookNow(service.title)}
                    >
                      Book Now
                    </Button>
                  )}
                  {isAdmin && (
                    <>
                      <IconButton
                        color="primary"
                        className="edit-button"
                        onClick={() => handleOpenDialog(service)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        className="delete-button"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{currentService.id ? 'Edit Service' : 'Add Service'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Service Title"
            fullWidth
            value={currentService.title}
            onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Service Description"
            fullWidth
            value={currentService.description}
            onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Service Icon (name)"
            fullWidth
            value={currentService.icon}
            onChange={(e) => setCurrentService({ ...currentService, icon: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Service Cost"
            type="number"
            fullWidth
            value={currentService.cost}
            onChange={(e) => setCurrentService({ ...currentService, cost: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={currentService.id ? handleEditService : handleAddService}
            color="primary"
          >
            {currentService.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  return isAdminView ? content : <div className='s-body'>{content}</div>;
};

export default Services;
