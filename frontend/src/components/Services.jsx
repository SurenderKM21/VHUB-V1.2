import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Select, MenuItem, FormControl } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaOilCan, FaCarCrash, FaCog, FaBatteryFull, FaWrench, FaSnowflake, FaCompressArrowsAlt, FaCarSide, FaCarBattery, FaTools, FaCar, FaTaxi, FaPaintBrush } from 'react-icons/fa';
import './Services.css';
import axios from 'axios';
import { toast } from 'react-toastify';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('none');

  // Fetch services from backend and store in local storage
  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const { data: fetchedServices } = await axios.get(API_URL, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        localStorage.setItem('services', JSON.stringify(fetchedServices));
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
      const { data: newService } = await axios.post(API_URL, currentService, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const updatedServices = [...services, newService];
      localStorage.setItem('services', JSON.stringify(updatedServices));
      setServices(updatedServices);
      setCurrentService({ id: '', title: '', description: '', icon: '', cost: '' });
      setOpen(false);
    } catch (error) {
      console.error('Error adding service:', error);
      toast.error('Failed to add service');
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const updatedServices = services.filter(service => service.id !== id);
      localStorage.setItem('services', JSON.stringify(updatedServices));
      setServices(updatedServices);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleEditService = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data: updatedService } = await axios.put(`${API_URL}/${currentService.id}`, currentService, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const updatedServices = services.map(service =>
        service.id === updatedService.id ? updatedService : service
      );
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

  const textFieldSx = {
    '& .MuiInputLabel-root': { color: 'var(--text-secondary)' },
    '& .MuiInputBase-input': { color: 'var(--text-primary)' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
      '&:hover fieldset': { borderColor: 'var(--accent-primary)' },
      '&.Mui-focused fieldset': { borderColor: 'var(--accent-primary)' },
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '8px'
    },
    '& .MuiInputLabel-root.Mui-focused': { color: 'var(--accent-primary)' }
  };

  const getProcessedServices = () => {
    let processed = [...services];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      processed = processed.filter(service => 
        (service.title && service.title.toLowerCase().includes(lowerQuery)) ||
        (service.description && service.description.toLowerCase().includes(lowerQuery)) ||
        (service.cost && String(service.cost).toLowerCase().includes(lowerQuery))
      );
    }

    if (sortOption === 'title_asc') {
      processed.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (sortOption === 'title_desc') {
      processed.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
    } else if (sortOption === 'price_asc') {
      processed.sort((a, b) => Number(a.cost || 0) - Number(b.cost || 0));
    } else if (sortOption === 'price_desc') {
      processed.sort((a, b) => Number(b.cost || 0) - Number(a.cost || 0));
    }

    return processed;
  };

  const processedServices = getProcessedServices();

  const content = (
    <>
      <Box
        className={isAdminView ? "service-container-admin" : "service-container"}
      >
        <Typography variant="h4" component="h1" gutterBottom className={isAdminView ? "service-title-admin" : "service-title"}>
          {isAdminView ? 'Service Management' : 'Our Services'}
        </Typography>
        {isAdmin && (
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} sx={{ flexWrap: 'wrap', gap: 2 }}>
            <Box display="flex" gap={2} sx={{ flexWrap: 'wrap' }}>
              <TextField
                  placeholder="Search services..."
                  variant="outlined"
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                      startAdornment: (
                          <InputAdornment position="start">
                              <Search sx={{ color: '#94a3b8' }} />
                          </InputAdornment>
                      ),
                      sx: { color: 'white', bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem', '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' } }
                  }}
              />
              <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      displayEmpty
                      sx={{ color: 'white', bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.1)' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.2)' } }}
                  >
                      <MenuItem value="none">Sort By...</MenuItem>
                      <MenuItem value="title_asc">Title (A-Z)</MenuItem>
                      <MenuItem value="title_desc">Title (Z-A)</MenuItem>
                      <MenuItem value="price_asc">Price (Low to High)</MenuItem>
                      <MenuItem value="price_desc">Price (High to Low)</MenuItem>
                  </Select>
              </FormControl>
            </Box>
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
          {processedServices.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Card className={`service-card ${isAdmin ? 'admin-service-card' : ''}`} elevation={0}>
                <CardContent>
                  {isAdmin && (
                    <Box className="admin-actions">
                      <IconButton
                        color="primary"
                        className="admin-edit-btn"
                        onClick={() => handleOpenDialog(service)}
                        size="small"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        className="admin-delete-btn"
                        onClick={() => handleDeleteService(service.id)}
                        size="small"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                  <div className="service-icon">
                    {iconMapping[service.icon] || <FaWrench />} {/* Default icon if not found */}
                  </div>
                  <Typography variant="h5" component="h2">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" className="service-description">
                    {service.description}
                  </Typography>
                  <Typography variant="body2" className="service-cost">
                    ₹{service.cost}
                  </Typography>

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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog 
        open={open} 
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            backgroundColor: 'var(--bg-secondary)',
            backgroundImage: 'none',
            color: 'var(--text-primary)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: 'var(--shadow-glass)',
            minWidth: '450px'
          }
        }}
      >
        <DialogTitle sx={{ 
          fontWeight: '800', 
          fontFamily: 'var(--font-heading)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          px: 3, py: 2.5
        }}>
          {currentService.id ? 'Edit Service' : 'Add Service'}
        </DialogTitle>
        <DialogContent sx={{ px: 3, pt: '24px !important' }}>
          <TextField
            autoFocus
            margin="dense"
            label="Service Title"
            fullWidth
            value={currentService.title}
            onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
            sx={textFieldSx}
          />
          <TextField
            margin="dense"
            label="Service Description"
            fullWidth
            multiline
            rows={2}
            value={currentService.description}
            onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
            sx={textFieldSx}
          />
          <TextField
            margin="dense"
            label="Service Icon (e.g. FaWrench, FaCar)"
            fullWidth
            value={currentService.icon}
            onChange={(e) => setCurrentService({ ...currentService, icon: e.target.value })}
            sx={textFieldSx}
          />
          <TextField
            margin="dense"
            label="Service Cost (₹)"
            type="number"
            fullWidth
            value={currentService.cost}
            onChange={(e) => setCurrentService({ ...currentService, cost: e.target.value })}
            sx={textFieldSx}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleCloseDialog} sx={{ color: 'var(--text-secondary)', fontWeight: '600' }}>
            Cancel
          </Button>
          <Button
            onClick={currentService.id ? handleEditService : handleAddService}
            variant="contained"
            sx={{ 
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              color: 'white',
              fontWeight: '700',
              borderRadius: '8px',
              px: 3,
              '&:hover': { filter: 'brightness(1.1)' }
            }}
          >
            {currentService.id ? 'Update Service' : 'Add Service'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  return isAdminView ? content : <div className='s-body'>{content}</div>;
};

export default Services;
