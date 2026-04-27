import React from 'react';
import { Radio, ArrowLeft, Zap, Radar, LocateFixed } from 'lucide-react';

const EmergencyHeader = ({ isSOSActive, onSOSAction, onBack }) => (
  <div className={`relative rounded-[3.5rem] p-12 transition-all duration-700 overflow-hidden shadow-2xl ${isSOSActive ? 'bg-[#E11D48] shadow-red-500/30' : 'bg-slate-800 shadow-slate-900/30'}`}>
    {isSOSActive && (
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-1/2 animate-[shimmer_2s_infinite] -skew-x-12"></div>
      </div>
    )}
    
    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
      <div className="max-w-3xl">
        <button onClick={onBack} className="flex items-center gap-3 mb-8 px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 transition-all active:scale-95 group/back">
          <ArrowLeft size={18} className="group-hover/back:-translate-x-1 transition-transform" />
          <span className="font-black text-[0.75rem] uppercase tracking-[0.3em]">Stand Down Protocol</span>
        </button>
        
        <div className="flex items-center gap-6 mb-6">
          <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl ${isSOSActive ? 'bg-white text-red-600 animate-pulse' : 'bg-white/10 text-white'}`}>
            <Radio size={40} />
          </div>
          <div>
            <h1 className="text-[3rem] font-black leading-none tracking-tighter text-white">
              {isSOSActive ? 'SOS BROADCASTING' : 'READY FOR RESPONSE'}
            </h1>
            <p className="text-white/70 text-[1.1rem] font-bold mt-2 uppercase tracking-[0.2em]">Telemetry Link: Verified • Latency: 24ms</p>
          </div>
        </div>
        
        <p className="text-white/90 text-[1.2rem] font-medium leading-relaxed max-w-2xl">
          Your clinical ID and real-time biometrics are being transmitted. <strong>Emergency contacts have been notified.</strong>
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <button onClick={onSOSAction} className={`w-32 h-32 rounded-full flex flex-col items-center justify-center gap-2 font-black uppercase text-[0.8rem] transition-all shadow-2xl relative z-10 ${isSOSActive ? 'bg-white text-red-600 scale-110' : 'bg-red-600 text-white hover:scale-105'}`}>
            {isSOSActive ? <Zap size={32} className="animate-bounce" /> : <Radar size={32} />}
            {isSOSActive ? 'Active' : 'Deploy'}
          </button>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-full border border-white/10">
          <LocateFixed size={14} className="text-[#2ECC71]" />
          <span className="text-[0.6rem] font-black text-white/80 uppercase tracking-widest">Live Tracking Active</span>
        </div>
      </div>
    </div>
  </div>
);

export default EmergencyHeader;
