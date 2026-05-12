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
  const isMechanic = useSelector((state) => state.auth.isMechanic);
  const [showDropdown, setShowDropdown] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setShowDropdown(false);
  };

  if (admin || isMechanic) {
    return null;
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/logo1.png" alt="VHUB" style={{ height: '40px', objectFit: 'contain' }} />
        </Link>
      </div>
      <nav className="nav">
        <Link to="/">HOME</Link>
        {!admin ? (
          <>
            <Link to="/service">SERVICES</Link>
            <Link to="/book">BOOK NOW</Link>
          </>
        ) : (
          <Link to="/admin-dashboard">DASHBOARD</Link>
        )}
        {user && !admin && !location.pathname.startsWith('/userdashboard') ? (
          <div className="user-menu" onClick={() => setShowDropdown(!showDropdown)}>
            <FaUserCircle className="user-icon" />
            <div className="user-details">
              <span className="user-email">{user.name || 'User'}</span>
              {showDropdown && (
                <div className="user-dropdown">
                  <Link to="/userdashboard" className="dropdown-link" onClick={() => setShowDropdown(false)}>PROFILE</Link>
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
