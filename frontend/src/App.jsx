
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashBoard';
import About from './components/About';
import Services from './components/Services';
import Book from './components/Book';
import Profile from './components/Profile';

import UserDashboard from './components/UserDashboard';

const ConditionalFooter = () => {
  const location = useLocation();
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  // Hide footer on dashboard routes
  const isDashboardPage = location.pathname.startsWith('/admin-dashboard') ||
    location.pathname.startsWith('/userdashboard');

  if (isDashboardPage || isAdmin) {
    return null;
  }

  return <Footer />;
};

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const role = useSelector((state) => state.auth.role);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={isAuthenticated ? (isAdmin ? <Navigate to="/admin-dashboard" /> : <Navigate to="/" />) : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/admin-dashboard"
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
          />
          <Route path="/about" element={<About />} />

          <Route path="/service" element={<Services />} />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />

          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/book" element={isAuthenticated ? <Book /> : <Navigate to="/login" />} />
        </Routes>

        <ConditionalFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;