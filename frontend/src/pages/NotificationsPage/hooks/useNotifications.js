import { useState } from 'react';
import { INITIAL_NOTIFICATIONS } from '../utils/NotificationConstants';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
  };
};
