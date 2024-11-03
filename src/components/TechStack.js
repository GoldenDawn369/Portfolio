// components/TechStack.js
import React from 'react';
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/Techstack.css';

const TechStack = () => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ threshold: 0.2 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: {opacity: 0, y: 50},
                visible: {opacity: 1, y: 0, transition: {duration: 0.99, ease: 'easeOut'}},
            }}
            className="tech-stack"
            id="tech-stack"
        >
            <h2>Tech Stack</h2>

            <div className="category">
                <h3>Programming Languages</h3>
                <div className="image-container">
                    {[
                        '/technologies/javascript.png',
                        '/technologies/python.jpg',
                        '/technologies/go.png',
                        '/technologies/c++.png',
                        '/technologies/typescript.png',
                        '/technologies/R.png',
                        '/technologies/matlab.png',
                    ].map((imgSrc, index) => (
                        <div key={index} className="circle">
                            <img src={imgSrc} alt={`Programming Language ${index}`}/>
                        </div>
                    ))}
                </div>
            </div>

            <div className="category">
                <h3>Frameworks & Libraries</h3>
                <div className="image-container">
                    {[
                        '/technologies/playwright.svg',
                        '/technologies/selenium.png',
                        '/technologies/puppeteer.svg',
                        '/technologies/react.jpg',
                        '/technologies/next.jpg',
                        '/technologies/bootstrap.png',
                        '/technologies/tailwind.png',
                        '/technologies/pytorch.png',
                        '/technologies/tensorflow.png',
                        '/technologies/numpy.png',
                        '/technologies/pandas.png',
                        '/technologies/scikit.png',
                        '/technologies/spacy.png',
                        '/technologies/flask.png',
                        '/technologies/django.png',
                        '/technologies/gin.png',
                        '/technologies/echo.png',
                        '/technologies/vite.svg',
                    ].map((imgSrc, index) => (
                        <div key={index} className="circle">
                            <img src={imgSrc} alt={`Framework or Library ${index}`}/>
                        </div>
                    ))}
                </div>
            </div>

            <div className="category">
                <h3>Database Technologies</h3>
                <div className="image-container">
                    {[
                        '/technologies/oracle.png',
                        '/technologies/mongo.svg',
                        '/technologies/prisma.png',
                    ].map((imgSrc, index) => (
                        <div key={index} className="circle">
                            <img src={imgSrc} alt={`Database Tool ${index}`}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="category">
                <h3>Cloud Providers</h3>
                <div className="image-container">
                    {[
                        '/technologies/aws.jpg',
                        '/technologies/cloud.png',
                        '/technologies/hostinger.png',
                    ].map((imgSrc, index) => (
                        <div key={index} className="circle">
                            <img src={imgSrc} alt={`Database Tool ${index}`}/>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default TechStack;
