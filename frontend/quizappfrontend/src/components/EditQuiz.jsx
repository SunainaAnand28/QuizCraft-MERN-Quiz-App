import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/EditQuiz.css";
import Navbar from './Navbar';


const EditQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    name: '',
    category: '',
    difficultyLevel: '',
    questionList: [{ questionNumber: 1, question: '', options: { "1": '', "2": '', "3": '', "4": '' } }],
    answers: {},
    passingPercentage: 0,
    attemptsAllowedPerUser: 0,
    isPublicQuiz: false,
    allowedUser: [] // Allow users field
  });
  const [newAllowedUser, setNewAllowedUser] = useState(''); // Temp state for new allowed user input
  

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/quiz/${quizId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        const fetchedQuiz = response.data.data;
        setQuiz(fetchedQuiz);
      } catch (error) {
        toast.error('Error fetching quiz details');
      }
    };
  
    fetchQuiz();
  }, [quizId]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuiz({ ...quiz, [name]: type === 'checkbox' ? checked : value || '' });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quiz.questionList];
    updatedQuestions[index] = { ...updatedQuestions[index], [name]: value || '' };
    setQuiz({ ...quiz, questionList: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionKey, e) => {
    const { value } = e.target;
    const updatedQuestions = [...quiz.questionList];
    updatedQuestions[questionIndex].options[optionKey] = value || '';
    setQuiz({ ...quiz, questionList: updatedQuestions });
  };

  const handleAnswerChange = (questionNumber, e) => {
    const { value } = e.target;
    setQuiz({ ...quiz, answers: { ...quiz.answers, [questionNumber]: value || '' } });
  };

  // Handle adding new allowed user ID
  const handleAddAllowedUser = () => {
    if (newAllowedUser.trim()) {
      setQuiz((prevState) => ({
        ...prevState,
        allowedUser: [...prevState.allowedUser, newAllowedUser.trim()]
      }));
      setNewAllowedUser(''); // Clear input after adding
    }
  };

  // Handle removing an allowed user ID
  const handleRemoveAllowedUser = (index) => {
    const updatedAllowedUsers = [...quiz.allowedUser];
    updatedAllowedUsers.splice(index, 1); // Remove user ID at specified index
    setQuiz({ ...quiz, allowedUser: updatedAllowedUsers });
  };

  const handleUpdateQuiz = async () => {
    const payload = {
      _id: quizId,
      name: quiz.name || '',
      category: quiz.category || '',
      difficultyLevel: quiz.difficultyLevel || 'easy',
      questionList: quiz.questionList,
      answers: quiz.answers,
      passingPercentage: quiz.passingPercentage ?? 0,
      isPublicQuiz: quiz.isPublicQuiz ?? false,
      allowedUser: quiz.allowedUser || [],
      attemptsAllowedPerUser: quiz.attemptsAllowedPerUser ?? 0,
    };

    try {
      const response = await axios.put(
        `http://localhost:3002/quiz`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      );

      if (response.status === 200) {
        toast.success('Quiz updated successfully!');
        navigate('/auth/quiz/myquiz');
      } else {
        toast.error('Failed to update quiz. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating quiz');
    }
  };

  return (
    <div>
      <Navbar />
      <div className='edit-container'>
        <ToastContainer />
        <h1>Edit Quiz</h1>
        <form className='edit-form'>
          <div className='edit-group'>
            <label>Quiz Name:</label>
            <input
              type="text"
              name="name"
              value={quiz.name || ''} // Fallback to an empty string
              onChange={handleInputChange}
            />
          </div>
          <div className='edit-group'>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={quiz.category || ''} // Fallback to an empty string
              onChange={handleInputChange}
            />
          </div>
          <div className='edit-group'>
            <label>Difficulty Level:</label>
            <select
              name="difficultyLevel"
              value={quiz.difficultyLevel || 'easy'} // Fallback to 'easy'
              onChange={handleInputChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className='edit-group'>
            <label>Passing Percentage:</label>
            <input
              type="number"
              name="passingPercentage"
              value={quiz.passingPercentage ?? 0} // Fallback to 0
              onChange={handleInputChange}
            />
          </div>
          <div className='edit-group'>
            <label>Attempts Allowed Per User:</label>
            <input
              type="number"
              name="attemptsAllowedPerUser"
              value={quiz.attemptsAllowedPerUser ?? 0} // Fallback to 0
              onChange={handleInputChange}
            />
          </div>
          <div className='edit-group'>
            <label>
              <input
                type="checkbox"
                name="isPublicQuiz"
                checked={quiz.isPublicQuiz || false} // Fallback to false
                onChange={(e) => setQuiz({ ...quiz, isPublicQuiz: e.target.checked })}
              />
              Is Public Quiz
            </label>
          </div>
          {/* Allowed Users */}
          <div className='edit-group'>
            <label>Allowed Users (IDs):</label>
            <input
              type="text"
              value={newAllowedUser}
              onChange={(e) => setNewAllowedUser(e.target.value)}
            />
            <button type="button" onClick={handleAddAllowedUser}>Add User</button>
            <ul>
              {quiz.allowedUser.map((userId, index) => (
                <li key={index}>
                  {userId}
                  <button type="button" onClick={() => handleRemoveAllowedUser(index)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>


          <div className="question-section edit-group">
            <h2>Questions</h2>
            {quiz.questionList.map((question, index) => (
              <div className="question" key={index}>
                <label>Question Number:</label>
                <input type="text" name="questionNumber" value={question.questionNumber || ''} readOnly />

                <label>Question:</label>
                <input
                  type="text"
                  name="question"
                  value={question.question || ''} // Fallback to an empty string
                  onChange={(e) => handleQuestionChange(index, e)}
                />

                <div className='edit-group'>
                  {Object.keys(question.options).map((optionKey) => (
                    <div key={optionKey}>
                      <label>Option {optionKey}:</label>
                      <input
                        type="text"
                        name="option"
                        value={question.options[optionKey] || ''} // Fallback to an empty string
                        onChange={(e) => handleOptionChange(index, optionKey, e)}
                      />
                    </div>
                  ))}
                </div>

                <label>Correct Answer:</label>
                <input
                  type="number"
                  name="answer"
                  value={quiz.answers[question.questionNumber] || ''} // Fallback to an empty string
                  onChange={(e) => handleAnswerChange(question.questionNumber, e)}
                />
              </div>
            ))}
          </div>
          <button type="button" onClick={handleUpdateQuiz}>Update Quiz</button>
        </form>
      </div>
    </div>
  );
};

export default EditQuiz;
