// // // import React, { useState, useEffect } from 'react';
// // // import { FaEdit } from 'react-icons/fa';
// // // import Box from '@mui/material/Box';
// // // import FilledInput from '@mui/material/FilledInput';
// // // import FormControl from '@mui/material/FormControl';
// // // import InputLabel from '@mui/material/InputLabel';
// // // import Button from '@mui/material/Button';
// // // import Typography from '@mui/material/Typography';
// // // import FormHelperText from '@mui/material/FormHelperText';
// // // import './Profile.css';

// // // const Profile = () => {
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     email: '',
// // //     phone: '',
// // //     address: '',
// // //     password: '',
// // //   });

// // //   const [errors, setErrors] = useState({
// // //     name: false,
// // //     phone: false,
// // //     address: false,
// // //     password: false,
// // //   });

// // //   const [isEditing, setIsEditing] = useState({
// // //     name: false,
// // //     phone: false,
// // //     address: false,
// // //     password: false,
// // //   });

// // //   useEffect(() => {
// // //     const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
// // //     const userEmail = localStorage.getItem('loggedInUser');
// // //     const currentUser = storedUsers.find(user => user.email === userEmail);

// // //     if (currentUser) {
// // //       setFormData({
// // //         name: currentUser.name,
// // //         email: currentUser.email,
// // //         phone: currentUser.phone,
// // //         address: currentUser.address,
// // //         password: currentUser.password,
// // //       });
// // //     }
// // //   }, []);

// // //   const validatePhone = (phone) => /^\d{10}$/.test(phone);

// // //   const validatePassword = (password) => password.length >= 8;

// // //   const handleUpdate = (e) => {
// // //     e.preventDefault();
// // //     const newErrors = {
// // //       name: !formData.name,
// // //       phone: !validatePhone(formData.phone),
// // //       address: !formData.address,
// // //       password: !validatePassword(formData.password),
// // //     };
// // //     setErrors(newErrors);

