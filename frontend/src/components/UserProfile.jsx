import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Import the user profile icon
import './UserProfile.css'; // Import the CSS file

const UserProfile = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        phone: '',
        location: '',
        profilePicture: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const savedUserData = JSON.parse(localStorage.getItem('userData'));
        if (savedUserData) {
            setUserData(savedUserData);
        } else {
            setUserData({
                username: 'Tarun',
                email: 'tarun@gmail.com',
                phone: '9798745631',
                location: 'CBE',
                profilePicture: '' // No need for a profile picture URL
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSave = () => {
        localStorage.setItem('userData', JSON.stringify(userData));
        setIsEditing(false);
    };

    return (
        <div className='user-profile-container'>
            <div className='flex flex-col items-center w-full max-w-2xl'>
                {/* Profile Icon */}
                <div className='w-full flex justify-center mb-6'>
                    <FaUserCircle className='profile-icon' /> {/* Large colorful user profile icon */}
                </div>

                {/* Conditional Rendering for Edit Mode */}
                {isEditing ? (
                    <div className='profile-card'>
                        {/* Editable Fields */}
                        <div className='space-y-6'>
                            {['username', 'email', 'phone', 'location'].map((field) => (
                                <div key={field} className='input-field'>
                                    <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                                    <input
                                        id={field}
                                        type={field === 'email' ? 'email' : 'text'}
                                        value={userData[field]}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Save and Cancel Buttons */}
                        <div className='button-container'>
                            <button
                                type='button'
                                onClick={handleSave}
                                className='button button-save'
                            >
                                Save
                            </button>
                            <button
                                type='button'
                                onClick={() => setIsEditing(false)}
                                className='button button-cancel'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='profile-card'>
                        {/* Display User Data */}
                        <div className='space-y-6'>
                            {['username', 'email', 'phone', 'location'].map((field) => (
                                <div key={field} className='text-lg'>
                                    <span className='font-semibold heading'>{field.charAt(0).toUpperCase() + field.slice(1)}: </span>{userData[field]}
                                </div>
                            ))}
                        </div>
                        {/* Edit Button */}
                        <div className='mt-6 flex justify-center'>
                            <button
                                type='button'
                                onClick={() => setIsEditing(true)}
                                className='button button-save'
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;