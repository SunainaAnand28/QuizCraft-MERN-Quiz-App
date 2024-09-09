// src/App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AttemptQuiz from './pages/AttemptQuizzes';
import MyProfile from './pages/MyProfile';

import Register from './components/Register';
import VerifyOTP from './components/VerifyRegistrationOTP';
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import CreateQuiz from './components/CreateQuiz';
import EditQuiz from './components/EditQuiz';
import MyQuiz from './components/MyQuizzes';
import Exam from './components/Exam';
import Test from './components/Test';
import ReportDetail from './components/ReportDetail';
import FavoriteQuestions from './components/FavoriteQuestion';
import AllReport from './components/AllReport';
import PrivateRoute from './components/PrivateRoute';
import SendDeactivateOTP from './components/SendDeactivationOTP';
import VerifyDeactivateOTP from './components/VerifyDeactivationOTP'; 

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/auth',
      element: <Register />,
    },
    {
      path: '/auth/login',
      element: <Login />,
    },
    {
      path: '/auth/forgot-password',
      element: <ForgetPassword />,
    },
    {
      path: '/auth/resetpassword/',
      element: <ResetPassword/>,
    },
    {
      path: '/auth/verify-otp/:token',
      element: <VerifyOTP />,
    },
    {
      path: '/dashboard',
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
    },
    {
      path: '/auth/quiz/myquiz',
      element: (
        <PrivateRoute>
          <MyQuiz/>
        </PrivateRoute>
      ),
    },

    {
      path: '/quiz',
      element:( <PrivateRoute>
        <CreateQuiz />
      </PrivateRoute>)
    },
    {
      path: '/editquiz/:quizId',
      element: (
        
          <EditQuiz />

      ),
    },
    {
      path: '/attempt-quizzes',
      element: (
        <PrivateRoute>
          <AttemptQuiz />
        </PrivateRoute>
      ),
    },

    {
      path: '/exam',
      element: (
        <PrivateRoute>
          <Exam />
        </PrivateRoute>
      ),
    },
    {
      path: '/test',
      element: (
        <PrivateRoute>
          <Test />
        </PrivateRoute>
      ),
    },
    {
      path: '/fav-questions',
      element: (
        <PrivateRoute>
          <FavoriteQuestions />
        </PrivateRoute>
      ),
    },
    {
      path: '/all-report',
      element: (
        <PrivateRoute>
          <AllReport />
        </PrivateRoute>
      ),
    },
    {
      path: '/report/:reportId',
      element: (
        <PrivateRoute>
          <ReportDetail />
        </PrivateRoute>
      ),
    },
    {
      path: '/my-profile',
      element: (
        <PrivateRoute>
          <MyProfile />
        </PrivateRoute>
      ),
    },
    {
      path: '/deactivate',   
      element: (
        <PrivateRoute>
          <SendDeactivateOTP />
        </PrivateRoute>
      ),
    },
    {
      path: '/deactivate/verify',  
      element: (
        <PrivateRoute>
          <VerifyDeactivateOTP />
        </PrivateRoute>
      ),
    },
    {
      path: '*',
      element: <div>Page not found</div>,
    },
  ]);
  

  return <RouterProvider router={router} />;
  
}

export default App;
