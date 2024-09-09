import React from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import '../styles/AttemptQuizzes.css'; // Import the CSS file

const AttemptQuiz = () => {
  const navigate = useNavigate();

  const goToExam = () => {
    navigate('/exam');
  };

  const goToTest = () => {
    navigate('/test');
  };

  const goToFavorites = () => {
    navigate('/fav-questions');
  };

  return (
    <>
   <div>
    <Navbar></Navbar>
   <div className="attempt-quiz-container">
      <h2>Attempt Quiz</h2>
      <h3>Start strong and finish even stronger! Good luck!</h3>
      
      <div className="button-container">
        <p>Take the Exam</p>
        <button className="attempt-button" onClick={goToExam}>
          Go to Exam
        </button>
      </div>

      <div className="button-container">
        <p>Attempt the Test</p>
        <button className="attempt-button" onClick={goToTest}>
          Go to Test
        </button>
      </div>

      {/* New container for favorite questions */}
      <div className="button-container">
        <p>View Favorite Questions</p>
        <button className="attempt-button" onClick={goToFavorites}>
          Go to Favorites
        </button>
      </div>
    </div>
   </div>
    </>
  );
  
};

export default AttemptQuiz;
