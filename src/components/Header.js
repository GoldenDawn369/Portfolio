// components/Header.js
import React, { useEffect, useState } from 'react';
import '../styles/Header.css';

export default function Header({ onAnimationsComplete }) {
    const [showTitle, setShowTitle] = useState(false);
    const [caretRemoved, setCaretRemoved] = useState(false);

    useEffect(() => {
        // Delay showing the title to match the animation timing
        const timer = setTimeout(() => {
            setShowTitle(true);
        }, 700); // Adjust to match your first animation duration

        return () => clearTimeout(timer);
    }, []);

    // Handle the end of the typing animation ("Fullstack Engineer")
    const handleTitleAnimationEnd = (event) => {
        if (event.animationName === 'typing') {
            setCaretRemoved(true); // Update state to remove caret
            if (onAnimationsComplete) onAnimationsComplete();
        }
    };

    return (
        <header className="header">
            <div className="text-container">
                <h1 className="name">Robertas Buila</h1>
                {showTitle && (
                    <p
                        className={`title ${caretRemoved ? 'no-caret' : ''}`}
                        onAnimationEnd={handleTitleAnimationEnd}
                    >
                        Fullstack Engineer
                    </p>
                )}
            </div>
        </header>
    );
}
