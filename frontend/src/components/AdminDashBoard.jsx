import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { TextField, Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCalendarCheck, faTools, faComments } from '@fortawesome/free-solid-svg-icons';
import Services from './Services';
import MediaCard from './Card';
import MediaCard3 from './MediaCard3';
import MediaCard2 from './MediaCard2';
import TechManagement from './TechManangement';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Function to render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'bookings':
        return <BookingManagement />;
      case 'technicians':
        return <TechManagement />;
      // case 'feedback':
      //   return <FeedbackSection />;
      case 'services':
        return <Services></Services>;
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
          <li onClick={() => setActiveSection('technicians')} className={activeSection === 'technicians' ? 'active' : ''}>
            <FontAwesomeIcon icon={faTools} className="icon" /> Technician Management
          </li>
          {/* <li onClick={() => setActiveSection('feedback')} className={activeSection === 'feedback' ? 'active' : ''}>
            <FontAwesomeIcon icon={faComments} className="icon" /> Feedback
          </li> */}
          <li onClick={() => setActiveSection('services')} className={activeSection === 'feedback' ? 'active' : ''}>
            <FontAwesomeIcon icon={faComments} className="icon" /> Services
          </li>
        </ul>
      </div>
      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const [dataCounts, setDataCounts] = useState({
    users: 0,
    bookings: 0,
    technicians: 0,
  });
  const [error, setError] = useState(null);
  if (error) return <p>{error}</p>;

return (
  <div className="dashboard-overview">
  <h3>Dashboard Overview</h3>
  <div className="progress-container">
    <div className="progress-item">
      <MediaCard />
    </div>
    <div className="progress-item">
      <MediaCard2 />
    </div>
    <div className="progress-item">
      <MediaCard3 />
    </div>
  </div>
</div>
);
};
// Component for User Management
const UserManagement = () => {
  // <div>
  //   <h3>User Management</h3>
  //   <p>Manage users and their roles here.</p>

  // </div>
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch bookings');

        const userData = await response.json();
        // console.log(' Data:', bookingsData); // Log the data
        setUsers(userData); // Ensure this is the correct data structure
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Users Management</h3>
      {users.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td>{user.uid}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Component for Booking Management
const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            {bookings.map((booking) => (
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


// const TechManagement = () => {
//   const [technicians, setTechnicians] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     tech_id: '',
//     name: '',
//     phone: '',
//     expert: '',
//     gender: '',
//     email: '',
//     age: '',
//     experience: '',
//     joindate: '',
//     address: '',
//     password: '',
//   });

//   const fetchTechnicians = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/Technicians', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       if (!response.ok) throw new Error('Failed to fetch technicians');

//       const servicesData = await response.json();
//       setTechnicians(servicesData);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching technicians:', error);
//       setError('Failed to load technicians');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTechnicians();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:8080/Technicians', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) throw new Error('Failed to add technician');

//       const newTechnician = await response.json();
//       setTechnicians([...technicians, newTechnician]);
//       setShowForm(false);
//       setFormData({
//         tech_id: '',
//         name: '',
//         phone: '',
//         expert: '',
//         gender: '',
//         email: '',
//         age: '',
//         experience: '',
//         joindate: '',
//         address: '',
//         password: '',
//       });
//     } catch (error) {
//       console.error('Error adding technician:', error);
//       setError('Failed to add technician');
//     }
//   };

//   if (loading) return <p>Loading Technicians...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h3>Technicians Management</h3>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => setShowForm(!showForm)}
//         style={{ marginBottom: '20px' }}
//       >
//         {showForm ? 'Cancel' : 'Add Technician'}
//       </Button>

//       {showForm && (
//         <form className="tech-form" onSubmit={handleSubmit}>
//           <Typography variant="h6" gutterBottom>
//             Add New Technician
//           </Typography>
//           <TextField
//             label="Technician ID"
//             name="tech_id"
//             value={formData.tech_id}
//             onChange={handleChange}
//             required
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Expert"
//             name="expert"
//             value={formData.expert}
//             onChange={handleChange}
//             required
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Gender"
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             required
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Age"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             required
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Experience"
//             name="experience"
//             value={formData.experience}
//             onChange={handleChange}
//             required
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Join Date"
//             name="joindate"
//             type="date"
//             value={formData.joindate}
//             onChange={handleChange}
//             required
//             fullWidth
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             label="Address"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             fullWidth
//             margin="normal"
//           />
//           <Button variant="contained" color="primary" type="submit">
//             Add Technician
//           </Button>
//         </form>
//       )}

//       <table className="service-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Phone</th>
//             <th>Expert</th>
//             <th>Gender</th>
//             <th>Email</th>
//             <th>Age</th>
//             <th>Experience</th>
//             <th>JoinDate</th>
//             <th>Address</th>
//           </tr>
//         </thead>
//         <tbody>
//           {technicians.map((tech) => (
//             <tr key={tech.tech_id}>
//               <td>{tech.tech_id}</td>
//               <td>{tech.name}</td>
//               <td>{tech.phone}</td>
//               <td>{tech.expert}</td>
//               <td>{tech.gender}</td>
//               <td>{tech.email}</td>
//               <td>{tech.age}</td>
//               <td>{tech.experience}</td>
//               <td>{tech.joindate}</td>
//               <td>{tech.address}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };


// const TechManagement = () => {
//   const [Technicians, setTechnicians] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTechnicians = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/Technicians', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         if (!response.ok) throw new Error('Failed to fetch technicians');

//         const servicesData = await response.json();
//         setTechnicians(servicesData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching technicians:', error);
//         setError('Failed to load technicians');
//         setLoading(false);
//       }
//     };

//     fetchTechnicians();
//   }, []);

//   if (loading) return <p>Loading Technicians...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h3>Technicians Management</h3>
//       {Technicians.length === 0 ? (
//         <p>No Technicians available.</p>
//       ) : (
//         <table className="service-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Phone</th>
//               <th>Expert</th>
//               <th>Gender</th>
//               <th>Email</th>
//               <th>Age</th>
//               <th>Experience</th>
//               <th>JoinDate</th>
//               <th>Address</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Technicians.map((tech) => (
//               <tr key={tech.tech_id}>
//                 <td>{tech.tech_id}</td>
//                 <td>{tech.name}</td>
//                 <td>{tech.phone}</td>
//                 <td>{tech.expert}</td>
//                 <td>{tech.gender}</td>
//                 <td>{tech.email}</td>
//                 <td>{tech.age}</td>
//                 <td>{tech.experience}</td>
//                 <td>{tech.joindate}</td>
//                 <td>{tech.address}</td>
              
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };
// Component for Feedback Section
const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/feedback', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch feedbacks');

        const feedbacksData = await response.json();
        setFeedbacks(feedbacksData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setError('Failed to load feedbacks');
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) return <p>Loading feedbacks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Feedback Management</h3>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Feedback</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.id}</td>
                <td>{feedback.name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.feedback}</td>
                <td>{feedback.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


export default AdminDashboard;
