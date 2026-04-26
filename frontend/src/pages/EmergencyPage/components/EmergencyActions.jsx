import React, { useState } from 'react';
import { Phone, Stethoscope, Loader2 } from 'lucide-react';

const EmergencyActions = () => {
  const [calling, setCalling] = useState(false);

  const handleCall = () => {
    setCalling(true);
    setTimeout(() => setCalling(false), 3000);
  };

  return (
    <div className="flex flex-col gap-3 em-card2">

      {/* Emergency Call Button */}
      <button
        onClick={handleCall}
        disabled={calling}
        className="btn-breathe w-full flex items-center justify-center gap-3 bg-[#D32F2F] text-white py-4 rounded-[14px] font-extrabold text-lg shadow-[0_8px_24px_rgba(211,47,47,0.35)] hover:bg-[#B71C1C] active:scale-[0.98] disabled:opacity-80 transition-all duration-200"
      >
        {calling ? (
          <>
            <Loader2 size={22} className="animate-spin" />
            Connecting to Emergency...
          </>
        ) : (
          <>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Phone size={20} className="text-white" />
            </div>
            Emergency Call — 112
          </>
        )}
      </button>

      {/* Contact Doctor Button */}
      <button className="w-full flex items-center justify-center gap-3 bg-white border-[2px] border-[#D32F2F] text-[#D32F2F] py-3.5 rounded-[14px] font-bold text-base hover:bg-red-50 active:scale-[0.98] transition-all duration-200 shadow-sm">
        <Stethoscope size={20} />
        Contact Your Doctor
      </button>

      {/* Disclaimer */}
      <p className="text-center text-[11px] text-red-400 font-medium leading-relaxed">
        If this is a life-threatening emergency, call <strong>112</strong> immediately.
        <br />Do not wait for app response.
      </p>
    </div>
  );
};

export default EmergencyActions;
