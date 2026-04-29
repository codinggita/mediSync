import React from 'react';
import { Activity, TrendingUp, Heart, Droplets, ArrowRight } from 'lucide-react';
import { useDashboardStats } from '../../../hooks/useDashboardStats';

const HealthActivity = ({ user }) => {
  const { stats } = useDashboardStats();
  const hasData = stats.medicines > 0 || stats.records > 0;

  const activityStats = [
    {
      label: 'Heart Rate',
      value: user?.vitals?.heartRate?.value || (hasData ? 72 : 0),
      max: 120,
      unit: 'bpm',
      color: '#EF4444',
      icon: Heart,
      status: user?.vitals?.heartRate?.value ? 'Normal' : 'Syncing',
    },
    {
      label: 'SpO2 Level',
      value: user?.vitals?.spO2?.value || (hasData ? 98 : 0),
      max: 100,
      unit: '%',
      color: '#2A7FFF',
      icon: Activity,
      status: user?.vitals?.spO2?.value ? 'Excellent' : 'Syncing',
    },
    {
      label: 'Clinical Artifacts',
      value: stats.medicines + stats.records,
      max: 20,
      unit: 'Total',
      color: '#2ECC71',
      icon: Droplets,
      status: hasData ? 'Active' : 'Empty',
    },
  ];

  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[32px] p-7 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[1.1rem] font-black text-[#1F2937] dark:text-white flex items-center gap-2.5">
          <Activity size={20} className="text-[#2A7FFF]" />
          Health Activity
        </h3>
        <div className="w-8 h-8 rounded-full bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] flex items-center justify-center text-[#2A7FFF]">
          <TrendingUp size={14} />
        </div>
      </div>

      <div className="space-y-8">
        {activityStats.map((stat, i) => (
          <div key={i} className="group">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#ecf0f3] dark:bg-[#151E32] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] group-hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] group-hover:scale-95 transition-all">
                  <stat.icon size={16} style={{ color: stat.color }} />
                </div>
                <div>
                  <span className="text-[0.85rem] font-black text-[#1F2937] dark:text-white block">
                    {stat.label}
                  </span>
                  <span className="text-[0.6rem] font-bold text-[#2ECC71] uppercase tracking-tighter">
                    {stat.status}
                  </span>
                </div>
              </div>
              <span className="text-[0.9rem] font-black text-[#1F2937] dark:text-white">
                {stat.value}{' '}
                <span className="text-[0.7rem] text-gray-400 font-bold uppercase">{stat.unit}</span>
              </span>
            </div>
            <div className="h-2.5 bg-[#ecf0f3] dark:bg-[#151E32] rounded-full overflow-hidden shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0a0f1d,inset_-2px_-2px_4px_#202d47]">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(stat.value / stat.max) * 100}%`, backgroundColor: stat.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-10 py-3.5 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] text-[0.8rem] font-black text-slate-700 dark:text-white shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] active:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] transition-all flex justify-center items-center gap-2 group">
        View Full Insights{' '}
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default HealthActivity;
