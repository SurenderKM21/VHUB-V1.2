

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
import Services from './Services';
import MediaCard from './Card';
import MediaCard3 from './MediaCard3';
import MediaCard2 from './MediaCard2';

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

// Component for Dashboard Overview
// const DashboardOverview = () => (
//   <div>
//     <h3>Dashboard Overview</h3>
//     <p>Welcome to the admin dashboard. Here you can manage your application.</p>
//   </div>
// );
const DashboardOverview = () => {
  const [dataCounts, setDataCounts] = useState({
    users: 0,
    bookings: 0,
    technicians: 0,
  });
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchCounts = async () => {
  //     try {
  //       const token = localStorage.getItem('token');

  //       // Fetch user count
  //       const usersResponse = await fetch('http://localhost:8080/api/users/count', {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       });
  //       const usersCount = await usersResponse.json();

  //       // Fetch booking count
  //       const bookingsResponse = await fetch('http://localhost:8080/api/bookings/count', {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       });
  //       const bookingsCount = await bookingsResponse.json();

  //       // Fetch technician count
  //       const techniciansResponse = await fetch('http://localhost:8080/api/technicians/count', {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       });
  //       const techniciansCount = await techniciansResponse.json();

  //       setDataCounts({
  //         users: usersCount,
  //         bookings: bookingsCount,
  //         technicians: techniciansCount,
  //       });
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching counts:', error);
  //       setError('Failed to load dashboard data');
  //       setLoading(false);
  //     }
  //   };

  //   fetchCounts();
  // }, []);

  // if (loading) return <p>Loading dashboard data...</p>;
  if (error) return <p>{error}</p>;

  // return (
  //   <div className="dashboard-overview">
  //     <h3>Dashboard Overview</h3>
  //     <div className="progress-container">
  //       <div className="progress-item">
          
  //         <div className="progress-bar">
  //           <div className="progress" style={{ width: `${dataCounts.users}%` }}></div>
  //         </div>
  //         <MediaCard/>
  //       </div>
  //       <div className="progress-item">
          
  //         <div className="progress-bar">
  //           <div className="progress" style={{ width: `${dataCounts.bookings}%` }}></div>
  //         </div>
  //         <MediaCard2/>
  //         {/* <p>3 Bookings</p> */}
  //       </div>
  //       <div className="progress-item">
  //         {/* <h4>Technicians</h4> */}
  //         <div className="progress-bar">
  //           <div className="progress" style={{ width: `${dataCounts.technicians}%` }}></div>
  //         </div>
  //         {/* <p>2 Technicians</p> */}
  //         <MediaCard3/>
  //       </div>
  //     </div>
  //   </div>
  // );

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

const TechManagement = () => {
  const [Technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await fetch('http://localhost:8080/Technicians', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch technicians');

        const servicesData = await response.json();
        setTechnicians(servicesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching technicians:', error);
        setError('Failed to load technicians');
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  if (loading) return <p>Loading Technicians...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Technicians Management</h3>
      {Technicians.length === 0 ? (
        <p>No Technicians available.</p>
      ) : (
        <table className="service-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Expert</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Age</th>
              <th>Experience</th>
              <th>JoinDate</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {Technicians.map((tech) => (
              <tr key={tech.tech_id}>
                <td>{tech.tech_id}</td>
                <td>{tech.name}</td>
                <td>{tech.phone}</td>
                <td>{tech.expert}</td>
                <td>{tech.gender}</td>
                <td>{tech.email}</td>
                <td>{tech.age}</td>
                <td>{tech.experience}</td>
                <td>{tech.joindate}</td>
                <td>{tech.address}</td>
              
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
