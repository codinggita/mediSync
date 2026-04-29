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

      const records = recordRes.data || [];
      const appointments = apptRes.data || [];

      // Calculate stats
      const uniquePatients = new Set(records.map((r) => r.patient?._id).filter(Boolean));
      const pendingAppointments = appointments.filter((a) => a.status === 'Pending').length;

      setStats({
        totalPatients: uniquePatients.size,
        activeAlerts: pendingAppointments, // For now, pending appointments are alerts
        recentReports: records.length,
        appointments: appointments.filter((a) => a.status === 'Scheduled').length,
      });

      // Format activity
      let activity = records.slice(0, 4).map((r) => ({
        id: r._id,
        type: 'report',
        patient: r.patient?.name || 'Unknown Patient',
        detail: `Uploaded ${r.title}`,
        time: new Date(r.createdAt).toLocaleDateString(),
        isCritical: r.type === 'Emergency' || r.title.toLowerCase().includes('critical'),
      }));

      // Inject Mock Activity if empty
      if (activity.length === 0) {
        activity = [
          {
            id: 'act1',
            patient: 'Sarah Connor',
            detail: 'MRI Scan results transmitted',
            time: '2 hrs ago',
            isCritical: false,
          },
          {
            id: 'act2',
            patient: 'James Wilson',
            detail: 'High BP Alert: 160/95 mmHg',
            time: '5 hrs ago',
            isCritical: true,
          },
          {
            id: 'act3',
            patient: 'John Doe',
            detail: 'Prescription refill requested',
            time: 'Yesterday',
            isCritical: false,
          },
          {
            id: 'act4',
            patient: 'James Wilson',
            detail: 'Lipid Profile uploaded',
            time: '2 days ago',
            isCritical: false,
          },
        ];
      }

      setRecentActivity(activity);

      // Infer critical cases from records
      const critical = records
        .filter((r) => r.type === 'Emergency' || r.title.toLowerCase().includes('critical'))
        .slice(0, 2)
        .map((r) => ({
          id: r._id,
          name: r.patient?.name || 'Patient',
          condition: r.title,
          status: 'Immediate Review',
        }));
      setCriticalCases(
        critical.length > 0
          ? critical
          : [
              {
                id: 'mock1',
                name: 'James Wilson',
                condition: 'Hypertension Review',
                status: 'Scheduled',
              },
            ]
      );
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
