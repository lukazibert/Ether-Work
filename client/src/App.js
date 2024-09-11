import React from 'react';
import './App.css';
import LandingPage from './features/landing-page/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthenticationPage from './features/authentication/AuthenticationPage';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './features/my-profile/ProfilePage';
import ProfileEditPage from './features/my-profile/EditProfilePage';
import ProjectDashboard from './features/project-dashboard/ProjectDashboard';
import PublicProfilePage from './features/public-profile/PublicProfilePage';
import ProjectRequest from './features/project-requests/ProjectRequest';
import PrivateRoute from './components/PrivateRoute';
import MyProjectsPage from './features/my-projects/MyProjectsPage';
import ExplorePage from './features/explore/ExplorePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/auth/:formType" element={<AuthenticationPage />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <PrivateRoute>
                  <ProfileEditPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/project/:projectId"
              element={
                <PrivateRoute>
                  <ProjectDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/view-profile/:id"
              element={
                <PrivateRoute>
                  <PublicProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/project-request/:id"
              element={
                <PrivateRoute>
                  <ProjectRequest />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-projects"
              element={
                <PrivateRoute>
                  <MyProjectsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <PrivateRoute>
                  <ExplorePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
