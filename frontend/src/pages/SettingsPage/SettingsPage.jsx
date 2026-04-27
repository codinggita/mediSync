import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import SettingsHeader from './components/SettingsHeader';
import PasswordUpdateModal from './components/PasswordUpdateModal';
import { 
  User, Bell, Shield, Key, Smartphone, 
  ChevronRight, Camera, Trash2, 
  FileText, Calendar, CheckCircle2, AlertTriangle,
  LogOut, Database, Zap, RefreshCw
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import SettingsTabControl from './components/SettingsTabControl';
import ProfileSettingsPanel from './components/ProfileSettingsPanel';
import SettingsRecordsPanel from './components/SettingsRecordsPanel';
import SettingsSecurityPanel from './components/SettingsSecurityPanel';
import SettingsTelemetryPanel from './components/SettingsTelemetryPanel';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const isDoctor = user?.role === 'Doctor' || user?.role === 'Admin';
  
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
  const [isSaving, setIsSaving] = useState(false);
  const [filterMode, setFilterMode] = useState('All');
  const fileInputRef = useRef(null);

  // --- TELEMETRY STATE ---
  const [telemetryState, setTelemetryState] = useState({
     vitals: true,
     priceDrops: false,
     appointments: true,
     records: false
  });
  const handleToggle = (key) => setTelemetryState(p => ({...p, [key]: !p[key]}));

  // --- SECURITY STATE ---
  const [securityState, setSecurityState] = useState({
    keyUpdated: '42 days ago',
    activeSessions: 3,
    syncing: false,
    showPasswordModal: false,
    passwords: { current: '', new: '', confirm: '' },
    updating: false
  });

  const handleSecurityAction = (actionType) => {
    if (actionType === 'Update Password') {
      setSecurityState(prev => ({ ...prev, showPasswordModal: true }));
    } else if (actionType === 'Regenerate') {
       if(window.confirm('Regenerate Master Access Key? This will terminate other active sessions.')) {
           setSecurityState(prev => ({...prev, keyUpdated: 'just now', activeSessions: 1}));
           alert('Master Access Key Regenerated Successfully.');
       }
    } else if (actionType === 'Synchronize') {
       setSecurityState(prev => ({...prev, syncing: true}));
       setTimeout(() => {
           setSecurityState(prev => ({...prev, syncing: false}));
           alert('Biometric 2FA Protocol Synchronized.');
       }, 1500);
    } else if (actionType === 'Purge Sessions') {
       if(window.confirm('Purge all remote sessions?')) {
           setSecurityState(prev => ({...prev, activeSessions: 1}));
           alert('Remote sessions terminated. Only this node remains active.');
       }
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (securityState.passwords.new !== securityState.passwords.confirm) {
      return alert('New passwords do not match clinical hash.');
    }
    setSecurityState(prev => ({ ...prev, updating: true }));
    try {
      await api.put('/users/profile', { password: securityState.passwords.new });
      alert('Security Credentials Synchronized Successfully.');
      setSecurityState(prev => ({ 
        ...prev, 
        showPasswordModal: false, 
        passwords: { current: '', new: '', confirm: '' } 
      }));
    } catch (err) {
      alert('Security Protocol Failed: ' + (err.response?.data?.message || 'Verification Error'));
    } finally {
      setSecurityState(prev => ({ ...prev, updating: false }));
    }
  };

  // --- USER DATA STATE ---
  const [userData, setUserData] = useState({
    firstName: 'Shubham',
    lastName: 'Kumar',
    email: 'shubham@gmail.com',
    phone: '+91 99887 76655',
    bloodType: 'B Positive',
    specialization: 'Cardiology Specialist',
    nodeId: '#MS-SHB99',
    profileImg: null
  });

  useEffect(() => {
    if (user) {
      setUserData(prev => ({
        ...prev,
        firstName: user.name?.split(' ')[0] || prev.firstName,
        lastName: user.name?.split(' ').slice(1).join(' ') || prev.lastName,
        email: user.email || prev.email,
        nodeId: isDoctor ? '#MS-DOC-X9' : '#MS-PT-88',
        bloodType: isDoctor ? 'MD-LIC-829' : 'B Positive',
        specialization: isDoctor ? 'Senior Cardiologist' : ''
      }));
    }
  }, [user, isDoctor]);

  // --- RECORDS STATE ---
  const [records, setRecords] = useState([
    { id: 1, name: 'Annual Cardiac Screening', date: '2025-12-15', size: '2.4 MB', type: 'PDF' },
    { id: 2, name: 'Full Blood Count (FBC)', date: '2024-06-20', size: '1.1 MB', type: 'DOCX' },
    { id: 3, name: 'MRI Lumbar Spine', date: '2023-11-10', size: '45.8 MB', type: 'DICOM' },
    { id: 4, name: 'Dental X-Ray Archive', date: '2022-04-05', size: '5.2 MB', type: 'JPG' },
    { id: 5, name: 'Pediatric History Archive', date: '2021-01-12', size: '12.4 MB', type: 'PDF' }
  ]);

  const handleUpdateDetail = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await api.put('/users/profile', {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        bloodGroup: userData.bloodGroup,
        gender: userData.gender
      });
      await refreshUser();
      alert('Clinical Profile Synchronized Successfully.');
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Sync Protocol Failed. Please verify network connectivity.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteRecord = (id) => {
    if (window.confirm('Secure Erase Protocol: Are you sure you want to permanently delete this clinical record?')) {
      setRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({ ...prev, profileImg: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTerminate = () => {
    if(window.confirm('CRITICAL ACTION: Are you sure you want to terminate your session? You will be securely logged out.')) {
      navigate('/login');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F0F4F8] dark:bg-[#090E1A] transition-colors duration-500 font-sans relative">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-8 scrollbar-hide pb-32">
          
          <SettingsHeader isSaving={isSaving} onSave={handleSaveChanges} />

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Control HUD Tabs */}
            <SettingsTabControl 
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onTerminate={handleTerminate}
            />

            {/* Config Depth Panel */}
            <div className="flex-1 bg-white dark:bg-[#151E32] rounded-[3.5rem] border border-white dark:border-white/5 shadow-2xl p-12 min-h-[650px] relative overflow-hidden transition-all duration-700">
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
