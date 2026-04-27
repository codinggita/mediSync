import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import EmergencyActionPanel from './components/EmergencyActionPanel';
import EmergencyContactList from './components/EmergencyContactList';

const EmergencyPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#ecf0f3] dark:bg-[#0B1121] transition-colors duration-500 font-sans relative">
      {/* Red Ambient Glow for Emergency State */}
      <div className="absolute inset-0 bg-red-500/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-8 py-8 scrollbar-hide pb-24 md:pb-10">
          <div className="max-w-6xl mx-auto flex flex-col gap-10">
            {/* Tactical Dashboard Header */}
            <div>
               <h1 className="text-[2.8rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
                 Emergency <span className="text-red-500">Protocols</span>
               </h1>
               <p className="text-slate-500 font-bold mt-3 uppercase tracking-[0.3em] text-[0.85rem]">Strategic Medical Response Environment</p>
            </div>

            {/* Main Response Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
               <div className="lg:col-span-12">
                  <EmergencyActionPanel />
               </div>
               
               <div className="lg:col-span-8">
                  <EmergencyContactList />
               </div>

               <div className="lg:col-span-4 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] p-10 shadow-2xl border border-white/40 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-6">
                     <AlertCircle size={48} />
                  </div>
                  <h3 className="text-[1.2rem] font-black text-slate-900 dark:text-white mb-2 uppercase">Bio-Metric Lock</h3>
                  <p className="text-[0.8rem] font-bold text-slate-400 leading-relaxed uppercase tracking-wider">Authentication required for full biological broadcast access.</p>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmergencyPage;
