import React, { useState } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import PatientProfileCard from './components/PatientProfileCard';
import VitalStatsRow from './components/VitalStatsRow';
import ClinicalHistory from './components/ClinicalHistory';
import ActiveNotesPanel from './components/ActiveNotesPanel';
import QuickActions from './components/QuickActions';
import './DoctorPortalPage.css';

const DoctorPortalPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          <PatientProfileCard />
          <VitalStatsRow />

          {/* Two-column layout */}
          <div className="flex gap-5 flex-col lg:flex-row">
            <div className="flex-1 min-w-0">
              <ClinicalHistory />
            </div>
            <div className="w-full lg:w-80 flex flex-col gap-4">
              <ActiveNotesPanel />
              <QuickActions />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorPortalPage;
