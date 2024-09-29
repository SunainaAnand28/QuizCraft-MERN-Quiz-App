import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import styles from '../styles/CreateQuiz.module.css';

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState({
    name: '',
    category: '',
    difficultyLevel: '',
    questionList: [{ questionNumber: 1, question: '', options: {} }],
    answers: {},
    passingPercentage: 0,
    attemptsAllowedPerUser: 0,
    isPublicQuiz: false,
    allowedUser: [] // Added to hold allowed users
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuiz(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    }));
  };

  const handleAllowedUserChange = (e) => {
    const { value } = e.target;
    setQuiz(prevState => ({
      ...prevState,
      allowedUser: value.split(',').map(user => user.trim())
    }));
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quiz.questionList];
    updatedQuestions[index] = { ...updatedQuestions[index], [name]: value };
    setQuiz(prevState => ({ ...prevState, questionList: updatedQuestions }));
  };

  const handleOptionChange = (questionIndex, optionKey, e) => {
    const { value } = e.target;
    const updatedQuestions = [...quiz.questionList];
    const updatedOptions = { ...updatedQuestions[questionIndex].options };
    updatedOptions[optionKey] = value;
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], options: updatedOptions };
    setQuiz(prevState => ({ ...prevState, questionList: updatedQuestions }));
  };

  const handleAnswerChange = (questionNumber, e) => {
    const { value } = e.target;
    setQuiz(prevState => ({
      ...prevState,
      answers: {
        ...prevState.answers,
        [questionNumber]: Number(value)
      }
    }));
  };

  const addQuestion = () => {
    setQuiz(prevState => ({
      ...prevState,
      questionList: [
        ...prevState.questionList,
        { questionNumber: prevState.questionList.length + 1, question: '', options: {} }
      ]
    }));
  };

  const removeQuestion = (index) => {
    setQuiz(prevState => ({
      ...prevState,
      questionList: prevState.questionList.filter((_, i) => i !== index)
    }));
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...quiz.questionList];
    const currentOptionCount = Object.keys(updatedQuestions[questionIndex].options).length;
    const newOptionKey = (currentOptionCount + 1).toString();
    updatedQuestions[questionIndex].options[newOptionKey] = '';
    setQuiz(prevState => ({ ...prevState, questionList: updatedQuestions }));
  };

  const removeOption = (questionIndex, optionKey) => {
    const updatedQuestions = [...quiz.questionList];
    const { [optionKey]: _, ...remainingOptions } = updatedQuestions[questionIndex].options;
    updatedQuestions[questionIndex].options = remainingOptions;
    setQuiz(prevState => ({ ...prevState, questionList: updatedQuestions }));
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('No authentication token found');
      return;
    }

    const { questionList, answers, ...restOfQuiz } = quiz;

    if (questionList.length === 0) {
      toast.error('Please add at least one question.');
      return;
    }

    try {
      const requestBody = {
        ...restOfQuiz,
        questionList: questionList.map((q) => ({
          questionNumber: q.questionNumber,
          question: q.question,
          options: q.options
        })),
        answers
      };

      const response = await axios.post(
        '${process.env.REACT_APP_BACKEND_URL}/quiz',
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      toast.success(response.data.message);
      navigate('/dashboard');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error creating quiz';
      toast.error(errorMsg);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.createQuizForm}>
        <h1>Create Quiz</h1>
        <form className={styles.quizForm} onSubmit={handleCreateQuiz}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder='Enter the Quiz Name Atleast 10 Characters Long'
            value={quiz.name}
            onChange={handleChange}
          />

          <label>Category:</label>
          <select name="category" value={quiz.category} onChange={handleChange}>
            <option value="test">Test</option>
            <option value="exam">Exam</option>
          </select>

          <label>Difficulty Level:</label>
          <select name="difficultyLevel" value={quiz.difficultyLevel} onChange={handleChange}>
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <label>Passing Percentage:</label>
          <input
            type="number"
            name="passingPercentage"
            value={quiz.passingPercentage}
            onChange={handleChange}
          />

          <label>Attempts Allowed Per User:</label>
          <input
            type="number"
            name="attemptsAllowedPerUser"
            value={quiz.attemptsAllowedPerUser}
            onChange={handleChange}
          />

          <label>Is Public Quiz:</label>
          <input
            type="checkbox"
            name="isPublicQuiz"
            checked={quiz.isPublicQuiz}
            onChange={handleChange}
          />

          {!quiz.isPublicQuiz && (
            <>
              <label>Allowed Users (comma separated):</label>
              <input
                type="text"
                name="allowedUser"
                value={quiz.allowedUser.join(', ')}
                onChange={handleAllowedUserChange}
                placeholder="Enter allowed user id"
              />
            </>
          )}

          {quiz.questionList.map((question, index) => (
            <div key={index} className={styles.questionSection}>
              <label>Question {index + 1}:</label>
              <input
                type="text"
                name="question"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, e)}
              />

              <label>Options:</label>
              {Object.keys(question.options).map((optionKey) => (
                <div key={optionKey} className={styles.optionInput}>
                  <input
                    type="text"
                    value={question.options[optionKey]}
                    onChange={(e) => handleOptionChange(index, optionKey, e)}
                    placeholder={`Option ${optionKey}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeOption(index, optionKey)}
                    className={styles.removeOptionButton}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button type="button" onClick={() => addOption(index)}>
                Add Option
              </button>

              <label>Correct Answer:</label>
              <input
                type="number"
                value={quiz.answers[question.questionNumber] || ''}
                onChange={(e) => handleAnswerChange(question.questionNumber, e)}
                placeholder="Enter correct option number"
                className={styles.correctAnswerInput}
              />

              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className={styles.removeQuestionButton}
              >
                Remove Question
              </button>
            </div>
          ))}

          <button type="button" onClick={addQuestion}>
            Add Question
          </button>

          <button type="submit">
            Create Quiz
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateQuiz;
