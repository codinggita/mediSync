import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';

import EmergencyHeader from './components/EmergencyHeader';
import ResponseNetwork from './components/ResponseNetwork';
import TrustedNetwork from './components/TrustedNetwork';
import ClinicalIdCard from './components/ClinicalIdCard';

const EmergencyPage = () => {
  return (
    <div className="min-h-screen bg-[#FFF5F5] font-sans flex flex-col">

            <div className="xl:col-span-5 space-y-12">
               <TrustedNetwork 
                 contacts={emergencyContacts} 
                 isSearching={isSearching} 
                 onRefresh={handleRefresh} 
               />
               <ClinicalIdCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};


export default EmergencyPage;
