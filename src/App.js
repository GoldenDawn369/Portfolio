// App.js
import React, { useState, useEffect } from 'react';
import AstronautCanvas from './components/Cooler_astronaut_glb';
import Header from './components/Header';
import Navbar from './components/Navbar';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
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
            setShowAstronaut(true); // Show the astronaut immediately

            // Add a 50 ms delay after showing the astronaut
            const delay = setTimeout(() => {
                // Do nothing here; the delay is simply added after the astronaut appears
            }, 50);

            // Cleanup the timeout
            return () => clearTimeout(delay);
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
        setTimeout(() => {
            setShowParagraph(true);
        }, 18);

        setTimeout(() => {
            setShowNavbar(true);
        }, 2018);
    };

    return (
<ParallaxProvider>
        <div className="App">
            {/* Navbar appears after all animations */}
            {showNavbar && <Navbar />}

            {/* Content Container */}
            <div className="content-container">
                {/* Background Image */}
                <img src="/gang.png" alt="Background" className="background-image" />

                {/* Overlay Content */}
                <div className="overlay-content">
                    {/* Hero Section */}
                    <Parallax y={[0, 200]}>
                        <section id="hero" className="section hero-section">
                            <Header
                                onSecondTypingComplete={handleSecondTypingComplete}
                                onTypingComplete={handleTypingComplete}
                            />

                            {showParagraph && (
                                <p className="paragraph streaky-glow font-bold text-white">
                                    {'Besides space problems, I enjoy solving earthly ones too.'.split(' ').map(
                                        (word, wordIndex) => (
                                            <span key={wordIndex} className="word">
                                            {Array.from(word).map((char, charIndex) => (
                                                <span
                                                    key={charIndex}
                                                    style={{'--char-index': wordIndex * 10 + charIndex}}
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

                            <AstronautCanvas
                                showAstronaut={showAstronaut}
                                onModelLoaded={handleModelLoaded}
                            />
                        </section>
                    </Parallax>
                    {/* Tech Stack Section */}
                    <Parallax y={[0, -300]}>
                        <TechStack/>
                    </Parallax>
                    <div id="experience">
                        <Experience/>
                    </div>
                </div>
            </div>
        </div>
</ParallaxProvider>
    );
}

export default App;
