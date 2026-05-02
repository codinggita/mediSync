import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import logoImg from '../../../assets/MediSync_Logo.png';

const LandingNavbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (e, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/40 dark:bg-black/20 backdrop-blur-2xl px-6 sm:px-10 py-3 sm:py-5 rounded-[2rem] sm:rounded-[2.5rem] border border-white/40 shadow-2xl transition-all hover:border-white/60">
        <button
          className="flex items-center gap-3 sm:gap-4 cursor-pointer hover:opacity-80 transition-opacity shrink-0 border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-[#2A7FFF]/40 rounded-xl"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-[#151E32] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg p-1 sm:p-1.5">
            <img src={logoImg} alt="MediSync Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
            Medi<span className="text-[#2A7FFF]">Sync</span>
          </span>
        </button>


        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
          {['Platform', 'Solutions', 'Security', 'Enterprise'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleScroll(e, item)}
              className="text-[0.8rem] xl:text-[0.9rem] font-black text-slate-600 dark:text-slate-400 hover:text-[#2A7FFF] transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-6">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl nm-button flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-[#2A7FFF] transition-all shrink-0"
            title={isDarkMode ? 'Switch to Day Mode' : 'Switch to Night Mode'}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="hidden sm:flex items-center gap-4 sm:gap-6">
            <Link
              to="/login"
              className="text-[0.8rem] sm:text-[0.9rem] font-black text-slate-900 dark:text-white uppercase tracking-widest hover:text-[#2A7FFF] transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="nm-button text-[#2A7FFF] dark:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-[0.8rem] sm:text-[0.9rem] uppercase tracking-widest hover:-translate-y-1 active:scale-95 transition-all"
            >
              Join Elite
            </Link>
          </div>


          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-lg nm-button flex items-center justify-center text-slate-600 dark:text-slate-400"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>


      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#ecf0f3]/95 dark:bg-[#090E1A]/95 backdrop-blur-xl z-[60] lg:hidden animate-in fade-in duration-300 p-8 pt-32">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-8 right-8 w-12 h-12 rounded-full nm-button flex items-center justify-center text-slate-600 dark:text-slate-400"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col gap-8 text-center">
            {['Platform', 'Solutions', 'Security', 'Enterprise'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleScroll(e, item)}
                className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] hover:text-[#2A7FFF]"
              >
                {item}
              </a>
            ))}
            <div className="h-px bg-slate-200 dark:bg-white/10 my-4" />
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="nm-button text-[#2A7FFF] dark:text-white py-6 rounded-3xl font-black text-xl uppercase tracking-[0.2em]"
            >
              Join Elite
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
