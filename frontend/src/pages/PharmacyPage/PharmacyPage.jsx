import React, { useState } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import MedicineSearchPanel from './components/MedicineSearchPanel';
import NearbyPharmacies from './components/NearbyPharmacies';
import SavedMedicinesPanel from './components/SavedMedicinesPanel';
import PharmacyDecorations from './components/PharmacyDecorations';
import PharmacyHubHeader from './components/PharmacyHubHeader';
import SEO from '../../components/SEO';

const PharmacyPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#ecf0f3] dark:bg-[#0f141f] transition-colors duration-500 font-sans relative">
      <SEO
        title="Pharmacy Hub"
        description="Search medicines, compare prices across local pharmacies, and seamlessly route your clinical prescriptions."
      />
      <PharmacyDecorations />

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-8 scrollbar-hide pb-24 md:pb-10">
          <PharmacyHubHeader />

          {}
          <MedicineSearchPanel />

          {}
          <div className="w-full">
            <NearbyPharmacies />
          </div>

          {}
          <SavedMedicinesPanel />
        </main>
      </div>
    </div>
  );
};

export default PharmacyPage;
