import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgetPassword = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3002/auth/forgotpassword', { email })
      .then(response => {
        toast.success("If your email is registered, you'll receive a reset link shortly.");
        
        navigate('/auth/resetpassword/'); 
      })
      .catch(error => {
        const message = error?.response?.data?.message;
        toast.error(message || 'An error occurred. Please try again.');
      });
  };

  return (
    <div className="forget-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgetPassword} className="forget-password-form">
        <div className="formgroup">
          <label htmlFor="userEmail">Email :</label>
          <input
            type="email"
            placeholder="Enter your email"
            id="userEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ForgetPassword;
