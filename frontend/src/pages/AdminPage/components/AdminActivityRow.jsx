import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

const AdminActivityRow = ({ user: u }) => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-[1.01] group mb-2 ${
      isDarkMode 
        ? 'bg-[#151E32] shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47]' 
        : 'bg-[#ecf0f3] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff]'
    }`}>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A7FFF] to-[#8B5CF6] flex items-center justify-center text-white text-[0.8rem] font-black shadow-lg shrink-0">
        {u.name?.[0]?.toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[0.9rem] font-black truncate ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>{u.name}</p>
        <p className="text-[0.7rem] text-slate-500 truncate font-medium">{u.email}</p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <span className={`px-3 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-wider ${
          u.role === 'Admin'   ? 'bg-purple-500/10 text-purple-500' :
          u.role === 'Doctor'  ? 'bg-blue-500/10 text-blue-500' :
                               'bg-emerald-500/10 text-emerald-500'
        }`}>{u.role}</span>
        <span className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-tighter">{new Date(u.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default AdminActivityRow;
