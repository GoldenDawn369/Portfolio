// components/TechStack.js
import React from 'react';
import '../styles/TechStack.css';

const TechStack = () => {
    // Declare the images arrays inside the component
    const programmingLanguages = [
        '/images/javascript.png',
        '/images/python.png',
        '/images/java.png',
        // Add more images as needed
    ];

    const frameworks = [
        '/images/react.png',
        '/images/vue.png',
        '/images/angular.png',
        // Add more images as needed
    ];

    const databases = [
        '/images/mysql.png',
        '/images/mongodb.png',
        '/images/postgresql.png',
        // Add more images as needed
    ];

    return (
        <section className="tech-stack">
            <h2>Tech Stack</h2>

            <div className="category">
                <h3>Programming Languages</h3>
                <div className="image-container">
                    {programmingLanguages.map((imgSrc, index) => (
                        <div key={index} className="circle">
                            <img src={imgSrc} alt="Programming Language" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="category">
                <h3>Frameworks & Libraries</h3>
                <div className="image-container">
                    {frameworks.map((imgSrc, index) => (
                        <div key={index} className="circle">
                            <img src={imgSrc} alt="Framework or Library" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="category">
                <h3>Database Tools</h3>
                <div className="image-container">
                    {databases.map((imgSrc, index) => (
                        <div key={index} className="circle">
                            <img src={imgSrc} alt="Database Tool" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
