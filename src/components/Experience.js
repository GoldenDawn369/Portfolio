import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import "../styles/Experience.css";

const experiences = [
    {
        title: "Vilnius Coding School",
        date: "2017",
        details: [
            "This is where the <span style='color: white;'>Journey</span> started I participated in a full time <span style='color: white;'>Web Development Bootcamp</span>",
            "Learned how to <span style='color: white;'>Architect</span> the pages with  <span style='color: white;'>HTML</span>.",
            "Then add <span style='color: white;'> Beauty </span> to the pages with <span style='color: white;'>CSS</span>.",
            "And finally <span style='color: white;'>Interactivity</span> with <span style='color: white;'>JavaScript</span>.",
        ],
    },
    {
        title: "Vilnius University",
        date: "2018-2020",
        details: [
            "Learned the  <span style='color: white;'>Fundamentals </span> of <span style='color: white;'>Computer Science. </span>",
            "Took courses in <span style='color: white;'>Data Structures</span>, <span style='color: white;'>Algorithms</span>, and <span style='color: white;'>Mathematics.</span>",
            "Dropped out after starting a <span style='color: white;'>Print On Demand</span> business.",
        ],
    },
    {
        title: "Turing college",
        date: "2021 - 2022",
        details: [
            "Enrolled in a 9 month long <span style='color: white;'>Data Science</span> program. focused on <span style='color: white;'>Self Learning</span>",
            "Presented the projects in <span style='color: white;'>Sprints</span> and after each sprint would participate in a <span style='color: white;'> Code Review</span> with a <span style='color: white;'>Senior Data Scientist.</span>",
            "Projects included <span style='color: white;'>Data Cleaning</span>, <span style='color: white;'>Exploratory Data Analysis</span>, <span style='color: white;'>Feature Engineering</span>, <span style='color: white;'>Modeling</span> and <span style='color: white;'>Deployment</span>.",
        ],
    },
    {
        title: "Vilnius Tech University",
        date: "2022 - Present",
        details: [
            "Currently enrolled in a <span style='color: white;'>Artifical Intelligence Systems</span> program.",
           "Took up the same <span style='color: white;'>Math</span> classes as in <span style='color: white;'>Vilnius University</span> but for the <span style='color: white;'>Computer Science</span> classes now I would tailor a <span style='color: white;'>Custom Project</span> for each class",
            "Projects included building a <span style='color: white;'>Video Game</span> and then a <span style='color: white;'>Reinforcement Learning</span> agent to play the game, sentiment analysis on <span style='color: white;'>Twitter</span> data, a <span style='color: white;'>Face</span> and <span style='color: white;'>Body Feature</span> <span style='color: white;'>Detector</span> and many others",
        ],
    },
    {
        title: "Freelance Engineer",
        date: "2022 - Present",
        details: [
            "Took up private <span style='color: white;'>Contracts</span> also did a lot of work on <span style='color: white;'>Upwork</span>.",
            "Jobs involved web <span style='color: white;'>Web Scraping, Social Media Automation</span> for platforms like <span style='color: white;'>Instagram, Facebook, TikTok, Youtube, TruthSocial</span>. and many others",
            "A lot of times I had to clean the  <span style='color: white;'>Data</span> analyze it or perform <span style='color: white;'>NLP</span> tasks on it.",
            "Tasks included <span style='color: white;'> Sentiment Analysis</span>, <span style='color: white;'>Topic Modeling</span>, <span style='color: white;'>Text Summarization</span> and many others.",
        ],
    },
    {
        title: "Other Experience",
        details: [
            "Worked on multiple <span style='color: white;'>SaaS Startups,</span> built them all from the <span style='color: white;'>Ground Up</span>",
            "<span style='color: white;'> Managed teams</span> of up to 10 people from a wide range of  <span style='color: white;'> Proffessions</span>",
            " <span style='color: white;'>Hired</span> people from all over the  <span style='color: white;'>World</span> to meet project  <span style='color: white;'>Requirements</span>",
            "Worked in <span style='color: white;'>Sales</span> I was the <span style='color: white;'>Top Performer</span> on my <span style='color: white;'>First Month</span> of joining the team",
        ],
    },
];

const ExperienceCard = ({ experience, onClick, isActive, isMobile }) => {
    return (
        <div
            onClick={onClick}
            className={`experience-card ${isActive ? "active" : ""} ${isMobile ? "mobile" : ""}`}
        >
            {(isActive || isMobile) && (
                <div className="highlight-bar"></div>
            )}
            <h3 className="experience-title">{experience.title}</h3>
            <p className="experience-date">
                {experience.date}
            </p>
        </div>
    );
};

const ExperienceDetails = ({ experience }) => {
    return (
        <div className="experience-details">
            <ul className="experience-details-list">
                {experience.details.map((detail, index) => (
                    <li
                        key={`experience-detail-${index}`}
                        className="experience-detail-item"
                        dangerouslySetInnerHTML={{ __html: detail }}
                    />
                ))}
            </ul>
        </div>
    );
};

const Experience = () => {
    const [selectedJob, setSelectedJob] = useState(experiences[0]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        handleResize(); // Check initial screen size
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="experience-section">
            <motion.div variants={textVariant()}>
                <h2 className="experience-header">
                    Experience
                </h2>
            </motion.div>

            <div className="experience-container">
                <div className="experience-card-container">
                    {experiences.map((experience, index) => (
                        <ExperienceCard
                            key={`experience-${index}`}
                            experience={experience}
                            onClick={() => setSelectedJob(experience)}
                            isActive={selectedJob === experience}
                            isMobile={isMobile}
                        />
                    ))}
                </div>

                <div className="experience-details-container">
                    <ExperienceDetails experience={selectedJob} />
                </div>
            </div>
        </div>
    );
};

export default SectionWrapper(Experience, "experience");
