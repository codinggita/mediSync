import React from 'react';
import { Wifi, Server, Clock, AlertTriangle } from 'lucide-react';

const SERVICES = [
  {
    label: 'API Gateway',
    status: 'Operational',
    uptime: '99.98%',
    icon: Wifi,
    color: 'text-[#2A7FFF] bg-green-50',
  },
  {
    label: 'Database',
    status: 'Operational',
    uptime: '99.95%',
    icon: Server,
    color: 'text-[#2A7FFF] bg-green-50',
  },
  {
    label: 'Auth Service',
    status: 'Operational',
    uptime: '100%',
    icon: Clock,
    color: 'text-[#2A7FFF] bg-green-50',
  },
  {
    label: 'Storage (CDN)',
    status: 'Degraded',
    uptime: '97.1%',
    icon: AlertTriangle,
    color: 'text-[#F59E0B] bg-amber-50',
  },
];

const LOGS = [
  { level: 'ERROR', msg: 'Upload timeout — storage CDN (3 occurrences)', time: '14:32' },
  { level: 'WARN', msg: 'High memory usage — API pod #3 (78%)', time: '13:50' },
  { level: 'INFO', msg: 'Scheduled backup completed successfully', time: '12:00' },
];

const LOG_STYLE = {
  ERROR: 'text-[#D32F2F] bg-red-50 border-red-100',
  WARN: 'text-[#F59E0B] bg-amber-50 border-amber-100',
  INFO: 'text-gray-500 bg-gray-50 border-gray-100',
};

const SystemHealth = () => {
  return (
    <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm p-5 admin-card flex flex-col gap-4">
      <h3 className="text-sm font-bold text-gray-800">System Health</h3>

      {}
      <div className="flex flex-col gap-2">
        {SERVICES.map(({ label, status, uptime, icon: Icon, color }) => (
          <div
            key={label}
            className="flex items-center justify-between p-2.5 rounded-[10px] bg-[#F8FAFC] border border-gray-100"
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center`}>
                <Icon size={13} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-700">{label}</p>
                <p className="text-[10px] text-gray-400">{status}</p>
              </div>
            </div>
            <span
              className={`text-[11px] font-bold ${status === 'Operational' ? 'text-[#2A7FFF]' : 'text-[#F59E0B]'}`}
            >
              {uptime}
            </span>
          </div>
        ))}
      </div>

      {}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Recent Logs
        </p>
        <div className="flex flex-col gap-1.5">
          {LOGS.map((log, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 p-2 rounded-[8px] border ${LOG_STYLE[log.level]}`}
            >
              <span className="text-[10px] font-extrabold mt-0.5 flex-shrink-0">{log.level}</span>
              <p className="text-[11px] flex-1 leading-relaxed">{log.msg}</p>
              <span className="text-[10px] flex-shrink-0 opacity-60">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
