import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import DashboardContent from './components/DashboardContent';

const DashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar />
        <DashboardContent />
      </div>
    </div>
  );
};

export default DashboardPage;
