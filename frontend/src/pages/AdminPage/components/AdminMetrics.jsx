import React from 'react';
import { Building2, Users, ShieldAlert, BadgeDollarSign, TriangleAlert } from 'lucide-react';

const METRICS = [
  {
    icon: Building2,
    label: 'Total Pharmacies',
    value: '1,284',
    trend: '+12%',
    trendUp: true,
    sub: 'vs last month',
    iconBg: 'bg-green-50 text-[#2A7FFF]',
    gradient: 'from-green-50/60 to-white',
    border: 'border-green-100',
  },
  {
    icon: Users,
    label: 'Active Users',
    value: '38,540',
    trend: '+8.4%',
    trendUp: true,
    sub: 'this month',
    iconBg: 'bg-blue-50 text-blue-600',
    gradient: 'from-blue-50/60 to-white',
    border: 'border-blue-100',
  },
  {
    icon: ShieldAlert,
    label: 'Pending Verifications',
    value: '47',
    trend: '+5',
    trendUp: false,
    sub: 'require review',
    iconBg: 'bg-amber-50 text-[#F59E0B]',
    gradient: 'from-amber-50/60 to-white',
    border: 'border-amber-100',
    alert: true,
  },
  {
    icon: BadgeDollarSign,
    label: 'Total Transactions',
    value: '₹84.2L',
    trend: '+18.2%',
    trendUp: true,
    sub: 'this month',
    iconBg: 'bg-violet-50 text-violet-600',
    gradient: 'from-violet-50/60 to-white',
    border: 'border-violet-100',
  },
  {
    icon: TriangleAlert,
    label: 'Critical Alerts',
    value: '6',
    trend: '+3',
    trendUp: false,
    sub: 'need action',
    iconBg: 'bg-red-50 text-[#D32F2F]',
    gradient: 'from-red-50/60 to-white',
    border: 'border-red-100',
    alert: true,
  },
];

const AdminMetrics = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {METRICS.map(
        ({ icon: Icon, label, value, trend, trendUp, sub, iconBg, gradient, border, alert }) => (
          <div
            key={label}
            className={`bg-gradient-to-br ${gradient} rounded-[14px] border ${border} shadow-sm p-4 flex flex-col gap-3 admin-card hover:-translate-y-[2px] hover:shadow-md transition-all duration-200`}
          >
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-[10px] ${iconBg} flex items-center justify-center`}>
                <Icon size={17} />
              </div>
              {alert && <span className="w-2 h-2 rounded-full bg-[#D32F2F] animate-pulse" />}
            </div>

            <div>
              <p className="text-2xl font-extrabold text-gray-900 leading-none">{value}</p>
              <p className="text-xs text-gray-500 font-medium mt-1">{label}</p>
            </div>

            <div className="flex items-center gap-1.5">
              <span
                className={`text-xs font-bold ${trendUp ? 'text-[#2A7FFF]' : 'text-[#D32F2F]'}`}
              >
                {trendUp ? '↑' : '↑'} {trend}
              </span>
              <span className="text-[11px] text-gray-400">{sub}</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AdminMetrics;
