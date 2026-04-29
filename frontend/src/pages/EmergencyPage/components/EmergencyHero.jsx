import React from 'react';
import { AlertTriangle, PackageX } from 'lucide-react';

const EmergencyHero = () => {
  return (
    <div className="flex flex-col gap-4 em-card">
      {/* Alert Icon + Title */}
      <div className="flex flex-col items-center gap-3 py-6">
        {/* Pulsing Icon */}
        <div className="relative flex items-center justify-center">
          <div className="pulse-ring-1 absolute w-20 h-20 rounded-full bg-[#D32F2F]" />
          <div className="pulse-ring-2 absolute w-20 h-20 rounded-full bg-[#D32F2F]" />
          <div className="relative w-20 h-20 rounded-full bg-[#D32F2F] flex items-center justify-center shadow-[0_8px_24px_rgba(211,47,47,0.45)] z-10">
            <AlertTriangle size={36} className="text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-[#D32F2F] tracking-tight">Emergency Mode</h1>
          <p className="text-sm text-red-400 font-semibold mt-1">Active — Help is being arranged</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-[14px] border border-red-100 shadow-md overflow-hidden">
        {/* No medicine warning */}
        <div className="flex items-center gap-3 px-5 py-4 bg-red-50 border-b border-red-100">
          <PackageX size={20} className="text-[#D32F2F] flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-[#D32F2F]">No medicine available nearby</p>
            <p className="text-xs text-red-400 mt-0.5">Searching within 5 km radius...</p>
          </div>
        </div>

        {/* Radar Map */}
        <div className="relative h-52 overflow-hidden bg-gray-900">
          {/* Blurred map background */}
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80"
            alt="Radar map"
            className="w-full h-full object-cover opacity-30 blur-[2px] scale-110"
          />

          {/* Radar overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Radar circles */}
            {[80, 60, 40, 20].map((size) => (
              <div
                key={size}
                className="absolute rounded-full border border-red-400/30"
                style={{ width: `${size}%`, height: `${size}%` }}
              />
            ))}

            {/* Sweep */}
            <div className="absolute w-[40%] h-[40%] radar-sweep origin-bottom-center">
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-t from-[#D32F2F] to-transparent"
                style={{ height: '100%' }}
              />
            </div>

            {/* Center dot */}
            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#D32F2F] shadow-[0_0_12px_rgba(211,47,47,0.9)]" />
              <span className="text-white text-[10px] font-bold tracking-widest uppercase opacity-80">
                Your Location
              </span>
            </div>

            {/* Hospital blips */}
            {[
              { top: '30%', left: '25%' },
              { top: '55%', left: '70%' },
              { top: '65%', left: '35%' },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                style={{ top: pos.top, left: pos.left }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHero;
