import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): React.ReactElement | null => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  // Ensure children is a ReactElement before returning, or null
  return currentUser ? (children as React.ReactElement) : <Navigate to="/profile" />;
};

export default PrivateRoute;
