import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import Navbar from './Navbar';
import '../styles/MyQuizzes.css';

const MyQuizzes = () => {
    const [myQuizzes, setMyQuizzes] = useState([]);
   
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:3002/quiz', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                setMyQuizzes(response.data.data);
            } catch (error) {
                toast.error('Error fetching your quizzes');
            }
        };

        fetchMyQuizzes();
    }, []);

    const handleDeleteQuiz = async (quizId) => {
        try {
            const response = await axios.delete(`http://localhost:3002/quiz/${quizId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            toast.success(response.data.message);
            setMyQuizzes(myQuizzes.filter(quiz => quiz._id !== quizId));
        } catch (error) {
            toast.error('Error deleting the quiz');
        }
    };

    const handlePublishQuiz = async (quizId) => {
        try {
            const response = await axios.patch(
                'http://localhost:3002/quiz/publish',
                { quizId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                }
            );
            toast.success(response.data.message);
            setMyQuizzes(myQuizzes.map(quiz =>
                quiz._id === quizId ? { ...quiz, isPublished: true } : quiz
            ));
        } catch (error) {
            toast.error('Error publishing the quiz');
        }
    };

    const handleEditQuiz = (quizId) => {
        navigate(`/editquiz/${quizId}`);
    };

    return (
        <div>
            <Navbar />
            <div className="my-quiz">
                <h2>My Quizzes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myQuizzes.map((quiz) => (
                            <tr key={quiz._id}>
                                <td>{quiz.name}</td>
                                <td>{quiz.category}</td>
                                <td>
                                    <div className="button-group">
                                        {!quiz.isPublished ? (
                                            <>
                                                <button className="editbutton" onClick={() => handleEditQuiz(quiz._id)}>Edit</button>
                                                <button className="deletebutton" onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
                                                <button className="publishbutton" onClick={() => handlePublishQuiz(quiz._id)}>Publish</button>
                                            </>
                                        ) : (
                                            <>
                                                <span>(Published)</span>
                                                <button className="editbutton published" disabled>Edit</button>
                                                <button className="deletebutton published" disabled>Delete</button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MyQuizzes;
