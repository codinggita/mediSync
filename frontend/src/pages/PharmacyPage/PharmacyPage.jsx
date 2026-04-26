import React, { useState } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import MedicineSearchPanel from './components/MedicineSearchPanel';
import NearbyPharmacies from './components/NearbyPharmacies';
import SavedMedicinesPanel from './components/SavedMedicinesPanel';
import { Pill, Activity, Zap } from 'lucide-react';
import medicineBoxImg from '../../assets/images/medicine_box.png';
import inhalerImg from '../../assets/images/inhaler.png';
import eyeDropsImg from '../../assets/images/eye_drops.png';

const PharmacyPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#ecf0f3] dark:bg-[#0f141f] transition-colors duration-500 font-sans relative">
      {/* ── Background Architecture ────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,127,255,0.03),transparent)] pointer-events-none" />
      
      {/* Floating 3D Artifacts */}
      <div className="absolute top-[15%] right-[5%] animate-float opacity-30 pointer-events-none" style={{ animationDelay: '0s' }}>
        <img src={medicineBoxImg} alt="" className="w-48 object-contain drop-shadow-2xl" />
      </div>
      <div className="absolute bottom-[10%] left-[20%] animate-float-slow opacity-20 pointer-events-none" style={{ animationDelay: '1s' }}>
        <img src={inhalerImg} alt="" className="w-40 object-contain drop-shadow-2xl rotate-12" />
      </div>
      <div className="absolute top-[40%] right-[15%] animate-float opacity-10 pointer-events-none" style={{ animationDelay: '2s' }}>
        <img src={eyeDropsImg} alt="" className="w-32 object-contain drop-shadow-2xl -rotate-12" />
      </div>

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-8 scrollbar-hide pb-24 md:pb-10">
          
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-3xl bg-[#ecf0f3] dark:bg-[#1a2235] flex items-center justify-center shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#263350]">
                <div className="w-10 h-10 rounded-2xl bg-[#2A7FFF]/10 flex items-center justify-center">
                  <Pill size={26} className="text-[#2A7FFF] drop-shadow-sm" />
                </div>
              </div>
              <div>
                <h1 className="text-[1.8rem] font-black text-slate-900 dark:text-white leading-none tracking-tight flex items-center gap-3">
                  Pharmacy Hub
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[0.6rem] rounded-full font-black uppercase tracking-widest border border-emerald-500/20">Active Intelligence</span>
                </h1>
                <p className="text-[0.8rem] text-slate-400 mt-2 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                  <Zap size={12} className="text-amber-500" />
                  Find, Compare & Track Clinical Artifacts
                </p>
              </div>
            </div>
          </div>

          {/* 1. Medicine Search & Compare */}
          <MedicineSearchPanel />

          {/* 2. Full-width Nearby Pharmacies */}
          <div className="w-full">
            <NearbyPharmacies />
          </div>

          {/* 3. Saved Medicines (Full width) */}
          <SavedMedicinesPanel />

        </main>
      </div>
    </div>
  );
};

export default PharmacyPage;

