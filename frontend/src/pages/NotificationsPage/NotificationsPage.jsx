import React, { useState } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import { AlertTriangle, TrendingDown, FileText, Bell } from 'lucide-react';
import NotificationsHeader from './components/NotificationsHeader';
import NotificationCard from './components/NotificationCard';

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
          <NotificationsHeader 
            onMarkAllRead={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
          />

          <div className="max-w-4xl space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <NotificationCard 
                  key={notif.id}
                  notif={notif}
                  onMarkRead={markAsRead}
                  onDelete={deleteNotification}
                />
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
