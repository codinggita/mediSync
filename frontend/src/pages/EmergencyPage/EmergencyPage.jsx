import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';

import EmergencyHeader from './components/EmergencyHeader';
import ResponseNetwork from './components/ResponseNetwork';
import TrustedNetwork from './components/TrustedNetwork';
import ClinicalIdCard from './components/ClinicalIdCard';

const EmergencyPage = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState('tactical'); // 'tactical' or 'list'
  const [isSearching, setIsSearching] = useState(false);
  const [isSOSActive, setIsSOSActive] = useState(true);
  const [deploymentStatus, setDeploymentStatus] = useState(null);

  const nearbyHospitals = [
    { id: 1, name: 'City Super Specialty Hospital', distance: '0.8 km', phone: '+919876543210', status: 'High Capacity', time: '5 mins', lat: 19.0760, lng: 72.8777, triage: 'Critical' },
    { id: 2, name: 'MediSync Care Center', distance: '1.4 km', phone: '+919876500000', status: 'Immediate', time: '8 mins', lat: 19.0860, lng: 72.8877, triage: 'Stable' },
    { id: 3, name: 'LifeCare Trauma Center', distance: '2.5 km', phone: '+919876511111', status: 'Moderate', time: '12 mins', lat: 19.0960, lng: 72.8977, triage: 'Delayed' }
  ];

  const emergencyContacts = [
    { name: 'Rahul (Brother)', relation: 'Primary', phone: '+919988776655' },
    { name: 'Dr. Arpit Khanna', relation: 'Cardiologist', phone: '+919900112233' },
    { name: 'Anjali (Wife)', relation: 'Secondary', phone: '+919977665544' }
  ];

  const handleRefresh = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 2000);
  };

  const handleDeploy = (hosp) => {
    setDeploymentStatus(hosp.id);
    setTimeout(() => {
        const query = encodeURIComponent(`${hosp.name}, ${hosp.lat},${hosp.lng}`);
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
        setDeploymentStatus(null);
    }, 1500);
  };

  const handleSOSAction = () => setIsSOSActive(!isSOSActive);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F0F4F8] dark:bg-[#090E1A] transition-colors duration-500 font-sans relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
      
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-10 scrollbar-hide pb-24">
          <EmergencyHeader isSOSActive={isSOSActive} onSOSAction={handleSOSAction} onBack={() => navigate('/dashboard')} />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            <ResponseNetwork nearbyHospitals={nearbyHospitals} viewMode={viewMode} setViewMode={setViewMode} onDeploy={handleDeploy} deploymentStatus={deploymentStatus} />

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
