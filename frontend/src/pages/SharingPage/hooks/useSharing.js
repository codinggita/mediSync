import { useState, useEffect } from 'react';
import api from '../../../utils/api';

const useSharing = (user) => {
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
      if (!user || user.role === 'Doctor') {
        setLoading(false);
        return;
      }
      try {
        const [docRes, recRes] = await Promise.all([
          api.get('/users/doctors'),
          api.get('/records')
        ]);
        setDoctors(docRes.data);
        setRecords(recRes.data);
      } catch (error) {
        console.error('Error fetching clinical sharing data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleShareClick = (doctor) => {
    setSelectedDoctor(doctor);
    setSharingRecord(true);
    if (records.length > 0) setSelectedRecordId(records[0]._id);
  };

  const handleConfirmShare = async () => {
    if (!selectedRecordId || !selectedDoctor) return;
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
        setTimeout(() => window.open(waUrl, '_blank'), 1500);
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

  return {
    doctors,
    records,
    loading,
    sharingRecord,
    setSharingRecord,
    selectedDoctor,
    selectedRecordId,
    setSelectedRecordId,
    isSharing,
    successMessage,
    handleShareClick,
    handleConfirmShare
  };
};

export default useSharing;
