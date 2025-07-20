import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { IconContext } from 'react-icons'; // Import IconContext
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ProjectCard.css';
import { Project } from '../data/projectData';
import { useAuth } from '../context/AuthContext';

const ProjectCard: React.FC<Project> = ({
  title,
  description,
  technologies,
  imageUrl,
  slug, // Destructure slug
  liveDemoLink,
}) => {
  const { currentUser, userProfile, addFavoriteProject, removeFavoriteProject } = useAuth();
  const isFavorite = userProfile?.favoriteProjects.includes(title); // Use title as ID for simplicity

  const handleFavoriteClick = async () => {
    if (!currentUser) {
      alert('Please log in to favorite projects!');
      return;
    }
    if (isFavorite) {
      await removeFavoriteProject(title);
    } else {
      await addFavoriteProject(title);
    }
  };

  return (
    <motion.div
      className="project-card"
      whileHover={{ translateY: -5 }}
      transition={{ duration: 0.2 }}
    >
      <img src={process.env.PUBLIC_URL + imageUrl} alt={title} className="project-image" />
      <div className="card-content">
        <div className="card-header">
          <Link to={`/projects/${slug}`} className="project-title-link">
            <h3>{title}</h3>
          </Link>
          {currentUser && (
            <button
              onClick={handleFavoriteClick}
              className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
            >
              <IconContext.Provider value={{ className: 'react-icons' }}>
                <FaStar />
              </IconContext.Provider>
            </button>
          )}
        </div>
        <p>{description}</p>
        <div className="technologies">
          {technologies.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
        <div className="project-links">
          {liveDemoLink && (
            <a href={liveDemoLink} target="_blank" rel="noopener noreferrer" className="project-link">
              Live Demo
            </a>
          )}
          <Link to={`/projects/${slug}`} className="project-link">
            Learn More
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
