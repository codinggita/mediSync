import React, { useState } from 'react';
import { MessageCircle, X, Phone, Zap, ShieldCheck, Activity } from 'lucide-react';

const FloatingSupport = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hello MediSync Support, I need clinical assistance.');
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-6">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] p-8 shadow-[20px_20px_60px_#cbced1,-20px_-20px_60px_#ffffff] dark:shadow-[20px_20px_60px_#0a0f1d] border border-white/40 mb-4 animate-in slide-in-from-bottom-10 fade-in duration-500 w-80">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[1.3rem] font-black text-slate-900 dark:text-white flex items-center gap-3">
              <ShieldCheck className="text-[#2A7FFF]" size={24} />
              Tactical Support
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleWhatsApp}
              className="w-full p-6 bg-white dark:bg-[#0B1121] rounded-[2rem] flex items-center gap-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shadow-inner group-hover:bg-[#25D366] group-hover:text-white transition-all">
                <MessageCircle size={24} />
              </div>
              <div className="text-left">
                <p className="text-[0.95rem] font-black text-slate-800 dark:text-white">
                  WhatsApp Sync
                </p>
                <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest">
                  Instant Clinical Chat
                </p>
              </div>
            </button>

            <button
              onClick={() => (window.location.href = 'tel:+919876543210')}
              className="w-full p-6 bg-white dark:bg-[#0B1121] rounded-[2rem] flex items-center gap-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#2A7FFF]/10 flex items-center justify-center text-[#2A7FFF] shadow-inner group-hover:bg-[#2A7FFF] group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <div className="text-left">
                <p className="text-[0.95rem] font-black text-slate-800 dark:text-white">
                  Voice Uplink
                </p>
                <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest">
                  Priority Doctor Call
                </p>
              </div>
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200/50 dark:border-white/5">
            <div className="flex items-center justify-between text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2">
                <Activity size={12} className="text-[#2ECC71]" /> Link Active
              </span>
              <span>Encrypted</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-500 shadow-[10px_10px_30px_rgba(42,127,255,0.4)] ${isOpen ? 'bg-[#1F2937] rotate-90 scale-90' : 'bg-[#2A7FFF] hover:scale-110 hover:shadow-[10px_10px_40px_rgba(42,127,255,0.6)] animate-bounce'}`}
      >
        {isOpen ? (
          <X size={32} className="text-white" />
        ) : (
          <Zap size={32} className="text-white fill-white" />
        )}

        {/* Radar Ring Animation */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-[2rem] border-4 border-[#2A7FFF] animate-ping opacity-20"></div>
        )}
      </button>
    </div>
  );
};

export default FloatingSupport;
