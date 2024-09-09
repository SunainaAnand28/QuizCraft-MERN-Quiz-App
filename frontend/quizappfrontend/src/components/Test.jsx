import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Exam.css';

const Exam = ({ userId }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [attemptedAnswers, setAttemptedAnswers] = useState({});
  const [favoriteQuestions, setFavoriteQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          toast.error('Authentication token is missing. Please log in again.');
          return;
        }

        const response = await axios.get('http://localhost:3002/quiz/allpublishedquiz/test', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const availableQuizzes = response.data.data.filter(quiz => quiz.createdBy !== userId);
        setQuizzes(availableQuizzes);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error fetching quizzes');
      }
    };

    fetchQuizzes();
  }, [userId]);

  const handleAttemptQuiz = async (quizId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('Authentication token is missing. Please log in again.');
        return;
      }

      const response = await axios.get(`http://localhost:3002/exam/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentQuiz(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error starting quiz');
    }
  };

  const handleAnswerChange = (questionNumber, answer) => {
    setAttemptedAnswers(prev => ({
      ...prev,
      [questionNumber]: answer,
    }));
  };

  const handleSubmitQuiz = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        toast.error('Authentication token is missing. Please log in again.');
        return;
      }

      const formattedAttemptedAnswers = attemptedAnswers;

      const response = await axios.post(
        `http://localhost:3002/exam`,
        {
          quizId: currentQuiz._id,
          attemptedQuestion: formattedAttemptedAnswers,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const { reportId } = response.data.data;



      navigate(`/report/${reportId}`, { state: { token: authToken } });

    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting quiz');
    }
  };

  const handleToggleFavorite = async (quizId, question) => {
    const isFavorite = favoriteQuestions.some(fav => fav.questionId === question._id);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('Authentication token is missing. Please log in again.');
        return;
      }

      if (isFavorite) {
        const favQuestion = favoriteQuestions.find(fav => fav.questionId === question._id);
        await axios.delete(`http://localhost:3002/favquestion/${favQuestion.favQuestionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Question removed from favorites!');
        setFavoriteQuestions(prevFavorites =>
          prevFavorites.filter(fav => fav.questionId !== question._id)
        );
      } else {
        const response = await axios.post(
          `http://localhost:3002/favquestion`,
          {
            question: question.question,
            options: question.options,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const favQuestion = response.data.data;
        toast.success('Question added to favorites!');
        setFavoriteQuestions(prevFavorites => [
          ...prevFavorites,
          { favQuestionId: favQuestion._id, questionId: question._id },
        ]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error toggling favorite status');
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="exam-container">
        <h1>Available Quizzes</h1>
        {!currentQuiz ? (
          <ul className="quiz-list">
            {quizzes.map(quiz => (
              <li key={quiz._id}>
                {quiz.name} - {quiz.category}
                <div className="quiz-actions">
                  <button onClick={() => handleAttemptQuiz(quiz._id)}>Attempt Quiz</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="quiz-form">
            <h2>{currentQuiz.name}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitQuiz(); }}>
              {currentQuiz.questionList.map((question) => (
                <div key={question._id}>
                  <p><strong>{question.questionNumber}. {question.question}</strong></p>
                  <ul>
                    {Object.entries(question.options).map(([optionKey, optionValue]) => (
                      <li key={optionKey}>
                        <label>
                          <input
                            type="radio"
                            name={`question-${question.questionNumber}`}
                            value={optionKey}
                            onChange={(e) => handleAnswerChange(question.questionNumber, parseInt(e.target.value))}
                            required
                          />
                          {optionValue}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => handleToggleFavorite(currentQuiz._id, question)}
                  >
                    {favoriteQuestions.some(fav => fav.questionId === question._id)
                      ? 'Remove from Favorites'
                      : 'Add to Favorites'}
                  </button>
                </div>
              ))}
              <button type="submit">Submit Quiz</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exam;
