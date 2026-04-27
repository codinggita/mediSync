import React from 'react';
import { ShieldCheck, CheckCircle, Lock } from 'lucide-react';

const PlanCard = ({ plan, isSelected, onSelect }) => {
  const isPro = plan.id === 'Pro';
  
  return (
    <button
      type="button"
      onClick={() => onSelect(plan.id)}
      className={`p-6 rounded-[2.5rem] text-left transition-all duration-500 border-2 relative overflow-hidden group ${
        isSelected 
          ? 'bg-[#ecf0f3] border-[#2A7FFF]/40 shadow-[inset_8px_8px_16px_#cbced1,inset_-8px_-8px_16px_#ffffff]' 
          : 'bg-[#ecf0f3] border-transparent shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff] hover:shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff]'
      }`}
    >
      {isPro && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-[#2A7FFF] to-[#1C71E1] text-white px-6 py-2 text-[0.6rem] font-black uppercase tracking-widest rounded-bl-2xl shadow-lg group-hover:px-8 transition-all">
          Clinical Elite
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className={`font-black text-[1.2rem] ${isPro ? 'text-[#2A7FFF]' : 'text-slate-800'}`}>{plan.label}</h4>
          <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">{isPro ? 'Enterprise Tier' : 'Community Tier'}</p>
        </div>
        <span className={`text-[1rem] font-black bg-white/50 px-3 py-1 rounded-lg ${isPro ? 'text-[#2A7FFF]' : 'text-slate-900'}`}>{plan.price}</span>
      </div>
      
      <ul className="space-y-2 mb-2">
        {plan.features.map((feature, i) => (
          <li key={i} className={`flex items-center gap-2 text-[0.75rem] font-bold ${isSelected || isPro ? 'text-slate-600' : 'text-slate-400 opacity-60'}`}>
            {isSelected || isPro ? <CheckCircle size={14} className={isPro ? 'text-[#2A7FFF]' : 'text-emerald-500'} /> : <Lock size={12} />}
            {feature}
          </li>
        ))}
      </ul>

      {isSelected && (
        <div className="mt-4 flex items-center gap-2 text-[#2A7FFF] text-[0.7rem] font-black uppercase animate-pulse">
          <ShieldCheck size={14} /> Plan Selected
        </div>
      )}
    </button>
  );
};

export default PlanCard;
