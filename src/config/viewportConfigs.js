// src/config/viewportConfigs.js
export const viewportConfigs = [
    {
        // Configuration for small screens
        minWidth: 0,
        maxWidth: 600,
        minHeight: 0,
        maxHeight: 800,
        thresholds: {
            intersectionObserverThreshold: 0.4,
        },
        scales: {
            elementScale: 0.8,
            astronautScale: 0.5,
        },
        parallax: {
            techStackTranslateY: [0, -20],
            experienceTranslateY: [0, -10],
        },
    },
    {
        // Configuration for medium screens
        minWidth: 601,
        maxWidth: 1024,
        minHeight: 0,
        maxHeight: Infinity,
        thresholds: {
            intersectionObserverThreshold: 0.6,
        },
        scales: {
            elementScale: 1.0,
            astronautScale: 0.8,
        },
        parallax: {
            techStackTranslateY: [0, -40],
            experienceTranslateY: [0, -20],
        },
    },
    {
        // Configuration for large screens
        minWidth: 1025,
        maxWidth: Infinity,
        minHeight: 0,
        maxHeight: Infinity,
        thresholds: {
            intersectionObserverThreshold: 0.7,
        },
        scales: {
            elementScale: 1.2,
            astronautScale: 1.0,
        },
        parallax: {
            techStackTranslateY: [0, -54],
            experienceTranslateY: [0, -30],
            portfolioTranslateY: [0, -20],
            contactTranslateY: [0, -21],
        },
    },
];
