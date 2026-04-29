import { useState, useEffect } from 'react';
import api from '../../../utils/api';

const useMedicalRecords = (user) => {
  const [records, setRecords] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const { data } = await api.get('/records');
        if (Array.isArray(data) && data.length > 0) {
          setRecords(data);
          setSelectedId(data[0]._id);
        } else {
          setRecords([]);
          setSelectedId(null);
        }
      } catch (error) {
        console.error('Error fetching clinical records:', error);
        setRecords([]);
        setSelectedId(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const selectedRecord = records.find(r => r._id === selectedId);

  const deleteRecord = async (id) => {
    try {
      await api.delete(`/records/${id}`);
      const updatedRecords = records.filter(r => r._id !== id);
      setRecords(updatedRecords);
      if (selectedId === id) {
        setSelectedId(updatedRecords.length > 0 ? updatedRecords[0]._id : null);
      }
      return { success: true };
    } catch (err) {
      console.error('Delete failed:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    records,
    selectedId,
    setSelectedId,
    loading,
    selectedRecord,
    deleteRecord
  };
};

export default useMedicalRecords;
