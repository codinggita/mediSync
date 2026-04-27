import React from 'react';
import { Calendar, Clock, Video, User, MessageCircle, Phone, AlertTriangle } from 'lucide-react';
import ActiveNotesPanel from './ActiveNotesPanel';

const ScheduleSidebar = ({ appointments, activePatient, selectedPatientId, setSelectedPatientId }) => (
  <div className="xl:col-span-4 flex flex-col gap-10">
    <div className="bg-red-500/10 border border-red-500/20 rounded-[2.5rem] p-6 shadow-sm flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white shrink-0 animate-pulse">
        <AlertTriangle size={20} />
      </div>
      <div>
        <h4 className="text-[0.9rem] font-black text-red-500 uppercase tracking-widest mb-1">Critical Allergy</h4>
        <p className="text-[0.8rem] font-bold text-slate-600 dark:text-slate-300">Patient has a severe registered allergy to Penicillin.</p>
      </div>
    </div>

    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3.5rem] p-8 shadow-2xl border border-white/40">
      <h3 className="text-[1rem] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-3">
        <Calendar size={18} className="text-[#2A7FFF]" /> Schedule Lineup
      </h3>
      <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto scrollbar-hide">
        {appointments.map(app => (
          <div key={app._id} onClick={() => setSelectedPatientId(app.patient?._id)} className={`p-4 rounded-2xl border transition-all cursor-pointer group ${selectedPatientId === app.patient?._id ? 'bg-[#2A7FFF]/5 border-[#2A7FFF]/30' : 'bg-white dark:bg-[#0B1121] border-transparent hover:border-slate-200 dark:hover:border-slate-700'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[0.8rem] font-black text-slate-800 dark:text-white group-hover:text-[#2A7FFF]">{app.patient?.name || 'Unknown'}</span>
              <span className={`px-2 py-0.5 rounded-md text-[0.55rem] font-black uppercase tracking-wider ${app.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>{app.status}</span>
            </div>
            <div className="flex items-center gap-3 text-[0.7rem] font-bold text-slate-400">
              <span className="flex items-center gap-1"><Clock size={12} /> {app.time}</span>
              <span className="flex items-center gap-1"><Video size={12} /> {app.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3.5rem] p-6 shadow-2xl border border-white/40 relative overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-2 mb-6 relative z-10">
        <h3 className="text-[1rem] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
          <Video className="text-[#2A7FFF] animate-pulse" size={18} /> Tele-Link
        </h3>
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[0.65rem] font-black rounded-full uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" /> Live
        </span>
      </div>
      <div className="w-full h-48 bg-slate-900 rounded-[2rem] relative overflow-hidden flex items-center justify-center mb-6 border border-slate-700">
        <User size={64} className="text-slate-700" />
      </div>
      <div className="flex flex-col gap-3">
        <button onClick={() => {}} className="w-full h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center gap-3 font-black text-[0.85rem] uppercase tracking-widest hover:bg-[#20BD5A] transition-all shadow-lg hover:-translate-y-1">
          <MessageCircle size={18} /> WhatsApp Chat
        </button>
      </div>
    </div>
    <ActiveNotesPanel />
  </div>
);

export default ScheduleSidebar;
