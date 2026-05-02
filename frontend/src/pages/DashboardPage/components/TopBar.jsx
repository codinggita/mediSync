import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, ChevronDown, User } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';

const notifications = [];

const TopBar = () => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  
  const MOCK_RESULTS = [
    { id: 'r1', type: 'Medicine', name: 'Lisinopril 10mg', tab: 'medicines', path: '/admin' },
    { id: 'r2', type: 'Medicine', name: 'Paracetamol 500mg', tab: 'medicines', path: '/admin' },
    { id: 'r3', type: 'Pharmacy', name: 'Apollo Pharmacy', tab: 'pharmacy', path: '/admin' },
    { id: 'r4', type: 'Pharmacy', name: 'MedPlus Central', tab: 'pharmacy', path: '/admin' },
    { id: 'r5', type: 'Citizen', name: 'Rahul Gupta', tab: 'users', path: '/admin' },
    { id: 'r6', type: 'Citizen', name: 'Dr. Arjun Mehta', tab: 'users', path: '/admin' },
    { id: 'r7', type: 'System', name: 'Threat Protocols', tab: 'alerts', path: '/admin' },
    { id: 'r8', type: 'System', name: 'Market Analytics', tab: 'analytics', path: '/admin' },
  ];

  const filteredResults = searchQuery.trim() 
    ? MOCK_RESULTS.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.type.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleResultClick = (result) => {
    navigate(result.path);
    
    
    setSearchQuery('');
    setShowResults(false);
  };

  const handleGlobalSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      
      
      if (user?.role === 'Admin') {
        if (q.includes('pharmacy') || q.includes('store')) {
          alert('Switching to Pharmacy Matrix...');
        } else if (q.includes('med') || q.includes('pill')) {
          alert('Switching to Global Formulary...');
        } else if (q.includes('user') || q.includes('patient') || q.includes('citizen')) {
          alert('Switching to Identity Matrix...');
        }
      }

      setShowResults(false);
      setSearchQuery('');
      e.target.blur();
    }
  };

  return (
    <header className="h-[70px] bg-white dark:bg-[#121826] border-b border-slate-100 dark:border-slate-800/60 flex items-center px-6 gap-4 shadow-[0_2px_16px_rgba(15,23,42,0.07)] sticky top-0 z-[50]">
      {}
      <div className="hidden lg:flex flex-col mr-4">
        <span className="text-[0.75rem] text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1.5">
          <Sun size={13} className="text-amber-400" /> {greeting},{' '}
          {user?.name?.split(' ')[0] || 'Member'}
        </span>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-[0.7rem] text-slate-400 dark:text-slate-600">{dateStr}</span>
          <div className="w-[1px] h-3 bg-slate-200 dark:bg-slate-800" />
          <span className="flex items-center gap-1.5 text-[0.6rem] font-black text-emerald-500 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
            Node Live
          </span>
        </div>
      </div>

      {}
      <div className="flex-1 max-w-md relative group">
        <Search
          className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
            showResults ? 'text-sky-500' : 'text-slate-400 dark:text-slate-500'
          }`}
          size={16}
        />
        <input
          type="text"
          value={searchQuery}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleGlobalSearch}
          placeholder="Search medicines, records, doctors…"
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#0B1121] border border-slate-200 dark:border-slate-800 rounded-2xl text-[0.85rem] text-slate-700 dark:text-white outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10 focus:bg-white dark:focus:bg-[#151E32] transition-all placeholder:text-slate-400 font-bold"
        />
        
        {}
        {showResults && filteredResults.length > 0 && (
          <div className={`absolute top-[calc(100%+10px)] left-0 w-full rounded-[1.5rem] border overflow-hidden shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-300 ${
            isDarkMode ? 'bg-slate-900/90 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
          }`}>
            <div className="p-3 bg-slate-100/50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5">
              <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-slate-400">Live Intelligence Results</p>
            </div>
            <div className="max-h-[350px] overflow-y-auto scrollbar-hide">
              {filteredResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-center justify-between p-4 hover:bg-sky-500/10 transition-colors border-b last:border-0 border-slate-100 dark:border-white/5 group"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[0.8rem] font-black group-hover:text-sky-500 transition-colors">{result.name}</span>
                    <span className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest mt-1">{result.type}</span>
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-[0.55rem] font-black uppercase tracking-widest text-slate-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    GO TO {result.tab}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {searchQuery && !showResults && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.6rem] font-bold text-slate-400 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded shadow-sm pointer-events-none">
            ENTER
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {}
        <button
          onClick={toggleTheme}
          className="relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#151E32] hover:text-slate-900 dark:hover:text-white transition-all border border-slate-100 dark:border-slate-800"
        >
          {isDarkMode ? (
            <Moon size={19} className="text-[#8B5CF6]" />
          ) : (
            <Sun size={19} className="text-amber-500" />
          )}
        </button>

        {}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#151E32] hover:text-slate-900 dark:hover:text-white transition-all border border-slate-100 dark:border-slate-800"
          >
            <Bell size={19} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[0.55rem] font-bold rounded-full flex items-center justify-center shadow-sm">
              {notifications.length}
            </span>
          </button>

          {notifOpen && (
            <NotificationDropdown
              notifications={notifications}
              onClose={() => setNotifOpen(false)}
            />
          )}
        </div>

        {}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#151E32] border border-slate-100 dark:border-slate-800 transition-all"
          >
            <div className="w-9 h-9 rounded-full relative p-0.5 border border-slate-200 dark:border-white/10 shadow-inner bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
              {user?.profilePic ? (
                <img 
                  src={user.profilePic} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#2A7FFF] to-[#2ECC71] flex items-center justify-center">
                  <User size={14} className="text-white" />
                </div>
              )}
              {}
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full shadow-sm" />
            </div>
            <div className="hidden sm:flex flex-col items-start text-left">
              <span className="text-[0.8rem] font-black text-gray-900 dark:text-white leading-none">
                {user?.name || 'MediSync Member'}
              </span>
              <span className="text-[0.65rem] text-gray-400 dark:text-slate-500 font-black uppercase tracking-widest mt-1">
                {user?.role || 'Patient'}
              </span>
            </div>
            <ChevronDown
              size={13}
              className={`text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {profileOpen && (
            <ProfileDropdown
              onClose={() => setProfileOpen(false)}
              onLogout={handleLogout}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
