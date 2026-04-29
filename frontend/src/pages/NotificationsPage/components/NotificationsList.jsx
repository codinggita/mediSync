import React from 'react';
import NotificationCard from './NotificationCard';
import EmptyNotifications from './EmptyNotifications';

const NotificationsList = ({ notifications, onMarkRead, onDelete }) => {
  if (notifications.length === 0) return <EmptyNotifications />;

  return (
    <div className="max-w-4xl space-y-4">
      {notifications.map((notif) => (
        <NotificationCard
          key={notif.id}
          notif={notif}
          onMarkRead={onMarkRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NotificationsList;
