import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="theme-switch">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
        aria-label="Toggle light and dark theme"
      />
      <span className="slider round"></span>
    </label>
  );
};

export default ThemeToggle;