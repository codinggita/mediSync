import React from 'react';
import { AlertTriangle, Zap, Calendar, FileText } from 'lucide-react';

const SettingsTelemetryPanel = ({ telemetryState, onToggle }) => {
  const alertOptions = [
    {
      id: 'vitals',
      label: 'Critical Health Vitals Anomaly',
      sub: 'Instant SMS & Push for Biometric spikes',
      icon: AlertTriangle,
      color: '#E11D48',
    },
    {
      id: 'priceDrops',
      label: 'Medicine Price Drops',
      sub: 'Alerts when wishlist drugs drop in price',
      icon: Zap,
      color: '#F59E0B',
    },
    {
      id: 'appointments',
      label: 'Upcoming Appointments',
      sub: 'Reminders 24 hours and 1 hour prior',
      icon: Calendar,
      color: '#2A7FFF',
    },
    {
      id: 'records',
      label: 'New Clinical Records',
      sub: 'Notify when labs/reports are uploaded',
      icon: FileText,
      color: '#2ECC71',
    },
  ];

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-right-10 duration-700">
      <h2 className="text-[1.8rem] font-black text-slate-900 dark:text-white mb-10 tracking-tight">
        Telemetry Alerts HUD
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {alertOptions.map((alertOpt) => (
          <div
            key={alertOpt.id}
            className="p-8 bg-slate-50 dark:bg-[#151E32]/30 rounded-[2.5rem] border border-slate-100 dark:border-white/5 flex items-center justify-between group hover:shadow-2xl transition-all duration-500"
          >
            <div className="flex items-center gap-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-xl"
                style={{ backgroundColor: `${alertOpt.color}10`, color: alertOpt.color }}
              >
                <alertOpt.icon size={24} />
              </div>
              <div>
                <p className="text-[1.1rem] font-black text-slate-900 dark:text-white mb-1 tracking-tight">
                  {alertOpt.label}
                </p>
                <p className="text-[0.75rem] text-slate-400 font-bold uppercase tracking-[0.2em]">
                  {alertOpt.sub}
                </p>
              </div>
            </div>
            <button
              onClick={() => onToggle(alertOpt.id)}
              className={`w-16 h-8 rounded-full transition-all duration-300 relative flex items-center p-1 shadow-inner border border-transparent ${telemetryState[alertOpt.id] ? 'bg-[#2ECC71] shadow-[#2ECC71]/30' : 'bg-slate-200 dark:bg-[#0B1121] dark:border-white/10'}`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${telemetryState[alertOpt.id] ? 'translate-x-8' : 'translate-x-0'}`}
              ></div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsTelemetryPanel;
