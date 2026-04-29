import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import DashboardContent from './components/DashboardContent';
import DoctorDashboardContent from './components/DoctorDashboardContent';
import OnboardingModal from '../../components/OnboardingModal';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

const DashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden bg-[#ecf0f3] dark:bg-[#0f141f] transition-colors duration-300 font-sans">
      <SEO 
        title={user?.role === 'Doctor' ? 'Doctor Dashboard' : 'Patient Dashboard'}
        description={`Securely manage your ${user?.role === 'Doctor' ? 'clinical appointments and patient cases' : 'medical records, vitals, and pharmacy connections'}.`}
      />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar />
        {user?.role === 'Doctor' ? <DoctorDashboardContent /> : <DashboardContent />}
      </div>

      {/* Onboarding tour — only shown once per account */}
      <OnboardingModal userName={user?.name?.split(' ')[0]} />
    </div>
  );
};

export default DashboardPage;


