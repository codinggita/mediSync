import React from 'react';
import AdminOverviewTab from './AdminOverviewTab';
import AdminPharmacyTab from './AdminPharmacyTab';
import AdminMedicineTab from './AdminMedicineTab';
import AdminPriceTab from './AdminPriceTab';
import AdminUsersTab from './AdminUsersTab';
import AdminAnalyticsTab from './AdminAnalyticsTab';
import AdminAlertsTab from './AdminAlertsTab';

const AdminTabContent = ({ activeTab, setAlertCount }) => {
  switch (activeTab) {
    case 'overview':
      return <AdminOverviewTab />;
    case 'pharmacy':
      return <AdminPharmacyTab />;
    case 'medicines':
      return <AdminMedicineTab />;
    case 'prices':
      return <AdminPriceTab />;
    case 'users':
      return <AdminUsersTab />;
    case 'analytics':
      return <AdminAnalyticsTab />;
    case 'alerts':
      return <AdminAlertsTab onCountChange={setAlertCount} />;
    default:
      return <AdminOverviewTab />;
  }
};

export default AdminTabContent;
