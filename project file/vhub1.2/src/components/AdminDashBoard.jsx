

// import React from 'react';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
//   const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];

//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>
      
//       <h2>Registered Users</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Address</th>
//             <th>Password</th>
//           </tr>
//         </thead>
//         <tbody>
//           {storedUsers.map((user, index) => (
//             <tr key={index}>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.phone}</td>
//               <td>{user.address}</td>
//               <td>{user.password}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h2>Booking Information</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Phone</th>
//             <th>Vehicle Number</th>
//             <th>Service</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Problem Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {storedBookings.map((booking, index) => (
//             <tr key={index}>
//               <td>{booking.name}</td>
//               <td>{booking.phone}</td>
//               <td>{booking.vehicleNumber}</td>
//               <td>{booking.service}</td>
//               <td>{booking.date}</td>
//               <td>{booking.time}</td>
//               <td>{booking.problemDescription}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminDashboard;
// // import React from 'react';
// // import './AdminDashboard.css';

// // const AdminDashboard = () => {
// //   const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
// //   const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];

// //   const clearUsers = () => {
// //     localStorage.removeItem('users');
// //     window.location.reload();
// //   };

// //   const clearBookings = () => {
// //     localStorage.removeItem('bookings');
// //     window.location.reload();
// //   };

// //   return (
// //     <div className="admin-dashboard">
// //       <h1>Admin Dashboard</h1>

// //       <h2>Registered Users</h2>
// //       <button onClick={clearUsers}>Clear All Users</button>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Name</th>
// //             <th>Email</th>
// //             <th>Phone</th>
// //             <th>Address</th>
// //             <th>Password</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {storedUsers.map((user, index) => (
// //             <tr key={index}>
// //               <td>{user.name}</td>
// //               <td>{user.email}</td>
// //               <td>{user.phone}</td>
// //               <td>{user.address}</td>
// //               <td>{user.password}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       <h2>Booking Information</h2>
// //       <button onClick={clearBookings}>Clear All Bookings</button>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Name</th>
// //             <th>Phone</th>
// //             <th>Vehicle Number</th>
// //             <th>Service</th>
// //             <th>Date</th>
// //             <th>Time</th>
// //             <th>Problem Description</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {storedBookings.map((booking, index) => (
// //             <tr key={index}>
// //               <td>{booking.name}</td>
// //               <td>{booking.phone}</td>
// //               <td>{booking.vehicleNumber}</td>
// //               <td>{booking.service}</td>
// //               <td>{booking.date}</td>
// //               <td>{booking.time}</td>
// //               <td>{booking.problemDescription}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;


// import React, { useState } from 'react';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const [activeSection, setActiveSection] = useState('dashboard');

//   const renderContent = () => {
//     switch (activeSection) {
//       case 'dashboard':
//         return <DashboardOverview />;
//       case 'users':
//         return <UserManagement />;
//       case 'bookings':
//         return <BookingManagement />;
//       case 'services':
//         return <ServiceManagement />;
//       case 'feedback':
//         return <FeedbackSection />;
//       default:
//         return <DashboardOverview />;
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <div className="side-panel">
//         <h2>Admin Panel</h2>
//         <ul>
//           <li onClick={() => setActiveSection('dashboard')}>Dashboard Overview</li>
//           <li onClick={() => setActiveSection('users')}>User Management</li>
//           <li onClick={() => setActiveSection('bookings')}>Booking Management</li>
//           <li onClick={() => setActiveSection('services')}>Service Management</li>
//           <li onClick={() => setActiveSection('feedback')}>Feedback</li>
//         </ul>
//       </div>
//       <div className="content">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// const DashboardOverview = () => (
//   <div>
//     <h3>Dashboard Overview</h3>
//     {/* Add statistics and quick links here */}
//     <p>Welcome to the admin dashboard. Here you can manage your application.</p>
//   </div>
// );

// const UserManagement = () => (
//   <div>
//     <h3>User Management</h3>
//     {/* Add user management content here */}
//     <p>Manage users and their roles here.</p>
//   </div>
// );

// const BookingManagement = () => (
//   <div>
//     <h3>Booking Management</h3>
//     {/* Add booking management content here */}
//     <p>Manage bookings here.</p>
//   </div>
// );

// const ServiceManagement = () => (
//   <div>
//     <h3>Service Management</h3>
//     {/* Add service management content here */}
//     <p>Manage your services here.</p>
//   </div>
// );

// const FeedbackSection = () => (
//   <div>
//     <h3>Feedback</h3>
//     {/* Add feedback management content here */}
//     <p>View and manage user feedback here.</p>
//   </div>
// );

// export default AdminDashboard;

// import React, { useState } from 'react';
// import './AdminDashboard.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTachometerAlt, faUsers, faCalendarCheck, faTools, faComments } from '@fortawesome/free-solid-svg-icons';

// const AdminDashboard = () => {
//   const [activeSection, setActiveSection] = useState('dashboard');

//   const renderContent = () => {
//     switch (activeSection) {
//       case 'dashboard':
//         return <DashboardOverview />;
//       case 'users':
//         return <UserManagement />;
//       case 'bookings':
//         return <BookingManagement />;
//       case 'services':
//         return <ServiceManagement />;
//       case 'feedback':
//         return <FeedbackSection />;
//       default:
//         return <DashboardOverview />;
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <div className="side-panel">
//         <h2>Admin Panel</h2>
//         <ul>
//           <li onClick={() => setActiveSection('dashboard')}>
//             <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard Overview
//           </li>
//           <li onClick={() => setActiveSection('users')}>
//             <FontAwesomeIcon icon={faUsers} /> User Management
//           </li>
//           <li onClick={() => setActiveSection('bookings')}>
//             <FontAwesomeIcon icon={faCalendarCheck} /> Booking Management
//           </li>
//           <li onClick={() => setActiveSection('services')}>
//             <FontAwesomeIcon icon={faTools} /> Service Management
//           </li>
//           <li onClick={() => setActiveSection('feedback')}>
//             <FontAwesomeIcon icon={faComments} /> Feedback
//           </li>
//         </ul>
//       </div>
//       <div className="content">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// const DashboardOverview = () => (
//   <div>
//     <h3>Dashboard Overview</h3>
//     <p>Welcome to the admin dashboard. Here you can manage your application.</p>
//   </div>
// );

