import React from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll'; // Import ScrollLink
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="hero-section page-section">
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Welcome to HomePage
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A modern, clean, and professional portfolio website.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <ScrollLink to="projects" smooth={true} duration={500} className="cta-button">
            View My Work
          </ScrollLink>
        </motion.div>
      </div>
      <div className="hero-image">
        {/* Placeholder for professional image or custom illustration */}
        <img src={process.env.PUBLIC_URL + '/professional illustration.png'} alt="Professional illustration" />
      </div>
    </section>
  );
};

export default HeroSection;
