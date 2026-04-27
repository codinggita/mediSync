import React, { useState, useEffect } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import DoctorSharingPage from './components/DoctorSharingPage';
import SharingHeader from './components/SharingHeader';
import DoctorSharingModal from './components/DoctorSharingModal';
import SharingDecorations from './components/SharingDecorations';
import SharingMainContent from './components/SharingMainContent';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const SharingPage = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sharingRecord, setSharingRecord] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (user?.role === 'Doctor') return;
      try {
        const [docRes, recRes] = await Promise.all([
          api.get('/users/doctors'),
          api.get('/records')
        ]);
        setDoctors(docRes.data);
        setRecords(recRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleShareClick = (doctor) => {
    setSelectedDoctor(doctor);
    setSharingRecord(true);
    if (records.length > 0) {
      setSelectedRecordId(records[0]._id);
    }
  };

  const handleConfirmShare = async () => {
    if (!selectedRecordId) return;
    setIsSharing(true);
    try {
      await api.post('/records/share', {
        recordId: selectedRecordId,
        doctorId: selectedDoctor._id
      });

      const sharedRec = records.find(r => r._id === selectedRecordId);
      const recordTitle = sharedRec ? sharedRec.title : 'Medical Record';

      setSuccessMessage(`Report successfully shared with Dr. ${selectedDoctor.name}`);
      
      const doctorPhone = selectedDoctor.whatsapp || selectedDoctor.phone || '';
      if (doctorPhone) {
        const cleanPhone = doctorPhone.replace(/\D/g, '');
        const message = encodeURIComponent(`Hello Dr. ${selectedDoctor.name},\n\nI have shared my medical report *"${recordTitle}"* with you on MediSync. Please review it in your "Shared Archives" dashboard.\n\nThank you,\n${user.name}`);
        const waUrl = `https://wa.me/${cleanPhone}?text=${message}`;
        
        setTimeout(() => {
          window.open(waUrl, '_blank');
        }, 1500);
      }

      setTimeout(() => {
        setSuccessMessage('');
        setSharingRecord(false);
        setSelectedDoctor(null);
      }, 4000);
    } catch (error) {
      console.error('Error sharing record:', error);
      alert('Failed to share record. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#ecf0f3] dark:bg-[#0f141f] transition-colors duration-500 font-sans relative text-slate-800 dark:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,127,255,0.03),transparent)] pointer-events-none" />
      
      <SharingDecorations />
      
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        <TopBar />
        {user?.role === 'Doctor' ? (
          <DoctorSharingPage />
        ) : (
          <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-10 scrollbar-hide pb-24 md:pb-20">
            <SharingHeader />

            <SharingMainContent 
              loading={loading}
              doctors={doctors}
              onShareClick={handleShareClick}
            />
          </main>
        )}
      </div>

      <DoctorSharingModal 
        show={sharingRecord}
        onClose={() => setSharingRecord(false)}
        selectedDoctor={selectedDoctor}
        records={records}
        selectedRecordId={selectedRecordId}
        setSelectedRecordId={setSelectedRecordId}
        onConfirm={handleConfirmShare}
        isSharing={isSharing}
        successMessage={successMessage}
      />
    </div>
  );
};

export default SharingPage;
