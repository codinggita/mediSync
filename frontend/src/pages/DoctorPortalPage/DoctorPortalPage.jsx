import React, { useState, useEffect } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import PatientProfileCard from './components/PatientProfileCard';
import ClinicalLoader from './components/ClinicalLoader';
import ClinicalStatsDisplay from './components/ClinicalStatsDisplay';
import { Loader2, Activity } from 'lucide-react';
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

  
  const [showAiModal, setShowAiModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showRadiologyModal, setShowRadiologyModal] = useState(false);
  const [showLabModal, setShowLabModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState({
    medicine: '',
    dosage: '',
    instructions: '',
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const [appRes, recRes] = await Promise.all([api.get('/appointments'), api.get('/records')]);

        const uniquePatients = [];
        const seenIds = new Set();

        const getPatientObj = (item) =>
          item && typeof item === 'object' && item._id ? item : null;

        appRes.data.forEach((app) => {
          const patientObj = getPatientObj(app.patient);
          if (patientObj && !seenIds.has(String(patientObj._id))) {
            uniquePatients.push(patientObj);
            seenIds.add(String(patientObj._id));
          }
        });

        if (uniquePatients.length === 0) {
          uniquePatients.push({
            _id: 'dummy1',
            name: 'James Wilson',
            gender: 'Male',
            bloodGroup: 'O+',
            dateOfBirth: '1985-06-15T00:00:00.000Z',
            patientId: 'MS-891-W',
            records: [
              { title: 'Lab Report — HbA1c Test', type: 'Lab Report', description: 'HbA1c level at 7.8%. Indicates poor glycemic control over past 3 months.', createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString() },
              { title: 'Clinical Consultation', type: 'Clinical Note', description: 'Patient presented with dizziness and elevated BP (148/94). Adjusted antihypertensive dosage.', createdAt: new Date(Date.now() - 3600000 * 24 * 12).toISOString() }
            ]
          });
          uniquePatients.push({
            _id: 'dummy2',
            name: 'Elena Rodriguez',
            gender: 'Female',
            bloodGroup: 'A-',
            dateOfBirth: '1992-11-20T00:00:00.000Z',
            patientId: 'MS-922-R',
            records: [
              { title: 'ECG Report', type: 'Imaging', description: 'Sinus rhythm. No significant ST-segment changes. Left ventricular hypertrophy noted.', createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString() }
            ]
          });
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

  const activePatient = patients.find((p) => String(p._id) === String(selectedPatientId));
  const activeAppointment = appointments.find(
    (app) => String(app.patient?._id || app.patient) === String(selectedPatientId)
  );

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
            <ClinicalLoader />
          ) : activePatient ? (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
              <div className="xl:col-span-8 flex flex-col gap-10">
                <PatientProfileCard
                  patient={activePatient}
                  onPrescribe={() => setShowPrescriptionModal(true)}
                  onAiDiagnosis={() => setShowAiModal(true)}
                  onAddRecord={() => setShowUploadModal(true)}
                />
                <ClinicalStatsDisplay activePatient={activePatient} />
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
        showAiModal={showAiModal}
        setShowAiModal={setShowAiModal}
        showPrescriptionModal={showPrescriptionModal}
        setShowPrescriptionModal={setShowPrescriptionModal}
        showRadiologyModal={showRadiologyModal}
        setShowRadiologyModal={setShowRadiologyModal}
        showLabModal={showLabModal}
        setShowLabModal={setShowLabModal}
        showUploadModal={showUploadModal}
        setShowUploadModal={setShowUploadModal}
        prescriptionData={prescriptionData}
        setPrescriptionData={setPrescriptionData}
        handlePrescriptionSubmit={handlePrescriptionSubmit}
        activePatient={activePatient}
      />
    </div>
  );
};

export default DoctorPortalPage;
