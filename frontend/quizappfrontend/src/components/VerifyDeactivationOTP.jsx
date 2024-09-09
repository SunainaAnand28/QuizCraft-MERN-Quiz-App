import React, { useState } from 'react';
import axios from 'axios';
import '../styles/VerifyDeactivationOTP.css'; // Import your CSS file

const VerifyDeactivateOTP = () => {
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const verifyOTPHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3002/user/deactivate/verify-deactivate-account-otp', {
        otp
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Verify OTP to Deactivate Account</h2>
      <p>Enter the OTP sent to your email to deactivate your account.</p>
      <input 
        type="text" 
        value={otp} 
        onChange={(e) => setOTP(e.target.value)} 
        placeholder="Enter OTP" 
      />
      {message && <p className="error-message">{message}</p>}
      <button onClick={verifyOTPHandler} disabled={loading}>
        {loading ? 'Verifying OTP...' : 'Verify OTP'}
      </button>
    </div>
  );
};

export default VerifyDeactivateOTP;
