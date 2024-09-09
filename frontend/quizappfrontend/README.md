# Quiz Application - Frontend

## Overview

This is the frontend part of a quiz application where users can create, manage, and attempt quizzes. The application is built using React and communicates with a Node.js/Express backend. The frontend handles user authentication, quiz management (create, edit, delete, publish), and quiz-taking functionalities.

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Quiz Management**: Create, edit, delete, and publish quizzes.
- **Quiz Taking**: Users can attempt published quizzes.
- **Account Management**: Users can update their profile and deactivate their account.
- **Responsive Design**: The application is responsive and works across various devices.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **React Router**: Declarative routing for React applications.
- **CSS**: Styling for components.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine.
- **npm or yarn**: Package manager to install dependencies.

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/SunainaAnand28/Quiz-App-REST-API-TS-Mongoose
    cd Quiz-App-REST-API-TS-Mongoose
    cd fronend
    cd quizappfronend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3. **Configure environment variables**:  
   Create a `.env` file in the root of the project and add your environment-specific variables. Example:

    ```plaintext
    REACT_APP_API_URL=http://localhost:3002
    ```

4. **Run the application**:

    ```bash
    npm start
    ```
    or
    ```bash
    yarn start
    ```

   This will start the development server and open the application in your default browser at `http://localhost:3000`.

### Deployment

To build the application for production, run:

```bash
npm run build
```
 or
```bash  
yarn build
```

The production-ready files will be in the build directory, which can be deployed to any static site hosting service.
## Usage

### Authentication

- Login: Users can log in using their credentials. The JWT token is stored in localStorage.
- Register: New users can sign up for an account.
- Protected Routes: Routes like quiz creation and management are protected and require authentication.
- Quiz Management
- Create Quiz: Users can create quizzes with various questions and options.
- Edit Quiz: Users can edit their unpublished quizzes.
- Delete Quiz: Users can delete their quizzes.
- Publish Quiz: Users can publish quizzes, making them available for others to attempt.
### Taking Quizzes
- Available Quizzes: Users can view and attempt published quizzes.
- Results: Users can view their quiz results immediately after completing a quiz.
### Known Issues
- Publish Quiz Button: Ensure the API endpoint is correctly configured in the handlePublishQuiz function in MyQuizzes.jsx.
Contributing.
- Feel free to contribute to the project by opening a pull request or reporting issues.

### License
This project is licensed under the MIT License.

### Authors
Sunaina Anand

### Connect with Me

For further inquiries, you can reach me on:

- [LinkedIn](https://www.linkedin.com/in/sunainaanand28)
- [Twitter](https://twitter.com/_GeekyGlam)
- [Leetcode](https://leetcode.com/u/_GeekyGlam/)

### Contact

<p>If you have any questions or need further assistance, feel free to contact me:</p>

<p>
    <strong>Sunaina Anand</strong> - Intern at TriWebAPI<br>
    Email: <a href="mailto:sunainaanand28@gmail.com">sunainaanand28@gmail.com</a>
</p>