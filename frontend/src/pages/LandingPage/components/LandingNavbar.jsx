import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import logoImg from '../../../assets/MediSync_Logo.png';

const LandingNavbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/40 dark:bg-black/20 backdrop-blur-2xl px-10 py-5 rounded-[2.5rem] border border-white/40 shadow-2xl transition-all hover:border-white/60">
        <div 
          className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-12 h-12 bg-white dark:bg-[#151E32] rounded-2xl flex items-center justify-center shadow-lg p-1.5">
            <img src={logoImg} alt="MediSync" className="w-full h-full object-contain" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
            Medi<span className="text-[#2A7FFF]">Sync</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Platform', 'Solutions', 'Security', 'Enterprise'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => handleScroll(e, item)}
              className="text-[0.9rem] font-black text-slate-600 dark:text-slate-400 hover:text-[#2A7FFF] transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme}
            className="w-12 h-12 rounded-xl nm-button flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-[#2A7FFF] transition-all"
            title={isDarkMode ? "Switch to Day Mode" : "Switch to Night Mode"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/login" className="text-[0.9rem] font-black text-slate-900 dark:text-white uppercase tracking-widest hover:text-[#2A7FFF] transition-colors">
            Login
          </Link>
          <Link to="/signup" className="nm-button text-[#2A7FFF] dark:text-white px-8 py-4 rounded-2xl font-black text-[0.9rem] uppercase tracking-widest hover:-translate-y-1 active:scale-95 transition-all">
            Join Elite
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
