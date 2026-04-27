import React, { useState } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import NotificationsHeader from './components/NotificationsHeader';
import NotificationsList from './components/NotificationsList';
import { useNotifications } from './hooks/useNotifications';

const NotificationsPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#0B1121] transition-colors duration-300">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide pb-24 md:pb-6">
          <NotificationsHeader 
            onMarkAllRead={markAllAsRead}
          />

          <NotificationsList 
            notifications={notifications}
            onMarkRead={markAsRead}
            onDelete={deleteNotification}
          />
        </main>
      </div>
    </div>
  );
};

export default NotificationsPage;
