// src/config/viewportConfigs.js
export const viewportConfigs = [
    // **Large Desktop Screens (e.g., 1920×1080)**
    {
        // Configuration for large desktop screens
        minWidth: 1441,
        maxWidth: Infinity,
        minHeight: 901,
        maxHeight: Infinity,
        thresholds: {
            intersectionObserverThreshold: 0.3,
        },
        scales: {
            elementScale: 1.2,
            astronautScale: 1.1,
        },
        parallax: {
            techStackTranslateY: [0, -60],
            experienceTranslateY: [0, -40],
            portfolioTranslateY: [0, -30],
            contactTranslateY: [0, -25],
        },
        camera: {
            position: [4, 5, -4],
        },
        controls: {
            enableZoom: false,
        },
    },
    // **Medium Desktop Screens (e.g., 1366×768, 1280×1024)**
    {
        // Configuration for medium desktop screens
        minWidth: 1025,
        maxWidth: 1440,
        minHeight: 769,
        maxHeight: 1064,
        thresholds: {
            intersectionObserverThreshold: 0.4,
        },
        scales: {
            elementScale: 1.1,
            astronautScale: 0.75,
        },
        parallax: {
            techStackTranslateY: [0, -50],
            experienceTranslateY: [0, -35],
            portfolioTranslateY: [0, -25],
            contactTranslateY: [0, -20],
        },
        camera: {
            position: [3.5, 4.5, -3.5],
        },
        controls: {
            enableZoom: false,
        },
    },
    // **Small Desktop Screens (e.g., 1024×768)**
    {
        // Configuration for small desktop screens
        minWidth: 769,
        maxWidth: 1024,
        minHeight: 600,
        maxHeight: 768,
        thresholds: {
            intersectionObserverThreshold: 0.5,
        },
        scales: {
            elementScale: 1.0,
            astronautScale: 0.8,
        },
        parallax: {
            techStackTranslateY: [0, -40],
            experienceTranslateY: [0, -30],
            portfolioTranslateY: [0, -20],
            contactTranslateY: [0, -15],
        },
        camera: {
            position: [3, 4, -3],
        },
        controls: {
            enableZoom: false,
        },
    },
    // **Tablets in Landscape Mode (e.g., 1024×768)**
    {
        // Configuration for tablets in landscape
        minWidth: 601,
        maxWidth: 1024,
        minHeight: 601,
        maxHeight: 800,
        thresholds: {
            intersectionObserverThreshold: 0.5,
        },
        scales: {
            elementScale: 0.9,
            astronautScale: 0.7,
        },
        parallax: {
            techStackTranslateY: [0, -30],
            experienceTranslateY: [0, -25],
            portfolioTranslateY: [0, -15],
            contactTranslateY: [0, -10],
        },
        camera: {
            position: [2.5, 3.5, -2.5],
        },
        controls: {
            enableZoom: true,
            minDistance: 2,
            maxDistance: 5,
        },
    },
    // **Tablets in Portrait Mode (e.g., 768×1024)**
    {
        // Configuration for tablets in portrait
        minWidth: 601,
        maxWidth: 800,
        minHeight: 801,
        maxHeight: 1024,
        thresholds: {
            intersectionObserverThreshold: 0.6,
        },
        scales: {
            elementScale: 0.85,
            astronautScale: 0.65,
        },
        parallax: {
            techStackTranslateY: [0, -25],
            experienceTranslateY: [0, -20],
            portfolioTranslateY: [0, -12],
            contactTranslateY: [0, -8],
        },
        camera: {
            position: [2.2, 3.2, -2.2],
        },
        controls: {
            enableZoom: true,
            minDistance: 2,
            maxDistance: 5,
        },
    },
    // **Large Mobile Screens (e.g., 414×736, 390×844)**
    {
        // Configuration for large mobile screens
        minWidth: 361,
        maxWidth: 600,
        minHeight: 601,
        maxHeight: 800,
        thresholds: {
            intersectionObserverThreshold: 0.7,
        },
        scales: {
            elementScale: 0.8,
            astronautScale: 0.6,
        },
        parallax: {
            techStackTranslateY: [0, -20],
            experienceTranslateY: [0, -15],
            portfolioTranslateY: [0, -10],
            contactTranslateY: [0, -6],
        },
        camera: {
            position: [2, 3, -2],
        },
        controls: {
            enableZoom: true,
            minDistance: 1.5,
            maxDistance: 4,
        },
    },
    // **Small Mobile Screens (e.g., 375×667, 360×800)**
    {
        // Configuration for small mobile screens
        minWidth: 0,
        maxWidth: 360,
        minHeight: 0,
        maxHeight: 600,
        thresholds: {
            intersectionObserverThreshold: 0.8,
        },
        scales: {
            elementScale: 0.7,
            astronautScale: 0.5,
        },
        parallax: {
            techStackTranslateY: [0, -15],
            experienceTranslateY: [0, -10],
            portfolioTranslateY: [0, -8],
            contactTranslateY: [0, -4],
        },
        camera: {
            position: [1.5, 2.5, -1.5],
        },
        controls: {
            enableZoom: true,
            minDistance: 1,
            maxDistance: 3,
        },
    },
];
