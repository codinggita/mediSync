import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/SignupPage/SignupPage';
import LandingPage from '../pages/LandingPage/LandingPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import PharmacyPage from '../pages/PharmacyPage/PharmacyPage';
import DoctorPortalPage from '../pages/DoctorPortalPage/DoctorPortalPage';
import AdminPage from '../pages/AdminPage/AdminPage';
import EmergencyPage from '../pages/EmergencyPage/EmergencyPage';
import SharingPage from '../pages/SharingPage/SharingPage';
import UploadRecordPage from '../pages/UploadRecordPage/UploadRecordPage';
import MedicalRecordsPage from '../pages/MedicalRecordsPage/MedicalRecordsPage';
import AppointmentsPage from '../pages/AppointmentsPage/AppointmentsPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import DoctorProfilePage from '../pages/DoctorProfilePage/DoctorProfilePage';
import PharmacyRegistrationPage from '../pages/PharmacyRegistrationPage/PharmacyRegistrationPage';
import ComparisonPage from '../pages/ComparisonPage/ComparisonPage';
import NotificationsPage from '../pages/NotificationsPage/NotificationsPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage/ResetPasswordPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import { useAuth } from '../context/AuthContext';
import PremiumLoader from '../components/PremiumLoader';

const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center bg-[#ecf0f3] dark:bg-[#121826] text-2xl font-black text-slate-800 dark:text-white transition-colors">
    <div className="p-16 neu-flat rounded-[3rem]">
      {title} Page (Coming Soon)
    </div>
  </div>
);

// RBAC Route Protection
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <PremiumLoader message="Synchronizing Data" />;
  
  // If no user, redirect to login
  if (!user) return <Navigate to="/signup" replace />;
  
  // If route is restricted by role and user doesn't have it, redirect to dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/"                 element={<LandingPage />} />
      <Route path="/login"            element={<LoginPage />} />
      <Route path="/signup"           element={<SignupPage />} />
      <Route path="/forgot-password"  element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token"  element={<ResetPasswordPage />} />

      {/* General Protected Routes */}
      <Route path="/dashboard"        element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/pharmacy"         element={<ProtectedRoute><PharmacyPage /></ProtectedRoute>} />
      <Route path="/sharing"          element={<ProtectedRoute><SharingPage /></ProtectedRoute>} />
      <Route path="/pharmacy-registration" element={<ProtectedRoute><PharmacyRegistrationPage /></ProtectedRoute>} />
      <Route path="/upload-record"    element={<ProtectedRoute><UploadRecordPage /></ProtectedRoute>} />
      <Route path="/records"          element={<ProtectedRoute><MedicalRecordsPage /></ProtectedRoute>} />
      <Route path="/appointments"     element={<ProtectedRoute><AppointmentsPage /></ProtectedRoute>} />
      <Route path="/settings"         element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/doctor/:id"       element={<ProtectedRoute><DoctorProfilePage /></ProtectedRoute>} />
      <Route path="/comparison"       element={<ProtectedRoute><ComparisonPage /></ProtectedRoute>} />
      <Route path="/notifications"    element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

      {/* Role-Specific Protected Routes */}
      <Route
        path="/doctor-portal"
        element={<ProtectedRoute allowedRoles={['Doctor', 'Admin']}><DoctorPortalPage /></ProtectedRoute>}
      />
      <Route
        path="/admin"
        element={<ProtectedRoute allowedRoles={['Admin']}><AdminPage /></ProtectedRoute>}
      />
      <Route
        path="/emergency"
        element={<ProtectedRoute allowedRoles={['Patient']}><EmergencyPage /></ProtectedRoute>}
      />

      {/* Catch-all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
