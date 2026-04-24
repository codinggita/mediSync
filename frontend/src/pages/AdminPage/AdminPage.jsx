import React, { useState } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import AdminMetrics from './components/AdminMetrics';
import PharmacyTable from './components/PharmacyTable';
import AlertsPanel from './components/AlertsPanel';
import UserManagement from './components/UserManagement';
import SystemHealth from './components/SystemHealth';
import './AdminPage.css';

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        {/* TopBar with extra action */}
        <TopBar />

        {/* Scrollable main */}
        <main className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

          {/* Section label */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Admin Control Panel</h1>
              <p className="text-sm text-gray-400">Full system overview — MediSync Platform</p>
            </div>
            <button className="flex items-center gap-2 bg-[#2A7FFF] text-white text-sm font-bold px-4 py-2 rounded-[10px] shadow-[0_4px_12px_rgba(46,125,50,0.25)] hover:bg-[#1A66CC] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200">
              + Add Pharmacy
            </button>
          </div>

          {/* Metrics */}
          <AdminMetrics />

          {/* Table + Alerts */}
          <div className="flex gap-5 flex-col xl:flex-row">
            <div className="flex-1 min-w-0 flex flex-col gap-5">
              <PharmacyTable />
              <UserManagement />
            </div>
            <div className="w-full xl:w-80 flex flex-col gap-5">
              <AlertsPanel />
              <SystemHealth />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
