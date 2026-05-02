import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

export const useDoctorStats = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    activeAlerts: 0,
    recentReports: 0,
    appointments: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [criticalCases, setCriticalCases] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshStats = useCallback(async () => {
    try {
      const [recordRes, apptRes] = await Promise.all([
        api.get('/records').catch(() => ({ data: [] })),
        api.get('/appointments').catch(() => ({ data: [] })),
      ]);

      let records = recordRes.data || [];
      let appointments = apptRes.data || [];

      
      if (records.length === 0) {
        records = [
          { _id: 'mock_r1', type: 'Lab Report', title: 'Lipid Profile', patient: { name: 'James Wilson' }, createdAt: new Date(Date.now() - 86400000 * 1).toISOString() },
          { _id: 'mock_r2', type: 'Imaging', title: 'Chest X-Ray', patient: { name: 'Sarah Connor' }, createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
          { _id: 'mock_r3', type: 'Emergency', title: 'Critical Hypertension Alert', patient: { name: 'Elena Rodriguez' }, createdAt: new Date(Date.now() - 86400000 * 0.5).toISOString() },
          { _id: 'mock_r4', type: 'Clinical Note', title: 'Post-Op Follow-up', patient: { name: 'Mark Evans' }, createdAt: new Date(Date.now() - 86400000 * 4).toISOString() },
          { _id: 'mock_r5', type: 'Emergency', title: 'Acute Asthma Attack', patient: { name: 'Sarah Connor' }, createdAt: new Date(Date.now() - 86400000 * 1).toISOString() },
          { _id: 'mock_r6', type: 'Lab Report', title: 'Complete Blood Count', patient: { name: 'James Wilson' }, createdAt: new Date(Date.now() - 86400000 * 6).toISOString() }
        ];
      }

      if (appointments.length === 0) {
        appointments = [
          { _id: 'mock_a1', status: 'Pending', patient: { name: 'Elena Rodriguez' } },
          { _id: 'mock_a2', status: 'Pending', patient: { name: 'James Wilson' } },
          { _id: 'mock_a3', status: 'Scheduled', patient: { name: 'Sarah Connor' } },
          { _id: 'mock_a4', status: 'Scheduled', patient: { name: 'Mark Evans' } }
        ];
      }

      
      const uniquePatients = new Set(records.map((r) => r.patient?._id).filter(Boolean));
      const pendingAppointments = appointments.filter((a) => a.status === 'Pending').length;

      const scheduledAppointments = appointments.filter((a) => a.status === 'Scheduled').length;

      setStats({
        totalPatients: uniquePatients.size,
        activeAlerts: pendingAppointments, 
        recentReports: records.length,
        appointments: scheduledAppointments,
      });

      
      let activity = records.slice(0, 4).map((r) => ({
        id: r._id,
        type: 'report',
        patient: r.patient?.name || 'Unknown Patient',
        detail: `Uploaded ${r.title}`,
        time: new Date(r.createdAt).toLocaleDateString(),
        isCritical: r.type === 'Emergency' || r.title.toLowerCase().includes('critical'),
      }));



      setRecentActivity(activity);

      
      const critical = records
        .filter((r) => r.type === 'Emergency' || r.title.toLowerCase().includes('critical'))
        .slice(0, 2)
        .map((r) => ({
          id: r._id,
          name: r.patient?.name || 'Patient',
          condition: r.title,
          status: 'Immediate Review',
        }));
      setCriticalCases(critical);

      
      const chartData = [0, 0, 0, 0, 0, 0, 0];
      const nowTime = new Date().getTime();
      records.forEach((r) => {
        if (!r.createdAt) return;
        const dTime = new Date(r.createdAt).getTime();
        const diffDays = Math.floor((nowTime - dTime) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays < 7) {
          chartData[6 - diffDays]++;
        }
      });
      
      const maxVal = Math.max(...chartData, 1); 
      const trendPercentages = chartData.map((val) => (val / maxVal) * 100);
      setStats((prev) => ({ ...prev, activityTrend: trendPercentages }));

    } catch (error) {
      console.error('Error fetching doctor dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  return { stats, recentActivity, criticalCases, loading, refreshStats };
};
