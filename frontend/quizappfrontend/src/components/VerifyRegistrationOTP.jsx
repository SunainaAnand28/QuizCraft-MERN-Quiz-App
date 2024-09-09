import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/VerifyOTP.css";

function VerifyOTP() {
  const [otp, setOTP] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState('');

  useEffect(() => {
    // Extract token from the URL path
    const tokenFromParams = location.pathname.split('/').pop();
    setToken(tokenFromParams);
  }, [location.pathname]);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Send OTP and token to the backend for verification
      await axios.post(`http://localhost:3002/auth/verify-registration-otp/${token}`, { otp });

      // Show success message and redirect to login
      setSuccessMessage('OTP verified successfully!');
      setTimeout(() => {
        navigate('/auth/login'); 
      }, 2000); 
    } catch (error) {
      console.error('Error during OTP verification:', error.response?.data?.message || error.message);
      setErrorMessage(error.response?.data?.message || 'OTP verification failed. Please try again later.');
    }
  };

  return (
    <div className='container'>
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerifyOTP}>
        <div className='formgroup'>
          <label htmlFor="otp">OTP: </label>
          <input
            type="text"
            placeholder="Enter OTP"
            id='otp'
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            required
          />
        </div>
        <div className='submitButtonContainer'>
          <button type="submit" className='submitButton'>Verify OTP</button>
        </div>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default VerifyOTP;
