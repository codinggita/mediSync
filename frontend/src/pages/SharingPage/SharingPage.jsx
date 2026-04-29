import React, { useState } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import DoctorSharingPage from './components/DoctorSharingPage';
import SharingHeader from './components/SharingHeader';
import DoctorSharingModal from './components/DoctorSharingModal';
import SharingDecorations from './components/SharingDecorations';
import SharingMainContent from './components/SharingMainContent';
import { useAuth } from '../../context/AuthContext';
import useSharing from './hooks/useSharing';
import SEO from '../../components/SEO';

const SharingPage = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const {
    doctors,
    records,
    loading,
    sharingRecord,
    setSharingRecord,
    selectedDoctor,
    selectedRecordId,
    setSelectedRecordId,
    isSharing,
    successMessage,
    handleShareClick,
    handleConfirmShare,
  } = useSharing(user);

  return (
    <div className="flex h-screen overflow-hidden bg-[#ecf0f3] dark:bg-[#0f141f] transition-colors duration-500 font-sans relative text-slate-800 dark:text-white">
      <SEO
        title={user?.role === 'Doctor' ? 'Patient Data Portal' : 'Clinical Record Sharing'}
        description="Securely share and transmit your end-to-end encrypted clinical artifacts and medical history directly to verified specialists."
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,127,255,0.03),transparent)] pointer-events-none" />
      <SharingDecorations />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        <TopBar />
        {user?.role === 'Doctor' ? (
          <DoctorSharingPage />
        ) : (
          <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-10 scrollbar-hide pb-24 md:pb-20">
            <SharingHeader />
            <SharingMainContent
              loading={loading}
              doctors={doctors}
              onShareClick={handleShareClick}
            />
          </main>
        )}
      </div>

      <DoctorSharingModal
        show={sharingRecord}
        onClose={() => setSharingRecord(false)}
        selectedDoctor={selectedDoctor}
        records={records}
        selectedRecordId={selectedRecordId}
        setSelectedRecordId={setSelectedRecordId}
        onConfirm={handleConfirmShare}
        isSharing={isSharing}
        successMessage={successMessage}
      />
    </div>
  );
};

export default SharingPage;
