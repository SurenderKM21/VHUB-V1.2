import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const admin = useSelector((state) => state.auth.isAdmin);

  const [showDropdown, setShowDropdown] = useState(false);

  // Check if we are on a dashboard page
  const isDashboardPage = location.pathname.startsWith('/admin-dashboard') ||
    location.pathname.startsWith('/userdashboard');

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setShowDropdown(false);
  };

  return (
    <header className="header">
      <div className="logo">
        {/* Add your logo here */}
      </div>
      <nav className="nav">
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT US</Link>
        <Link to="/service">SERVICES</Link>
        <Link to="/book">BOOK NOW</Link>
        {user && !(admin && location.pathname.startsWith('/admin-dashboard')) ? (
          <div className="user-menu">
            <FaUserCircle className="user-icon" />
            <div className="user-details" onClick={() => setShowDropdown(!showDropdown)}>
              <span className="user-email">{user.email}</span>
              {showDropdown && (
                <div className="user-dropdown">
                  {admin ? (
                    <Link to="/admin-dashboard" className="dropdown-link" onClick={() => setShowDropdown(false)}>DASHBOARD</Link>
                  ) : (
                    <Link to="/userdashboard" className="dropdown-link" onClick={() => setShowDropdown(false)}>PROFILE</Link>
                  )}
                  <button className="logout-button" onClick={handleLogout}>
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          !user && (
            <>
              <Link to="/login">LOGIN</Link>
              <Link to="/register">SIGN UP</Link>
            </>
          )
        )}
      </nav>
    </header>
  );
};

export default Header;
