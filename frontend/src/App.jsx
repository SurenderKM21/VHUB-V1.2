import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import ThemeToggle from './components/ThemeToggle';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashBoard';
import Services from './components/Services';
import Book from './components/Book';
import Profile from './components/Profile';

import UserDashboard from './components/UserDashboard';
import MechanicDashboard from './components/MechanicDashboard';

const ConditionalFooter = () => {
  const location = useLocation();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isMechanic = useSelector((state) => state.auth.isMechanic);

  // Hide footer on dashboard routes
  const isDashboardPage = location.pathname.startsWith('/admin-dashboard') ||
    location.pathname.startsWith('/userdashboard') ||
    location.pathname.startsWith('/mechanicdashboard');

  if (isDashboardPage || isAdmin || isMechanic) {
    return null;
  }

  return <Footer />;
};

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isMechanic = useSelector((state) => state.auth.isMechanic);
  return (
    <div>
      <BrowserRouter>
        <Header />
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={isAuthenticated ? (isAdmin ? <Navigate to="/admin-dashboard" /> : (isMechanic ? <Navigate to="/mechanicdashboard" /> : <Navigate to="/" />)) : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/admin-dashboard"
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
          />
          <Route path="/service" element={isAdmin ? <Navigate to="/admin-dashboard" /> : <Services />} />
          <Route
            path="/profile"
            element={isAuthenticated ? (isAdmin ? <Navigate to="/admin-dashboard" /> : <Profile />) : <Navigate to="/login" />}
          />

          <Route path="/userdashboard" element={isAdmin || isMechanic ? <Navigate to={isAdmin ? "/admin-dashboard" : "/mechanicdashboard"} /> : <UserDashboard />} />
          <Route path="/book" element={isAuthenticated ? (isAdmin || isMechanic ? <Navigate to={isAdmin ? "/admin-dashboard" : "/mechanicdashboard"} /> : <Book />) : <Navigate to="/login" />} />
          <Route path="/mechanicdashboard" element={isMechanic ? <MechanicDashboard /> : <Navigate to="/login" />} />
        </Routes>

        <ConditionalFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;