import React from 'react'
import { NavLink } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
    return (
        <div className="NavBarContainer">
            <NavLink to="/home">
                Home
            </NavLink>
            
            <NavLink to="/home/create">
            Create Recipe                
            </NavLink>
        </div>
    );
}
 
export default NavBar;