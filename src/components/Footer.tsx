import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:your.email@example.com">Email</a>
      </div>
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} HomePage. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;