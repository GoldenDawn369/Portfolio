// components/Header.js
import React, { useEffect, useState } from 'react';
import '../styles/Header.css';

export default function Header({ onSecondTypingComplete, onTypingComplete }) {
    const [showTitle, setShowTitle] = useState(false);

    useEffect(() => {
        // Delay showing the title to match the animation timing
        const timer = setTimeout(() => {
            setShowTitle(true);
        }, 700); // Adjust to match your first animation duration

        return () => clearTimeout(timer);
    }, []);

    // Handle the end of the first slide-in animation ("Robertas Buila")
    const handleNameAnimationEnd = (event) => {
        if (event.animationName === 'slideIn') {
            event.target.classList.add('no-caret');
            // We don't need to trigger any callback here since we want to avoid astronaut appearing after this
        }
    };

    // Handle the end of the typing animation ("Software Developer")
    const handleTitleAnimationEnd = (event) => {
        if (event.animationName === 'typing') {
            event.target.classList.add('no-caret');
            if (onSecondTypingComplete) onSecondTypingComplete();
            // Delay before starting the next animation (18ms after astronaut appears)
            setTimeout(() => {
                if (onTypingComplete) onTypingComplete();
            }, 18); // 18ms delay after the astronaut appears
        }
    };

    return (
        <header className="header">
            <div className="text-container">
                <h1 className="name" onAnimationEnd={handleNameAnimationEnd}>Robertas Buila</h1>
                {showTitle && (
                    <p className="title" onAnimationEnd={handleTitleAnimationEnd}>
                        Software Developer
                    </p>
                )}
            </div>
        </header>
    );
}
