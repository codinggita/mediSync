import React, { useState } from 'react';
import { Search, Bell, Sun, ChevronDown, User, X, CheckCircle, AlertTriangle } from 'lucide-react';

const notifications = [
  { id: 1, type: 'alert', text: 'Medicine refill required: Metformin', time: '5 min ago', unread: true },
  { id: 2, type: 'success', text: 'Lab results uploaded successfully', time: '1 hr ago', unread: true },
  { id: 3, type: 'alert', text: 'Appointment tomorrow at 10:00 AM', time: '2 hrs ago', unread: true },
];

const TopBar = () => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <header className="h-[70px] bg-white border-b border-slate-100 flex items-center px-6 gap-4 shadow-[0_2px_16px_rgba(15,23,42,0.07)] sticky top-0 z-10">
      {/* Greeting */}
      <div className="hidden lg:flex flex-col mr-4">
        <span className="text-[0.75rem] text-slate-400 font-medium flex items-center gap-1.5">
          <Sun size={13} className="text-amber-400" /> {greeting}, Priyabrata
        </span>
        <span className="text-[0.7rem] text-slate-400">{dateStr}</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-sm relative group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={16} />
        <input
          type="text"
          placeholder="Search medicines, records, doctors…"
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[0.85rem] text-slate-700 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10 focus:bg-white transition-all placeholder:text-slate-400 font-medium"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notification Bell */}
        <div className="relative">
          <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all border border-slate-100">
            <Bell size={19} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[0.55rem] font-bold rounded-full flex items-center justify-center shadow-sm">{notifications.length}</span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                <span className="font-bold text-gray-900 text-[0.9rem]">Notifications</span>
                <button onClick={() => setNotifOpen(false)} className="text-gray-400 hover:text-gray-700"><X size={16} /></button>
              </div>
              <div className="divide-y divide-gray-50">
                {notifications.map(n => (
                  <div key={n.id} className={`px-4 py-3 flex gap-3 hover:bg-gray-50 transition-colors ${n.unread ? 'bg-[#2A7FFF]/3' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.type === 'alert' ? 'bg-red-50' : 'bg-green-50'}`}>
                      {n.type === 'alert' ? <AlertTriangle size={14} className="text-[#D32F2F]" /> : <CheckCircle size={14} className="text-[#2A7FFF]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.8rem] font-semibold text-gray-800 leading-tight">{n.text}</p>
                      <p className="text-[0.7rem] text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                    {n.unread && <div className="w-2 h-2 bg-[#2A7FFF] rounded-full shrink-0 mt-1"></div>}
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-gray-50 text-center">
                <button className="text-[0.78rem] text-[#2A7FFF] font-bold hover:underline">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-50 border border-slate-100 transition-all">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2A7FFF] to-[#2ECC71] flex items-center justify-center shadow-sm">
              <User size={14} className="text-white" />
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-[0.8rem] font-bold text-gray-900 leading-none">Priyabrata</span>
              <span className="text-[0.65rem] text-gray-400 font-medium mt-0.5">Patient</span>
            </div>
            <ChevronDown size={13} className={`text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-2 z-50">
              {['My Profile', 'Health Settings', 'Billing'].map((item) => (
                <button key={item} className="w-full text-left px-4 py-2.5 text-[0.83rem] font-medium text-gray-700 hover:bg-gray-50 hover:text-[#2A7FFF] transition-colors">{item}</button>
              ))}
              <div className="border-t border-gray-100 mt-1 pt-1">
                <button className="w-full text-left px-4 py-2.5 text-[0.83rem] font-medium text-[#D32F2F] hover:bg-red-50 transition-colors">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
