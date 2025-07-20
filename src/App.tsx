import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import DonationSection from './components/DonationSection';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import ProjectDetailPage from './components/ProjectDetailPage';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import HRDashboard from './components/HRDashboard/HRDashboard';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className="App">
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={
                <>
                  <HeroSection />
                  <ProjectsSection />
                  <DonationSection />
                </>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
              <Route path="/hr-dashboard" element={
                <PrivateRoute>
                  <HRDashboard />
                </PrivateRoute>
              } />
            </Routes>
            <Footer />
            <BackToTopButton />
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
