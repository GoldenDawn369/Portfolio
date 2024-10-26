// Navbar.js
import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
    const [selectedItem, setSelectedItem] = useState('Hero');
    const [animateClass, setAnimateClass] = useState('');

    useEffect(() => {
        // Trigger the animation when the component mounts
        setTimeout(() => {
            setAnimateClass('navbar-animate');
        }, 0);
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem(item);

        // Scroll to the corresponding section
        const sectionId = item.toLowerCase().replace(/\s+/g, '-'); // Convert to id format
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`navbar ${animateClass}`}>
            {['Hero', 'Tech Stack', 'Experience', 'Contact'].map((item) => (
                <div
                    key={item}
                    className={`nav-item ${selectedItem === item ? 'selected' : ''}`}
                    onClick={() => handleItemClick(item)}
                >
                    {item}
                </div>
            ))}
        </nav>
    );
};

export default Navbar;
