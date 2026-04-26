import React, { useState } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import { 
  Bell, AlertTriangle, TrendingDown, FileText, 
  Trash2, CheckCircle, Clock, ChevronRight 
} from 'lucide-react';

const NotificationsPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Critical Health Alert',
      message: 'Abnormal glucose levels detected in your recent Blood Test. Please consult Dr. Arpit Khanna immediately.',
      time: '10 mins ago',
      read: false,
      icon: AlertTriangle,
      color: '#EF4444'
    },
    {
      id: 2,
      type: 'price_drop',
      title: 'Medicine Price Drop 📉',
      message: 'Price for "Metformin 500mg" dropped by 25% at Apollo Pharmacy. You can save ₹120 on your next strip.',
      time: '2 hours ago',
      read: false,
      icon: TrendingDown,
      color: '#2A7FFF'
    },
    {
      id: 3,
      type: 'report',
      title: 'New Diagnostic Report',
      message: 'Your "Chest X-Ray" from City Scan Center is now available in your Medical Vault.',
      time: '5 hours ago',
      read: true,
      icon: FileText,
      color: '#2ECC71'
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#0B1121] transition-colors duration-300">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide pb-24 md:pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
               <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#151E32] flex items-center justify-center shadow-sm text-[#2A7FFF] border border-slate-100 dark:border-slate-800">
                  <Bell size={28} />
               </div>
               <div>
                  <h1 className="text-2xl font-black text-slate-900 dark:text-white">Health Alerts</h1>
                  <p className="text-[0.8rem] font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time health & price intelligence</p>
               </div>
            </div>
            <button 
              onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
              className="px-6 py-3 bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-800 rounded-xl text-[0.75rem] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all"
            >
               Mark all as read
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-w-4xl space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div 
                  key={notif.id}
                  className={`group p-6 rounded-[2.5rem] border transition-all relative overflow-hidden ${
                    notif.read 
                    ? 'bg-white/40 dark:bg-[#151E32]/40 border-slate-100 dark:border-slate-800/40 opacity-70' 
                    : 'bg-white dark:bg-[#151E32] border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none'
                  }`}
                >
                  <div className="flex items-start gap-6 relative z-10">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${notif.color}15`, color: notif.color }}
                    >
                      <notif.icon size={28} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                           <h3 className="text-[1rem] font-black text-slate-900 dark:text-white">{notif.title}</h3>
                           {!notif.read && <div className="w-2 h-2 rounded-full bg-[#2A7FFF] animate-pulse"></div>}
                        </div>
                        <span className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1.5">
                           <Clock size={12} /> {notif.time}
                        </span>
                      </div>
                      <p className="text-[0.9rem] font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{notif.message}</p>
                      
                      <div className="flex items-center gap-3">
                         {!notif.read && (
                           <button 
                             onClick={() => markAsRead(notif.id)}
                             className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-[0.7rem] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                           >
                              Mark Read
                           </button>
                         )}
                         <button 
                           onClick={() => deleteNotification(notif.id)}
                           className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                         >
                            <Trash2 size={16} />
                         </button>
                      </div>
                    </div>
                    
                    <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#0B1121] flex items-center justify-center text-slate-300 group-hover:text-[#2A7FFF] transition-all">
                       <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                 <Bell size={64} className="text-slate-300 mb-4" />
                 <p className="text-lg font-black text-slate-400 uppercase tracking-[0.2em]">All Caught Up!</p>
                 <p className="text-sm font-bold text-slate-400">No new notifications at the moment.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotificationsPage;
