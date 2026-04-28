import React from 'react';
import { Activity, ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';

const AdminStatSummary = ({ alerts, isDarkMode }) => {
  const stats = [
    { label: 'Total Logs',   count: alerts.length,                                       color: '#2A7FFF', icon: Activity },
    { label: 'Critical',      count: alerts.filter(a=>a.severity==='critical').length,   color: '#E11D48', icon: ShieldAlert },
    { label: 'Warnings',      count: alerts.filter(a=>a.severity==='warning').length,    color: '#F59E0B', icon: AlertTriangle },
    { label: 'Health OK',     status: '99.8%',                                          color: '#2ECC71', icon: ShieldCheck },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map(s => (
        <div key={s.label} className={`rounded-[2rem] p-7 transition-all duration-300 hover:scale-[1.05] ${
          isDarkMode 
            ? 'bg-[#151E32] shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]' 
            : 'bg-[#ecf0f3] shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff]'
        }`}>
          <s.icon size={22} style={{ color: s.color }} className="mb-4" />
          <p className={`text-[2.2rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
            {s.count ?? s.status}
          </p>
          <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] mt-3 opacity-60" style={{ color: s.color }}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdminStatSummary;
