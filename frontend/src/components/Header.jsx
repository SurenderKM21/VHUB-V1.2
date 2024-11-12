import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const admin = useSelector((state) => state.auth.isAdmin);
  const tech = useSelector((state) => state.auth.isTech);
  const [showDropdown, setShowDropdown] = useState(false);
console.log(user);
  const handleLogout = () => {
    dispatch(logout());
    Navigate("/");
    setShowDropdown(false);
  };

  return (
    <header className="header">
      <div className="logo">
        {/* Add your logo here */}
      </div>
      <nav className="nav">
        {!admin && !tech && <Link to="/">HOME</Link>}
        {!admin && !tech && <Link to="/about">ABOUT US</Link>}
        {!admin && !tech && <Link to="/service">SERVICES</Link>}
        {!admin && !tech && <Link to="/book">BOOK NOW</Link>}
        {/* {user && !tech && !admin && <Link to="/feedback">FEEDBACK</Link>} */}
        {user ? (
          <div className="user-menu">
            <FaUserCircle className="user-icon" />
            <div className="user-details" onClick={() => setShowDropdown(!showDropdown)}>
              <span className="user-email">{user.email}</span>
              {showDropdown && (
                <div className="user-dropdown">
                  {tech && <Link to="/technician" className="dropdown-link">PROFILE</Link>}
                  {!tech && <Link to="/userdashboard" className="dropdown-link">PROFILE</Link>}
                  <button className="logout-button" onClick={handleLogout}>
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <Link to="/login">LOGIN</Link>
            <Link to="/register">SIGN UP</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
