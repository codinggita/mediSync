import React from 'react';
import { User, Shield, Stethoscope, Activity, MoreVertical, Ban, Eye, ShieldCheck, Mail, Calendar } from 'lucide-react';

const UserManagementTable = ({ users, onToggleBan, isDarkMode }) => {
  const [viewingUser, setViewingUser] = React.useState(null);
  const [activeMenu, setActiveMenu] = React.useState(null);
  
  const roleCfg = {
    Doctor: { icon: Stethoscope, color: '#8B5CF6' },
    Patient: { icon: User, color: '#2A7FFF' },
    Admin: { icon: Shield, color: '#2ECC71' },
  };

  const handleAction = (action, user) => {
    console.log(`Executing ${action} for ${user.name}`);
    setActiveMenu(null);
    if (action === 'Dossier') {
      const content = `Citizen Dossier: ${user.name}\nRole: ${user.role}\nStatus: ${user.status}\nEmail: ${user.email}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MediSync_Dossier_${user.name.replace(/ /g, '_')}.txt`;
      a.click();
    }
  };

  React.useEffect(() => {
    const closeMenu = () => setActiveMenu(null);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  return (
    <div className="overflow-x-auto scrollbar-hide p-4">
      <table className="w-full border-separate border-spacing-y-4">
        <thead>
          <tr>
            {['Citizen Identity', 'Access Status', 'Registry Date', 'Matrix Actions'].map(h => (
              <th key={h} className={`px-8 py-2 text-left text-[0.7rem] font-black uppercase tracking-[0.25em] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const cfg = roleCfg[u.role] || roleCfg.Patient;
            const RoleIcon = cfg.icon;
            return (
              <tr key={u._id} className={`transition-all duration-300 group hover:translate-x-1 ${
                isDarkMode 
                  ? 'bg-[#151E32] hover:bg-[#1A2642]' 
                  : 'bg-[#ecf0f3] hover:bg-[#f5f8fa]'
              }`}>
                <td className="px-8 py-6 rounded-l-[1.5rem] border-y border-l border-transparent group-hover:border-white/10">
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] border border-white/20`} style={{ color: cfg.color }}>
                      <RoleIcon size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className={`text-[1.1rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'} tracking-tight`}>{u.name}</p>
                      <p className="text-[0.75rem] text-slate-400 font-bold mt-2 lowercase">{u.email} • <span className="uppercase tracking-widest font-black" style={{ color: cfg.color }}>{u.role}</span></p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 border-y border-transparent group-hover:border-white/10">
                  <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-xl text-[0.75rem] font-black uppercase tracking-widest ${
                    u.status === 'Active' 
                      ? 'bg-[#2ECC71]/10 text-[#2ECC71] border border-[#2ECC71]/20' 
                      : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${u.status === 'Active' ? 'bg-[#2ECC71] shadow-[0_0_8px_#2ECC71]' : 'bg-rose-500 shadow-[0_0_8px_#F43F5E]'}`} />
                    {u.status}
                  </div>
                </td>
                <td className="px-8 py-6 border-y border-transparent group-hover:border-white/10">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                     <Activity size={14} className="opacity-50" />
                     <span className="text-[0.8rem] font-black uppercase tracking-widest">{u.joinedAt || '2024-01-01'}</span>
                  </div>
                </td>
                <td className="px-8 py-6 rounded-r-[1.5rem] border-y border-r border-transparent group-hover:border-white/10">
                  <div className="flex items-center gap-4 relative">
                    <button 
                      onClick={() => setViewingUser(u)}
                      className="w-11 h-11 rounded-xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] flex items-center justify-center text-slate-400 hover:text-[#2A7FFF] transition-all active:shadow-inner border border-white/20"
                    >
                      <Eye size={18} strokeWidth={2.5} />
                    </button>
                    <button 
                      onClick={() => onToggleBan(u._id)}
                      className={`w-11 h-11 rounded-xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] flex items-center justify-center transition-all active:shadow-inner border border-white/20 ${
                        u.status === 'Active' ? 'text-slate-400 hover:text-rose-500' : 'text-[#2ECC71] hover:scale-110'
                      }`}
                    >
                      {u.status === 'Active' ? <Ban size={18} strokeWidth={2.5} /> : <ShieldCheck size={18} strokeWidth={2.5} />}
                    </button>
                    
                    <div className="relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === u._id ? null : u._id); }}
                        className={`w-11 h-11 rounded-xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all border border-white/20 ${activeMenu === u._id ? 'shadow-inner scale-95' : ''}`}
                      >
                        <MoreVertical size={18} strokeWidth={2.5} />
                      </button>

                      {activeMenu === u._id && (
                        <div className={`absolute right-0 top-14 w-56 p-3 rounded-[1.5rem] z-[100] animate-in slide-in-from-top-2 duration-300 ${
                          isDarkMode 
                            ? 'bg-[#151E32] shadow-[10px_10px_20px_#0a0f1d,-10px_-10px_20px_#202d47] border border-white/5' 
                            : 'bg-[#ecf0f3] shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff] border border-white/40'
                        }`}>
                          {[
                            { label: 'Download Dossier', icon: Download, action: 'Dossier' },
                            { label: 'Reset Access Key', icon: Activity, action: 'Reset' },
                            { label: 'Promote Rank', icon: Shield, action: 'Promote' },
                          ].map((item, idx) => (
                            <button 
                              key={idx}
                              onClick={() => handleAction(item.action, u)}
                              className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl text-[0.75rem] font-black uppercase tracking-widest transition-all ${
                                isDarkMode ? 'hover:bg-white/5 text-slate-300' : 'hover:bg-black/5 text-slate-600'
                              }`}
                            >
                              <item.icon size={16} strokeWidth={2.5} className="opacity-50" />
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* --- Profile Preview Modal --- */}
      {viewingUser && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
          <div className="w-full max-w-sm p-10 rounded-[3rem] bg-[#ecf0f3] dark:bg-[#151E32] shadow-[20px_20px_60px_rgba(0,0,0,0.3)] border border-white/20 animate-in fade-in zoom-in duration-300 relative">
            <button 
              onClick={() => setViewingUser(null)}
              className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <MoreVertical className="rotate-45" size={20} />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className={`w-24 h-24 rounded-[30px] bg-[#ecf0f3] dark:bg-[#0B1121] flex items-center justify-center shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] border border-white/20 mb-6 text-[#8B5CF6]`}>
                {viewingUser.role === 'Doctor' ? <Stethoscope size={40} /> : <User size={40} />}
              </div>
              
              <h2 className={`text-[1.6rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2`}>{viewingUser.name}</h2>
              <div className={`px-4 py-1.5 rounded-full text-[0.65rem] font-black uppercase tracking-[0.2em] mb-8 ${
                viewingUser.status === 'Active' ? 'bg-[#2ECC71]/10 text-[#2ECC71]' : 'bg-rose-500/10 text-rose-500'
              }`}>
                {viewingUser.role} • {viewingUser.status}
              </div>

              <div className="w-full space-y-4">
                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-[#ecf0f3] dark:bg-[#0B1121] shadow-[inset_3px_3px_6px_#cbced1,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_6px_#0a0f1d,inset_-3px_-3px_6px_#202d47]">
                  <Mail size={16} className="text-[#8B5CF6]" />
                  <span className="text-[0.8rem] font-bold text-slate-500 lowercase">{viewingUser.email}</span>
                </div>
                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-[#ecf0f3] dark:bg-[#0B1121] shadow-[inset_3px_3px_6px_#cbced1,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_6px_#0a0f1d,inset_-3px_-3px_6px_#202d47]">
                  <Calendar size={16} className="text-[#8B5CF6]" />
                  <span className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-widest">Joined {viewingUser.joinedAt}</span>
                </div>
              </div>

              <button 
                onClick={() => setViewingUser(null)}
                className="w-full mt-10 py-4 rounded-2xl bg-[#8B5CF6] text-white font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(139,92,246,0.3)] hover:scale-[1.03] active:scale-95 transition-all"
              >
                Close Handshake
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementTable;
