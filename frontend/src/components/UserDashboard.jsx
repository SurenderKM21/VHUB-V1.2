
import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCalendarCheck, faTools, faComments, faUser } from '@fortawesome/free-solid-svg-icons';
import Services from './Services';
// import UserProfile from './UserProfile';
import './UserProfile.css';
import { useSelector, useDispatch } from 'react-redux';
const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  
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
            <FontAwesomeIcon icon={faUser} className="icon" /> Profile
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
// const UserManagement = () => {
//   const user = useSelector((state) => state.auth.user);
//   const [fetchedUser, setFetchedUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editableUser, setEditableUser] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: ''
//   });

//   // Fetch user details
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/api/users/email/${user.email}`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         if (!response.ok) throw new Error('Failed to fetch user');

//         const userData = await response.json();
//         setFetchedUser(userData);
//         setEditableUser({
//           name: userData.name,
//           email: userData.email,
//           phone: userData.phone,
//           address: userData.address
//         });
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//         setError('Failed to load user');
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [user.email]);

//   // Handle the patch request
//   const handleSave = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/users/${fetchedUser.uid}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(editableUser),
//       });

//       if (!response.ok) throw new Error('Failed to update user');

//       const updatedUser = await response.json();
//       setFetchedUser(updatedUser); // Update the fetched user data after successful update
//       alert('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating user:', error);
//       setError('Failed to update profile');
//     }
//   };

//   if (loading) return <p>Loading user data...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="user-management">
//       <h3>User Management</h3>
//       <div className="user-card">
//         <div className="user-card-content">
//           <h4>Edit Profile</h4>
//           <form>
//             <label>Name:</label>
//             <input
//               type="text"
//               value={editableUser.name}
//               onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })}
//             />
//             <label>Email:</label>
//             <input
//               type="email"
//               value={editableUser.email}
//               onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })}
//             />
//             <label>Phone:</label>
//             <input
//               type="text"
//               value={editableUser.phone}
//               onChange={(e) => setEditableUser({ ...editableUser, phone: e.target.value })}
//             />
//             <label>Address:</label>
//             <input
//               type="text"
//               value={editableUser.address}
//               onChange={(e) => setEditableUser({ ...editableUser, address: e.target.value })}
//             />
//           </form>
//           <button className="edit-button" onClick={handleSave}>
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

const UserManagement = () => {
  const user = useSelector((state) => state.auth.user);
  const [fetchedUser, setFetchedUser] = useState(null);
  const [editableUser, setEditableUser] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/email/${user.email}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch user');
        const userData = await response.json();
        setFetchedUser(userData);
        setEditableUser({
          name: userData.name,
          phone: userData.phone,
          address: userData.address
        });
        setLoading(false);
      } catch (error) {
        setError('Failed to load user');
        setLoading(false);
      }
    };

    fetchUser();
  }, [user.email]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${fetchedUser.uid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(editableUser),
      });

      if (!response.ok) throw new Error('Failed to update user');
      const updatedUser = await response.json();
      setFetchedUser(updatedUser);
      // alert('Profile updated successfully!');
      toast.success('Profile updated successfully!');
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="user-management">
      <div className="user-card">
        <div className="user-card-content">
          <h4>Edit Profile</h4>
          <form>
            <label>Name:</label>
            <input
              type="text"
              value={editableUser.name}
              onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })}
            />
            {/* <label>Email:</label>
            <input
              type="email"
              value={editableUser.email}
              onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })}
            /> */}
            <label>Phone:</label>
            <input
              type="text"
              value={editableUser.phone}
              onChange={(e) => setEditableUser({ ...editableUser, phone: e.target.value })}
            />
            <label>Address:</label>
            <input
              type="text"
              value={editableUser.address}
              onChange={(e) => setEditableUser({ ...editableUser, address: e.target.value })}
            />
          </form>
          <button className="edit-button" onClick={handleSave}>
            Save Changes
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};


  
  const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
  const user = useSelector((state) => state.auth.user);
  console.log("booking",user.email);
  
    useEffect(() => {
      const fetchBookings = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/bookings/get', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
  
          if (!response.ok) throw new Error('Failed to fetch bookings');
  
          const bookingsData = await response.json();
          console.log('Bookings Data:', bookingsData); // Log the data
          setBookings(bookingsData); // Ensure this is the correct data structure
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
  
    return (
      <div>
        <h3>Booking Management</h3>
        {bookings.length === 0 ? (
          <p>No bookings available.</p>
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
              {bookings.map((booking) =>  booking.email === user.email &&(
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
  


export default UserDashboard;
