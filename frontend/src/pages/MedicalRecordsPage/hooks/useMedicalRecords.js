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
        setRecords(data);
        if (data.length > 0) setSelectedId(data[0]._id);
      } catch (error) {
        console.error('Error fetching clinical records:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const selectedRecord = records.find(r => r._id === selectedId);

  return {
    records,
    selectedId,
    setSelectedId,
    loading,
    selectedRecord
  };
};

export default useMedicalRecords;
