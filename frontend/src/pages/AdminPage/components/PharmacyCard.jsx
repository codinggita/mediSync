import React from 'react';
import { Building2, CheckCircle2, XCircle, Trash2, Loader2, MapPin, Clock, Check } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const STATUS_COLORS = {
  Verified: { color: '#2ECC71', glow: 'rgba(46,204,113,0.3)' },
  Pending:  { color: '#F59E0B', glow: 'rgba(245,158,11,0.3)' },
  Rejected: { color: '#E11D48', glow: 'rgba(225,29,72,0.3)' },
};

const PharmacyCard = ({ pharmacy: p, onVerify, onDelete, actionLoading, successId }) => {
  const { isDarkMode } = useTheme();
  const cfg = STATUS_COLORS[p.verificationStatus] || STATUS_COLORS.Pending;
  
  return (
    <div className={`relative overflow-hidden rounded-[2.5rem] p-7 transition-all duration-300 ${
      successId === p._id ? 'ring-2 ring-[#2ECC71]/50 bg-[#2ECC71]/5 scale-[1.02]' : 'hover:scale-[1.01]'
    } group ${isDarkMode ? 'bg-[#151E32] shadow-lg' : 'bg-[#ecf0f3] shadow-md'}`}>
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-5 group-hover:opacity-10 transition-opacity blur-3xl" style={{ backgroundColor: cfg.color }} />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-black/20' : 'bg-white shadow-md'}`}>
            {successId === p._id ? <Check size={28} className="text-[#2ECC71] animate-in zoom-in" /> : <Building2 size={28} style={{ color: cfg.color }} />}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`text-xl font-black truncate leading-tight ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>{p.name}</h3>
            <p className="text-[0.7rem] text-slate-400 font-bold uppercase tracking-widest mt-1">Owner: {p.ownerName}</p>
            <p className="text-[0.8rem] text-slate-500 flex items-center gap-2 mt-2 font-bold italic truncate"><MapPin size={14} className="text-[#2A7FFF]" /> {p.location}</p>
            <div className="flex items-center gap-3 mt-4">
              <span className={`px-4 py-1.5 rounded-full text-[0.65rem] font-black uppercase tracking-widest flex items-center gap-2 ${isDarkMode ? 'bg-black/20' : 'bg-white shadow-inner'}`} style={{ color: cfg.color }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: cfg.color }} />
                {p.verificationStatus || 'Pending'}
              </span>
              <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1.5"><Clock size={12} /> {new Date(p.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap sm:flex-col gap-3 shrink-0 w-full sm:w-auto">
          <div className="flex gap-3 w-full">
            {p.verificationStatus !== 'Verified' && (
              <button onClick={() => onVerify(p._id, 'Verified')} disabled={!!actionLoading} className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-[0.7rem] font-black transition-all hover:scale-105 active:scale-95 bg-black/5 dark:bg-white/5 text-[#2ECC71]`}>
                {actionLoading === p._id + 'Verified' ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />} Approve
              </button>
            )}
            {p.verificationStatus !== 'Rejected' && (
              <button onClick={() => onVerify(p._id, 'Rejected')} disabled={!!actionLoading} className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-[0.7rem] font-black transition-all hover:scale-105 active:scale-95 bg-black/5 dark:bg-white/5 text-[#F59E0B]`}>
                {actionLoading === p._id + 'Rejected' ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />} Reject
              </button>
            )}
          </div>
          <button onClick={() => onDelete(p._id, p.name)} className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-[0.7rem] font-black transition-all hover:scale-105 active:scale-95 bg-black/5 dark:bg-white/5 text-[#E11D48]`}>
            <Trash2 size={14} /> Remove Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyCard;
