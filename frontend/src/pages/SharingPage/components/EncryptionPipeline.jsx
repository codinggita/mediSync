import React from 'react';
import { FolderOpen, Lock, Share2, ShieldCheck, CheckCircle } from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: FolderOpen,
    label: 'Select Data',
    desc: 'Choose records to share',
    color: '#2A7FFF',
    bg: '#2A7FFF12',
  },
  {
    step: 2,
    icon: Lock,
    label: 'Encrypt',
    desc: 'AES-256 encryption applied',
    color: '#8B5CF6',
    bg: '#8B5CF612',
  },
  {
    step: 3,
    icon: Share2,
    label: 'Share Securely',
    desc: 'Link sent to recipient',
    color: '#2ECC71',
    bg: '#2ECC7112',
  },
];

const EncryptionPipeline = () => {
  return (
    <div className="bg-white dark:bg-[#151E32] border border-gray-100 dark:border-slate-700/50 rounded-2xl p-5 shadow-sm transition-colors">
      {}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#2A7FFF]/10 flex items-center justify-center">
            <ShieldCheck size={16} className="text-[#2A7FFF]" />
          </div>
          <div>
            <h3 className="text-[0.92rem] font-extrabold text-[#1F2937] dark:text-white leading-none">
              Encryption Pipeline
            </h3>
            <p className="text-[0.65rem] text-gray-400 mt-0.5">
              End-to-end secure transfer protocol
            </p>
          </div>
        </div>

        {}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30">
          <Lock size={11} className="text-[#8B5CF6]" />
          <span className="text-[0.65rem] font-extrabold text-[#8B5CF6] tracking-wider">
            AES-256
          </span>
          <CheckCircle size={11} className="text-[#2ECC71]" />
        </div>
      </div>

      {}
      <div className="flex flex-col sm:flex-row items-stretch gap-0">
        {steps.map(({ step, icon: Icon, label, desc, color, bg }, i) => (
          <div key={step} className="flex sm:flex-col items-center sm:items-stretch flex-1">
            {}
            <div
              className="flex-1 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5 group cursor-default"
              style={{ borderColor: `${color}25`, backgroundColor: bg }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border-2 transition-transform group-hover:scale-105"
                style={{ backgroundColor: `${color}15`, borderColor: `${color}30` }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <div>
                <p
                  className="text-[0.7rem] font-extrabold uppercase tracking-widest"
                  style={{ color }}
                >
                  Step {step}
                </p>
                <p className="text-[0.88rem] font-bold text-[#1F2937] dark:text-white leading-snug">
                  {label}
                </p>
                <p className="text-[0.72rem] text-gray-400 mt-0.5">{desc}</p>
              </div>
            </div>

            {}
            {i < steps.length - 1 && (
              <div className="flex items-center justify-center w-8 h-8 sm:w-auto sm:h-8 shrink-0">
                <div className="w-6 h-0.5 sm:hidden bg-gradient-to-r from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600" />
                <div className="hidden sm:flex flex-col items-center w-full px-2">
                  <div className="flex-1 h-0.5 w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-gray-300 dark:border-slate-600 rotate-45" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {}
      <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#2ECC71]/8 border border-[#2ECC71]/20">
        <ShieldCheck size={14} className="text-[#2ECC71] shrink-0" />
        <p className="text-[0.72rem] text-[#2ECC71] font-semibold">
          All records are encrypted locally before transmission. Zero-knowledge architecture ensures
          your data is never readable by MediSync servers.
        </p>
      </div>
    </div>
  );
};

export default EncryptionPipeline;
