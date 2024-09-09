
import { useNavigate } from "react-router-dom";

import "../styles/Home.css"
function Home(){
  const navigate = useNavigate();

   return (
      <div className="home">
      
        <h1>Welcome to the Quiz App</h1>
        <p>Hello there! Ready to test your knowledge and have some fun? Register or log in to get started!</p>
        <div className="greeting">Let's get started!</div>
        <button
        className="registerButton homeButton" 
        onClick={ ()=> navigate("/auth")} >Register</button>
        
        <button 
        className="loginButton homeButton"
        onClick={ ()=> navigate("/auth/login")} >Login</button>
      
    </div>
   )
}

export default Home;