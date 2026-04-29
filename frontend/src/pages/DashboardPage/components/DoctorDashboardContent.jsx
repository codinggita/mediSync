import React, { useState, useEffect } from 'react';
import {
  Users,
  AlertTriangle,
  FileText,
  Activity,
  TrendingUp,
  Bell,
  ChevronRight,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DoctorStatCards from './DoctorStatCards';
import CriticalCasesPanel from './CriticalCasesPanel';
import { useDoctorStats } from '../../../hooks/useDoctorStats';

const DoctorDashboardContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { stats, recentActivity, criticalCases, loading } = useDoctorStats();

  const greeting =
    new Date().getHours() < 12
      ? 'Good Morning'
      : new Date().getHours() < 17
        ? 'Good Afternoon'
        : 'Good Evening';

  const statCards = [
    {
      label: 'Total Shared Patients',
      value: stats.totalPatients,
      icon: Users,
      color: '#2A7FFF',
      bg: 'bg-[#2A7FFF]/10',
    },
    {
      label: 'Active Alerts',
      value: stats.activeAlerts,
      icon: AlertTriangle,
      color: '#EF4444',
      bg: 'bg-red-500/10',
    },
    {
      label: 'Recent Reports',
      value: stats.recentReports,
      icon: FileText,
      color: '#2ECC71',
      bg: 'bg-[#2ECC71]/10',
    },
    {
      label: "Today's Consultations",
      value: stats.appointments,
      icon: Activity,
      color: '#8B5CF6',
      bg: 'bg-[#8B5CF6]/10',
    },
  ];

  return (
    <main className="flex-1 overflow-y-auto bg-[#ecf0f3] dark:bg-[#0B1121] transition-colors duration-300 p-6 lg:p-8 space-y-10 scrollbar-hide pb-24 md:pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            {greeting}, Dr. {user?.name?.split(' ')[0] || 'Clinician'}
          </h1>
          <p className="text-[0.85rem] text-[#2A7FFF] font-bold uppercase tracking-[0.2em] mt-1">
            Clinical Overview Dashboard
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer group">
            <div className="w-14 h-14 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] flex items-center justify-center border border-white/40 dark:border-white/5 transition-all active:scale-95 group-hover:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:group-hover:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]">
              <Bell size={24} className="text-[#2A7FFF]" />
            </div>
            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-[0.7rem] font-black shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse border-2 border-white dark:border-[#0B1121]">
              {stats.activeAlerts}
            </div>
          </div>
        </div>
      </div>

      <DoctorStatCards statCards={statCards} loading={loading} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 flex flex-col gap-10">
          <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] p-10 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/40 dark:border-white/5 overflow-hidden relative">
            {/* Decorative Background Blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2A7FFF]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-center mb-10 relative z-10">
              <div>
                <h3 className="text-[1.5rem] font-black text-slate-900 dark:text-white flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2A7FFF]/10 flex items-center justify-center">
                    <TrendingUp size={20} className="text-[#2A7FFF]" />
                  </div>
                  Patient Activity Trend
                </h3>
                <p className="text-[0.75rem] text-slate-400 font-bold uppercase tracking-widest mt-2 ml-14">
                  Records uploaded past 7 days
                </p>
              </div>
            </div>
            <div className="h-64 w-full flex items-end justify-between gap-4 px-4 relative z-10 border-b-2 border-slate-200/50 dark:border-slate-800/50 pb-4">
              {[40, 65, 30, 85, 55, 90, 75].map((height, i) => (
                <div
                  key={i}
                  className="w-full flex flex-col items-center gap-3 group cursor-pointer h-full justify-end"
                >
                  <div
                    className="w-full bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] rounded-xl relative overflow-hidden transition-all group-hover:scale-105"
                    style={{ height: `${height}%` }}
                  >
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-[#2A7FFF] to-[#4DB8FF] opacity-90 transition-all duration-500 group-hover:from-[#1A6FFF] group-hover:to-[#2A7FFF] rounded-xl"
                      style={{ height: '100%' }}
                    />
                  </div>
                  <span className="text-[0.65rem] font-black text-slate-400 group-hover:text-[#2A7FFF] uppercase tracking-wider transition-colors">
                    Day {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] p-10 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/40 dark:border-white/5 relative overflow-hidden">
            {/* Decorative Background Blur */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2ECC71]/5 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-[1.5rem] font-black text-slate-900 dark:text-white flex items-center gap-4 mb-8 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-[#2ECC71]/10 flex items-center justify-center">
                <Activity size={20} className="text-[#2ECC71]" />
              </div>
              Recent Patient Updates
            </h3>
            <div className="flex flex-col gap-5 relative z-10">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-5 rounded-[24px] bg-[#ecf0f3] dark:bg-[#151E32] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] border border-white/40 dark:border-white/5 hover:translate-x-2 transition-transform cursor-pointer group"
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-12 h-12 rounded-[18px] flex items-center justify-center shrink-0 shadow-inner ${activity.isCritical ? 'bg-red-500 text-white shadow-red-500/50' : 'bg-[#2A7FFF]/10 dark:bg-white/5 text-[#2A7FFF] dark:text-[#4DB8FF]'}`}
                    >
                      {activity.isCritical ? <ShieldAlert size={20} /> : <FileText size={20} />}
                    </div>
                    <div>
                      <p className="text-[1rem] font-black text-slate-900 dark:text-white leading-tight">
                        {activity.patient}
                      </p>
                      <p className="font-bold text-[0.8rem] text-slate-500 dark:text-slate-400 mt-1">
                        {activity.detail}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-black/20 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-white/5 shadow-sm">
                      <Clock size={12} /> {activity.time}
                    </div>
                    <button className="w-10 h-10 rounded-[14px] bg-[#ecf0f3] dark:bg-[#151E32] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] flex items-center justify-center text-slate-400 group-hover:text-[#2A7FFF] active:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] dark:active:shadow-[inset_2px_2px_4px_#0a0f1d,inset_-2px_-2px_4px_#202d47] transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CriticalCasesPanel criticalCases={criticalCases} />
      </div>
    </main>
  );
};

export default DoctorDashboardContent;
