import { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCalendarCheck, faTools, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from '../features/auth/authSlice';
import Services from './Services';

// Import extracted components
import DashboardOverview from './admin/DashboardOverview';
import UserManagement from './admin/UserManagement';
import BookingManagement from './admin/BookingManagement';
import AdminProfile from './admin/AdminProfile';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem('admin_active_section') || 'dashboard';
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('admin_active_section', activeSection);
  }, [activeSection]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Function to render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'bookings':
        return <BookingManagement />;
      case 'services':
        return <Services isAdminView={true} />;
      case 'profile':
        return <AdminProfile />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-side-panel">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActiveSection('dashboard')} className={activeSection === 'dashboard' ? 'active' : ''}>
            <FontAwesomeIcon icon={faTachometerAlt} className="icon" /> Dashboard Overview
          </li>
          <li onClick={() => setActiveSection('users')} className={activeSection === 'users' ? 'active' : ''}>
            <FontAwesomeIcon icon={faUsers} className="icon" /> User Management
          </li>
          <li onClick={() => setActiveSection('bookings')} className={activeSection === 'bookings' ? 'active' : ''}>
            <FontAwesomeIcon icon={faCalendarCheck} className="icon" /> Booking Management
          </li>

          <li onClick={() => setActiveSection('services')} className={activeSection === 'services' ? 'active' : ''}>
            <FontAwesomeIcon icon={faTools} className="icon" /> Services
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
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default AdminDashboard;
