import React from 'react';
import { Activity, ShieldCheck, Database, HardDrive, Cpu } from 'lucide-react';

const stats = [
  { name: 'API Latency', value: '124ms', status: 'Healthy', color: '#2ECC71' },
  { name: 'Server Uptime', value: '99.98%', status: 'Stable', color: '#2A7FFF' },
  { name: 'DB Load', value: '42%', status: 'Optimal', color: '#8B5CF6' },
  { name: 'Storage', value: '2.4 TB', status: 'Healthy', color: '#F59E0B' },
];

const SystemHealthPanel = () => {
  return (
    <div className="bg-white dark:bg-[#151E32] border border-gray-100 dark:border-slate-700/50 rounded-[14px] p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#2ECC71]/10 flex items-center justify-center">
          <Activity size={18} className="text-[#2ECC71]" />
        </div>
        <div>
          <h3 className="font-black text-[#1F2937] dark:text-white text-[0.92rem]">
            System Health
          </h3>
          <p className="text-[0.6rem] text-gray-400 font-bold uppercase tracking-wider">
            Real-time infrastructure
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((s) => (
          <div
            key={s.name}
            className="p-3 rounded-xl border border-gray-50 dark:border-slate-800 bg-gray-50/50 dark:bg-[#0B1121]/30"
          >
            <p className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">
              {s.name}
            </p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <p className="text-[1rem] font-black text-[#1F2937] dark:text-white leading-none">
                {s.value}
              </p>
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: s.color }}
              />
            </div>
            <p className="text-[0.6rem] font-bold mt-1.5" style={{ color: s.color }}>
              {s.status}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 p-3 rounded-xl bg-[#2A7FFF]/5 border border-[#2A7FFF]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#2A7FFF]" />
            <p className="text-[0.7rem] font-bold text-gray-600 dark:text-slate-300">
              Security: <span className="text-[#2A7FFF]">Verified</span>
            </p>
          </div>
          <p className="text-[0.62rem] font-bold text-gray-400">v2.1.0-prod</p>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthPanel;
