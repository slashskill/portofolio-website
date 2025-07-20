import React, { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import './BackToTopButton.css';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) { // Show button after scrolling 300px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`back-to-top ${isVisible ? 'show' : ''}`}>
      <button onClick={scrollToTop} aria-label="Scroll to top">
        &#8593; {/* Up arrow character */}
      </button>
    </div>
  );
};

export default BackToTopButton;