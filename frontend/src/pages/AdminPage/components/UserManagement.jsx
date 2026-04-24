import React, { useState } from 'react';
import { UserX, UserCheck, Eye } from 'lucide-react';

const USERS = [
  { name: 'Priya Sharma',    role: 'Patient', status: 'Active',    last: '2 min ago' },
  { name: 'Dr. Raj Verma',  role: 'Doctor',  status: 'Active',    last: '1 hr ago' },
  { name: 'Amit Kumar',     role: 'Patient', status: 'Suspended', last: '3 days ago' },
  { name: 'Neha Joshi',     role: 'Admin',   status: 'Active',    last: '5 min ago' },
  { name: 'Rahul Mehta',    role: 'Patient', status: 'Active',    last: '20 min ago' },
];

const ROLE_COLORS = {
  Patient: 'bg-blue-50 text-blue-600 border-blue-100',
  Doctor:  'bg-green-50 text-[#2A7FFF] border-green-100',
  Admin:   'bg-violet-50 text-violet-600 border-violet-100',
};

const STATUS_COLORS = {
  Active:    'bg-green-50 text-[#2A7FFF] border-green-100',
  Suspended: 'bg-red-50 text-[#D32F2F] border-red-100',
};

const UserManagement = () => {
  const [users, setUsers] = useState(USERS);

  const toggleStatus = (i) => {
    setUsers((prev) =>
      prev.map((u, idx) =>
        idx === i
          ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' }
          : u
      )
    );
  };

  return (
    <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm p-5 admin-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800">User Management</h3>
        <span className="text-xs text-gray-400">{users.length} users</span>
      </div>

      <div className="overflow-x-auto rounded-[10px] border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-gray-100">
              {['Name', 'Role', 'Status', 'Last Active', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-[#F8FAFC] transition-colors duration-150 last:border-b-0">
                <td className="px-4 py-3.5 font-semibold text-gray-800">{u.name}</td>
                <td className="px-4 py-3.5">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${ROLE_COLORS[u.role]}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${STATUS_COLORS[u.status]}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-gray-400 text-xs">{u.last}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" title="View Profile">
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => toggleStatus(i)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        u.status === 'Active'
                          ? 'hover:bg-red-50 text-[#D32F2F]'
                          : 'hover:bg-green-50 text-[#2A7FFF]'
                      }`}
                      title={u.status === 'Active' ? 'Suspend' : 'Reactivate'}
                    >
                      {u.status === 'Active' ? <UserX size={14} /> : <UserCheck size={14} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
