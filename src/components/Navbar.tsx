import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

// Assuming logo192.png is in the public folder and accessible via /logo192.png
const logo = process.env.PUBLIC_URL + '/logo192.png';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleLogout = async () => {
    try {
      await logout();
      console.log('Logout successful, redirecting to /');
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    if (isHomePage) {
      return <ScrollLink to={to} smooth={true} duration={500}>{children}</ScrollLink>;
    } else {
      return <RouterLink to={`/#${to}`}>{children}</RouterLink>;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <RouterLink to="/">
          <img src={logo} alt="HomePage Logo" className="navbar-logo" />
        </RouterLink>
      </div>
      <div className="navbar-right">
        <ul className="nav-links">
          <li><NavLink to="hero">Home</NavLink></li>
          <li><NavLink to="projects">Projects</NavLink></li>
          <li><NavLink to="donate">Donate</NavLink></li>
          {currentUser ? (
            <>
              <li><RouterLink to="/profile">Profile</RouterLink></li>
              <li>
                <button onClick={handleLogout} className="nav-link-button">Log Out</button>
              </li>
            </>
          ) : (
            <li><RouterLink to="/login">Log In</RouterLink></li>
          )}
        </ul>
        <div className="theme-toggle">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
