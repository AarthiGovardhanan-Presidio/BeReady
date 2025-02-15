import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import './DarkLightToggle.css';

const DarkLightToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={toggleTheme}
        id="theme-toggle"
      />
      <label htmlFor="theme-toggle" className="toggle-label">
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </label>
    </div>
  );
};

export default DarkLightToggle;
