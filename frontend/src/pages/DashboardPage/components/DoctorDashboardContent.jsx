import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, FileText, Activity, TrendingUp, Bell, ChevronRight, Clock, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import DoctorStatCards from './DoctorStatCards';
import CriticalCasesPanel from './CriticalCasesPanel';

const DoctorDashboardContent = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalPatients: 0, activeAlerts: 0, recentReports: 0, appointments: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [criticalCases, setCriticalCases] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStats({ totalPatients: 142, activeAlerts: 3, recentReports: 28, appointments: 6 });
      setRecentActivity([
        { id: 1, type: 'report', patient: 'James Wilson', detail: 'Uploaded new MRI Scan', time: '10 mins ago', isCritical: false },
        { id: 2, type: 'alert', patient: 'Sarah Connor', detail: 'Critical high blood pressure reading', time: '1 hr ago', isCritical: true },
        { id: 3, type: 'update', patient: 'Michael Chang', detail: 'Prescription refill requested', time: '2 hrs ago', isCritical: false },
        { id: 4, type: 'report', patient: 'Emma Watson', detail: 'Lab biomarkers updated', time: '5 hrs ago', isCritical: false }
      ]);
      setCriticalCases([
        { id: 1, name: 'Sarah Connor', condition: 'Severe Hypertension', status: 'Requires Immediate Review' },
        { id: 2, name: 'David Smith', condition: 'Allergic Reaction', status: 'Awaiting Consultation' }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const greeting = new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 17 ? 'Good Afternoon' : 'Good Evening';

  const statCards = [
    { label: 'Total Shared Patients', value: stats.totalPatients, icon: Users, color: '#2A7FFF', bg: 'bg-[#2A7FFF]/10' },
    { label: 'Active Alerts', value: stats.activeAlerts, icon: AlertTriangle, color: '#EF4444', bg: 'bg-red-500/10' },
    { label: 'Recent Reports', value: stats.recentReports, icon: FileText, color: '#2ECC71', bg: 'bg-[#2ECC71]/10' },
    { label: "Today's Consultations", value: stats.appointments, icon: Activity, color: '#8B5CF6', bg: 'bg-[#8B5CF6]/10' },
  ];

  return (
    <main className="flex-1 overflow-y-auto bg-[#ecf0f3] dark:bg-[#121826] transition-colors duration-300 p-6 lg:p-8 space-y-10 scrollbar-hide pb-24 md:pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
           <h1 className="text-[2rem] font-black text-slate-900 dark:text-white leading-tight tracking-tight">
             {greeting}, Dr. {user?.name?.split(' ')[0] || 'Clinician'}
           </h1>
           <p className="text-[0.85rem] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Clinical Overview Dashboard</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#1A2642] shadow-sm flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                 <Bell size={20} className="text-slate-600 dark:text-slate-300" />
              </div>
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full border-2 border-[#ecf0f3] dark:border-[#121826] flex items-center justify-center text-white text-[0.6rem] font-black shadow-sm animate-pulse">
                 {stats.activeAlerts}
              </div>
           </div>
        </div>
      </div>

      <DoctorStatCards statCards={statCards} loading={loading} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 flex flex-col gap-8">
          <div className="bg-white dark:bg-[#151E32] rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800/60">
             <div className="flex justify-between items-center mb-8">
                <div>
                   <h3 className="text-[1.2rem] font-black text-slate-900 dark:text-white flex items-center gap-3">
                     <TrendingUp className="text-[#2A7FFF]" /> Patient Activity Trend
                   </h3>
                   <p className="text-[0.75rem] text-slate-400 font-bold uppercase tracking-widest mt-1">Records uploaded past 7 days</p>
                </div>
             </div>
             <div className="h-64 w-full flex items-end justify-between gap-2 px-2 relative border-b border-slate-200 dark:border-slate-700 pb-2">
                {[40, 65, 30, 85, 55, 90, 75].map((height, i) => (
                   <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="w-full bg-[#2A7FFF]/20 dark:bg-[#2A7FFF]/10 rounded-t-xl relative overflow-hidden transition-all group-hover:bg-[#2A7FFF]" style={{ height: `${height}%` }}>
                         <div className="absolute bottom-0 w-full bg-gradient-to-t from-[#2A7FFF] to-[#2A7FFF]/40 opacity-50" style={{ height: '100%' }} />
                      </div>
                      <span className="text-[0.65rem] font-black text-slate-400 uppercase">Day {i+1}</span>
                   </div>
                ))}
             </div>
          </div>

          <div className="bg-white dark:bg-[#151E32] rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800/60">
             <h3 className="text-[1.2rem] font-black text-slate-900 dark:text-white flex items-center gap-3 mb-6">
               <Activity className="text-[#2ECC71]" /> Recent Patient Updates
             </h3>
             <div className="flex flex-col gap-4">
                {recentActivity.map(activity => (
                   <div key={activity.id} className="flex items-center justify-between p-4 rounded-2xl bg-[#ecf0f3] dark:bg-[#0B1121] border border-transparent hover:border-[#2A7FFF]/30 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${activity.isCritical ? 'bg-red-500/10 text-red-500' : 'bg-[#2A7FFF]/10 text-[#2A7FFF]'}`}>
                            {activity.isCritical ? <ShieldAlert size={18} /> : <FileText size={18} />}
                         </div>
                         <div>
                            <p className="text-[0.9rem] font-black text-slate-900 dark:text-white">
                               {activity.patient} <span className="font-medium text-slate-500 mx-1">•</span> <span className="font-bold text-[0.8rem] text-slate-600 dark:text-slate-400">{activity.detail}</span>
                            </p>
                            <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1.5"><Clock size={12} /> {activity.time}</p>
                         </div>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-[#2A7FFF] group-hover:bg-[#2A7FFF]/10 transition-colors shadow-sm"><ChevronRight size={16} /></button>
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
