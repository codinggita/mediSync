import React from 'react';
import { User, Shield, Stethoscope, Activity, MoreVertical, Ban, Eye } from 'lucide-react';

const users = [
  { id: 1, name: 'Anjali Mehta', role: 'Doctor', status: 'Active', lastActive: '2 min ago', email: 'anjali@medisync.app' },
  { id: 2, name: 'Priyabrata Sahoo', role: 'User', status: 'Active', lastActive: '1 hr ago', email: 'priyabrata@gmail.com' },
  { id: 3, name: 'Vikram Singh', role: 'Admin', status: 'Active', lastActive: 'Just now', email: 'admin.vikram@medisync.app' },
  { id: 4, name: 'Suresh Raina', role: 'Doctor', status: 'Suspended', lastActive: '3 days ago', email: 'suresh@fortis.com' },
  { id: 5, name: 'Neha Gupta', role: 'User', status: 'Inactive', lastActive: '2 weeks ago', email: 'neha.g@outlook.com' },
];

const UserManagementTable = () => {
  const roleCfg = {
    Doctor: { icon: Stethoscope, color: '#8B5CF6', bg: '#8B5CF610' },
    User:   { icon: User,        color: '#2A7FFF', bg: '#2A7FFF10' },
    Admin:  { icon: Shield,      color: '#2ECC71', bg: '#2ECC7110' },
  };

  return (
    <div className="bg-white dark:bg-[#151E32] border border-gray-100 dark:border-slate-700/50 rounded-[14px] overflow-hidden shadow-sm transition-all hover:shadow-md">
      <div className="px-6 py-5 border-b border-gray-50 dark:border-slate-800/50 flex items-center justify-between">
        <div>
          <h3 className="text-[1rem] font-black text-[#1F2937] dark:text-white leading-none">User Management</h3>
          <p className="text-[0.68rem] text-gray-400 font-bold uppercase tracking-widest mt-1.5">Monitor system access</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-[#0B1121]/50 border-b border-gray-50 dark:border-slate-800">
              <th className="px-6 py-4 text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">Name & Role</th>
              <th className="px-6 py-4 text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">Last Active</th>
              <th className="px-6 py-4 text-[0.65rem] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {users.map((u) => {
              const cfg = roleCfg[u.role];
              const RoleIcon = cfg.icon;
              return (
                <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-[#1A2642]/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: cfg.bg, color: cfg.color }}
                      >
                        <RoleIcon size={16} />
                      </div>
                      <div>
                        <p className="text-[0.85rem] font-bold text-[#1F2937] dark:text-white leading-tight">{u.name}</p>
                        <p className="text-[0.68rem] text-gray-400 font-medium mt-0.5">{u.email} · <span className="font-bold" style={{ color: cfg.color }}>{u.role}</span></p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-[#2ECC71] shadow-[0_0_8px_#2ECC71]' : u.status === 'Suspended' ? 'bg-red-500' : 'bg-gray-300'}`} />
                      <span className={`text-[0.7rem] font-bold ${u.status === 'Active' ? 'text-[#2ECC71]' : u.status === 'Suspended' ? 'text-red-500' : 'text-gray-400'}`}>
                        {u.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[0.78rem] text-gray-500 dark:text-slate-400 font-medium">{u.lastActive}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button title="View Profile" className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-[#0B1121] flex items-center justify-center text-gray-400 hover:text-[#2A7FFF] transition-all">
                          <Eye size={14} />
                       </button>
                       <button title="Suspend User" className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-[#0B1121] flex items-center justify-center text-gray-400 hover:text-red-500 transition-all">
                          <Ban size={14} />
                       </button>
                       <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:text-gray-600 transition-colors">
                          <MoreVertical size={14} />
                       </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementTable;
