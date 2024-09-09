import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Navbar';
import '../styles/FavoriteQuestion.css';

const FavoriteQuestions = () => {
  const [favoriteQuestions, setFavoriteQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    const fetchFavoriteQuestions = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setErrorMessage('Authentication token is missing. Please log in again.');
          return;
        }

        const response = await axios.get('http://localhost:3002/favquestion', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Extract and set favorite questions
        setFavoriteQuestions(response.data.data.favQues);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Error fetching favorite questions');
        toast.error(error.response?.data?.message || 'Error fetching favorite questions');
      }
    };

    fetchFavoriteQuestions();
  }, []);

  const handleRemoveFromFavorites = async (favQuestionId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setErrorMessage('Authentication token is missing. Please log in again.');
        return;
      }

      await axios.delete(`http://localhost:3002/favquestion/${favQuestionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Question removed from favorites!');

      setFavoriteQuestions(prevFavorites =>
        prevFavorites.filter(fav => fav._id !== favQuestionId)
      );
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error removing question from favorites');
      toast.error(error.response?.data?.message || 'Error removing question from favorites');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="favorite-questions-container">
        <h1>Favorite Questions</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <ul className="favorite-questions-list">
          {favoriteQuestions.length > 0 ? (
            favoriteQuestions.map((fav) => (
              <li key={fav._id} className="favorite-question-item">
                <p><strong>{fav.question}</strong></p>
                <ul>
                  {Object.entries(fav.options || {}).map(([key, option]) => (
                    <li key={key}>{option}</li>
                  ))}
                </ul>
                <button onClick={() => handleRemoveFromFavorites(fav._id)}>
                  Remove
                </button>
              </li>
            ))
          ) : (
            <p>No favorite questions found.</p>
          )}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FavoriteQuestions;
