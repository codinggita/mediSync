import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';
import { ShieldAlert, RefreshCw, ShieldCheck } from 'lucide-react';
import AdminStatSummary from './AdminStatSummary';
import AdminAlertItem from './AdminAlertItem';

const now = new Date();
const ts = (minsAgo) => new Date(now - minsAgo * 60000).toISOString();

const MOCK_ALERTS = [
  
  { _id: 'ma1',  message: 'Unauthorized Database Handshake Detected',      severity: 'critical', type: 'SECURITY_BREACH',   nodeRef: 'DB-NODE-01',  timestamp: ts(3)   },
  { _id: 'ma2',  message: 'JWT Token Forgery Attempt Intercepted',         severity: 'critical', type: 'AUTH_ANOMALY',      nodeRef: 'AUTH-GW-02',  timestamp: ts(14)  },
  { _id: 'ma3',  message: 'Brute Force Attack Blocked — IP: 182.72.x.x',  severity: 'critical', type: 'BRUTE_FORCE',       nodeRef: 'RATE-LIMITER', timestamp: ts(27) },
  { _id: 'ma4',  message: 'NoSQL Injection Payload Sanitized',             severity: 'critical', type: 'INJECTION_BLOCK',   nodeRef: 'API-NODE-05', timestamp: ts(42)  },
  { _id: 'ma5',  message: 'Pharmacy Node License Revoked — ZenHealth',    severity: 'critical', type: 'LICENSE_REVOKE',    nodeRef: 'PH-NODE-14',  timestamp: ts(58)  },

  
  { _id: 'ma6',  message: 'Core Uptime Exceeding 720 Hours',               severity: 'warning',  type: 'SYSTEM_MAINTENANCE', nodeRef: 'SYS-CORE',   timestamp: ts(72)  },
  { _id: 'ma7',  message: 'Abnormal API Latency Detected — Node 404',      severity: 'warning',  type: 'NETWORK_LAG',        nodeRef: 'API-NODE-04', timestamp: ts(90) },
  { _id: 'ma8',  message: 'Memory Usage at 78% — Critical Threshold Soon', severity: 'warning',  type: 'RESOURCE_USAGE',     nodeRef: 'SERVER-02',   timestamp: ts(110) },
  { _id: 'ma9',  message: 'SSL Certificate Expires in 14 Days',            severity: 'warning',  type: 'CERT_EXPIRY',        nodeRef: 'TLS-GUARD',   timestamp: ts(145) },
  { _id: 'ma10', message: 'Unusually High Login Activity — 3:00–4:00 AM',  severity: 'warning',  type: 'ACCESS_ANOMALY',     nodeRef: 'AUTH-LOG-07', timestamp: ts(180) },

  
  { _id: 'ma11', message: 'Medication Registry Sync Completed',            severity: 'info',     type: 'DATA_INTEGRITY',    nodeRef: 'REGISTRY-01', timestamp: ts(200) },
  { _id: 'ma12', message: 'New Administrator Matrix Provisioned',          severity: 'info',     type: 'ACCESS_GRANTED',    nodeRef: 'IAM-NODE-01', timestamp: ts(230) },
  { _id: 'ma13', message: 'Backup Snapshot Created Successfully',          severity: 'info',     type: 'BACKUP_SUCCESS',    nodeRef: 'BACKUP-02',   timestamp: ts(260) },
  { _id: 'ma14', message: 'Security Policy Rules Updated (v2.4.1)',        severity: 'info',     type: 'POLICY_UPDATE',     nodeRef: 'POLICY-MGR',  timestamp: ts(300) },
  { _id: 'ma15', message: 'System Audit Log Exported by Admin',           severity: 'info',     type: 'AUDIT_LOG',         nodeRef: 'LOG-EXPORT',  timestamp: ts(360) },
];

