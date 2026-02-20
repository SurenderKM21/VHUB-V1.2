
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserProfile.css';
import './Profile.css'; // Keep original for background

const API_URL = 'http://localhost:8080/api/profile';

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  const [userId, setUserId] = useState(null); // Store user ID separately
  const [loading, setLoading] = useState(true);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail'); // Get email from localStorage

      if (!token || !email) {
        console.error('No user data found in local storage.');
        setLoading(false);
        return;
      }

      try {
        // Fetch user by email to get the ID and current details
        const response = await fetch(`http://localhost:8080/api/users/email/${email}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch profile');
        const userData = await response.json();

        setUserId(userData.uid || userData.id); // Store ID for updates
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          password: '', // Don't pre-fill password
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      const token = localStorage.getItem('token');

      if (!token || !userId) {
        toast.error('No user data found.');
        return;
      }

      // Use the specific profile update endpoint
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          id: userId,
        }),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      toast.success('Profile Updated Successfully');
      // Update localStorage logic if needed, but mainly we rely on fetching

    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile.');
    }
  };

  const handleDeleteModeToggle = () => {
    setDeleteMode(!deleteMode);
    setDeletePassword('');
  };

  const handleDeleteChange = (e) => {
    setDeletePassword(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token || !userId) {
      toast.error('No user data found.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}?userId=${userId}&password=${deletePassword}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('role');
        toast.success('Profile Deleted. Redirecting...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        if (response.status === 401) {
          toast.error('Incorrect password.');
        } else {
          toast.error('Failed to delete profile.');
        }
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      toast.error('Error deleting profile.');
    }
  };

  if (loading) return <div className="p-body"><p style={{ textAlign: 'center', paddingTop: '100px' }}>Loading...</p></div>;

  return (
    <div className='p-body'>
      <div className="user-management">
        <div className="user-card">
          <div className="user-card-content">
            <h4>Edit Profile</h4>
            <form onSubmit={handleUpdate}>
              <label>Name:</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />

              <label>Email:</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                readOnly
                style={{ backgroundColor: '#e9e9e9', cursor: 'not-allowed' }}
              />

              <label>Phone:</label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
              />

              <label>Address:</label>
              <input
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
              />

              <label>Password:</label>
              <input
                name="password"
                type="text"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password to change"
              />

              <button type="submit" className="edit-button">
                Update Profile
              </button>
            </form>
          </div>


        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
