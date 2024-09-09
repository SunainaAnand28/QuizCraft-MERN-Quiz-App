// components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Import the Navbar component
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar /> {/* Use the Navbar component here */}

      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>
        <nav>
          <div className="nav-item">
            <h3>Create a New Quiz</h3>
            <button onClick={() => navigate('/quiz')}>Create Quiz</button>
          </div>
          <div className="nav-item">
            <h3>Manage Your Quizzes</h3>
            <button onClick={() => navigate('/auth/quiz/myquiz')}>My Quizzes</button>
          </div>
          <div className="nav-item">
            <h3>Attempt Available Quizzes</h3>
            <button onClick={() => navigate('/attempt-quizzes')}>Attempt Quizzes</button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
