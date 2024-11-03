// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ showContent, viewportConfig }) => {
    const [selectedItem, setSelectedItem] = useState('Hero');
    const [animateClass, setAnimateClass] = useState('');

    useEffect(() => {
        if (!showContent) return; // Wait until content is rendered

        // Trigger the animation when the component mounts
        setTimeout(() => {
            setAnimateClass('navbar-animate');
        }, 0);

        // Section IDs and corresponding labels
        const sections = [
            { id: 'hero', label: 'Hero' },
            { id: 'tech-stack', label: 'Tech Stack' },
            { id: 'experience', label: 'Experience' },
            { id: 'portfolio', label: 'Portfolio' },
            { id: 'contact', label: 'Contact' },
        ];

        // Options for the observer
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: viewportConfig.thresholds.intersectionObserverThreshold || 0.6, // Use threshold from config
        };

        // Callback function for the observer
        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const section = sections.find((sec) => sec.id === sectionId);
                    if (section) {
                        setSelectedItem(section.label);
                    }
                }
            });
        };

        // Create the observer
        const observer = new IntersectionObserver(callback, options);

        // Observe each section
        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
        });

        // Cleanup function
        return () => {
            observer.disconnect();
        };
    }, [showContent, viewportConfig]);

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
