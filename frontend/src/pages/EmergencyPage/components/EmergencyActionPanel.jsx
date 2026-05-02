import React from 'react';
import { AlertCircle, Phone, Navigation, Shield } from 'lucide-react';

const EmergencyActionPanel = () => {
  return (
    <div className="bg-red-500 rounded-[4rem] p-12 text-white shadow-[0_20px_50px_rgba(239,68,68,0.4)] relative overflow-hidden group">
      {}
      <div className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center backdrop-blur-xl border border-white/30">
            <AlertCircle size={32} className="animate-bounce" />
          </div>
          <div>
            <h2 className="text-[2.2rem] font-black tracking-tighter uppercase leading-none">
              Critical Response
            </h2>
            <p className="text-[0.9rem] font-bold opacity-80 mt-1 uppercase tracking-widest">
              Immediate Tactical Activation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button
            onClick={() => (window.location.href = 'tel:8799342780')}
            className="bg-white text-red-500 p-8 rounded-[3rem] flex flex-col items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-xl group/btn"
          >
            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center group-hover/btn:bg-red-500 group-hover/btn:text-white transition-colors">
              <Phone size={32} />
            </div>
            <span className="text-[1.2rem] font-black uppercase">Emergency SOS</span>
            <p className="text-[0.7rem] font-bold opacity-60 uppercase tracking-widest">
              Connect to 8799342780
            </p>
          </button>
          <button className="bg-red-600 text-white p-8 rounded-[3rem] flex flex-col items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-xl border border-white/20 group/btn">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-red-500 transition-colors">
              <Navigation size={32} />
            </div>
            <span className="text-[1.2rem] font-black uppercase">Nearby Trauma Center</span>
            <p className="text-[0.7rem] font-bold opacity-60 uppercase tracking-widest">
              Reroute Navigation
            </p>
          </button>
        </div>

        <div className="mt-10 p-6 bg-black/10 rounded-[2.5rem] border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Shield size={24} className="text-white/60" />
            <span className="text-[0.9rem] font-black uppercase tracking-widest">
              Secured Bio-ID Broadcast Active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="text-[0.7rem] font-black opacity-80 uppercase tracking-tighter">
              Live Sync
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyActionPanel;
