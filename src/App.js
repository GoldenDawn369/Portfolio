// App.js
import React, { useState, useEffect } from 'react';
import AstronautCanvas from './components/Cooler_astronaut_glb';
import Header from './components/Header';
import Navbar from './components/Navbar';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import './App.css';
import Contact from './components/Contact'; // Import the Contact component

function App() {
    const [modelLoaded, setModelLoaded] = useState(false);
    const [animationsComplete, setAnimationsComplete] = useState(false);
    const [showParagraph, setShowParagraph] = useState(false);
    const [showNavbar, setShowNavbar] = useState(false);

    // Show the astronaut only after the model is loaded and animations are complete
    useEffect(() => {
        if (modelLoaded && animationsComplete) {
            // Delay showing paragraph and navbar after astronaut appears
            setTimeout(() => {
                setShowParagraph(true);
            }, 500);

            setTimeout(() => {
                setShowNavbar(true);
            }, 1500);
        }
    }, [modelLoaded, animationsComplete]);

    // Callback when the astronaut model is fully loaded
    const handleModelLoaded = () => {
        setModelLoaded(true);
    };

    // Callback when all animations are complete
    const handleAnimationsComplete = () => {
        setAnimationsComplete(true);
    };

    return (
        <ParallaxProvider>
            <div className="App">
                {/* Navbar appears after all animations */}
                {showNavbar && <Navbar />}

                {/* Content Container */}
                <div className="content-container">
                    {/* Background Image */}
                    <img src="/gang-extended.png" alt="Background" className="background-image" />

                    {/* Overlay Content */}
                    <div className="overlay-content">
                        {/* Hero Section */}
                        <section id="hero" className="section hero-section">
                            <Header onAnimationsComplete={handleAnimationsComplete} />

                            {showParagraph && (
                                <p className="paragraph streaky-glow font-bold text-white">
                                    {'Besides space problems, I enjoy solving earthly ones too.'
                                        .split(' ')
                                        .map((word, wordIndex) => (
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
                                        ))}
                                </p>
                            )}

                            <AstronautCanvas
                                showAstronaut={modelLoaded && animationsComplete}
                                onModelLoaded={handleModelLoaded}
                            />
                        </section>

                        {/* Tech Stack Section */}
                        <section id="tech-stack" className="section">
                            <Parallax translateY={[0, -40]}>
                                <TechStack />
                            </Parallax>
                        </section>

                        {/* Experience Section */}
                        <section id="experience" className="section">
                            <Parallax translateY={[0, 0]}>
                                <Experience />
                            </Parallax>
                        </section>

                        {/* Portfolio Section */}
                        <section id="portfolio" className="section">
                            <Parallax translateY={[0, 0]}>
                                <Portfolio />
                            </Parallax>
                        </section>

                        {/* Contact Section */}
                        <section id="contact" className="section">
                            <Parallax translateY={[0, 0]}>
                                <Contact />
                            </Parallax>
                        </section>
                    </div>
                </div>
            </div>
        </ParallaxProvider>
    );
}

export default App;
