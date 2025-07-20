import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projectData';
import './ProjectDetailPage.css'; // We'll create this CSS file

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find(p => p.slug === projectId);

  if (!project) {
    return (
      <div className="project-detail-container page-section">
        <div className="project-detail-card">
          <h2>Project Not Found</h2>
          <p>The project you are looking for does not exist.</p>
          <Link to="/" className="back-to-home-link">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-container page-section">
      <div className="project-detail-card">
        <img src={process.env.PUBLIC_URL + project.imageUrl} alt={project.title} className="project-detail-image" />
        <div className="project-detail-content">
          <h2 className="project-detail-title">{project.title}</h2>
          <p className="project-detail-description">{project.longDescription}</p>

          <div className="project-detail-features">
            <h3>Key Features:</h3>
            <ul>
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="project-detail-technologies">
            <h3>Technologies Used:</h3>
            <div className="tech-tags-container">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>

            <div className="project-detail-links">
              {project.liveDemoLink && (
                <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="project-detail-link">
                  Live Demo
                </a>
              )}
              {project.viewCodeLink && (
                <a href={project.viewCodeLink} target="_blank" rel="noopener noreferrer" className="project-detail-link">
                  View Code
                </a>
              )}
            </div>
            <Link to="/" className="back-to-home-link">Back to Home</Link>
          </div>
        </div> {/* Closing tag for project-detail-content */}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
