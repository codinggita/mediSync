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

  return (
    <div className="flex h-screen overflow-hidden bg-[#F0F4F8] dark:bg-[#090E1A] transition-colors duration-500 font-sans relative">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-8 scrollbar-hide pb-32">
          
          <SettingsHeader isSaving={isSaving} onSave={handleSaveChanges} />

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Control HUD Tabs */}
            <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
               {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                     <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center justify-between w-full p-6 rounded-[2rem] transition-all duration-500 group relative ${
                          active 
                            ? 'bg-white dark:bg-[#151E32] shadow-2xl border border-slate-200 dark:border-white/10 scale-[1.02]' 
                            : 'bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`}
                     >
                        <div className="flex items-center gap-5">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${active ? 'bg-[#2A7FFF] text-white shadow-lg rotate-3' : 'bg-slate-100 dark:bg-[#0B1121] group-hover:scale-110'}`}>
                              <Icon size={20} />
                           </div>
                           <span className={`text-[0.95rem] ${active ? 'font-black text-slate-900 dark:text-white' : 'font-bold'}`}>{tab.label}</span>
                        </div>
                        {active && <div className="w-1.5 h-6 bg-[#2A7FFF] rounded-full absolute right-4" />}
                     </button>
                  );
               })}

               <div className="mt-10 p-8 bg-rose-500/5 rounded-[2.5rem] border border-rose-500/10 flex flex-col gap-4">
                  <p className="text-[0.65rem] font-black text-rose-500 uppercase tracking-[0.3em]">Critical Action</p>
                  <button 
                    onClick={() => {
                       if(window.confirm('CRITICAL ACTION: Are you sure you want to terminate your session? You will be securely logged out.')) {
                          navigate('/login');
                       }
                    }}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-rose-500 text-white rounded-[1.4rem] font-black text-[0.8rem] uppercase tracking-widest hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20 active:scale-95"
                  >
                    <LogOut size={16} /> Termination
                  </button>
               </div>
            </div>

            {/* Config Depth Panel */}
            <div className="flex-1 bg-white dark:bg-[#151E32] rounded-[3.5rem] border border-white dark:border-white/5 shadow-2xl p-12 min-h-[650px] relative overflow-hidden transition-all duration-700">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(42,127,255,0.03),transparent)] pointer-events-none"></div>

               {activeTab === 'profile' && (
                  <div className="max-w-4xl animate-in fade-in slide-in-from-right-10 duration-700">
                     {/* Profile Identity Hub */}
                     <div className="flex flex-col md:flex-row items-center gap-12 mb-12 pb-12 border-b border-slate-100 dark:border-white/5">
                        <div className="relative group">
                           <div className="w-40 h-40 rounded-[3.5rem] bg-gradient-to-br from-[#2A7FFF] via-[#2A7FFF] to-[#2ECC71] p-1 shadow-2xl transition-all duration-500 group-hover:rotate-6">
                              <div className="w-full h-full rounded-[3.2rem] bg-slate-100 dark:bg-[#0B1121] flex items-center justify-center overflow-hidden border-4 border-white dark:border-[#151E32]">
                                 {userData.profileImg ? (
                                    <img src={userData.profileImg} alt="Profile" className="w-full h-full object-cover" />
                                 ) : (
                                    <span className="text-[3rem] font-black text-slate-300 dark:text-slate-700">{userData.firstName[0]}{userData.lastName[0]}</span>
                                 )}
                              </div>
                           </div>
                           <button 
                             onClick={() => fileInputRef.current.click()}
                             className="absolute bottom-2 right-2 w-12 h-12 rounded-[1.2rem] bg-white dark:bg-[#2A7FFF] border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#2A7FFF] dark:text-white shadow-xl hover:scale-110 transition-all hover:rotate-12 active:scale-90"
                           >
                              <Camera size={20} />
                           </button>
                           <input 
                              type="file" 
                              ref={fileInputRef} 
                              onChange={handleImageUpload} 
                              className="hidden" 
                              accept="image/*" 
                           />
                        </div>
                        <div className="text-center md:text-left flex-1">
                           <div className="flex items-center gap-4 mb-2 justify-center md:justify-start">
                              <h2 className="text-[2rem] font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                                {userData.firstName} {userData.lastName}
                              </h2>
                              <CheckCircle2 size={24} className="text-[#2ECC71]" />
                           </div>
                           <div className="flex flex-wrap items-center gap-3 mt-3 justify-center md:justify-start">
                              <span className="text-[0.7rem] font-black text-[#2A7FFF] uppercase tracking-widest bg-[#2A7FFF]/10 px-5 py-2 rounded-xl border border-[#2A7FFF]/20">
                                {isDoctor ? 'Medical Professional' : 'Clinical Tier-1'}
                              </span>
                              <span className="text-[0.8rem] text-slate-400 font-bold tracking-tighter bg-slate-50 dark:bg-[#0B1121] px-5 py-2 rounded-xl border border-slate-100 dark:border-white/5">{userData.nodeId}</span>
                           </div>
                        </div>
                     </div>

                     {/* Detail Grid */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {[
                          { label: 'First Name', name: 'firstName', val: userData.firstName },
                          { label: 'Last Name', name: 'lastName', val: userData.lastName },
                          { label: 'Secure Email', name: 'email', val: userData.email, type: 'email' },
                          { label: 'Mobile Link', name: 'phone', val: userData.phone },
                          { label: isDoctor ? 'Medical License / ID' : 'Biometric Class', name: 'bloodType', val: userData.bloodType },
                          ...(isDoctor ? [{ label: 'Specialization', name: 'specialization', val: userData.specialization }] : [])
                        ].map((field, i) => (
                           <div key={i} className="flex flex-col gap-4 group">
                              <label className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                <User size={12} className="text-[#2A7FFF]" />
                                {field.label}
                              </label>
                              <div className="relative transition-all">
                                 <input 
                                   type={field.type || 'text'} 
                                   name={field.name}
                                   value={field.val} 
                                   onChange={handleUpdateDetail}
                                   className="w-full py-5 px-8 bg-slate-50 dark:bg-[#0B1121] border border-slate-100 dark:border-white/5 rounded-[1.8rem] text-[1rem] font-black text-slate-900 dark:text-white outline-none focus:border-[#2A7FFF] focus:bg-white dark:focus:bg-black transition-all shadow-inner placeholder:text-slate-300" 
                                 />
                                 <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Zap size={16} className="text-[#2A7FFF]" />
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {activeTab === 'records' && (
                  <div className="max-w-4xl animate-in fade-in slide-in-from-right-10 duration-700">
                     <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                        <div>
                            <h2 className="text-[1.8rem] font-black text-slate-900 dark:text-white leading-tight">Secure Archive</h2>
                            <p className="text-[0.8rem] text-slate-400 font-bold uppercase tracking-[0.3em] mt-2 italic">Historical Medical Intelligence</p>
                        </div>
                        <div className="bg-amber-500/10 p-5 rounded-[1.8rem] border border-amber-500/20 flex items-center gap-5">
                            <AlertTriangle size={24} className="text-amber-500" />
                            <p className="text-[0.7rem] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest max-w-[180px] leading-relaxed">
                                Purge protocol recommended for records older than 3 years.
                            </p>
                        </div>
                     </div>

                     {/* Storage Telemetry */}
                     <div className="bg-slate-50 dark:bg-[#0B1121] p-8 rounded-[2.5rem] mb-10 border border-slate-100 dark:border-white/5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[0.75rem] font-black text-slate-500 uppercase tracking-widest">Vault Capacity: 62.4 MB / 500 MB</span>
                            <span className="text-[0.75rem] font-black text-[#2A7FFF] uppercase tracking-widest">12% Utilized</span>
                        </div>
                        <div className="w-full h-3 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden flex">
                            <div className="h-full bg-[#2A7FFF] w-[12%] shadow-[0_0_15px_rgba(42,127,255,0.5)]"></div>
                            <div className="h-full bg-rose-500 w-[5%]"></div>
                        </div>
                        <div className="mt-4 flex gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#2A7FFF]"></div>
                                <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Active Records</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                                <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Legacy Purgeable</span>
                            </div>
                        </div>
                     </div>

                     {/* Action Controls */}
                     <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                        <div className="flex bg-slate-50 dark:bg-[#0B1121] p-1.5 rounded-[1.5rem] border border-slate-100 dark:border-white/5 w-full md:w-auto">
                           {['All', 'Legacy', 'Large Files'].map(f => (
                              <button 
                                 key={f} 
                                 onClick={() => setFilterMode(f)}
                                 className={`px-6 py-2.5 rounded-xl text-[0.7rem] font-black uppercase tracking-widest transition-all ${filterMode === f ? 'bg-white dark:bg-[#151E32] text-[#2A7FFF] shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                              >
                                 {f}
                              </button>
                           ))}
                        </div>
                        <button 
                            onClick={() => {
                                if(window.confirm('Execute Bulk Purge? This will permanently remove all records older than 2024.')) {
                                    setRecords(prev => prev.filter(r => new Date(r.date).getFullYear() >= 2024));
                                    setFilterMode('All');
                                    alert('Legacy Data Purge Complete.');
                                }
                            }}
                            className="flex items-center gap-3 px-8 py-3.5 bg-rose-500 text-white rounded-2xl font-black text-[0.75rem] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20 active:scale-95"
                        >
                            <Trash2 size={16} /> Purge All Legacy
                        </button>
                     </div>

                     <div className="space-y-6">
                        {records.filter(record => {
                            if (filterMode === 'Legacy') return new Date(record.date).getFullYear() < 2024;
                            if (filterMode === 'Large Files') return parseFloat(record.size) > 10;
                            return true;
                        }).map((record) => {
                           const isOld = new Date(record.date).getFullYear() < 2024;
                           return (
                              <div key={record.id} className={`p-8 bg-slate-50 dark:bg-[#090E1A]/40 rounded-[2.5rem] border border-slate-100 dark:border-white/5 flex items-center justify-between group hover:shadow-2xl hover:scale-[1.01] transition-all duration-500 relative ${isOld ? 'border-l-4 border-l-rose-500' : 'border-l-4 border-l-[#2A7FFF]'}`}>
                                 <div className="flex items-center gap-8">
                                    <div className={`w-16 h-16 rounded-[1.4rem] flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6 ${isOld ? 'bg-rose-500/10 text-rose-500' : 'bg-[#2A7FFF]/10 text-[#2A7FFF]'}`}>
                                       <FileText size={28} />
                                    </div>
                                    <div className="min-w-0">
                                       <div className="flex items-center gap-3 mb-1">
                                          <p className="text-[1.1rem] font-black text-slate-900 dark:text-white tracking-tight truncate max-w-[200px] md:max-w-none">{record.name}</p>
                                          {isOld && <span className="px-3 py-0.5 bg-rose-500/10 text-rose-500 text-[0.55rem] font-black uppercase rounded-lg border border-rose-500/20 tracking-widest shrink-0">Legacy</span>}
                                       </div>
                                       <div className="flex items-center gap-5 flex-wrap">
                                          <div className="flex items-center gap-2">
                                             <Calendar size={14} className="text-slate-400" />
                                             <span className="text-[0.8rem] font-bold text-slate-400 uppercase tracking-widest">{record.date}</span>
                                          </div>
                                          <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                          <span className="text-[0.8rem] font-bold text-slate-400">{record.size} • {record.type}</span>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <button className="w-12 h-12 rounded-[1rem] bg-white dark:bg-white/5 text-slate-300 hover:text-[#2A7FFF] dark:hover:bg-[#2A7FFF]/10 transition-all flex items-center justify-center shadow-md border border-slate-100 dark:border-white/5 active:scale-90">
                                        <ChevronRight size={20} />
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteRecord(record.id)}
                                        className="w-12 h-12 rounded-[1rem] bg-white dark:bg-rose-500/10 text-slate-300 hover:text-rose-500 dark:hover:bg-rose-500/20 transition-all flex items-center justify-center shadow-md border border-slate-100 dark:border-white/5 active:scale-90"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                 </div>
                              </div>
                           );
                        })}

                        {records.length === 0 && (
                           <div className="text-center py-20 bg-slate-50 dark:bg-[#0B1121] rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
                                <Database size={48} className="text-slate-200 mx-auto mb-6" />
                                <p className="text-[1.2rem] font-black text-slate-400">Clinical Archive Empty</p>
                           </div>
                        )}
                     </div>
                  </div>
               )}

               {activeTab === 'security' && (
                  <div className="max-w-3xl animate-in fade-in slide-in-from-right-10 duration-700">
                     <h2 className="text-[1.8rem] font-black text-slate-900 dark:text-white mb-10 tracking-tight">Security Encryption HUD</h2>
                     <div className="grid grid-cols-1 gap-8">
                        {[
                          { label: 'Account Password', sub: 'Last changed 3 months ago', icon: Key, color: '#F43F5E', action: 'Update Password' },
                          { label: 'Master Access Key', sub: `Last updated ${securityState.keyUpdated}`, icon: Key, color: '#2A7FFF', action: 'Regenerate' },
                          { label: 'Biometric 2FA Pulse', sub: 'Protocol STATUS: ACTIVE', icon: Shield, color: '#2ECC71', action: 'Synchronize', loading: securityState.syncing },
                          { label: 'Linked Clinical Nodes', sub: `${securityState.activeSessions} active session${securityState.activeSessions > 1 ? 's' : ''} detected`, icon: Smartphone, color: '#F59E0B', action: 'Purge Sessions', disabled: securityState.activeSessions <= 1 }
                        ].map((sec, i) => (
                           <div key={i} className={`p-10 bg-slate-50 dark:bg-[#151E32]/30 rounded-[3rem] border border-slate-100 dark:border-white/5 flex items-center justify-between group transition-all duration-500 ${sec.disabled ? 'opacity-70' : 'hover:shadow-2xl'}`}>
                              <div className="flex items-center gap-8">
                                 <div className="w-16 h-16 rounded-3xl flex items-center justify-center transition-all group-hover:scale-110 shadow-xl" style={{ backgroundColor: `${sec.color}10`, color: sec.color }}>
                                    {sec.loading ? <RefreshCw size={28} className="animate-spin" /> : <sec.icon size={28} />}
                                 </div>
                                 <div>
                                    <p className="text-[1.1rem] font-black text-slate-900 dark:text-white mb-1 tracking-tight">{sec.label}</p>
                                    <p className="text-[0.75rem] text-slate-400 font-black uppercase tracking-[0.2em]">{sec.sub}</p>
                                 </div>
                              </div>
                              <button 
                                onClick={() => handleSecurityAction(sec.action)}
                                disabled={sec.disabled || sec.loading}
                                className={`px-8 py-4 rounded-2xl text-[0.85rem] font-black shadow-lg border border-transparent transition-all active:scale-95 ${sec.disabled ? 'bg-slate-200 dark:bg-[#0B1121]/50 text-slate-400 cursor-not-allowed shadow-none' : 'bg-white dark:bg-[#0B1121] text-slate-700 dark:text-slate-200 hover:border-[#2A7FFF]/30 hover:text-[#2A7FFF]'}`}
                              >
                                 {sec.loading ? 'Syncing...' : (sec.disabled && sec.action === 'Purge Sessions' ? 'Isolated' : sec.action)}
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {activeTab === 'notifications' && (
                  <div className="max-w-3xl animate-in fade-in slide-in-from-right-10 duration-700">
                     <h2 className="text-[1.8rem] font-black text-slate-900 dark:text-white mb-10 tracking-tight">Telemetry Alerts HUD</h2>
                     <div className="grid grid-cols-1 gap-6">
                        {[
                          { id: 'vitals', label: 'Critical Health Vitals Anomaly', sub: 'Instant SMS & Push for Biometric spikes', icon: AlertTriangle, color: '#E11D48' },
                          { id: 'priceDrops', label: 'Medicine Price Drops', sub: 'Alerts when wishlist drugs drop in price', icon: Zap, color: '#F59E0B' },
                          { id: 'appointments', label: 'Upcoming Appointments', sub: 'Reminders 24 hours and 1 hour prior', icon: Calendar, color: '#2A7FFF' },
                          { id: 'records', label: 'New Clinical Records', sub: 'Notify when labs/reports are uploaded', icon: FileText, color: '#2ECC71' }
                        ].map((alertOpt) => (
                           <div key={alertOpt.id} className="p-8 bg-slate-50 dark:bg-[#151E32]/30 rounded-[2.5rem] border border-slate-100 dark:border-white/5 flex items-center justify-between group hover:shadow-2xl transition-all duration-500">
                              <div className="flex items-center gap-6">
                                 <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-xl" style={{ backgroundColor: `${alertOpt.color}10`, color: alertOpt.color }}>
                                    <alertOpt.icon size={24} />
                                 </div>
                                 <div>
                                    <p className="text-[1.1rem] font-black text-slate-900 dark:text-white mb-1 tracking-tight">{alertOpt.label}</p>
                                    <p className="text-[0.75rem] text-slate-400 font-bold uppercase tracking-[0.2em]">{alertOpt.sub}</p>
                                 </div>
                              </div>
                              <button 
                                onClick={() => handleToggle(alertOpt.id)}
                                className={`w-16 h-8 rounded-full transition-all duration-300 relative flex items-center p-1 shadow-inner border border-transparent ${telemetryState[alertOpt.id] ? 'bg-[#2ECC71] shadow-[#2ECC71]/30' : 'bg-slate-200 dark:bg-[#0B1121] dark:border-white/10'}`}
                              >
                                 <div className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${telemetryState[alertOpt.id] ? 'translate-x-8' : 'translate-x-0'}`}></div>
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>
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