// const UserManagement = () => (
//   <div>
//     <h3>User Management</h3>
//     <p>Manage users and their roles here.</p>
//   </div>
// );

// const BookingManagement = () => {
//   const [bookings, setBookings] = useState([]);

//   React.useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/bookings', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         if (!response.ok) throw new Error('Failed to fetch bookings');

//         const bookingsData = await response.json();
//         setBookings(bookingsData);
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//       }
//     };

//     fetchBookings();
//   }, []);

//   return (
//     <div>
//       <h3>Booking Management</h3>
//       <table className="booking-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Phone</th>
//             <th>Vehicle Number</th>
//             <th>Service</th>
//             <th>Problem Description</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>User ID</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map((booking) => (
//             <tr key={booking.id}>
//               <td>{booking.id}</td>
//               <td>{booking.name}</td>
//               <td>{booking.phone}</td>
//               <td>{booking.vehicleNumber}</td>
//               <td>{booking.service}</td>
//               <td>{booking.problemDescription}</td>
//               <td>{booking.date}</td>
//               <td>{booking.time}</td>
//               <td>{booking.user.id}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };


// const ServiceManagement = () => (
//   <div>
//     <h3>Service Management</h3>
//     <p>Manage your services here.</p>
//   </div>
// );

// const FeedbackSection = () => (
//   <div>
//     <h3>Feedback</h3>
//     <p>View and manage user feedback here.</p>
//   </div>
// );

// export default AdminDashboard;
// import React, { useState, useEffect } from 'react';
// import './AdminDashboard.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTachometerAlt, faUsers, faCalendarCheck, faTools, faComments } from '@fortawesome/free-solid-svg-icons';

// const AdminDashboard = () => {
//   const [activeSection, setActiveSection] = useState('dashboard');

//   const renderContent = () => {
//     switch (activeSection) {
//       case 'dashboard':
//         return <DashboardOverview />;
//       case 'users':
//         return <UserManagement />;
//       case 'bookings':
//         return <BookingManagement />;
//       case 'services':
//         return <ServiceManagement />;
//       case 'feedback':
//         return <FeedbackSection />;
//       default:
//         return <DashboardOverview />;
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <div className="admin-side-panel">
//         <h2>Admin Panel</h2>
//         <ul>
//           <li onClick={() => setActiveSection('dashboard')}>
//             <FontAwesomeIcon icon={faTachometerAlt} className="icon" /> Dashboard Overview
//           </li>
//           <li onClick={() => setActiveSection('users')}>
//             <FontAwesomeIcon icon={faUsers} className="icon" /> User Management
//           </li>
//           <li onClick={() => setActiveSection('bookings')}>
//             <FontAwesomeIcon icon={faCalendarCheck} className="icon" /> Booking Management
//           </li>
//           <li onClick={() => setActiveSection('services')}>
//             <FontAwesomeIcon icon={faTools} className="icon" /> Service Management
//           </li>
//           <li onClick={() => setActiveSection('feedback')}>
//             <FontAwesomeIcon icon={faComments} className="icon" /> Feedback
//           </li>
//         </ul>
//       </div>
//       <div className="admin-content">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// const DashboardOverview = () => (
//   <div>
//     <h3>Dashboard Overview</h3>
//     <p>Welcome to the admin dashboard. Here you can manage your application.</p>
//   </div>
// );

// const UserManagement = () => (
//   <div>
//     <h3>User Management</h3>
//     <p>Manage users and their roles here.</p>
//   </div>
// );

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
//         setBookings(bookingsData); // Ensure this is the correct data
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
//               <th>User ID</th>
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
//                 <td>{booking.user.id}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };


// const ServiceManagement = () => (
//   <div>
//     <h3>Service Management</h3>
//     <p>Manage your services here.</p>
//   </div>
// );

// const FeedbackSection = () => (
//   <div>
//     <h3>Feedback</h3>
//     <p>View and manage user feedback here.</p>
//   </div>
// );

// export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCalendarCheck, faTools, faComments } from '@fortawesome/free-solid-svg-icons';

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
      case 'services':
        return <ServiceManagement />;
      case 'feedback':
        return <FeedbackSection />;
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
            <FontAwesomeIcon icon={faTools} className="icon" /> Service Management
          </li>
          <li onClick={() => setActiveSection('feedback')} className={activeSection === 'feedback' ? 'active' : ''}>
            <FontAwesomeIcon icon={faComments} className="icon" /> Feedback
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
    <p>Welcome to the admin dashboard. Here you can manage your application.</p>
  </div>
);

// Component for User Management
const UserManagement = () => (
  <div>
    <h3>User Management</h3>
    <p>Manage users and their roles here.</p>
  </div>
);

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

// Component for Service Management
// Component for Service Management
const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/services', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch services');

        const servicesData = await response.json();
        setServices(servicesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to load services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Service Management</h3>
      {services.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <table className="service-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.title}</td>
                <td>{service.description}</td>
                <td>{service.cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
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
