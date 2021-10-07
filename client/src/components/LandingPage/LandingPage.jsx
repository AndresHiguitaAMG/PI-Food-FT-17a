import React from 'react';
import { NavLink } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="Container">
            <NavLink to="/home" > <img className="logo" src="https://cdn.imusa.com.co/resources/2017/11/vector-utensilios.png" alt="to home"/> 
            <h1>Welcome</h1>
            </NavLink>
        </div>
    )
}

export default LandingPage;