// // //     if (Object.values(newErrors).every(error => !error)) {
// // //       const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
// // //       const updatedUsers = storedUsers.map(user =>
// // //         user.email === formData.email ? { ...user, ...formData } : user
// // //       );
// // //       localStorage.setItem('users', JSON.stringify(updatedUsers));
// // //       console.log('Profile Updated', formData);
// // //       setIsEditing({
// // //         name: false,
// // //         phone: false,
// // //         address: false,
// // //         password: false,
// // //       });
// // //     }
// // //   };

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData({
// // //       ...formData,
// // //       [name]: value,
// // //     });
// // //   };

// // //   const handleEditClick = (field) => {
// // //     setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
// // //   };

// // //   return (
// // //     <div className="profile-container">
// // //       <Typography variant="h4" component="h1" className="profile-header">
// // //         User Profile
// // //       </Typography>
// // //       <Box component="form" noValidate autoComplete="off" onSubmit={handleUpdate}>
// // //         {Object.keys(formData).map((field) => (
// // //           <div key={field} className="profile-item">
// // //             <div className="profile-item-content">
// // //               <span>{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
// // //               {isEditing[field] ? (
// // //                 <FormControl variant="filled" error={errors[field]} className="form-control-inline">
// // //                   <InputLabel htmlFor={`component-filled-${field}`}>{field.charAt(0).toUpperCase() + field.slice(1)}</InputLabel>
// // //                   <FilledInput
// // //                     id={`component-filled-${field}`}
// // //                     name={field}
// // //                     type={field === 'password' ? 'password' : 'text'}
// // //                     value={formData[field]}
// // //                     onChange={handleChange}
// // //                   />
// // //                   {errors[field] && (
// // //                     <FormHelperText>
// // //                       {field === 'phone' ? 'Phone number must be 10 digits' : 
// // //                         field === 'password' ? 'Password must be at least 8 characters long' : 
// // //                         `${field.charAt(0).toUpperCase() + field.slice(1)} is required`}
// // //                     </FormHelperText>
// // //                   )}
// // //                 </FormControl>
// // //               ) : (
// // //                 <span>{field === 'password' ? formData[field].replace(/./g, '*') : formData[field]}</span>
// // //               )}
// // //               <FaEdit className="edit-icon" onClick={() => handleEditClick(field)} />
// // //             </div>
// // //           </div>
// // //         ))}
// // //         {Object.values(isEditing).some(editing => editing) && (
// // //           <Button type="submit" variant="contained" color="primary" className="submit-button">
// // //             Update Profile
// // //           </Button>
// // //         )}
// // //       </Box>
// // //     </div>
// // //   );
// // // };

// // // export default Profile;

// // import React, { useState, useEffect } from 'react';
// // import { FaEdit } from 'react-icons/fa';
// // import Button from '@mui/material/Button';
// // import Typography from '@mui/material/Typography';
// // import './Profile.css';

// // const Profile = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     phone: '',
// //     address: '',
// //     password: '',
// //   });

// //   const [errors, setErrors] = useState({
// //     name: false,
// //     phone: false,
// //     address: false,
// //     password: false,
// //   });

// //   const [isEditing, setIsEditing] = useState({
// //     name: false,
// //     phone: false,
// //     address: false,
// //     password: false,
// //   });

// //   useEffect(() => {
// //     const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
// //     const userEmail = localStorage.getItem('loggedInUser');
// //     const currentUser = storedUsers.find(user => user.email === userEmail);

// //     if (currentUser) {
// //       setFormData({
// //         name: currentUser.name,
// //         email: currentUser.email,
// //         phone: currentUser.phone,
// //         address: currentUser.address,
// //         password: currentUser.password,
// //       });
// //     }
// //   }, []);

// //   const validatePhone = (phone) => /^\d{10}$/.test(phone);

// //   const validatePassword = (password) => password.length >= 8;

// //   const handleUpdate = (e) => {
// //     e.preventDefault();
// //     const newErrors = {
// //       name: !formData.name,
// //       phone: !validatePhone(formData.phone),
// //       address: !formData.address,
// //       password: !validatePassword(formData.password),
// //     };
// //     setErrors(newErrors);

// //     if (Object.values(newErrors).every(error => !error)) {
// //       const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
// //       const updatedUsers = storedUsers.map(user =>
// //         user.email === formData.email ? { ...user, ...formData } : user
// //       );
// //       localStorage.setItem('users', JSON.stringify(updatedUsers));
// //       console.log('Profile Updated', formData);
// //       setIsEditing({
// //         name: false,
// //         phone: false,
// //         address: false,
// //         password: false,
// //       });
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
// //   };

// //   const handleEditClick = (field) => {
// //     setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
// //   };

// //   return (
// //     <div className='p-body'>
// //     <div className="profile-container">
// //       <Typography variant="h4" component="h1" className="profile-header">
// //         Profile Information
// //       </Typography>
// //       <br></br>
// //       <form noValidate autoComplete="off" onSubmit={handleUpdate}>
// //         {Object.keys(formData).map((field) => (
// //           <div key={field} className="profile-item">
// //             <div className="profile-item-content">
// //               <span>{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
// //               {isEditing[field] ? (
// //                 <input
// //                   name={field}
// //                   type={field === 'password' ? 'password' : 'text'}
// //                   value={formData[field]}
// //                   onChange={handleChange}
// //                   className="plain-input"
// //                 />
// //               ) : (
// //                 <span>{field === 'password' ? formData[field].replace(/./g, '*') : formData[field]}</span>
// //               )}
// //               {field !== 'email' && (
// //                 <FaEdit className="edit-icon" onClick={() => handleEditClick(field)} />
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //         {(Object.values(isEditing).some(editing => editing)) && (
// //           <Button type="submit" variant="contained" color="primary" className="submit-button">
// //             Update Profile
// //           </Button>
// //         )}
// //       </form>
// //     </div>
// //     </div>
// //   );
// // };

// // export default Profile;
// import React, { useState, useEffect } from 'react';
// import { FaEdit } from 'react-icons/fa';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import './Profile.css';

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({
//     name: false,
//     phone: false,
//     address: false,
//     password: false,
//   });

//   const [isEditing, setIsEditing] = useState({
//     name: false,
//     phone: false,
//     address: false,
//     password: false,
//   });

//   const [deleteMode, setDeleteMode] = useState(false);
//   const [deleteEmail, setDeleteEmail] = useState('');
//   const [deletePassword, setDeletePassword] = useState('');
//   const [deleteErrors, setDeleteErrors] = useState({ email: false, password: false });

//   useEffect(() => {
//     const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
//     const userEmail = localStorage.getItem('loggedInUser');
//     const currentUser = storedUsers.find(user => user.email === userEmail);

//     if (currentUser) {
//       setFormData({
//         name: currentUser.name,
//         email: currentUser.email,
//         phone: currentUser.phone,
//         address: currentUser.address,
//         password: currentUser.password,
//       });
//     }
//   }, []);

//   const validatePhone = (phone) => /^\d{10}$/.test(phone);
//   const validatePassword = (password) => password.length >= 8;

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     const newErrors = {
//       name: !formData.name,
//       phone: !validatePhone(formData.phone),
//       address: !formData.address,
//       password: !validatePassword(formData.password),
//     };
//     setErrors(newErrors);

//     if (Object.values(newErrors).every(error => !error)) {
//       const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
//       const updatedUsers = storedUsers.map(user =>
//         user.email === formData.email ? { ...user, ...formData } : user
//       );
//       localStorage.setItem('users', JSON.stringify(updatedUsers));
//       console.log('Profile Updated', formData);
//       setIsEditing({
//         name: false,
//         phone: false,
//         address: false,
//         password: false,
//       });
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleEditClick = (field) => {
//     setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
//   };

//   const handleDeleteModeToggle = () => {
//     setDeleteMode(prev => !prev);
//   };

//   const handleDeleteChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'deleteEmail') setDeleteEmail(value);
//     if (name === 'deletePassword') setDeletePassword(value);
//   };

//   const handleDelete = (e) => {
//     e.preventDefault();
//     const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
//     const currentUser = storedUsers.find(user => user.email === deleteEmail);

//     if (!currentUser) {
//       setDeleteErrors({ email: true, password: false });
//       return;
//     }

//     if (currentUser.password !== deletePassword) {
//       setDeleteErrors({ email: false, password: true });
//       return;
//     }

//     const updatedUsers = storedUsers.filter(user => user.email !== deleteEmail);
//     localStorage.setItem('users', JSON.stringify(updatedUsers));
//     localStorage.removeItem('loggedInUser');
//     console.log('Profile Deleted');
//     // Redirect or handle logout
//   };

//   return (
//     <div className='p-body'>
//       <div className="profile-container">
//         <Typography variant="h4" component="h1" className="profile-header">
//           Profile Information
//         </Typography>
//         <br />
//         <form noValidate autoComplete="off" onSubmit={handleUpdate}>
//           {Object.keys(formData).map((field) => (
//             <div key={field} className="profile-item">
//               <div className="profile-item-content">
//                 <span>{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
//                 {isEditing[field] ? (
//                   <input
//                     name={field}
//                     type={field === 'password' ? 'password' : 'text'}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     className="plain-input"
//                   />
//                 ) : (
//                   <span>{field === 'password' ? formData[field].replace(/./g, '*') : formData[field]}</span>
//                 )}
//                 {field !== 'email' && (
//                   <FaEdit className="edit-icon" onClick={() => handleEditClick(field)} />
//                 )}
//               </div>
//             </div>
//           ))}
//           {(Object.values(isEditing).some(editing => editing)) && (
//             <Button type="submit" variant="contained" color="primary" className="submit-button">
//               Update Profile
//             </Button>
//           )}
//         </form>
//       </div>

//       <div className="delete-container">
//         <Button onClick={handleDeleteModeToggle} variant="contained" color="secondary" className="submit-button">
//           {deleteMode ? 'Cancel Delete' : 'Delete Profile'}
//         </Button>

//         {deleteMode && (
//           <div className="delete-profile-container">
//             <Typography variant="h6" component="h2">Delete Your Profile</Typography>
//             <form noValidate autoComplete="off" onSubmit={handleDelete} className="delete-form">
//               <div className="profile-item">
//                 <div className="profile-item-content">
//                   <span>Email:</span>
//                   <input
//                     name="deleteEmail"
//                     type="email"
//                     value={deleteEmail}
//                     onChange={handleDeleteChange}
//                     className="plain-input"
//                   />
//                 </div>
//               </div>
//               <div className="profile-item">
//                 <div className="profile-item-content">
//                   <span>Password:</span>
//                   <input
//                     name="deletePassword"
//                     type="password"
//                     value={deletePassword}
//                     onChange={handleDeleteChange}
//                     className="plain-input"
//                   />
//                 </div>
//               </div>
//               {deleteErrors.email && <Typography color="error">Email not found.</Typography>}
//               {deleteErrors.password && <Typography color="error">Incorrect password.</Typography>}
//               <Button type="submit" variant="contained" color="secondary" className="submit-button">
//                 Confirm Delete
//               </Button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

// import React, { useState, useEffect } from 'react';
// import { FaEdit } from 'react-icons/fa';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import './Profile.css';

// const API_URL = 'http://localhost:8080/api/profile';

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({
//     name: false,
//     phone: false,
//     address: false,
//     password: false,
//   });

//   const [isEditing, setIsEditing] = useState({
//     name: false,
//     phone: false,
//     address: false,
//     password: false,
//   });

//   const [deleteMode, setDeleteMode] = useState(false);
//   const [deleteEmail, setDeleteEmail] = useState('');
//   const [deletePassword, setDeletePassword] = useState('');
//   const [deleteErrors, setDeleteErrors] = useState({ email: false, password: false });

//   // Fetch user profile from backend
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const email = localStorage.getItem('loggedInUser');
//       if (!email) return;

//       try {
//         const response = await fetch(`${API_URL}?email=${email}`);
//         if (!response.ok) throw new Error('Failed to fetch profile');
//         const user = await response.json();

//         setFormData({
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           address: user.address,
//           password: user.password,
//         });
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const validatePhone = (phone) => /^\d{10}$/.test(phone);
//   const validatePassword = (password) => password.length >= 8;

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const newErrors = {
//       name: !formData.name,
//       phone: !validatePhone(formData.phone),
//       address: !formData.address,
//       password: !validatePassword(formData.password),
//     };
//     setErrors(newErrors);

//     if (Object.values(newErrors).every(error => !error)) {
//       try {
//         const response = await fetch(API_URL, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         });

//         if (!response.ok) throw new Error('Failed to update profile');
//         console.log('Profile Updated', formData);
//         setIsEditing({
//           name: false,
//           phone: false,
//           address: false,
//           password: false,
//         });
//       } catch (error) {
//         console.error('Error updating profile:', error);
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleEditClick = (field) => {
//     setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
//   };

//   const handleDeleteModeToggle = () => {
//     setDeleteMode(prev => !prev);
//   };

//   const handleDeleteChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'deleteEmail') setDeleteEmail(value);
//     if (name === 'deletePassword') setDeletePassword(value);
//   };

//   const handleDelete = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${API_URL}?email=${deleteEmail}&password=${deletePassword}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         if (response.status === 404) setDeleteErrors({ email: true, password: false });
//         if (response.status === 401) setDeleteErrors({ email: false, password: true });
//         return;
//       }

//       localStorage.removeItem('loggedInUser');
//       console.log('Profile Deleted');
//       // Redirect or handle logout
//     } catch (error) {
//       console.error('Error deleting profile:', error);
//     }
//   };

//   return (
//     <div className='p-body'>
//       <div className="profile-container">
//         <Typography variant="h4" component="h1" className="profile-header">
//           Profile Information
//         </Typography>
//         <br />
//         <form noValidate autoComplete="off" onSubmit={handleUpdate}>
//           {Object.keys(formData).map((field) => (
//             <div key={field} className="profile-item">
//               <div className="profile-item-content">
//                 <span>{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
//                 {isEditing[field] ? (
//                   <input
//                     name={field}
//                     type={field === 'password' ? 'password' : 'text'}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     className="plain-input"
//                   />
//                 ) : (
//                   <span>{field === 'password' ? formData[field].replace(/./g, '*') : formData[field]}</span>
//                 )}
//                 {field !== 'email' && (
//                   <FaEdit className="edit-icon" onClick={() => handleEditClick(field)} />
//                 )}
//               </div>
//             </div>
//           ))}
//           {(Object.values(isEditing).some(editing => editing)) && (
//             <Button type="submit" variant="contained" color="primary" className="submit-button">
//               Update Profile
//             </Button>
//           )}
//         </form>
//       </div>

//       <div className="delete-container">
//         <Button onClick={handleDeleteModeToggle} variant="contained" color="secondary" className="submit-button">
//           {deleteMode ? 'Cancel Delete' : 'Delete Profile'}
//         </Button>

//         {deleteMode && (
//           <div className="delete-profile-container">
//             <Typography variant="h6" component="h2">Delete Your Profile</Typography>
//             <form noValidate autoComplete="off" onSubmit={handleDelete} className="delete-form">
//               <div className="profile-item">
//                 <div className="profile-item-content">
//                   <span>Email:</span>
//                   <input
//                     name="deleteEmail"
//                     type="email"
//                     value={deleteEmail}
//                     onChange={handleDeleteChange}
//                     className="plain-input"
//                   />
//                 </div>
//               </div>
//               <div className="profile-item">
//                 <div className="profile-item-content">
//                   <span>Password:</span>
//                   <input
//                     name="deletePassword"
//                     type="password"
//                     value={deletePassword}
//                     onChange={handleDeleteChange}
//                     className="plain-input"
//                   />
//                 </div>
//               </div>
//               {deleteErrors.email && <Typography color="error">Email not found.</Typography>}
//               {deleteErrors.password && <Typography color="error">Incorrect password.</Typography>}
//               <Button type="submit" variant="contained" color="secondary" className="submit-button">
//                 Confirm Delete
//               </Button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;


// import React, { useState, useEffect } from 'react';
// import { FaEdit } from 'react-icons/fa';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import './Profile.css';

// const API_URL = 'http://localhost:8080/api/profile';

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({
//     name: false,
//     phone: false,
//     address: false,
//     password: false,
//   });

//   const [isEditing, setIsEditing] = useState({
//     name: false,
//     phone: false,
//     address: false,
//     password: false,
//   });

//   const [deleteMode, setDeleteMode] = useState(false);
//   const [deleteEmail, setDeleteEmail] = useState('');
//   const [deletePassword, setDeletePassword] = useState('');
//   const [deleteErrors, setDeleteErrors] = useState({ email: false, password: false });

//   // Fetch user profile from backend
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const uid = localStorage.getItem('userId');
//       if (!uid) return;

//       try {
//         const response = await fetch(`${API_URL}?uid=${uid}`);
//         if (!response.ok) throw new Error('Failed to fetch profile');
//         const user = await response.json();

//         setFormData({
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           address: user.address,
//           password: user.password,
//         });
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const validatePhone = (phone) => /^\d{10}$/.test(phone);
//   const validatePassword = (password) => password.length >= 8;

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const newErrors = {
//       name: !formData.name,
//       phone: !validatePhone(formData.phone),
//       address: !formData.address,
//       password: !validatePassword(formData.password),
//     };
//     setErrors(newErrors);

//     if (Object.values(newErrors).every(error => !error)) {
//       try {
//         const response = await fetch(API_URL, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         });

//         if (!response.ok) throw new Error('Failed to update profile');
//         console.log('Profile Updated', formData);
//         setIsEditing({
//           name: false,
//           phone: false,
//           address: false,
//           password: false,
//         });
//       } catch (error) {
//         console.error('Error updating profile:', error);
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleEditClick = (field) => {
//     setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
//   };

//   const handleDeleteModeToggle = () => {
//     setDeleteMode(prev => !prev);
//   };

//   const handleDeleteChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'deleteEmail') setDeleteEmail(value);
//     if (name === 'deletePassword') setDeletePassword(value);
//   };

//   const handleDelete = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${API_URL}?email=${deleteEmail}&password=${deletePassword}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         if (response.status === 404) setDeleteErrors({ email: true, password: false });
//         if (response.status === 401) setDeleteErrors({ email: false, password: true });
//         return;
//       }

//       localStorage.removeItem('loggedInUser');
//       console.log('Profile Deleted');
//       // Redirect or handle logout
//     } catch (error) {
//       console.error('Error deleting profile:', error);
//     }
//   };

//   return (
//     <div className='p-body'>
//       <div className="profile-container">
//         <Typography variant="h4" component="h1" className="profile-header">
//           Profile Information
//         </Typography>
//         <br />
//         <form noValidate autoComplete="off" onSubmit={handleUpdate}>
//           {Object.keys(formData).map((field) => (
//             <div key={field} className="profile-item">
//               <div className="profile-item-content">
//                 <span>{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
//                 {isEditing[field] ? (
//                   <input
//                     name={field}
//                     type={field === 'password' ? 'password' : 'text'}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     className="plain-input"
//                   />
//                 ) : (
//                   <span>{field === 'password' ? formData[field].replace(/./g, '*') : formData[field]}</span>
//                 )}
//                 {field !== 'email' && (
//                   <FaEdit className="edit-icon" onClick={() => handleEditClick(field)} />
//                 )}
//               </div>
//             </div>
//           ))}
//           {(Object.values(isEditing).some(editing => editing)) && (
//             <Button type="submit" variant="contained" color="primary" className="submit-button">
//               Update Profile
//             </Button>
//           )}
//         </form>
//       </div>

//       <div className="delete-container">
//         <Button onClick={handleDeleteModeToggle} variant="contained" color="secondary" className="submit-button">
//           {deleteMode ? 'Cancel Delete' : 'Delete Profile'}
//         </Button>

//         {deleteMode && (
//           <div className="delete-profile-container">
//             <Typography variant="h6" component="h2">Delete Your Profile</Typography>
//             <form noValidate autoComplete="off" onSubmit={handleDelete} className="delete-form">
//               <div className="profile-item">
//                 <div className="profile-item-content">
//                   <span>Email:</span>
//                   <input
//                     name="deleteEmail"
//                     type="email"
//                     value={deleteEmail}
//                     onChange={handleDeleteChange}
//                     className="plain-input"
//                   />
//                 </div>
//               </div>
//               <div className="profile-item">
//                 <div className="profile-item-content">
//                   <span>Password:</span>
//                   <input
//                     name="deletePassword"
//                     type="password"
//                     value={deletePassword}
//                     onChange={handleDeleteChange}
//                     className="plain-input"
//                   />
//                 </div>
//               </div>
//               {deleteErrors.email && <Typography color="error">Email not found.</Typography>}
//               {deleteErrors.password && <Typography color="error">Incorrect password.</Typography>}
//               <Button type="submit" variant="contained" color="secondary" className="submit-button">
//                 Confirm Delete
//               </Button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;


//some what working

// import React, { useState, useEffect } from 'react';
// import { FaEdit } from 'react-icons/fa';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import './Profile.css';

// const API_URL = 'http://localhost:8080/api/profile';

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({
//     name: false,
//     phone: false,
//     address: false,
//     password: false,
//   });

//   const [isEditing, setIsEditing] = useState({
//     name: false,
//     phone: false,
//     address: false,
//     password: false,
//   });

//   const [deleteMode, setDeleteMode] = useState(false);
//   const [deleteEmail, setDeleteEmail] = useState('');
//   const [deletePassword, setDeletePassword] = useState('');
//   const [deleteErrors, setDeleteErrors] = useState({ email: false, password: false });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem('token');
//       const userEmail = localStorage.getItem('userEmail');
//       if (!token || !userEmail) return;
    
//       try {
//         const response = await fetch(`${API_URL}?email=${userEmail}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
    
//         if (!response.ok) throw new Error('Failed to fetch profile');
//         const user = await response.json();
    
//         // Store user details in local storage
//         localStorage.setItem('userDetails', JSON.stringify(user));
    
//         setFormData({
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           address: user.address,
//           password: user.password,
//         });
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };
    
  
//     fetchProfile();
//   }, []);
  

//   // Function to load user data from local storage
//   const loadUserFromLocalStorage = () => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setFormData(JSON.parse(storedUser));
//     }
//   };

//   const validatePhone = (phone) => /^\d{10}$/.test(phone);
//   const validatePassword = (password) => password.length >= 8;

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const newErrors = {
//       name: !formData.name,
//       phone: !validatePhone(formData.phone),
//       address: !formData.address,
//       password: !validatePassword(formData.password),
//     };
//     setErrors(newErrors);

//     if (Object.values(newErrors).every(error => !error)) {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(API_URL, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify(formData),
//         });

//         if (!response.ok) throw new Error('Failed to update profile');
//         console.log('Profile Updated', formData);

//         // Update local storage with the new user details
//         localStorage.setItem('user', JSON.stringify(formData));

//         setIsEditing({
//           name: false,
//           phone: false,
//           address: false,
//           password: false,
//         });
//       } catch (error) {
//         console.error('Error updating profile:', error);
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleEditClick = (field) => {
//     setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
//   };

//   const handleDeleteModeToggle = () => {
//     setDeleteMode(prev => !prev);
//   };

//   const handleDeleteChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'deleteEmail') setDeleteEmail(value);
//     if (name === 'deletePassword') setDeletePassword(value);
//   };

//   const handleDelete = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     try {
//       const response = await fetch(`${API_URL}?email=${deleteEmail}&password=${deletePassword}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         console.log('Profile Deleted');
//         // Redirect or handle logout
//       } else {
//         if (response.status === 404) setDeleteErrors({ email: true, password: false });
//         if (response.status === 401) setDeleteErrors({ email: false, password: true });
//       }
//     } catch (error) {
//       console.error('Error deleting profile:', error);
//     }
//   };

//   useEffect(() => {
//     loadUserFromLocalStorage();
//   }, []);

//   return (
//     <div className='p-body'>
//       <div className="profile-container">
//         <Typography variant="h4" component="h1" className="profile-header">
//           Profile Information
//         </Typography>
//         <br />
//         <form noValidate autoComplete="off" onSubmit={handleUpdate}>
//           {Object.keys(formData).map((field) => (
//             <div key={field} className="profile-item">
//               <div className="profile-item-content">
//                 <span>{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
//                 {isEditing[field] ? (
//                   <input
//                     name={field}
//                     type={field === 'password' ? 'password' : 'text'}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     className="plain-input"
//                   />
//                 ) : (
//                   <span>{field === 'password' ? formData[field].replace(/./g, '*') : formData[field]}</span>
//                 )}
//                 {field !== 'email' && (
//                   <FaEdit className="edit-icon" onClick={() => handleEditClick(field)} />
//                 )}
//               </div>
//             </div>
//           ))}
//           {(Object.values(isEditing).some(editing => editing)) && (
//             <Button type="submit" variant="contained" color="primary" className="submit-button">
//               Update Profile
//             </Button>
//           )}
//         </form>
//       </div>

//       <div className="delete-container">
//         <Button onClick={handleDeleteModeToggle} variant="contained" color="secondary" className="submit-button">
//           {deleteMode ? 'Cancel Delete' : 'Delete Profile'}
//         </Button>

//         {deleteMode && (
//           <div className="delete-profile-container">
//             <Typography variant="h6" component="h2">Delete Your Profile</Typography>
//             <form noValidate autoComplete="off" onSubmit={handleDelete} className="delete-form">
//               <div className="profile-item">
//                 <div className="profile-item-content">
//                   <span>Email:</span>
//                   <input
//                     name="deleteEmail"
//                     type="email"
//                     value={deleteEmail}
//                     onChange={handleDeleteChange}
//                     className="plain-input"
//                   />
//                 </div>
//               </div>
//               <div className="profile-item">
//                 <div className="profile-item-content">
//                   <span>Password:</span>
//                   <input
//                     name="deletePassword"
//                     type="password"
//                     value={deletePassword}
//                     onChange={handleDeleteChange}
//                     className="plain-input"
//                   />
//                 </div>
//               </div>
//               {deleteErrors.email && <Typography color="error">Email not found.</Typography>}
//               {deleteErrors.password && <Typography color="error">Incorrect password.</Typography>}
//               <Button type="submit" variant="contained" color="secondary" className="submit-button">
//                 Confirm Delete
//               </Button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

// import React, { useState, useEffect } from 'react';
// import { FaEdit } from 'react-icons/fa';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import './Profile.css';

// const API_URL = 'http://localhost:8080/api/profile';

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({
//     name: false,
//     phone: false,
//     address: false,
//     password: false,
//   });

//   const [isEditing, setIsEditing] = useState({
//     name: false,
//     phone: false,
//     address: false,
//     password: false,
//   });

//   const [deleteMode, setDeleteMode] = useState(false);
//   const [deleteEmail, setDeleteEmail] = useState('');
//   const [deletePassword, setDeletePassword] = useState('');
//   const [deleteErrors, setDeleteErrors] = useState({ email: false, password: false });

//   // Fetch user profile from backend
//   useEffect(() => {
    
//     const fetchProfile = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) return;

//       try {
//         const response = await fetch(API_URL, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) throw new Error('Failed to fetch profile');
//         const user = await response.json();

//         // Store user details in local storage
//         localStorage.setItem('user', JSON.stringify(user));

//         setFormData({
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           address: user.address,
//           password: user.password,
//         });
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Function to load user data from local storage
//   const loadUserFromLocalStorage = () => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setFormData(JSON.parse(storedUser));
//     }
//   };

//   const validatePhone = (phone) => /^\d{10}$/.test(phone);
//   const validatePassword = (password) => password.length >= 8;

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const newErrors = {
//       name: !formData.name,
//       phone: !validatePhone(formData.phone),
//       address: !formData.address,
//       password: !validatePassword(formData.password),
//     };
//     setErrors(newErrors);

//     if (Object.values(newErrors).every(error => !error)) {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(API_URL, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify(formData),
//         });

//         if (!response.ok) throw new Error('Failed to update profile');
//         console.log('Profile Updated', formData);

//         // Update local storage with the new user details
//         localStorage.setItem('user', JSON.stringify(formData));

//         setIsEditing({
//           name: false,
//           phone: false,
//           address: false,
//           password: false,
//         });
//       } catch (error) {
//         console.error('Error updating profile:', error);
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleEditClick = (field) => {
//     setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
//   };

//   const handleDeleteModeToggle = () => {
//     setDeleteMode(prev => !prev);
//   };

//   const handleDeleteChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'deleteEmail') setDeleteEmail(value);
//     if (name === 'deletePassword') setDeletePassword(value);
//   };

//   const handleDelete = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     try {
//       const response = await fetch(`${API_URL}?email=${deleteEmail}&password=${deletePassword}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         // Clear local storage
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         console.log('Profile Deleted');
//         // Redirect or handle logout
//       } else {
//         if (response.status === 404) setDeleteErrors({ email: true, password: false });
//         if (response.status === 401) setDeleteErrors({ email: false, password: true });
//       }
//     } catch (error) {
//       console.error('Error deleting profile:', error);
//     }
//   };

//   useEffect(() => {
//     loadUserFromLocalStorage();
//   }, []);

//   return (
//     <div className='p-body'>
//       <div className="profile-container">
//         <Typography variant="h4" component="h1" className="profile-header">
//           Profile Information
//         </Typography>
//         <br />
//         <form noValidate autoComplete="off" onSubmit={handleUpdate}>
//           {Object.keys(formData).map((field) => (
//             <div key={field} className="profile-item">
//               <div className="profile-item-content">
//                 <span>{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
//                 {isEditing[field] ? (
//                   <input
//                     name={field}
//                     type={field === 'password' ? 'password' : 'text'}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     className="plain-input"
//                   />
//                 ) : (
//                   <span>{field === 'password' ? formData[field].replace(/./g, '*') : formData[field]}</span>
//                 )}
//                 {field !== 'email' && (
//                   <FaEdit className="edit-icon" onClick={() => handleEditClick(field)} />
//                 )}
//               </div>
//             </div>
//           ))}
//           {(Object.values(isEditing).some(editing => editing)) && (
//             <Button type="submit" variant="contained" color="primary" className="submit-button">
//               Update Profile
//             </Button>
//           )}
//         </form>
//       </div>

//       <div className="delete-container">
//         <Button onClick={handleDeleteModeToggle} variant="contained" color="secondary" className="submit-button">
//           {deleteMode ? 'Cancel Delete' : 'Delete Profile'}
//         </Button>

//         {deleteMode && (
//           <div className="delete-profile-container">
//             <Typography variant="h6" component="h2">Delete Your Profile</Typography>
//             <form noValidate autoComplete="off" onSubmit={handleDelete} className="delete-form">
//               <div className="profile-item">
//                 <div className="profile-item-content">
//                   <span>Email:</span>
//                   <input
//                     name="deleteEmail"
//                     type="email"
//                     value={deleteEmail}
//                     onChange={handleDeleteChange}
//                     className="plain-input"
//                   />
//                 </div>
//               </div>
//               <div className="profile-item">
//                 <div className="profile-item-content">
//                   <span>Password:</span>
//                   <input
//                     name="deletePassword"
//                     type="password"
//                     value={deletePassword}
//                     onChange={handleDeleteChange}
//                     className="plain-input"
//                   />
//                 </div>
//               </div>
//               {deleteErrors.email && <Typography color="error">Email not found.</Typography>}
//               {deleteErrors.password && <Typography color="error">Incorrect password.</Typography>}
//               <Button type="submit" variant="contained" color="secondary" className="submit-button">
//                 Confirm Delete
//               </Button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Profile.css';

const API_URL = 'http://localhost:8080/api/profile';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    address: false,
    password: false,
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    phone: false,
    address: false,
    password: false,
  });

  const [deleteMode, setDeleteMode] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteErrors, setDeleteErrors] = useState({ password: false });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (!token || !user || !user.id) {
        console.error('No user data found in local storage.');
        return;
      }

      try {
        const response = await fetch(`${API_URL}?userId=${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch profile');
        const userData = await response.json();

        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          password: userData.password || '',
        });

        // Optionally update local storage
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const validatePhone = (phone) => /^\d{10}$/.test(phone);
  const validatePassword = (password) => password.length >= 8;

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newErrors = {
      name: !formData.name,
      phone: !validatePhone(formData.phone),
      address: !formData.address,
      password: !validatePassword(formData.password),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!token || !user || !user.id) {
          console.error('No user data found in local storage for update.');
          return;
        }

        const response = await fetch(API_URL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            id: user.id, // Include user ID in the request
          }),
        });

        if (!response.ok) throw new Error('Failed to update profile');
        console.log('Profile Updated', formData);

        // Update local storage with the new user details
        localStorage.setItem('user', JSON.stringify(formData));

        setIsEditing({
          name: false,
          phone: false,
          address: false,
          password: false,
        });
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = (field) => {
    setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleDeleteModeToggle = () => {
    setDeleteMode(prev => !prev);
  };

  const handleDeleteChange = (e) => {
    setDeletePassword(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user ) {
      console.error('No user data found in local storage for deletion.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}?userId=${user.id}&password=${deletePassword}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('Profile Deleted');
        // Redirect or handle logout
      } else {
        if (response.status === 401) setDeleteErrors({ password: true });
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div className='p-body'>
      <div className="profile-container">
        <Typography variant="h4" component="h1" className="profile-header">
          Profile Information
        </Typography>
        <br />
        <form noValidate autoComplete="off" onSubmit={handleUpdate}>
          {Object.keys(formData).map((field) => (
            <div key={field} className="profile-item">
              <div className="profile-item-content">
                <span>{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
                {isEditing[field] ? (
                  <input
                    name={field}
                    type={field === 'password' ? 'password' : 'text'}
                    value={formData[field]}
                    onChange={handleChange}
                    className="plain-input"
                  />
                ) : (
                  <span>{field === 'password' ? formData[field].replace(/./g, '*') : formData[field]}</span>
                )}
                {field !== 'email' && (
                  <FaEdit className="edit-icon" onClick={() => handleEditClick(field)} />
                )}
              </div>
            </div>
          ))}
          {(Object.values(isEditing).some(editing => editing)) && (
            <Button type="submit" variant="contained" color="primary" className="submit-button">
              Update Profile
            </Button>
          )}
        </form>
      </div>

      <div className="delete-container">
        <Button onClick={handleDeleteModeToggle} variant="contained" color="secondary" className="submit-button">
          {deleteMode ? 'Cancel Delete' : 'Delete Profile'}
        </Button>

        {deleteMode && (
          <div className="delete-profile-container">
            <Typography variant="h6" component="h2">Delete Your Profile</Typography>
            <form noValidate autoComplete="off" onSubmit={handleDelete} className="delete-form">
              <div className="profile-item">
                <div className="profile-item-content">
                  <span>Password:</span>
                  <input
                    name="deletePassword"
                    type="password"
                    value={deletePassword}
                    onChange={handleDeleteChange}
                    className="plain-input"
                  />
                </div>
              </div>
              {deleteErrors.password && <Typography color="error">Incorrect password.</Typography>}
              <Button type="submit" variant="contained" color="secondary" className="submit-button">
                Confirm Delete
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

