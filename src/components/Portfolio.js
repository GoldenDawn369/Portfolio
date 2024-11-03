// src/components/Portfolio.js
import React, { useState, useRef } from "react";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/campaign.png";
import projImg2 from "../assets/dashboard.png";
import projImg3 from "../assets/step1.png";
import projImg4 from "../assets/subscription.png"; // New Image 4
import projImg5 from "../assets/step2.png";        // New Image 5
import projImg6 from "../assets/step3.png";        // New Image 6
import chatImg from "../assets/chat.jpg";          // New Image 7
import rssImg from "../assets/RSS.jpg";            // New Image 8
import colorSharp2 from "../assets/color-sharp2.png";
import TrackVisibility from 'react-on-screen';
import '../styles/Portfolio.css'; // Import the custom CSS
import 'animate.css';

const Portfolio = () => {
    const projects = [
        {
            title: "Business Startup",
            description: "Design & Development",
            imgUrl: projImg1,
        },
        {
            title: "Dashboard UI",
            description: "User Interface Design",
            imgUrl: projImg2,
        },
        {
            title: "Step One",
            description: "Initial Setup",
            imgUrl: projImg3,
        },
        {
            title: "Subscription Model",
            description: "Revenue Strategy",
            imgUrl: projImg4,
        },
        {
            title: "Step Two",
            description: "Feature Development",
            imgUrl: projImg5,
        },
        {
            title: "Step Three",
            description: "Final Launch",
            imgUrl: projImg6,
        },
    ];

    const projectsTab2 = [
        {
            title: "ChikiChat",
            description: "Real-time Chat Application",
            imgUrl: chatImg,
        },
        {
            title: "RSS Feed",
            description: "News Aggregator",
            imgUrl: rssImg,
        },
    ];

    // Tab state management
    const [activeTab, setActiveTab] = useState("first");

    // Use useRef to track if animation has played
    const hasAnimated = useRef(false);

    // Function to handle keyboard navigation
    const handleKeyDown = (e, currentTab) => {
        const tabs = ["first", "second", "third"];
        const currentIndex = tabs.indexOf(currentTab);
        if (e.key === "ArrowRight") {
            const nextIndex = (currentIndex + 1) % tabs.length;
            setActiveTab(tabs[nextIndex]);
        } else if (e.key === "ArrowLeft") {
            const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            setActiveTab(tabs[prevIndex]);
        }
    };

    // Function to render content based on active tab
    const renderTabContent = () => {
        if (activeTab === "first") {
            return (
                <div className="project-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            );
        } else if (activeTab === "second") {
            return (
                <div className="project-grid">
                    {projectsTab2.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            );
        } else if (activeTab === "third") {
            return (
                <p className="tab-paragraph">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.
                </p>
            );
        }
    };

    return (
        <section className="project" id="portfolio">
            <div className="container">
                <div className="flex-col">
                    <TrackVisibility partialVisibility>
                        {({ isVisible }) => {
                            if (isVisible && !hasAnimated.current) {
                                hasAnimated.current = true;
                            }

                            return (
                                <div className={hasAnimated.current ? "animate__animated animate__fadeIn" : ""}>
                                    <h2 className="heading">Portfolio</h2>
                                    <p className="description">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                                        galley of type and scrambled it to make a type specimen book.
                                    </p>
                                    {/* Tabs */}
                                    <div className="tabs-container" role="tablist">
                                        {/* Tab 1 */}
                                        <button
                                            className={`tab-button ${activeTab === "first" ? "active" : "inactive"} ${activeTab === "third" ? "border-right-custom" : ""}`}
                                            onClick={() => setActiveTab("first")}
                                            onKeyDown={(e) => handleKeyDown(e, "first")}
                                            aria-selected={activeTab === "first"}
                                            role="tab"
                                            aria-controls="tabpanel-first"
                                            id="tab-first"
                                        >
                                            Afli
                                        </button>
                                        {/* Tab 2 */}
                                        <button
                                            className={`tab-button ${activeTab === "second" ? "active" : "inactive"}`}
                                            onClick={() => setActiveTab("second")}
                                            onKeyDown={(e) => handleKeyDown(e, "second")}
                                            aria-selected={activeTab === "second"}
                                            role="tab"
                                            aria-controls="tabpanel-second"
                                            id="tab-second"
                                        >
                                            ChikiChat
                                        </button>
                                        {/* Tab 3 */}
                                        <button
                                            className={`tab-button ${activeTab === "third" ? "active" : "inactive"} ${activeTab === "first" ? "border-left-custom" : ""}`}
                                            onClick={() => setActiveTab("third")}
                                            onKeyDown={(e) => handleKeyDown(e, "third")}
                                            aria-selected={activeTab === "third"}
                                            role="tab"
                                            aria-controls="tabpanel-third"
                                            id="tab-third"
                                        >
                                            Tab 3
                                        </button>
                                    </div>
                                    {/* Tab Content */}
                                    <div
                                        className={`tab-content ${hasAnimated.current ? "animate__animated animate__slideInUp" : ""}`}
                                        role="tabpanel"
                                        aria-labelledby={`tab-${activeTab}`}
                                        id={`tabpanel-${activeTab}`}
                                    >
                                        {renderTabContent()}
                                    </div>
                                </div>
                            );
                        }}
                    </TrackVisibility>
                </div>
            </div>
            <img
                className="background-decor"
                src={colorSharp2}
                alt="Background Decoration"
            />
        </section>
    );
};

export default Portfolio;
