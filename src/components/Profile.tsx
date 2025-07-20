import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projectData';
import './Profile.css'; // Renamed from Dashboard.css

const Profile: React.FC = () => {
  const { currentUser, userProfile, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Update state when userProfile changes (e.g., after initial load or update)
  React.useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName || '');
      setBio(userProfile.bio || '');
    }
  }, [userProfile]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to main page on logout
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await updateUserProfile({ displayName, bio });
      setIsEditing(false); // Exit edit mode on success
    } catch (err: any) {
      setError('Failed to update profile: ' + err.message);
    }
    setLoading(false);
  };

  const favoriteProjects = projects.filter(project =>
    userProfile?.favoriteProjects.includes(project.title)
  );

  return (
    <div className="profile-container page-section">
      <div className="profile-header">
        <h2 className="profile-title">Your Profile</h2>
        <button onClick={handleLogout} className="profile-logout-button">
          Log Out
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-card personal-info-card">
          <h3>Personal Information</h3>
          {error && <div className="profile-error">{error}</div>}
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="profile-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={currentUser?.email || ''} disabled />
              </div>
              <div className="form-group">
                <label htmlFor="displayName">Display Name</label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                ></textarea>
              </div>
              <button type="submit" disabled={loading} className="profile-save-button">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="profile-cancel-button">
                Cancel
              </button>
            </form>
          ) : (
            <>
              <p><strong>Email:</strong> {currentUser?.email}</p>
              <p><strong>Display Name:</strong> {userProfile?.displayName || 'Not set'}</p>
              <p><strong>Bio:</strong> {userProfile?.bio || 'No bio yet.'}</p>
              <button onClick={() => setIsEditing(true)} className="profile-edit-button">
                Edit Profile
              </button>
            </>
          )}
        </div>

        <div className="profile-card favorite-projects-card">
          <h3>Your Favorite Projects</h3>
          {favoriteProjects.length > 0 ? (
            <div className="favorite-projects-grid">
              {favoriteProjects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          ) : (
            <p>You haven't favorited any projects yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
