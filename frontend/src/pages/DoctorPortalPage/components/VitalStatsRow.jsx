import React from 'react';
import { Heart, Activity, Droplets, Wind, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const vitals = [
  {
    label: 'Heart Rate',
    value: '82',
    unit: 'bpm',
    icon: Heart,
    color: '#EF4444',
    bg: '#EF444410',
    status: 'Normal',
    statusType: 'normal', 
  },
  {
    label: 'Blood Pressure',
    value: '140/90',
    unit: 'mmHg',
    icon: Activity,
    color: '#F59E0B',
    bg: '#F59E0B10',
    status: 'Elevated',
    statusType: 'elevated',
  },
  {
    label: 'Glucose',
    value: '124',
    unit: 'mg/dL',
    icon: Droplets,
    color: '#8B5CF6',
    bg: '#8B5CF610',
    status: 'Elevated',
    statusType: 'elevated',
  },
  {
    label: 'SpO2',
    value: '97',
    unit: '%',
    icon: Wind,
    color: '#2A7FFF',
    bg: '#2A7FFF10',
    status: 'Stable',
    statusType: 'stable',
  },
];

const statusConfig = {
  normal: { color: '#2ECC71', bg: '#2ECC7115' },
  elevated: { color: '#EF4444', bg: '#EF444415' },
  stable: { color: '#2A7FFF', bg: '#2A7FFF15' },
};

const VitalStatsRow = ({ patient }) => {
  const vitalsSource = patient?.vitals || {
    heartRate: { value: 78, unit: 'bpm' },
    bloodPressure: { value: '120/80', unit: 'mmHg' },
    glucose: { value: 110, unit: 'mg/dL' },
    spO2: { value: 98, unit: '%' },
  };

  const { heartRate, bloodPressure, glucose, spO2 } = vitalsSource;

  const vitalsData = [
    {
      label: 'Heart Rate',
      value: heartRate?.value || '--',
      unit: heartRate?.unit || 'bpm',
      icon: Heart,
      color: '#EF4444',
      bg: '#EF444410',
      status: heartRate?.value > 100 || heartRate?.value < 60 ? 'Elevated' : 'Normal',
      statusType: heartRate?.value > 100 || heartRate?.value < 60 ? 'elevated' : 'normal',
    },
    {
      label: 'Blood Pressure',
      value: bloodPressure?.value || '--/--',
      unit: bloodPressure?.unit || 'mmHg',
      icon: Activity,
      color: '#F59E0B',
      bg: '#F59E0B10',
      status: 'Stable', 
      statusType: 'stable',
    },
    {
      label: 'Glucose',
      value: glucose?.value || '--',
      unit: glucose?.unit || 'mg/dL',
      icon: Droplets,
      color: '#8B5CF6',
      bg: '#8B5CF610',
      status: glucose?.value > 140 ? 'Elevated' : 'Normal',
      statusType: glucose?.value > 140 ? 'elevated' : 'normal',
    },
    {
      label: 'SpO2',
      value: spO2?.value || '--',
      unit: spO2?.unit || '%',
      icon: Wind,
      color: '#2A7FFF',
      bg: '#2A7FFF10',
      status: spO2?.value < 95 ? 'Low' : 'Stable',
      statusType: spO2?.value < 95 ? 'elevated' : 'stable',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {vitalsData.map(({ label, value, unit, icon: Icon, color, bg, status, statusType }) => {
        const s = statusConfig[statusType] || statusConfig.stable;
        return (
          <div
            key={label}
            className="bg-white dark:bg-[#151E32] border border-gray-100 dark:border-slate-700/50 rounded-[14px] p-5 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden"
          >
            {}
            <Icon
              size={64}
              className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
              style={{ color }}
            />

            <div className="flex items-center justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: bg }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <span
                className="text-[0.68rem] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider"
                style={{ color: s.color, backgroundColor: s.bg }}
              >
                {status}
              </span>
            </div>

            <div className="flex items-baseline gap-1">
              <p className="text-[2rem] font-black text-[#1F2937] dark:text-white leading-none tracking-tight">
                {value}
              </p>
              <p className="text-[0.8rem] font-bold text-gray-400">{unit}</p>
            </div>

            <p className="text-[0.85rem] font-bold text-gray-500 dark:text-slate-400 mt-1.5">
              {label}
            </p>

            {}
            <div className="mt-4 h-1 w-full bg-gray-50 dark:bg-[#0B1121] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width:
                    statusType === 'normal' ? '70%' : statusType === 'elevated' ? '90%' : '65%',
                  backgroundColor: s.color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VitalStatsRow;
