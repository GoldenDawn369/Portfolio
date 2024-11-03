// src/components/ProjectCard.js
import React from "react";
import '../styles/ProjectCard.css'; // Import the custom CSS

export const ProjectCard = ({ title, description, imgUrl }) => {
    return (
        <div className="project-card">
            <div className="project-card-container">
                <img
                    src={imgUrl}
                    alt={title}
                    className="project-card-image"
                    loading="lazy" /* Optimizes image loading */
                />
                {/* Gradient Overlay */}
                <div className="project-card-overlay"></div> {/* This remains for gradient effect */}
                {/* Text Overlay */}
                <div className="proj-txtx">
                    <h4 className="project-card-title">{title}</h4>
                    <span className="project-card-description">{description}</span>
                </div>
            </div>
        </div>
    );
};
