import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import SettingsHeader from './components/SettingsHeader';
import PasswordUpdateModal from './components/PasswordUpdateModal';
import { User, Bell, Shield, Database } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from './hooks/useSettings';
import SettingsTabControl from './components/SettingsTabControl';
import ProfileSettingsPanel from './components/ProfileSettingsPanel';
import SettingsRecordsPanel from './components/SettingsRecordsPanel';
import SettingsSecurityPanel from './components/SettingsSecurityPanel';
import SettingsTelemetryPanel from './components/SettingsTelemetryPanel';
import SEO from '../../components/SEO';

const SettingsPage = () => {
  const { user: authUser } = useAuth();
  const isDoctor = authUser?.role === 'Doctor' || authUser?.role === 'Admin';
  
  const tabs = [
    { id: 'profile', label: isDoctor ? 'Doctor Profile' : 'Clinical Profile', icon: User },
    { id: 'records', label: isDoctor ? 'Patient Directory Archive' : 'Data Management', icon: Database },
    { id: 'security', label: 'Security HUD', icon: Shield },
    { id: 'notifications', label: 'Telemetry Alerts', icon: Bell },
  ];

  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';
  
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const fileInputRef = useRef(null);

  const {
    user,
    isSaving,
    filterMode, setFilterMode,
    telemetryState, handleToggle,
    securityState, setSecurityState, handleSecurityAction, handlePasswordUpdate,
    userData, handleUpdateDetail, handleSaveChanges, handleImageUpload,
    records, setRecords, handleDeleteRecord,
    handleTerminate
  } = useSettings(isDoctor);

  return (
    <div className="flex h-screen overflow-hidden bg-[#ecf0f3] dark:bg-[#0f141f] transition-colors duration-500 font-sans relative">
      <SEO 
        title="Settings & System Config" 
        description="Manage your clinical profile, security preferences, system telemetry, and data archive within MediSync."
      />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-8 scrollbar-hide pb-32">
          <SettingsHeader isSaving={isSaving} onSave={handleSaveChanges} />

          <div className="flex flex-col lg:flex-row gap-10">
            <SettingsTabControl 
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onTerminate={handleTerminate}
            />

            <div className="flex-1 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3.5rem] border border-white dark:border-white/5 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d] p-12 min-h-[650px] relative overflow-hidden transition-all duration-700">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(42,127,255,0.03),transparent)] pointer-events-none"></div>

               {activeTab === 'profile' && (
                  <ProfileSettingsPanel 
                    userData={userData}
                    isDoctor={isDoctor}
                    fileInputRef={fileInputRef}
                    onImageUpload={handleImageUpload}
                    onUpdateDetail={handleUpdateDetail}
                  />
               )}

               {activeTab === 'records' && (
                  <SettingsRecordsPanel 
                    records={records.filter(record => {
                        if (filterMode === 'Legacy') return new Date(record.date).getFullYear() < 2024;
                        if (filterMode === 'Large Files') return parseFloat(record.size) > 10;
                        return true;
                    })}
                    filterMode={filterMode}
                    setFilterMode={setFilterMode}
                    onDeleteRecord={handleDeleteRecord}
                    onBulkPurge={() => {
                        if(window.confirm('Execute Bulk Purge? This will permanently remove all records older than 2024.')) {
                            setRecords(prev => prev.filter(r => new Date(r.date).getFullYear() >= 2024));
                            setFilterMode('All');
                            alert('Legacy Data Purge Complete.');
                        }
                    }}
                  />
               )}

               {activeTab === 'security' && (
                  <SettingsSecurityPanel 
                    securityState={securityState}
                    onSecurityAction={handleSecurityAction}
                  />
               )}

               {activeTab === 'notifications' && (
                  <SettingsTelemetryPanel 
                    telemetryState={telemetryState}
                    onToggle={handleToggle}
                  />
               )}
            </div>
          </div>
        </main>
      </div>

      <PasswordUpdateModal
        show={securityState.showPasswordModal}
        onClose={() => setSecurityState(prev => ({ ...prev, showPasswordModal: false }))}
        securityState={securityState}
        setSecurityState={setSecurityState}
        onSubmit={handlePasswordUpdate}
        isDarkMode={user?.isDarkMode}
      />
    </div>
  );
};

export default SettingsPage;
