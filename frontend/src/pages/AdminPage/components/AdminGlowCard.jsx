import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { Loader2, ArrowUpRight, Clock } from 'lucide-react';
import healthAbstractImg from '../../../assets/images/health_abstract.png';

const AdminGlowCard = ({ label, value, icon: Icon, color, sub, trend, delay = 0 }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div 
      className="relative overflow-hidden rounded-[2rem] p-7 transition-all duration-500 hover:scale-[1.02] group cursor-pointer nm-flat"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background Accent Image */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none group-hover:scale-125 transition-transform duration-700">
         <img src={healthAbstractImg} alt="Abstract" className="w-full h-full object-contain" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div 
            className="w-14 h-14 rounded-[1.2rem] flex items-center justify-center transition-all duration-300 group-hover:scale-110 nm-inset"
          >
            <Icon size={24} style={{ color }} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[0.65rem] font-black ${
              isDarkMode ? 'bg-white/5' : 'bg-black/5'
            }`} style={{ color }}>
              <ArrowUpRight size={12} />{trend}
            </div>
          )}
        </div>

        <p className={`text-[2.5rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
          {value ?? <Loader2 size={24} className="animate-spin opacity-40" />}
        </p>
        <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">{label}</p>
        {sub && (
          <p className="text-[0.65rem] text-slate-500 mt-2 flex items-center gap-1.5 font-bold uppercase tracking-wider">
            <Clock size={11} />{sub}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminGlowCard;
