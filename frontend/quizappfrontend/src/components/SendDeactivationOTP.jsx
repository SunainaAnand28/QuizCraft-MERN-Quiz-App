import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SendDeactivationOTP.css'; // Import the CSS file

const SendDeactivateOTP = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const sendOTPHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.patch('http://localhost:3002/user/deactivate', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setMessage(response.data.message);
      // Navigate to the OTP verification page after OTP is sent
      setTimeout(() => {
        navigate('/deactivate/verify');
      }, 2000); // Optional delay before navigation
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
    setLoading(false);
  };

  return (
    <div className="deactivate-container">
      <h2>Deactivate Account</h2>
      <p>Click the button below to receive an OTP for account deactivation.</p>
      {message && <p>{message}</p>}
      <button 
        className="deactivate-button" 
        onClick={sendOTPHandler} 
        disabled={loading}
      >
        {loading ? 'Sending OTP...' : 'Send OTP'}
      </button>
    </div>
  );
};

export default SendDeactivateOTP;
