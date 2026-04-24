import React from 'react';
import { Heart, Activity, Droplets, Wind } from 'lucide-react';

const VITALS = [
  {
    icon: Heart,
    label: 'Heart Rate',
    value: '88',
    unit: 'bpm',
    status: 'Normal',
    statusColor: 'text-[#2A7FFF] bg-green-50 border-green-100',
    iconBg: 'bg-red-50 text-red-500',
    gradient: 'from-red-50 to-white',
  },
  {
    icon: Activity,
    label: 'Blood Pressure',
    value: '142/90',
    unit: 'mmHg',
    status: 'Elevated',
    statusColor: 'text-[#D32F2F] bg-red-50 border-red-100',
    iconBg: 'bg-amber-50 text-amber-500',
    gradient: 'from-amber-50 to-white',
  },
  {
    icon: Droplets,
    label: 'Glucose',
    value: '126',
    unit: 'mg/dL',
    status: 'Elevated',
    statusColor: 'text-[#D32F2F] bg-red-50 border-red-100',
    iconBg: 'bg-blue-50 text-blue-500',
    gradient: 'from-blue-50 to-white',
  },
  {
    icon: Wind,
    label: 'SpO₂',
    value: '98',
    unit: '%',
    status: 'Stable',
    statusColor: 'text-gray-500 bg-gray-50 border-gray-200',
    iconBg: 'bg-violet-50 text-violet-500',
    gradient: 'from-violet-50 to-white',
  },
];

const VitalStatsRow = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {VITALS.map(({ icon: Icon, label, value, unit, status, statusColor, iconBg, gradient }) => (
        <div
          key={label}
          className={`bg-gradient-to-br ${gradient} rounded-[14px] border border-gray-100 shadow-sm p-4 flex flex-col gap-3 doctor-card hover:-translate-y-[2px] hover:shadow-md transition-all duration-200`}
        >
          {/* Icon + Status */}
          <div className="flex items-center justify-between">
            <div className={`w-9 h-9 rounded-[10px] ${iconBg} flex items-center justify-center`}>
              <Icon size={18} />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
              {status}
            </span>
          </div>

          {/* Value */}
          <div>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-extrabold text-gray-900 leading-none">{value}</span>
              <span className="text-xs text-gray-400 font-semibold mb-0.5">{unit}</span>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-1">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VitalStatsRow;
