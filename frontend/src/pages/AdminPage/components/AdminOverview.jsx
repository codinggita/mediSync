import React from 'react';
import {
  Building2,
  Users,
  ClipboardCheck,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from 'lucide-react';

const metrics = [
  {
    label: 'Total Pharmacies',
    value: '1,284',
    trend: '+12%',
    up: true,
    icon: Building2,
    color: '#2A7FFF',
    bg: '#2A7FFF10',
  },
  {
    label: 'Active Users',
    value: '42.5k',
    trend: '+8.4%',
    up: true,
    icon: Users,
    color: '#8B5CF6',
    bg: '#8B5CF610',
  },
  {
    label: 'Pending Verifications',
    value: '24',
    trend: 'Critical',
    up: false,
    icon: ClipboardCheck,
    color: '#F59E0B',
    bg: '#F59E0B10',
    warning: true,
  },
  {
    label: 'Total Transactions',
    value: '$1.4M',
    trend: '+15.2%',
    up: true,
    icon: DollarSign,
    color: '#2ECC71',
    bg: '#2ECC7110',
  },
  {
    label: 'Critical Alerts',
    value: '07',
    trend: 'Urgent',
    up: false,
    icon: AlertTriangle,
    color: '#EF4444',
    bg: '#EF444410',
    alert: true,
  },
];

const AdminOverview = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        return (
          <div
            key={i}
            className={`relative overflow-hidden bg-white dark:bg-[#151E32] border border-gray-100 dark:border-slate-700/50 rounded-[14px] p-5 shadow-sm transition-all hover:shadow-md group`}
          >
            {}
            <div className="absolute inset-0 bg-white/40 dark:bg-transparent backdrop-blur-[2px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: m.bg }}
                >
                  <Icon size={20} style={{ color: m.color }} />
                </div>
                <div
                  className={`flex items-center gap-1 text-[0.7rem] font-black px-2 py-1 rounded-lg ${
                    m.alert
                      ? 'bg-red-50 text-red-500'
                      : m.warning
                        ? 'bg-amber-50 text-amber-500'
                        : m.up
                          ? 'bg-green-50 text-green-500'
                          : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  {m.up ? (
                    <TrendingUp size={10} />
                  ) : m.alert || m.warning ? null : (
                    <TrendingDown size={10} />
                  )}
                  {m.trend}
                </div>
              </div>

              <div className="flex flex-col">
                <p className="text-[1.8rem] font-black text-[#1F2937] dark:text-white leading-none tracking-tight">
                  {m.value}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <p className="text-[0.75rem] font-bold text-gray-400 uppercase tracking-widest leading-none">
                    {m.label}
                  </p>
                </div>
                <p className="text-[0.6rem] text-gray-400 font-medium mt-1.5 italic">
                  vs last month
                </p>
              </div>
            </div>

            {}
            <div
              className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
              style={{ backgroundColor: m.color }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AdminOverview;
