import React from 'react';
import { Pill, Microscope, Share2, ChevronRight, Zap } from 'lucide-react';

const actions = [
  {
    label: 'Add Prescription',
    icon: Pill,
    color: '#2ECC71',
    bg: '#2ECC7110',
    desc: 'Medication & dosage',
  },
  {
    label: 'Order Test',
    icon: Microscope,
    color: '#8B5CF6',
    bg: '#8B5CF610',
    desc: 'Labs & imaging',
  },
  {
    label: 'Share Record',
    icon: Share2,
    color: '#2A7FFF',
    bg: '#2A7FFF10',
    desc: 'Secure external access',
  },
];

const QuickActions = () => {
  return (
    <div className="bg-white dark:bg-[#151E32] border border-gray-100 dark:border-slate-700/50 rounded-[14px] p-5 shadow-sm transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={16} className="text-[#F59E0B]" />
        <h3 className="font-black text-[#1F2937] dark:text-white text-[0.92rem]">Quick Actions</h3>
      </div>

      <div className="flex flex-col gap-3">
        {actions.map(({ label, icon: Icon, color, bg, desc }) => (
          <button
            key={label}
            className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-gray-100 dark:hover:border-slate-800 hover:bg-gray-50 dark:hover:bg-[#1A2642]/50 transition-all group text-left"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ backgroundColor: bg }}
            >
              <Icon size={18} style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[0.82rem] font-bold text-[#1F2937] dark:text-white leading-none">{label}</p>
              <p className="text-[0.65rem] text-gray-400 mt-1 font-medium">{desc}</p>
            </div>
            <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
