import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import '../styles/Login.css'; // Import your CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/auth/login', { email, password });
      console.log(response);
      const token = response.data.data.token;
      console.log(token);
      localStorage.setItem('authToken', token);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h2>Login</h2>
      <p>Not registered? <a href="http://localhost:3000/auth/">Register</a></p>
      <form onSubmit={handleLogin}>
        <div className="formgroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="formgroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {/* <p>
        <Link to="/auth/forgot-password">Forgot Password?</Link>
      </p> */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Login;
