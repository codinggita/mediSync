import React from 'react';
import { AlertTriangle, MapPin, Activity } from 'lucide-react';

const EmergencyHero = () => {
  return (
    <div className="flex flex-col gap-6">

      {/* Alert Icon + Title */}
      <div className="flex flex-col items-center gap-4 py-6">
        {/* Pulsing Icon */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-[#D32F2F]/20 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute w-32 h-32 rounded-full bg-[#D32F2F]/10 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#D32F2F] to-[#9A1B1B] flex items-center justify-center shadow-[0_0_40px_rgba(211,47,47,0.6)] z-10 border-4 border-[#150A0A]">
            <AlertTriangle size={36} className="text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-[2rem] font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(211,47,47,0.8)]">
            EMERGENCY MODE
          </h1>
          <p className="text-[0.85rem] text-[#EF4444] font-bold mt-1 tracking-widest uppercase flex items-center justify-center gap-2">
            <Activity size={14} className="animate-pulse" /> Scanning for immediate care...
          </p>
        </div>
      </div>

      {/* Main Radar Card */}
      <div className="bg-[#150A0A] rounded-[20px] border border-[#D32F2F]/30 shadow-[0_10px_40px_rgba(211,47,47,0.15)] overflow-hidden relative">
        
        {/* Radar Map */}
        <div className="relative h-64 overflow-hidden bg-black flex items-center justify-center">
          
          {/* Map background */}
          <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />

          {/* Radar circles */}
          {[80, 60, 40, 20].map((size) => (
            <div
              key={size}
              className="absolute rounded-full border border-[#D32F2F]/20 shadow-[inset_0_0_20px_rgba(211,47,47,0.1)]"
              style={{ width: `${size}%`, height: `${size}%` }}
            />
          ))}

          {/* Sweep Animation */}
          <div className="absolute w-[50%] h-[50%] origin-bottom-right animate-[spin_4s_linear_infinite]">
             <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-[#D32F2F]/10 to-[#D32F2F]/40 border-r-2 border-[#D32F2F]/80 rounded-tl-full" />
          </div>

          {/* Center User Pin */}
          <div className="relative z-10 flex flex-col items-center gap-1.5">
            <div className="relative flex items-center justify-center">
               <div className="absolute w-8 h-8 bg-[#2A7FFF]/30 rounded-full animate-ping" />
               <div className="w-4 h-4 rounded-full bg-[#2A7FFF] border-2 border-white shadow-[0_0_20px_#2A7FFF]" />
            </div>
            <span className="bg-[#150A0A]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[0.6rem] font-bold tracking-widest uppercase border border-[#2A7FFF]/30">
              Your Location
            </span>
          </div>

          {/* Hospital blips */}
          {[
            { top: '20%', left: '30%', name: 'City Hospital', dist: '1.2km' },
            { top: '65%', left: '75%', name: 'Apollo ER', dist: '3.4km' },
            { top: '70%', left: '25%', name: 'Medicenter', dist: '5.1km' },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute flex flex-col items-center gap-1 group cursor-pointer"
              style={{ top: pos.top, left: pos.left }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shadow-[0_0_12px_#EF4444] animate-pulse" />
              <div className="bg-[#150A0A]/90 backdrop-blur-md px-2 py-1 rounded border border-[#EF4444]/40 opacity-0 group-hover:opacity-100 transition-opacity">
                 <p className="text-[0.6rem] text-white font-bold whitespace-nowrap">{pos.name}</p>
                 <p className="text-[0.55rem] text-[#EF4444] font-black">{pos.dist}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Status bar inside radar */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-[#D32F2F]/30 px-3 py-1.5 rounded-lg flex items-center gap-2">
           <MapPin size={12} className="text-[#D32F2F]" />
           <span className="text-[0.65rem] font-bold text-white uppercase tracking-wider">Sector 18, Noida</span>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHero;
