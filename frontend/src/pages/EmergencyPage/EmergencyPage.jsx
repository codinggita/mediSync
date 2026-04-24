import React from 'react';
import EmergencyHero from './components/EmergencyHero';
import EmergencyActions from './components/EmergencyActions';
import NearbyHospitals from './components/NearbyHospitals';
import './EmergencyPage.css';

const EmergencyPage = () => {
  return (
    <div className="min-h-screen bg-[#FFF5F5] font-sans flex flex-col">

      {/* Top bar */}
      <div className="bg-[#D32F2F] px-6 py-3 flex items-center justify-between shadow-md">
        <span className="text-white font-bold text-base tracking-wide">MediSync</span>
        <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">Emergency Mode</span>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-xl w-full mx-auto px-4 py-6 flex flex-col gap-5">
        <EmergencyHero />
        <EmergencyActions />
        <NearbyHospitals />
      </div>

      {/* Footer strip */}
      <div className="bg-[#D32F2F]/10 border-t border-red-100 py-3 text-center">
        <p className="text-xs text-[#D32F2F] font-semibold">
          🔴 Emergency services are being notified of your location
        </p>
      </div>
    </div>
  );
};

export default EmergencyPage;
