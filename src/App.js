// App.js
import React, { useState, useEffect } from 'react';
import AstronautCanvas from './components/Cooler_astronaut_glb';
import Header from './components/Header';
import Navbar from './components/Navbar';
import TechStack from './components/TechStack';
import './App.css';

function App() {
    const [modelLoaded, setModelLoaded] = useState(false);
    const [secondAnimationComplete, setSecondAnimationComplete] = useState(false);
    const [showAstronaut, setShowAstronaut] = useState(false);
    const [showParagraph, setShowParagraph] = useState(false);
    const [showNavbar, setShowNavbar] = useState(false);

    // Show the astronaut only after the model is loaded and the second animation is complete
    useEffect(() => {
        if (modelLoaded && secondAnimationComplete) {
            setTimeout(() => {
                setShowAstronaut(true);
            }, 0); // Show the astronaut immediately after both conditions are met
        }
    }, [modelLoaded, secondAnimationComplete]);

    // Callback when the astronaut model is fully loaded
    const handleModelLoaded = () => {
        setModelLoaded(true);
    };

    // Callback when the second typing animation ("Software Developer") completes
    const handleSecondTypingComplete = () => {
        setSecondAnimationComplete(true);
    };

    // Callback when the typing animation completes
    const handleTypingComplete = () => {
        // Show the paragraph after typing is done
        setTimeout(() => {
            setShowParagraph(true);
        }, 18); // 18ms delay

        // Delay showing the Navbar for a smooth transition after paragraph animation
        setTimeout(() => {
            setShowNavbar(true);
        }, 2018); // Adjust delay to match paragraph animation plus the 18ms delay
    };

    return (
        <div className="App">
            {/* Navbar appears after all animations */}
            {showNavbar && <Navbar />}

            {/* Hero Section */}
            <section id="hero" className="section hero-section">
                {/* Header appears immediately */}
                <Header
                    onSecondTypingComplete={handleSecondTypingComplete}
                    onTypingComplete={handleTypingComplete}
                />

                {/* Paragraph appears after typing animation */}
                {showParagraph && (
                    <p className="paragraph streaky-glow font-bold text-white">
                        {'Besides space problems, I enjoy solving earthly ones too.'.split(' ').map(
                            (word, wordIndex) => (
                                <span key={wordIndex} className="word">
                                    {Array.from(word).map((char, charIndex) => (
                                        <span
                                            key={charIndex}
                                            style={{ '--char-index': wordIndex * 10 + charIndex }}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                    <span>&nbsp;</span>
                                </span>
                            )
                        )}
                    </p>
                )}

                {/* Render the AstronautCanvas but control its visibility */}
                <AstronautCanvas
                    showAstronaut={showAstronaut}
                    onModelLoaded={handleModelLoaded}
                />
            </section>

            {/* Tech Stack Section */}

            {/* Future sections like Experience, Contact can be added similarly */}
        </div>
    );
}

export default App;
