import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';


const Home = () => {
    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        <>
        <div id='container'>
        <h1 id='va'>Welcome to Home page</h1>
        <button onClick={handleSignupClick} className='button'>Click On This</button>
        </div>
       
        
        
        </>
    );
};

export default Home;







