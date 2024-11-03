// src/components/Contact.js
import React, { useState } from 'react';
import emailjs from '@emailjs/browser'; // Updated EmailJS SDK
import '../styles/Contact.css'; // Import the CSS file for styling
import { FaUser, FaEnvelope, FaPhone, FaCommentDots } from 'react-icons/fa'; // Import react-icons

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const formRef = React.useRef(); // Create a ref for the form

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // Clear errors as user types
        setErrors({
            ...errors,
            [e.target.name]: '',
        });
    };

    // Validate form data
    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full Name is required';
        }

        if (!formData.email.trim() && !formData.phone.trim()) {
            newErrors.contact = 'Either Email or Phone number is required';
        } else {
            if (formData.email.trim()) {
                // Basic email format validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    newErrors.email = 'Invalid email address';
                }
            }
            if (formData.phone.trim()) {
                // Basic phone format validation
                const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
                if (!phoneRegex.test(formData.phone)) {
                    newErrors.phone = 'Invalid phone number';
                }
            }
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmitSuccess(false);
        } else {
            try {
                // Send email using EmailJS
                const result = await emailjs.sendForm(
                    'service_2gdyf0h',    // Replace with your EmailJS Service ID
                    'template_k9mm513',   // Replace with your EmailJS Template ID
                    formRef.current,
                    'zYrlIGHO54kugfxvh'     // Replace with your EmailJS Public Key
                );

                console.log('Email sent:', result.text);
                setErrors({});
                setSubmitSuccess(true);
                // Reset form
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    message: '',
                });
            } catch (error) {
                console.error('Error sending email:', error);
                setSubmitSuccess(false);
                setErrors({ server: 'Failed to send message. Please try again later.' });
            }
        }
    };

    return (
        <div className="contact-container" id="contact">
            <h2 className="contact-heading">Contact</h2>
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                {submitSuccess && <div className="success-message">Your message has been sent!</div>}
                {errors.server && <div className="error-message">{errors.server}</div>}
                <div className="form-group">
                    <div className="input-wrapper">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>
                <div className="form-group">
                    <div className="input-wrapper">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <div className="input-wrapper">
                        <FaPhone className="input-icon" />
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
                {/* Error message if neither email nor phone is provided */}
                {errors.contact && <span className="error-message">{errors.contact}</span>}
                <div className="form-group">
                    <div className="input-wrapper textarea-wrapper">
                        <FaCommentDots className="input-icon textarea-icon" />
                        <textarea
                            name="message"
                            id="message"
                            rows="5"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    {errors.message && <span className="error-message">{errors.message}</span>}
                </div>
                <button type="submit" className="submit-button">Send Message</button>
            </form>
            {/* Social Media Icons */}
            <div className="social-icons">
                <a href="https://www.linkedin.com/in/robertas-buila-7b8907189/" target="_blank" rel="noopener noreferrer">
                    <img src="/icons/linkedin.png" alt="LinkedIn" />
                </a>
                <a href="https://github.com/GoldenDawn369" target="_blank" rel="noopener noreferrer">
                    <img src="/icons/github.png" alt="GitHub" />
                </a>
            </div>
        </div>
    );
};

export default Contact;
