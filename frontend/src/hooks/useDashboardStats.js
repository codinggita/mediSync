import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

export const useDashboardStats = () => {
  const [stats, setStats] = useState({ medicines: 0, records: 0, appointments: 0, alerts: 3 });
  const [loading, setLoading] = useState(true);

  const refreshStats = useCallback(async () => {
    try {
      const [prescRes, recordRes, apptRes] = await Promise.all([
        api.get('/prescriptions/my').catch(e => ({ data: { medicines: [] } })), 
        api.get('/records').catch(e => ({ data: [] })), 
        api.get('/appointments').catch(e => ({ data: [] }))
      ]);
      
      const medicinesCount = Array.isArray(prescRes?.data) 
        ? prescRes.data.length 
        : (prescRes?.data?.medicines?.length || 0);

      setStats({
        medicines: medicinesCount,
        records: Array.isArray(recordRes?.data) ? recordRes.data.length : 0,
        appointments: Array.isArray(apptRes?.data) ? apptRes.data.length : 0,
        alerts: medicinesCount === 0 ? 1 : 3 // Dynamic alert if no meds saved
      });
    } catch (error) { 
      console.error('Error refreshing dashboard stats:', error); 
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  return { stats, loading, refreshStats };
};
