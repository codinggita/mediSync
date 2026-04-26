import React from 'react';
import { AlertCircle, ShieldCheck, Lock, CheckCircle, ArrowRight } from 'lucide-react';

const PlanSelection = ({ selectedPlan, setSelectedPlan, setStep }) => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[0.6rem] font-black uppercase tracking-widest mb-3 shadow-sm border border-amber-200">
          <AlertCircle size={10} /> Selection Required
        </div>
        <h3 className="text-[1.4rem] font-black text-slate-800 leading-tight">Activate Your Biological Vault</h3>
        <p className="text-[0.8rem] text-slate-500 font-bold mt-1">Choose a foundation for your health data.</p>
      </div>

      <div className="flex flex-col gap-5">
        <button
          type="button"
          onClick={() => setSelectedPlan('Free')}
          className={`p-6 rounded-[2.5rem] text-left transition-all duration-500 border-2 ${
            selectedPlan === 'Free' 
              ? 'bg-[#ecf0f3] border-[#2A7FFF]/40 shadow-[inset_8px_8px_16px_#cbced1,inset_-8px_-8px_16px_#ffffff]' 
              : 'bg-[#ecf0f3] border-transparent shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff] hover:shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff]'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-black text-slate-800 text-[1.2rem]">Biological Starter</h4>
              <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Community Tier</p>
            </div>
            <span className="text-[1rem] font-black text-slate-900 bg-white/50 px-3 py-1 rounded-lg">₹0</span>
          </div>
          
          <ul className="space-y-2 mb-2">
            {[
              { text: '50MB Clinical Storage', included: true },
              { text: 'Basic Vital Tracking', included: true },
              { text: 'AI Price Alerts', included: false },
              { text: 'Family Vault Sync', included: false },
            ].map((f, i) => (
              <li key={i} className={`flex items-center gap-2 text-[0.75rem] font-bold ${f.included ? 'text-slate-600' : 'text-slate-400 opacity-60'}`}>
                {f.included ? <CheckCircle size={14} className="text-emerald-500" /> : <Lock size={12} />}
                {f.text}
              </li>
            ))}
          </ul>
          {selectedPlan === 'Free' && <div className="mt-4 flex items-center gap-2 text-[#2A7FFF] text-[0.7rem] font-black uppercase animate-pulse"><ShieldCheck size={14} /> Plan Selected</div>}
        </button>

        <button
          type="button"
          onClick={() => setSelectedPlan('Pro')}
          className={`p-6 rounded-[2.5rem] text-left transition-all duration-500 border-2 relative overflow-hidden ${
            selectedPlan === 'Pro' 
              ? 'bg-[#ecf0f3] border-[#2A7FFF]/60 shadow-[inset_8px_8px_16px_#cbced1,inset_-8px_-8px_16px_#ffffff]' 
              : 'bg-[#ecf0f3] border-transparent shadow-[12px_12px_24px_#cbced1,-12px_-12px_24px_#ffffff] hover:shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff]'
          }`}
        >
          <div className="absolute top-0 right-0 bg-gradient-to-l from-[#2A7FFF] to-[#1C71E1] text-white px-6 py-2 text-[0.6rem] font-black uppercase tracking-widest rounded-bl-2xl shadow-lg">Clinical Elite</div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-black text-[#2A7FFF] text-[1.2rem]">Advanced Portal</h4>
              <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Enterprise Tier</p>
            </div>
            <span className="text-[1rem] font-black text-[#2A7FFF] bg-white/50 px-3 py-1 rounded-lg">₹199</span>
          </div>

          <ul className="space-y-2 mb-2">
            {[
              { text: 'Unlimited Health Records', included: true },
              { text: 'Real-time AI Biometrics', included: true },
              { text: 'Priority Market Alerts', included: true },
              { text: 'Multi-Family Access', included: true },
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-[0.75rem] font-black text-slate-700">
                <CheckCircle size={14} className="text-[#2A7FFF]" />
                {f.text}
              </li>
            ))}
          </ul>
          {selectedPlan === 'Pro' && <div className="mt-4 flex items-center gap-2 text-[#2A7FFF] text-[0.7rem] font-black uppercase animate-pulse"><ShieldCheck size={14} /> Plan Selected</div>}
        </button>
      </div>

      <button 
        type="button"
        onClick={() => setStep(1)}
        className="w-full flex items-center justify-center gap-2 bg-[#2A7FFF] text-white py-5 rounded-2xl font-black text-[1rem] shadow-[0_10px_20px_rgba(42,127,255,0.3)] hover:-translate-y-1 transition-all active:scale-95 mt-4 group"
      >
        Continue to Setup <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>

      <p className="text-center text-[0.75rem] text-slate-400 font-medium">You can upgrade or change plans anytime later.</p>
    </div>
  );
};

export default PlanSelection;
