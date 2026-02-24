import { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCalendarCheck, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

// Import extracted components
import UserOverview from './user/UserOverview';
import BookingHistory from './user/BookingHistory';
import UserProfile from './user/UserProfile';

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem('user_active_section') || 'dashboard';
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('user_active_section', activeSection);
  }, [activeSection]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <UserOverview />;
      case 'bookings':
        return <BookingHistory />;
      case 'profile':
        return <UserProfile />;
      default:
        return <UserOverview />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-side-panel">
        <h2>User Panel</h2>
        <ul>
          <li onClick={() => setActiveSection('dashboard')} className={activeSection === 'dashboard' ? 'active' : ''}>
            <FontAwesomeIcon icon={faTachometerAlt} className="icon" /> User Overview
          </li>

          <li onClick={() => setActiveSection('bookings')} className={activeSection === 'bookings' ? 'active' : ''}>
            <FontAwesomeIcon icon={faCalendarCheck} className="icon" /> Booking Management
          </li>
          <li onClick={() => setActiveSection('profile')} className={activeSection === 'profile' ? 'active' : ''}>
            <FontAwesomeIcon icon={faUser} className="icon" /> Profile
          </li>
          <li onClick={handleLogout} className="logout-item">
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Logout
          </li>
        </ul>
      </div>
      <div className="admin-content">
        <div className="content-container">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
