import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/SignupPage/SignupPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import PharmacyPage from '../pages/PharmacyPage/PharmacyPage';
import DoctorPortalPage from '../pages/DoctorPortalPage/DoctorPortalPage';
import AdminPage from '../pages/AdminPage/AdminPage';
import EmergencyPage from '../pages/EmergencyPage/EmergencyPage';

// Temporary placeholder components for connected routes
const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 text-2xl font-bold text-gray-800">
    {title} Page (Under Construction)
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<PlaceholderPage title="Forgot Password" />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/pharmacy" element={<PharmacyPage />} />
      <Route path="/doctor-portal" element={<DoctorPortalPage />} />
      <Route path="/admin" element={<AdminPage />} />
      
      {/* Default redirect to login for now */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