const AdminAlertsTab = ({ onCountChange }) => {
  const [alerts, setAlerts] = useState(MOCK_ALERTS); 
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const { isDarkMode } = useTheme();

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/alerts');
      const realAlerts = Array.isArray(data?.alerts) ? data.alerts : [];

      
      const uniqueMocks = MOCK_ALERTS.filter(
        (ma) => !realAlerts.find((ra) => ra._id === ma._id)
      );
      const merged = [...realAlerts, ...uniqueMocks];
      setAlerts(merged);
      onCountChange?.(merged.filter((a) => a.severity === 'critical').length);
    } catch (e) {
      
      setAlerts(MOCK_ALERTS);
      onCountChange?.(MOCK_ALERTS.filter((a) => a.severity === 'critical').length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleResolve = (id) => {
    setAlerts((prev) => prev.filter((a) => a._id !== id));
  };

  const counts = {
    All: alerts.length,
    Critical: alerts.filter((a) => a.severity === 'critical').length,
    Warning: alerts.filter((a) => a.severity === 'warning').length,
    Info: alerts.filter((a) => a.severity === 'info').length,
  };
  const displayed =
    filter === 'All' ? alerts : alerts.filter((a) => a.severity === filter.toLowerCase());

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div>
          <h1
            className={`text-[3.2rem] font-black leading-none tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          >
            Threat <span className="text-[#E11D48]">Protocol</span>
          </h1>
          <p className="text-slate-400 text-[0.7rem] mt-5 font-black uppercase tracking-[0.3em] opacity-80">
            Autonomous System Surveillance & Anomaly Monitoring
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 mr-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2ECC71] shadow-[0_0_12px_#2ECC71] animate-pulse" />
            <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#2ECC71]">
              Active Scan
            </span>
          </div>
          <button
            onClick={fetchAlerts}
            className={`px-10 h-16 rounded-[1.5rem] flex items-center justify-center gap-4 transition-all duration-300 hover:scale-[1.03] active:scale-95 group ${
              isDarkMode
                ? 'bg-[#151E32] shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] text-white'
                : 'bg-[#ecf0f3] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] text-slate-700'
            } font-black uppercase tracking-[0.15em] text-[0.75rem] border border-white/10`}
          >
            <RefreshCw
              size={20}
              strokeWidth={3}
              className={`group-hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`}
            />{' '}
            Force Sync
          </button>
        </div>
      </div>

      <div
        className={`flex flex-wrap items-center gap-6 p-4 rounded-[2.5rem] transition-all duration-500 ${
          isDarkMode
            ? 'bg-[#0B1121] shadow-[inset_4px_4px_8px_#05080f,inset_-4px_-4px_8px_#1a264a]'
            : 'bg-[#ecf0f3] shadow-[inset_6px_6px_12px_#cbced1,inset_-6px_-6px_12px_#ffffff]'
        }`}
      >
        {Object.entries(counts).map(([f, count]) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex items-center gap-4 px-10 py-5 rounded-[1.8rem] text-[0.8rem] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
              filter === f
                ? isDarkMode
                  ? 'bg-[#151E32] text-white shadow-lg border border-white/5'
                  : 'bg-[#ecf0f3] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] text-[#E11D48]'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'
            }`}
          >
            {f}
            <span
              className={`px-4 py-1.5 rounded-full text-[0.65rem] font-black ${
                filter === f
                  ? 'bg-[#E11D48] text-white'
                  : 'bg-black/5 dark:bg-white/5 text-slate-400'
              } transition-all duration-300`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-48 gap-8">
          <div className="relative">
            <div className="w-24 h-24 border-[6px] border-slate-200/20 border-t-[#E11D48] rounded-full animate-spin" />
            <ShieldAlert
              size={36}
              strokeWidth={3}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#E11D48] drop-shadow-[0_0_12px_#E11D48]"
            />
          </div>
          <p className="text-[0.85rem] font-black text-slate-400 uppercase tracking-[0.5em] animate-pulse">
            Scanning Anomaly Matrix...
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8 mb-16">
          {displayed.map((alert, i) => (
            <AdminAlertItem
              key={alert._id}
              alert={alert}
              isDarkMode={isDarkMode}
              onResolve={() => handleResolve(alert._id)}
            />
          ))}
          {!displayed.length && (
            <div
              className={`py-48 rounded-[3.5rem] flex flex-col items-center justify-center gap-8 border-4 border-dashed transition-all duration-500 ${
                isDarkMode
                  ? 'border-slate-800/50 bg-[#151E32]/20'
                  : 'border-slate-100 bg-[#f8fafc]/50'
              }`}
            >
              <div className="w-24 h-24 rounded-[30px] bg-[#2ECC71]/10 flex items-center justify-center shadow-lg border border-[#2ECC71]/20">
                <ShieldCheck size={48} strokeWidth={2.5} className="text-[#2ECC71]" />
              </div>
              <div className="text-center">
                <p className="text-[2.2rem] font-black text-[#2ECC71] uppercase tracking-[0.4em] leading-none">
                  Sector Secure
                </p>
                <p className="text-[0.8rem] text-slate-400 mt-6 font-black uppercase tracking-[0.2em] opacity-60">
                  No anomalies detected in the current cycle
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminAlertsTab;
