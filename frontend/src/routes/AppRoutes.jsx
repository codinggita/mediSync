import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PremiumLoader from '../components/PremiumLoader';

// 🚀 Dynamic Module Loading (Code Splitting)
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const SignupPage = lazy(() => import('../pages/SignupPage/SignupPage'));
const LandingPage = lazy(() => import('../pages/LandingPage/LandingPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage/DashboardPage'));
const PharmacyPage = lazy(() => import('../pages/PharmacyPage/PharmacyPage'));
const DoctorPortalPage = lazy(() => import('../pages/DoctorPortalPage/DoctorPortalPage'));
const AdminPage = lazy(() => import('../pages/AdminPage/AdminPage'));
const EmergencyPage = lazy(() => import('../pages/EmergencyPage/EmergencyPage'));
const SharingPage = lazy(() => import('../pages/SharingPage/SharingPage'));
const UploadRecordPage = lazy(() => import('../pages/UploadRecordPage/UploadRecordPage'));
const MedicalRecordsPage = lazy(() => import('../pages/MedicalRecordsPage/MedicalRecordsPage'));
const AppointmentsPage = lazy(() => import('../pages/AppointmentsPage/AppointmentsPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage/SettingsPage'));
const DoctorProfilePage = lazy(() => import('../pages/DoctorProfilePage/DoctorProfilePage'));
const PharmacyRegistrationPage = lazy(() => import('../pages/PharmacyRegistrationPage/PharmacyRegistrationPage'));
const ComparisonPage = lazy(() => import('../pages/ComparisonPage/ComparisonPage'));
const NotificationsPage = lazy(() => import('../pages/NotificationsPage/NotificationsPage'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage/ResetPasswordPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

import { useAuth } from '../context/AuthContext';

const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center bg-[#ecf0f3] dark:bg-[#121826] text-2xl font-black text-slate-800 dark:text-white transition-colors">
    <div className="p-16 neu-flat rounded-[3rem]">{title} Page (Coming Soon)</div>
  </div>
);

// RBAC Route Protection
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <PremiumLoader message="Synchronizing Data" />;

  // If no user, redirect to login with a sync failure state
  if (!user) return <Navigate to="/signup" state={{ reason: 'session_missing' }} replace />;

  // If route is restricted by role and user doesn't have it, redirect to dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<PremiumLoader message="Synchronizing Modules" />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* General Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacy"
          element={
            <ProtectedRoute>
              <PharmacyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sharing"
          element={
            <ProtectedRoute>
              <SharingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacy-registration"
          element={
            <ProtectedRoute>
              <PharmacyRegistrationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-record"
          element={
            <ProtectedRoute>
              <UploadRecordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <MedicalRecordsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <AppointmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/:id"
          element={
            <ProtectedRoute>
              <DoctorProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/comparison"
          element={
            <ProtectedRoute>
              <ComparisonPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        {/* Role-Specific Protected Routes */}
        <Route
          path="/doctor-portal"
          element={
            <ProtectedRoute allowedRoles={['Doctor', 'Admin']}>
              <DoctorPortalPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/emergency"
          element={
            <ProtectedRoute allowedRoles={['Patient']}>
              <EmergencyPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
