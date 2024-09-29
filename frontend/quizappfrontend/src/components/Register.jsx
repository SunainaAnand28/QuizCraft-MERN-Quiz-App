import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate,Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Register.css";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    const validationErrors = {};

    if (name.length < 4) {
      validationErrors.name = 'Name must be at least 4 characters long.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }
    if (password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[$@!#*]/.test(password)) {
      validationErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character ($, @, !, #, *).';
    }
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match.';
    }

    return validationErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      for (const key in validationErrors) {
        toast.error(validationErrors[key]);
      }
      return;
    }

    try {
      const response = await axios.post('${process.env.REACT_APP_BACKEND_URL}/auth/', { name, email, password, confirmPassword });
      const { token } = response.data.data;
      if (token) {
        toast.success('Registration successful! Redirecting to OTP verification...');
        navigate(`/auth/verify-otp/${token}`, { state: { email } });
      } else {
        toast.error('No token received from the server. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again later.');
    }
  };

  return (
    <div className='rcontainer'>
      <h2>Register</h2>
      <p>Already registered? <Link to="/auth/login">Login</Link></p>
      <form onSubmit={handleRegister} className=''>
        <div className='formgroup'>
          <label htmlFor="userName">Name : </label>
          <input
            type="text"
            placeholder="Name"
            id='userName'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='formgroup'>
          <label htmlFor="userEmail">Email : </label>
          <input
            type="email"
            placeholder="Email"
            id='userEmail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='formgroup'>
          <label htmlFor="userPassword">Password : </label>
          <input
            type="password"
            placeholder="Password"
            id='userPassword'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='formgroup'>
          <label htmlFor="userConfirmPassword">Confirm Password : </label>
          <input
            type="password"
            placeholder="Confirm Password"
            id='userConfirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className='submitButtonContainer'>
          <button type="submit" className='submitButton'>Register</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
