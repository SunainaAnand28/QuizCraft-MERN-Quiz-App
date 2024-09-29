import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../styles/MyProfile.css'; 

const MyProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatedName, setUpdatedName] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          toast.error('Authentication token is missing. Please log in again.');
          return;
        }

        await axios.get('${process.env.REACT_APP_BACKEND_URL}/user', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }).then(response => {
          if (response.data.status === 'success') {
            setUserInfo(response.data.data);
            setUpdatedName(response.data.data.name); // Set the initial username
          } else {
            toast.error('Error fetching user info');
          }
        }).catch(error => {
          toast.error('Error fetching user info');
        });
      } catch (error) {
        toast.error('Error fetching user info');
      }
    };

    fetchUserInfo();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        toast.error('Authentication token is missing. Please log in again.');
        return;
      }

      await axios.put(
        '${process.env.REACT_APP_BACKEND_URL}/user/changepassword',
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      ).then(response => {
        toast.success(response.data.message);
      }).catch(error => {
        toast.error(error.response?.data?.message || 'Error changing password');
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error changing password');
    }
  };

  const handleChangeUsername = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        toast.error('Authentication token is missing. Please log in again.');
        return;
      }

      await axios.put(
        '${process.env.REACT_APP_BACKEND_URL}/user',
        { name: updatedName },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      ).then(response => {
        toast.success('Username updated successfully!');
      }).catch(error => {
        toast.error(error.response?.data?.message || 'Error updating username');
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating username');
    }
  };

  const goToDeactivate = () => {
    navigate('/deactivate');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the auth token
    navigate('/auth/login'); // Redirect to login page
  };

  return (
    <div className="profile-container">
      <h1 className="profile-header">My Profile</h1>

      {userInfo ? (
        <div className="user-info">
          <p><strong>ID:</strong> {userInfo._id}</p>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <h2>Change Username</h2>
      <form onSubmit={handleChangeUsername} className="profile-form">
        <div className="form-group">
          <label htmlFor="updatedName">New Username: </label>
          <input
            id="updatedName"
            type="text"
            value={updatedName}
            placeholder='New Username'
            onChange={(e) => setUpdatedName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Update</button>
      </form>

      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword} className="profile-form">
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password : </label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="profile-form">
          <label htmlFor="newPassword">New Password : </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="profile-form">
          <label htmlFor="confirmPassword">Confirm New Password : </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Change Password</button>
      </form>

      <div className="deactivation-section">
        <button onClick={goToDeactivate} className="deactivate-button">Deactivate Account</button>
      </div>

      <div className="logout-section">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyProfile;
