// App.js
import React, { useState, useEffect, useRef } from 'react';
// If you need to support browsers that don't have ResizeObserver natively, uncomment the next line
// import ResizeObserver from 'resize-observer-polyfill';
import { useViewportConfig } from './hooks/useViewportConfig';
import AstronautCanvas from './components/Cooler_astronaut_glb';
import Header from './components/Header';
import Navbar from './components/Navbar';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import './App.css';
import Contact from './components/Contact';

function App() {
    const [modelLoaded, setModelLoaded] = useState(false);
    const [animationsComplete, setAnimationsComplete] = useState(false);
    const [showParagraph, setShowParagraph] = useState(false);
    const [showNavbar, setShowNavbar] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [allowScroll, setAllowScroll] = useState(false);
    const contentContainerRef = useRef(null);
    const [bgHeight, setBgHeight] = useState('100vh');

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

            // Delay showing content after navbar appears
            setTimeout(() => {
                setShowContent(true);
                setAllowScroll(true); // Allow scrolling when content is shown
            }, 2000); // Adjust the delay as needed
        }
    }, [modelLoaded, animationsComplete]);

    // Update body class to control scrolling
    useEffect(() => {
        if (allowScroll) {
            document.body.classList.remove('no-scroll');
        } else {
            document.body.classList.add('no-scroll');
        }
    }, [allowScroll]);

    // Update background image height whenever content size changes using ResizeObserver
    useEffect(() => {
        const updateBgHeight = () => {
            if (contentContainerRef.current) {
                setBgHeight(`${contentContainerRef.current.offsetHeight + 42}px`); // Add extra 100px
            }
        };

        let resizeObserver = null;

        if (contentContainerRef.current) {
            resizeObserver = new ResizeObserver(() => {
                updateBgHeight();
            });

            resizeObserver.observe(contentContainerRef.current);
        }

        // Initial height calculation
        updateBgHeight();

        // Clean up the observer on unmount
        return () => {
            if (resizeObserver && contentContainerRef.current) {
                resizeObserver.unobserve(contentContainerRef.current);
            }
        };
    }, [contentContainerRef, showContent]);

    // Callback when the astronaut model is fully loaded
    const handleModelLoaded = () => {
        setModelLoaded(true);
    };

    // Callback when all animations are complete
    const handleAnimationsComplete = () => {
        setAnimationsComplete(true);
    };

    const viewportConfig = useViewportConfig();

    return (
        <ParallaxProvider>
            <div className="App">
                {/* Pass showContent and viewportConfig to Navbar */}
                {showNavbar && <Navbar showContent={showContent} viewportConfig={viewportConfig} />}

                {/* Content Container */}
                <div className="content-container" ref={contentContainerRef}>
                    {/* Background Image */}
                    <img
                        src="/gang-extended.png"
                        alt="Background"
                        className="background-image"
                        style={{
                            height: bgHeight,
                        }}
                    />

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
                                style={{
                                    '--char-index': wordIndex * 10 + charIndex,
                                }}
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
                                scale={viewportConfig.scales.astronautScale || 1}
                            />
                        </section>

                        {/* Conditionally Render Content */}
                        {showContent && (
                            <>
                                {/* Tech Stack Section */}
                                <section id="tech-stack" className="section">
                                    <Parallax translateY={viewportConfig.parallax.techStackTranslateY || [0, -40]}>
                                        <TechStack />
                                    </Parallax>
                                </section>

                                {/* Experience Section */}
                                <section id="experience" className="section">
                                    <Parallax translateY={viewportConfig.parallax.experienceTranslateY || [0, 0]}>
                                        <Experience />
                                    </Parallax>
                                </section>

                                {/* Portfolio Section */}
                                <section id="portfolio" className="section">
                                    <Parallax translateY={viewportConfig.parallax.portfolioTranslateY || [0, 0]}>
                                        <Portfolio />
                                    </Parallax>
                                </section>

                                {/* Contact Section */}
                                <section id="contact" className="section">
                                    <Parallax translateY={viewportConfig.parallax.contactTranslateY || [0, 0]}>
                                        <Contact />
                                    </Parallax>
                                </section>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </ParallaxProvider>
    );
}

export default App;