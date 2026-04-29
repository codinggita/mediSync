import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, ChevronDown, User, X, CheckCircle, AlertTriangle, LogOut } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const notifications = [
  { id: 1, type: 'alert', text: 'Medicine refill required: Metformin', time: '5 min ago', unread: true },
  { id: 2, type: 'success', text: 'Lab results uploaded successfully', time: '1 hr ago', unread: true },
  { id: 3, type: 'alert', text: 'Appointment tomorrow at 10:00 AM', time: '2 hrs ago', unread: true },
];

const TopBar = () => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleGlobalSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      
      // Premium Smart Routing Engine (Frontend Simulation)
      if (q.includes('medicine') || q.includes('pill') || q.includes('pharmacy') || q.includes('aspirin') || q.includes('paracetamol')) {
        navigate('/pharmacy');
      } else if (q.includes('doctor') || q.includes('appointment') || q.includes('dr') || q.includes('schedule') || q.includes('meet')) {
        navigate('/appointments');
      } else if (q.includes('record') || q.includes('mri') || q.includes('scan') || q.includes('xray') || q.includes('blood') || q.includes('history') || q.includes('archive')) {
        navigate('/records');
      } else if (q.includes('portal') || q.includes('clinical') || q.includes('active') || q.includes('note') || q.includes('patient') || q.includes('update')) {
        navigate('/doctor-portal');
      } else if (q.includes('setting') || q.includes('profile') || q.includes('password') || q.includes('account')) {
        navigate('/settings');
      } else {
        alert(`Deep Search Triggered for: "${searchQuery}"\n\nIn production, this will query the global Elasticsearch database for patients, cross-hospital records, and external inventory.`);
      }
      
      setSearchQuery('');
      e.target.blur(); // Remove focus after search
    }
  };

  return (
    <header className="h-[70px] bg-white dark:bg-[#121826] border-b border-slate-100 dark:border-slate-800/60 flex items-center px-6 gap-4 shadow-[0_2px_16px_rgba(15,23,42,0.07)] sticky top-0 z-[50]">
      {/* Greeting */}
      <div className="hidden lg:flex flex-col mr-4">
        <span className="text-[0.75rem] text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1.5">
          <Sun size={13} className="text-amber-400" /> {greeting}, {user?.name?.split(' ')[0] || 'Member'}
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

      {/* Global Smart Search */}
      <div className="flex-1 max-w-sm relative group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-sky-500 transition-colors" size={16} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleGlobalSearch}
          placeholder="Search medicines, records, doctors…"
          className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#0B1121] border border-slate-200 dark:border-slate-800 rounded-xl text-[0.85rem] text-slate-700 dark:text-white outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10 focus:bg-white dark:focus:bg-[#151E32] transition-all placeholder:text-slate-400 font-medium"
        />
        {searchQuery && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.6rem] font-bold text-slate-400 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded shadow-sm pointer-events-none">
            ENTER
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Theme Toggle */}
        <button onClick={toggleTheme}
          className="relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#151E32] hover:text-slate-900 dark:hover:text-white transition-all border border-slate-100 dark:border-slate-800">
          {isDarkMode ? <Moon size={19} className="text-[#8B5CF6]" /> : <Sun size={19} className="text-amber-500" />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#151E32] hover:text-slate-900 dark:hover:text-white transition-all border border-slate-100 dark:border-slate-800">
            <Bell size={19} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[0.55rem] font-bold rounded-full flex items-center justify-center shadow-sm">{notifications.length}</span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#151E32] border border-gray-100 dark:border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-[100] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 dark:border-white/5">
                <span className="font-bold text-gray-900 dark:text-white text-[0.9rem]">Notifications</span>
                <button onClick={() => setNotifOpen(false)} className="text-gray-400 hover:text-gray-700 dark:hover:text-white"><X size={16} /></button>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-white/5">
                {notifications.map(n => (
                  <div key={n.id} className={`px-4 py-3 flex gap-3 hover:bg-gray-50 dark:hover:bg-[#1E293B] transition-colors ${n.unread ? 'bg-[#2A7FFF]/3' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.type === 'alert' ? 'bg-red-50 dark:bg-red-500/10' : 'bg-green-50 dark:bg-green-500/10'}`}>
                      {n.type === 'alert' ? <AlertTriangle size={14} className="text-[#D32F2F] dark:text-red-400" /> : <CheckCircle size={14} className="text-[#2A7FFF] dark:text-green-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.8rem] font-semibold text-gray-800 dark:text-white leading-tight">{n.text}</p>
                      <p className="text-[0.7rem] text-gray-400 dark:text-slate-500 mt-0.5">{n.time}</p>
                    </div>
                    {n.unread && <div className="w-2 h-2 bg-[#2A7FFF] rounded-full shrink-0 mt-1"></div>}
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-gray-50 dark:border-white/5 text-center">
                <button className="text-[0.78rem] text-[#2A7FFF] font-bold hover:underline">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#151E32] border border-slate-100 dark:border-slate-800 transition-all">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2A7FFF] to-[#2ECC71] flex items-center justify-center shadow-sm">
              <User size={14} className="text-white" />
            </div>
            <div className="hidden sm:flex flex-col items-start text-left">
              <span className="text-[0.8rem] font-bold text-gray-900 dark:text-white leading-none">{user?.name || 'MediSync Member'}</span>
              <span className="text-[0.65rem] text-gray-400 dark:text-slate-500 font-medium mt-0.5">{user?.role || 'Patient'}</span>
            </div>
            <ChevronDown size={13} className={`text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-[#151E32] border border-gray-100 dark:border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-2 z-[100]">
              {['My Profile', 'System Settings', 'Security HUD'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => {
                    setProfileOpen(false);
                    if (item === 'My Profile') navigate('/settings?tab=profile');
                    if (item === 'System Settings') navigate('/settings?tab=records');
                    if (item === 'Security HUD') navigate('/settings?tab=security');
                  }}
                  className="w-full text-left px-4 py-2.5 text-[0.83rem] font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#1E293B] hover:text-[#2A7FFF] transition-colors"
                >
                  {item}
                </button>
              ))}
              <div className="border-t border-gray-100 dark:border-white/5 mt-1 pt-1">
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-[0.83rem] font-medium text-[#D32F2F] dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-2"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
