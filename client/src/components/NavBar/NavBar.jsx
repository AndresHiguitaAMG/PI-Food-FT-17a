import React from 'react'
import { NavLink } from 'react-router-dom';
import Search from '../Searc/Search';
import './NavBar.css'

const NavBar = () => {
    return (
        <div className="NavBarContainer">
            <NavLink to="/home">
                Home
            </NavLink>
            
            <Search />

            <NavLink to="/home">
            Create Recipe                
            </NavLink>
        </div>
    );
}
 
export default NavBar;