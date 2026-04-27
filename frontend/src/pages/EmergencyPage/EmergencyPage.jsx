import React, { useState, useEffect } from 'react';
import { 
  Phone, MapPin, Navigation, AlertCircle, 
  User, Shield, Activity, Heart, ArrowLeft,
  ChevronRight, Ambulance, Hospital, 
  Search, RefreshCw, XCircle, Zap, ShieldCheck,
  Radar, Radio, Share2, LocateFixed
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';

import EmergencyHeader from './components/EmergencyHeader';
import ResponseNetwork from './components/ResponseNetwork';

const EmergencyPage = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState('tactical'); // 'tactical' or 'list'
  const [isSearching, setIsSearching] = useState(false);
  const [isSOSActive, setIsSOSActive] = useState(true);
  const [deploymentStatus, setDeploymentStatus] = useState(null);

  const nearbyHospitals = [
    { id: 1, name: 'City Super Specialty Hospital', distance: '0.8 km', phone: '+919876543210', status: 'High Capacity', time: '5 mins', lat: 19.0760, lng: 72.8777, triage: 'Critical' },
    { id: 2, name: 'MediSync Care Center', distance: '1.4 km', phone: '+919876500000', status: 'Immediate', time: '8 mins', lat: 19.0860, lng: 72.8877, triage: 'Stable' },
    { id: 3, name: 'LifeCare Trauma Center', distance: '2.5 km', phone: '+919876511111', status: 'Moderate', time: '12 mins', lat: 19.0960, lng: 72.8977, triage: 'Delayed' }
  ];

  const emergencyContacts = [
    { name: 'Rahul (Brother)', relation: 'Primary', phone: '+919988776655' },
    { name: 'Dr. Arpit Khanna', relation: 'Cardiologist', phone: '+919900112233' },
    { name: 'Anjali (Wife)', relation: 'Secondary', phone: '+919977665544' }
  ];

  const handleRefresh = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 2000);
  };

  const handleDeploy = (hosp) => {
    setDeploymentStatus(hosp.id);
    setTimeout(() => {
        const query = encodeURIComponent(`${hosp.name}, ${hosp.lat},${hosp.lng}`);
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
        setDeploymentStatus(null);
    }, 1500);
  };

  const handleSOSAction = () => setIsSOSActive(!isSOSActive);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F0F4F8] dark:bg-[#090E1A] transition-colors duration-500 font-sans relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
      
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-10 scrollbar-hide pb-24">
          <EmergencyHeader isSOSActive={isSOSActive} onSOSAction={handleSOSAction} onBack={() => navigate('/dashboard')} />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            <ResponseNetwork nearbyHospitals={nearbyHospitals} viewMode={viewMode} setViewMode={setViewMode} onDeploy={handleDeploy} deploymentStatus={deploymentStatus} />

            <div className="xl:col-span-5 space-y-12">
               <div className="bg-white dark:bg-[#151E32] rounded-[4.5rem] p-12 shadow-2xl border border-white dark:border-white/5 relative">
                  <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-[1.8rem] font-black text-slate-900 dark:text-white flex items-center gap-4 leading-none tracking-tight">
                            <User size={32} className="text-[#E11D48]" /> Trusted Network
                        </h2>
                        <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Verified Emergency Tier-1</p>
                    </div>
                    <button onClick={handleRefresh} className={`w-16 h-16 rounded-[24px] bg-slate-50 dark:bg-[#090E1A] shadow-md text-slate-400 hover:text-[#E11D48] transition-all flex items-center justify-center ${isSearching ? 'rotate-180 bg-red-500/10 text-red-500' : ''}`}>
                      <RefreshCw size={24} className={isSearching ? 'animate-spin' : ''} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {emergencyContacts.map((contact, i) => (
                      <div key={i} className="flex items-center justify-between p-8 rounded-[3.5rem] bg-[#F8FAFC] dark:bg-[#090E1A]/40 border border-slate-100 dark:border-white/5 hover:scale-[1.02] transition-all group/card">
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-[#E11D48] to-[#9F1239] text-white flex items-center justify-center font-black text-[1.4rem] shadow-xl group-hover/card:rotate-6 transition-transform">{contact.name[0]}</div>
                            <div>
                               <p className="text-[1.2rem] font-black text-slate-800 dark:text-white leading-none mb-1 tracking-tight">{contact.name}</p>
                               <p className="text-[0.75rem] font-black text-slate-400 uppercase tracking-[0.2em]">{contact.relation}</p>
                            </div>
                         </div>
                         <a href={`tel:${contact.phone}`} className="w-14 h-14 rounded-[22px] bg-white dark:bg-[#151E32] text-[#E11D48] flex items-center justify-center shadow-xl border border-slate-100 dark:border-white/5"><Phone size={24} /></a>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-10 py-6 border-3 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] text-[0.8rem] font-black text-slate-400 hover:text-[#E11D48] hover:border-red-500/30 transition-all uppercase tracking-[0.4em]">Augment Primary Hub</button>
               </div>

               <div className="bg-white dark:bg-[#090E1A] rounded-[2rem] p-10 border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden group/id">
                  <div className="absolute -top-10 -right-10 p-12 opacity-[0.03] dark:opacity-5 group-hover/id:rotate-12 transition-transform duration-1000 pointer-events-none"><Heart size={280} className="text-[#E11D48]" /></div>
                  <div className="flex items-center justify-between mb-10 relative z-10">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-[1.2rem] bg-[#E11D48]/10 flex items-center justify-center text-[#E11D48]"><ShieldCheck size={32} /></div>
                        <div>
                            <h3 className="text-[1.6rem] font-black text-slate-900 dark:text-white tracking-tight leading-none">Clinical ID</h3>
                            <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.4em] mt-1">Tier-1 Responder Access</p>
                        </div>
                    </div>
                    <button onClick={() => { navigator.clipboard.writeText('O+, Penicillin Allergy'); alert('ID Shared'); }} className="w-12 h-12 rounded-[0.8rem] bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-[#E11D48] transition-all flex items-center justify-center border border-slate-200 dark:border-white/5"><Share2 size={24} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-6 relative z-10">
                     <div className="p-7 rounded-[1.5rem] bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 hover:-translate-y-1 transition-all"><p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Biometric</p><p className="text-[1.8rem] font-black text-slate-900 dark:text-white tracking-tighter">O Positive</p></div>
                     <div className="p-7 rounded-[1.5rem] bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 hover:-translate-y-1 transition-all"><p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Critical Allergy</p><p className="text-[1.8rem] font-black text-rose-500 tracking-tighter">Penicillin</p></div>
                  </div>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmergencyPage;
