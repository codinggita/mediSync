import React from 'react';
import { Calendar, Clock, Video, User, MessageCircle, AlertTriangle } from 'lucide-react';
import ActiveNotesPanel from './ActiveNotesPanel';

const ScheduleSidebar = ({
  appointments,
  activePatient,
  selectedPatientId,
  setSelectedPatientId,
}) => (
  <div className="xl:col-span-4 flex flex-col gap-10">
    {}
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2.5rem] p-6 shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff] dark:shadow-[10px_10px_20px_#0a0f1d,-10px_-10px_20px_#202d47] border border-white/40 dark:border-white/5 flex items-start gap-5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-colors pointer-events-none" />
      <div className="w-12 h-12 rounded-[1.5rem] bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] flex items-center justify-center text-red-500 shrink-0 relative z-10 border border-white/20 dark:border-white/5">
        <AlertTriangle size={22} className="animate-pulse" />
      </div>
      <div className="relative z-10">
        <h4 className="text-[0.95rem] font-black text-red-500 uppercase tracking-widest mb-1.5 drop-shadow-sm">
          Critical Allergy
        </h4>
        <p className="text-[0.8rem] font-bold text-slate-500 dark:text-slate-400 leading-tight">
          Patient has a severe registered allergy to{' '}
          <span className="text-red-400 font-black">Penicillin</span>.
        </p>
      </div>
    </div>

    {}
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3.5rem] p-8 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/40 dark:border-white/5 relative overflow-hidden">
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#2A7FFF]/5 rounded-full blur-3xl pointer-events-none" />

      <h3 className="text-[1.1rem] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-[#2A7FFF]/10 flex items-center justify-center border border-[#2A7FFF]/20">
          <Calendar size={18} className="text-[#2A7FFF]" />
        </div>
        Schedule Lineup
      </h3>

      <div className="flex flex-col gap-5 max-h-[300px] overflow-y-auto scrollbar-hide relative z-10 pr-2">
        {appointments.length === 0 ? (
          <p className="text-[0.8rem] text-slate-400 font-bold uppercase tracking-widest text-center py-4">
            No pending appointments.
          </p>
        ) : (
          appointments.map((app) => (
            <div
              key={app._id}
              onClick={() => setSelectedPatientId(app.patient?._id)}
              className={`p-5 rounded-[1.5rem] transition-all cursor-pointer group border flex flex-col gap-2 ${
                selectedPatientId === app.patient?._id
                  ? 'bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_6px_6px_12px_#cbced1,inset_-6px_-6px_12px_#ffffff] dark:shadow-[inset_6px_6px_12px_#0a0f1d,inset_-6px_-6px_12px_#202d47] border-white/20'
                  : 'bg-[#ecf0f3] dark:bg-[#151E32] shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] border-white/40 hover:text-[#2A7FFF]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[0.9rem] font-black text-slate-800 dark:text-white group-hover:text-[#2A7FFF] transition-colors">
                  {app.patient?.name || 'Unknown'}
                </span>
                <span
                  className={`px-3 py-1 rounded-lg text-[0.6rem] font-black uppercase tracking-widest shadow-inner ${
                    app.status === 'Pending'
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                  }`}
                >
                  {app.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest mt-1">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} className="text-[#2A7FFF]" /> {app.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <Video size={12} className="text-[#2ECC71]" /> {app.type}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

    {}
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3.5rem] p-8 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/40 dark:border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#2ECC71]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="text-[1.1rem] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2A7FFF]/10 flex items-center justify-center border border-[#2A7FFF]/20">
            <Video className="text-[#2A7FFF]" size={18} />
          </div>
          Tele-Link
        </h3>
        <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 text-[0.65rem] font-black rounded-xl border border-emerald-500/20 shadow-inner uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#2ECC71]" />{' '}
          Live
        </span>
      </div>

      <div className="w-full h-56 bg-[#0B1121] rounded-[2.5rem] relative overflow-hidden flex items-center justify-center mb-8 border border-white/10 shadow-[inset_10px_10px_20px_#050810,inset_-10px_-10px_20px_#111a32]">
        <User size={64} className="text-slate-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        <button className="w-full h-14 rounded-[1.5rem] bg-[#25D366] text-white flex items-center justify-center gap-3 font-black text-[0.85rem] uppercase tracking-widest shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-none hover:bg-[#20BD5A] active:scale-95 transition-all border border-[#25D366]/20">
          <MessageCircle size={18} /> WhatsApp Chat
        </button>
      </div>
    </div>

    <ActiveNotesPanel />
  </div>
);

export default ScheduleSidebar;
