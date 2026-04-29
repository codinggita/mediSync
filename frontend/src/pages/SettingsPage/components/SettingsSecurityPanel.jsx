import React from 'react';
import { Key, Shield, Smartphone, RefreshCw } from 'lucide-react';

const SettingsSecurityPanel = ({ securityState, onSecurityAction }) => {
  const securityItems = [
    {
      label: 'Account Password',
      sub: `Last changed ${securityState.passwordLastChanged}`,
      icon: Key,
      color: '#F43F5E',
      action: 'Update Password',
    },
    {
      label: 'Master Access Key',
      sub: `Last updated ${securityState.keyUpdated}`,
      icon: Key,
      color: '#2A7FFF',
      action: 'Regenerate',
    },
    {
      label: 'Biometric 2FA Pulse',
      sub: 'Protocol STATUS: ACTIVE',
      icon: Shield,
      color: '#2ECC71',
      action: 'Synchronize',
      loading: securityState.syncing,
    },
    {
      label: 'Linked Clinical Nodes',
      sub: `${securityState.activeSessions} active session${securityState.activeSessions > 1 ? 's' : ''} detected`,
      icon: Smartphone,
      color: '#F59E0B',
      action: 'Purge Sessions',
      disabled: securityState.activeSessions <= 1,
    },
  ];

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-right-10 duration-700">
      <h2 className="text-[1.8rem] font-black text-slate-900 dark:text-white mb-10 tracking-tight">
        Security Encryption HUD
      </h2>
      <div className="grid grid-cols-1 gap-8">
        {securityItems.map((sec, i) => (
          <div
            key={i}
            className={`p-10 bg-slate-50 dark:bg-[#151E32]/30 rounded-[3rem] border border-slate-100 dark:border-white/5 flex items-center justify-between group transition-all duration-500 ${sec.disabled ? 'opacity-70' : 'hover:shadow-2xl'}`}
          >
            <div className="flex items-center gap-8">
              <div
                className="w-16 h-16 rounded-3xl flex items-center justify-center transition-all group-hover:scale-110 shadow-xl"
                style={{ backgroundColor: `${sec.color}10`, color: sec.color }}
              >
                {sec.loading ? (
                  <RefreshCw size={28} className="animate-spin" />
                ) : (
                  <sec.icon size={28} />
                )}
              </div>
              <div>
                <p className="text-[1.1rem] font-black text-slate-900 dark:text-white mb-1 tracking-tight">
                  {sec.label}
                </p>
                <p className="text-[0.75rem] text-slate-400 font-black uppercase tracking-[0.2em]">
                  {sec.sub}
                </p>
              </div>
            </div>
            <button
              onClick={() => onSecurityAction(sec.action)}
              disabled={sec.disabled || sec.loading}
              className={`px-8 py-4 rounded-2xl text-[0.85rem] font-black shadow-lg border border-transparent transition-all active:scale-95 ${sec.disabled ? 'bg-slate-200 dark:bg-[#0B1121]/50 text-slate-400 cursor-not-allowed shadow-none' : 'bg-white dark:bg-[#0B1121] text-slate-700 dark:text-slate-200 hover:border-[#2A7FFF]/30 hover:text-[#2A7FFF]'}`}
            >
              {sec.loading
                ? 'Syncing...'
                : sec.disabled && sec.action === 'Purge Sessions'
                  ? 'Isolated'
                  : sec.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsSecurityPanel;
