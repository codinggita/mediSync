import React from 'react';
import {
  User,
  Calendar as CalendarIcon,
  Clock,
  Video,
  CheckCircle2,
  RefreshCw,
  XCircle,
} from 'lucide-react';

const DoctorAppointmentCard = ({ appointment, onStatusChange, onStartSession }) => {
  return (
    <div className="p-8 rounded-[3rem] bg-white dark:bg-[#0B1121] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#8B5CF6]/30 transition-colors">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 rounded-[1.8rem] bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center border-2 border-transparent shadow-inner">
          <User className="text-slate-500" size={28} />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <p className="text-[1.3rem] font-black text-slate-900 dark:text-white leading-none">
              {appointment.patient?.name || 'Unknown Patient'}
            </p>
            <span className="px-3 py-0.5 bg-[#ecf0f3] dark:bg-[#151E32] text-slate-400 text-[0.6rem] rounded-md font-black uppercase tracking-widest border border-slate-200 dark:border-slate-800 shadow-sm">
              {appointment.patient?.patientId || 'NO-ID'}
            </span>
          </div>
          <p className="text-[0.8rem] font-black text-[#8B5CF6] uppercase tracking-widest">
            {appointment.specialty} Consultation
          </p>
          <div className="flex items-center gap-4 mt-3 text-[0.75rem] font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-[#0B1121] rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
              <CalendarIcon size={14} className="text-[#8B5CF6]" /> {appointment.date}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-[#0B1121] rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
              <Clock size={14} className="text-[#8B5CF6]" /> {appointment.time}
            </span>
            {appointment.type === 'Video Consult' && (
              <span className="flex items-center gap-1.5 text-[#2A7FFF] px-3 py-1 bg-[#2A7FFF]/5 rounded-lg border border-[#2A7FFF]/10">
                <Video size={14} /> Video
              </span>
            )}
            {appointment.type === 'In Person' && (
              <span className="flex items-center gap-1.5 text-[#8B5CF6] px-3 py-1 bg-[#8B5CF6]/5 rounded-lg border border-[#8B5CF6]/10">
                <CalendarIcon size={14} /> In Person
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-4 w-full md:w-auto">
        <div
          className={`px-5 py-2 rounded-full text-[0.75rem] font-black uppercase tracking-widest border 
          ${
            appointment.status === 'Pending'
              ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
              : appointment.status === 'Confirmed'
                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
          }`}
        >
          {appointment.status}
        </div>

        {appointment.status === 'Pending' && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onStatusChange(appointment._id, 'Confirmed')}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-[0.75rem] font-black uppercase tracking-widest shadow-md hover:bg-emerald-600 transition-colors"
            >
              <CheckCircle2 size={16} /> Accept
            </button>
            <button
              onClick={() => onStatusChange(appointment._id, 'Completed')}
              className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-[0.75rem] font-black uppercase tracking-widest hover:text-[#2A7FFF] transition-colors"
            >
              <RefreshCw size={16} /> Reschedule
            </button>
            <button
              onClick={() => onStatusChange(appointment._id, 'Completed')}
              className="w-10 h-10 flex items-center justify-center bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-colors"
            >
              <XCircle size={18} />
            </button>
          </div>
        )}

        {appointment.status === 'Confirmed' && (
          <div className="flex items-center gap-3">
            <button
              onClick={onStartSession}
              className="flex items-center gap-2 px-6 py-3 bg-[#2A7FFF] text-white rounded-xl text-[0.8rem] font-black uppercase tracking-widest shadow-md hover:bg-[#1565C0] transition-colors"
            >
              <Video size={16} /> Start Session
            </button>
            <button
              onClick={() => onStatusChange(appointment._id, 'Completed')}
              className="px-4 py-3 bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-700 text-emerald-500 rounded-xl text-[0.75rem] font-black uppercase tracking-widest hover:bg-emerald-500/10 transition-colors"
            >
              Mark Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointmentCard;
