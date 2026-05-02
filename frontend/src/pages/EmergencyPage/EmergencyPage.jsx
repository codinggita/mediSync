import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import EmergencyActionPanel from './components/EmergencyActionPanel';
import EmergencyContactList from './components/EmergencyContactList';

const EmergencyPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleAuthenticate = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsUnlocked(true);
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#ecf0f3] dark:bg-[#0B1121] transition-colors duration-500 font-sans relative">
      {}
      <div className="absolute inset-0 bg-red-500/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-8 py-8 scrollbar-hide pb-24 md:pb-10">
          <div className="max-w-6xl mx-auto flex flex-col gap-10">
            {}
            <div>
              <h1 className="text-[2.8rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
                Emergency <span className="text-red-500">Protocols</span>
              </h1>
              <p className="text-slate-500 font-bold mt-3 uppercase tracking-[0.3em] text-[0.85rem]">
                Strategic Medical Response Environment
              </p>
            </div>

            {}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-12">
                <EmergencyActionPanel />
              </div>

              <div className="lg:col-span-8">
                <EmergencyContactList />
              </div>

              <div className="lg:col-span-4 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] p-10 shadow-2xl border border-white/40 flex flex-col items-center justify-center text-center group cursor-pointer overflow-hidden relative" onClick={!isUnlocked ? handleAuthenticate : null}>
                {isUnlocked && <div className="absolute inset-0 bg-emerald-500/5 animate-in fade-in duration-500" />}
                
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${isUnlocked ? 'bg-emerald-500 text-white scale-110 shadow-[0_0_30px_rgba(16,185,129,0.4)]' : 'bg-red-500/10 text-red-500 group-hover:scale-110'}`}>
                  {isAuthenticating ? (
                    <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : isUnlocked ? (
                    <div className="flex flex-col items-center">
                      <AlertCircle size={48} className="animate-pulse" />
                      <span className="text-[0.6rem] font-black mt-1">SECURE</span>
                    </div>
                  ) : (
                    <AlertCircle size={48} />
                  )}
                </div>
                
                <h3 className={`text-[1.2rem] font-black mb-2 uppercase transition-colors ${isUnlocked ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                  {isAuthenticating ? 'Authenticating...' : isUnlocked ? 'Bio-Metric Unlocked' : 'Bio-Metric Lock'}
                </h3>
                <p className="text-[0.8rem] font-bold text-slate-400 leading-relaxed uppercase tracking-wider">
                  {isUnlocked 
                    ? 'Biological broadcast access granted. Tactical network synchronized.' 
                    : 'Authentication required for full biological broadcast access.'}
                </p>
                
                {!isUnlocked && !isAuthenticating && (
                  <div className="mt-8 text-[#2A7FFF] text-[0.7rem] font-black uppercase tracking-[0.2em] animate-pulse">
                    Touch to Synchronize
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmergencyPage;
