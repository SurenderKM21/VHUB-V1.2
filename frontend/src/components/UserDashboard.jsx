
import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCalendarCheck, faTools, faComments } from '@fortawesome/free-solid-svg-icons';
import Services from './Services';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const email = useSelector((state) => state.auth.user);
  // Function to render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'bookings':
        return <BookingManagement />;
      case 'profile':
        return <UserManagement />;
      
      default:
        return <DashboardOverview />;
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
            <FontAwesomeIcon icon={faTools} className="icon" /> Profile
          </li>
          
        </ul>
      </div>
      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};

// Component for Dashboard Overview
const DashboardOverview = () => (
  <div>
    <h3>Dashboard Overview</h3>
    <p>Welcome to the User dashboard. Here you can manage your application.</p>
  </div>
);
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const email = useSelector((state) => state.auth.user);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/users/${email}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
  
          if (!response.ok) throw new Error('Failed to fetch users');
  
          const userData = await response.json();
          setUsers(userData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching users:', error);
          setError('Failed to load users');
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);
  
    if (loading) return <p>Loading user data...</p>;
    if (error) return <p>{error}</p>;
    // console.log(user.email);
    console.log(email);
    // Filter users by matching email
    const filteredUsers = users.filter((user) => user.email === email);
  
    return (
      <div>
        <h3>User Management</h3>
        {users.length === 0 ? (
          <p>No user found with the specified email.</p>
        ) : (
          <table className="booking-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.uid}>
                  <td>{user.uid}</td>
                  <td>{user.name}</td>
                  <td>{user.email===email ? true : false}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const email = useSelector((state) => state.auth.user);
  
    useEffect(() => {
      const fetchBookings = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/bookings', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
  
          if (!response.ok) throw new Error('Failed to fetch bookings');
  
          const bookingsData = await response.json();
          setBookings(bookingsData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching bookings:', error);
          setError('Failed to load bookings');
          setLoading(false);
        }
      };
  
      fetchBookings();
    }, []);
  
    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p>{error}</p>;
  
    // Filter bookings by matching email
    const filteredBookings = bookings.filter((booking) => booking.email === email);
  
    return (
      <div>
        <h3>Booking Management</h3>
        {filteredBookings.length === 0 ? (
          <p>No bookings found for this email.</p>
        ) : (
          <table className="booking-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Vehicle Number</th>
                <th>Service</th>
                <th>Problem Description</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.name}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.vehicleNumber}</td>
                  <td>{booking.service}</td>
                  <td>{booking.problemDescription}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };
  
  
// Component for User Management
// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/api/users`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         if (!response.ok) throw new Error('Failed to fetch bookings');

//         const userData = await response.json();
//         // console.log(' Data:', bookingsData); // Log the data
//         setUsers(userData); // Ensure this is the correct data structure
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         setError('Failed to load users');
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) return <p>Loading user data...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h3>User Management</h3>
    
//         <table className="booking-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Address</th>
//               <th>Password</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.uid}>
//                 <td>{user.uid}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.phone}</td>
//                 <td>{user.address}</td>
//                 <td>{user.password}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
      
//     </div>
//   );
// };

// Component for Booking Management
// const BookingManagement = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/bookings', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         if (!response.ok) throw new Error('Failed to fetch bookings');

//         const bookingsData = await response.json();
//         console.log('Bookings Data:', bookingsData); // Log the data
//         setBookings(bookingsData); // Ensure this is the correct data structure
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//         setError('Failed to load bookings');
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   if (loading) return <p>Loading bookings...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h3>Booking Management</h3>
//       {bookings.length === 0 ? (
//         <p>No bookings available.</p>
//       ) : (
//         <table className="booking-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Phone</th>
//               <th>Vehicle Number</th>
//               <th>Service</th>
//               <th>Problem Description</th>
//               <th>Date</th>
//               <th>Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking.id}>
//                 <td>{booking.id}</td>
//                 <td>{booking.name}</td>
//                 <td>{booking.phone}</td>
//                 <td>{booking.vehicleNumber}</td>
//                 <td>{booking.service}</td>
//                 <td>{booking.problemDescription}</td>
//                 <td>{booking.date}</td>
//                 <td>{booking.time}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };


export default UserDashboard;
