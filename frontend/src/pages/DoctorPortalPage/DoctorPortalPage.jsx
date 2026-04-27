import React, { useState, useEffect } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import PatientProfileCard from './components/PatientProfileCard';
import VitalStatsRow from './components/VitalStatsRow';
import ClinicalHistory from './components/ClinicalHistory';
import ActiveNotesPanel from './components/ActiveNotesPanel';
import QuickActions from './components/QuickActions';
import { Loader2, BrainCircuit, Video, Phone, Mic, MicOff, FileText, X, Check, Search, HeartPulse, Activity, User, AlertTriangle, Scan, TestTube, ArrowUpRight, ArrowDownRight, MessageCircle, UploadCloud, RefreshCw, Calendar, Clock } from 'lucide-react';
import api from '../../utils/api';

import ClinicalHeader from './components/ClinicalHeader';
import ClinicalModals from './components/ClinicalModals';
import ScheduleSidebar from './components/ScheduleSidebar';

const DoctorPortalPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // New Modals State
  const [showAiModal, setShowAiModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showRadiologyModal, setShowRadiologyModal] = useState(false);
  const [showLabModal, setShowLabModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState({ medicine: '', dosage: '', instructions: '' });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const [appRes, recRes] = await Promise.all([
          api.get('/appointments'),
          api.get('/records')
        ]);
        
        const uniquePatients = [];
        const seenIds = new Set();
        
        const getPatientObj = (item) => (item && typeof item === 'object' && item._id) ? item : null;

        appRes.data.forEach(app => {
          const patientObj = getPatientObj(app.patient);
          if (patientObj && !seenIds.has(String(patientObj._id))) {
            uniquePatients.push(patientObj);
            seenIds.add(String(patientObj._id));
          }
        });

        if (uniquePatients.length === 0) {
           uniquePatients.push({ _id: 'dummy1', name: 'James Wilson', gender: 'Male', bloodGroup: 'O+', dateOfBirth: '1985-06-15T00:00:00.000Z', patientId: 'MS-891-W' });
           uniquePatients.push({ _id: 'dummy2', name: 'Elena Rodriguez', gender: 'Female', bloodGroup: 'A-', dateOfBirth: '1992-11-20T00:00:00.000Z', patientId: 'MS-922-R' });
        }

        setPatients(uniquePatients);
        setAppointments(appRes.data);
        if (uniquePatients.length > 0) setSelectedPatientId(uniquePatients[0]._id);
      } catch (error) {
        console.error('Error fetching doctor patients:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const [appRes] = await Promise.all([api.get('/appointments')]);
      setAppointments(appRes.data);
    } catch (error) {
      console.error('Error refreshing patients:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const activePatient = patients.find(p => String(p._id) === String(selectedPatientId));
  const activeAppointment = appointments.find(app => String(app.patient?._id || app.patient) === String(selectedPatientId));

  const handlePrescriptionSubmit = (e) => {
    e.preventDefault();
    alert(`Prescription for ${prescriptionData.medicine} saved!`);
    setShowPrescriptionModal(false);
    setPrescriptionData({ medicine: '', dosage: '', instructions: '' });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#ecf0f3] dark:bg-[#0f141f] transition-colors duration-500 font-sans relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,127,255,0.03),transparent)] pointer-events-none" />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        <TopBar />
        <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-10 scrollbar-hide pb-24 md:pb-20">
          
          <ClinicalHeader 
            refreshing={refreshing} 
            handleRefresh={handleRefresh} 
            activeAppointment={activeAppointment} 
            patients={patients} 
            selectedPatientId={selectedPatientId} 
            setSelectedPatientId={setSelectedPatientId} 
          />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-6 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] shadow-2xl">
              <Loader2 className="animate-spin text-[#2A7FFF]" size={50} />
              <p className="text-slate-400 font-black uppercase tracking-widest">Synchronizing Clinical Data...</p>
            </div>
          ) : activePatient ? (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
               <div className="xl:col-span-8 flex flex-col gap-10">
                  <PatientProfileCard 
                    patient={activePatient} 
                    onPrescribe={() => setShowPrescriptionModal(true)}
                    onAiDiagnosis={() => setShowAiModal(true)}
                    onAddRecord={() => setShowUploadModal(true)}
                  />
                  <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3.5rem] p-10 shadow-2xl border border-white/40">
                    <h3 className="text-[1.2rem] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                      <Activity className="text-[#2A7FFF]" /> Real-Time Vitals
                    </h3>
                    <VitalStatsRow patient={activePatient} />
                  </div>
                  <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3.5rem] p-10 shadow-2xl border border-white/40">
                    <h3 className="text-[1.2rem] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-8">Clinical History</h3>
                    <ClinicalHistory patient={activePatient} />
                  </div>
               </div>

               <ScheduleSidebar 
                 appointments={appointments} 
                 activePatient={activePatient} 
                 selectedPatientId={selectedPatientId} 
                 setSelectedPatientId={setSelectedPatientId} 
               />
            </div>
          ) : null}
        </main>
      </div>

      <ClinicalModals 
        showAiModal={showAiModal} setShowAiModal={setShowAiModal}
        showPrescriptionModal={showPrescriptionModal} setShowPrescriptionModal={setShowPrescriptionModal}
        showRadiologyModal={showRadiologyModal} setShowRadiologyModal={setShowRadiologyModal}
        showLabModal={showLabModal} setShowLabModal={setShowLabModal}
        showUploadModal={showUploadModal} setShowUploadModal={setShowUploadModal}
        prescriptionData={prescriptionData} setPrescriptionData={setPrescriptionData}
        handlePrescriptionSubmit={handlePrescriptionSubmit}
        activePatient={activePatient}
      />
    </div>
  );
};

export default DoctorPortalPage;
