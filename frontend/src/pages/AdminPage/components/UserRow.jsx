import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { Crown, Stethoscope, UserCheck, Check, ShieldOff, Edit3, Ban, Trash2, Loader2 } from 'lucide-react';

const ROLE_CFG = {
  Admin:   { color: '#8B5CF6', icon: Crown, bg: 'rgba(139,92,246,0.1)' },
  Doctor:  { color: '#2A7FFF', icon: Stethoscope, bg: 'rgba(42,127,255,0.1)' },
  Patient: { color: '#2ECC71', icon: UserCheck, bg: 'rgba(46,204,113,0.1)' },
};

const UserRow = ({ u, onBan, onDelete, onRole, onEdit, actionId, successId }) => {
  const { isDarkMode } = useTheme();
  const cfg = ROLE_CFG[u.role] || ROLE_CFG.Patient;
  const RoleIcon = cfg.icon;

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-[2rem] transition-all duration-300 group mb-4 ${
      u.isBanned ? 'opacity-40 grayscale-[0.5]' : ''
    } ${
      isDarkMode 
        ? 'bg-[#151E32] shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]' 
        : 'bg-[#ecf0f3] shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff]'
    } ${successId === u._id ? 'ring-2 ring-[#2ECC71]/50 bg-[#2ECC71]/5' : 'hover:scale-[1.01]'}`}>
      
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <div className="relative shrink-0">
          <div className={`w-16 h-16 rounded-[1.2rem] flex items-center justify-center text-white text-[1.2rem] font-black transition-all duration-300 ${
            isDarkMode ? 'shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47]' : 'shadow-[5px_5px_10px_#cbced1,-5px_-5px_10px_#ffffff]'
          }`} style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}88)` }}>
            {successId === u._id ? <Check size={24} className="animate-in zoom-in" /> : u.name?.[0]?.toUpperCase()}
          </div>
          {u.isBanned && (
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center shadow-lg border-4" style={{ borderColor: isDarkMode ? '#151E32' : '#ecf0f3' }}>
              <ShieldOff size={12} className="text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-[1.1rem] font-black truncate leading-tight ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>{u.name}</h3>
          <p className="text-[0.8rem] text-slate-500 truncate font-bold opacity-80">{u.email}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
        <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl ${isDarkMode ? 'bg-black/20' : 'bg-white shadow-inner'}`}>
          <RoleIcon size={16} style={{ color: cfg.color }} />
          <select 
            value={u.role} 
            onChange={e => onRole(u._id, e.target.value)}
            className="bg-transparent border-none outline-none text-[0.7rem] font-black uppercase tracking-widest cursor-pointer"
            style={{ color: cfg.color }}
          >
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[0.65rem] font-black uppercase tracking-widest ${u.isBanned ? 'text-rose-500 bg-rose-500/10' : 'text-emerald-500 bg-emerald-500/10'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${u.isBanned ? '' : 'animate-pulse'}`} style={{ backgroundColor: u.isBanned ? '#E11D48' : '#2ECC71' }} />
          {u.isBanned ? 'Suspended' : 'Operational'}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
        <button onClick={() => onEdit(u)} className={`flex-1 sm:w-12 sm:h-12 py-3 sm:py-0 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-[#151E32] shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47]' : 'bg-[#ecf0f3] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff]'}`}>
          <Edit3 size={18} className="text-[#2A7FFF]" />
        </button>
        <button onClick={() => onBan(u._id)} disabled={actionId === u._id} className={`flex-1 sm:w-12 sm:h-12 py-3 sm:py-0 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-[#151E32] shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47]' : 'bg-[#ecf0f3] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff]'}`}>
          {actionId === u._id ? <Loader2 size={18} className="animate-spin text-slate-400" /> : <Ban size={18} style={{ color: u.isBanned ? '#2ECC71' : '#F59E0B' }} />}
        </button>
        <button onClick={() => onDelete(u._id, u.name)} className={`flex-1 sm:w-12 sm:h-12 py-3 sm:py-0 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-[#151E32] shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47]' : 'bg-[#ecf0f3] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff]'}`}>
          <Trash2 size={18} className="text-rose-500" />
        </button>
      </div>
    </div>
  );
};

export default UserRow;
