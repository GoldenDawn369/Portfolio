// src/components/Navbar.js
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

        // Section IDs
        const sections = ['hero', 'tech-stack', 'experience', 'portfolio', 'contact'];

        // Options for the observer
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.6, // Adjust this threshold as needed
        };

        // Callback function for the observer
        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const formattedSection = sectionId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                    setSelectedItem(formattedSection);
                }
            });
        };

        // Create the observer
        const observer = new IntersectionObserver(callback, options);

        // Observe each section
        sections.forEach((sectionId) => {
            const section = document.getElementById(sectionId);
            if (section) {
                observer.observe(section);
            }
        });

        // Cleanup function
        return () => {
            observer.disconnect();
        };
    }, []);

    const handleItemClick = (item) => {
        // Scroll to the corresponding section
        const sectionId = item.toLowerCase().replace(/\s+/g, '-');
        const section = document.getElementById(sectionId);

        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`navbar ${animateClass}`}>
            {['Hero', 'Tech Stack', 'Experience', 'Portfolio', 'Contact'].map((item) => (
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
