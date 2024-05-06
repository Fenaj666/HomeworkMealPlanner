import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ComponentsCSS/Menu.css';

const Menu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="menu">
            <div className="menu-icon" onClick={toggleMenu}>
                <div className={isMenuOpen ? 'line line1 open' : 'line line1'}></div>
                <div className={isMenuOpen ? 'line line2 open' : 'line line2'}></div>
                <div className={isMenuOpen ? 'line line3 open' : 'line line3'}></div>
            </div>
            <div className={isMenuOpen ? 'menu-links open' : 'menu-links'}>
                <Link to="/my-recipes">My Recipes</Link>
                <Link to="/add-recipe">Add Recipe</Link>
                <Link to="/schedule">Schedule</Link>
                <Link to="/plan">Plan</Link>
            </div>
        </div>
    );
}

export default Menu;

