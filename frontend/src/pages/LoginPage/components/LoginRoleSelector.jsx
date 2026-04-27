import React from 'react';

const LoginRoleSelector = ({ role, setRole, roles }) => {
  return (
    <div className="flex bg-[#ecf0f3] dark:bg-[#151E32] p-1.5 rounded-2xl mb-8 shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]">
      {roles.map((r) => (
        <button
          key={r}
          type="button"
          onClick={() => setRole(r)}
          className={`flex-1 py-2.5 text-[0.8rem] font-black rounded-xl transition-all ${
            role === r 
              ? 'bg-[#2A7FFF] text-white shadow-[0_4px_12px_rgba(42,127,255,0.4)] translate-y-[-1px]' 
              : 'text-slate-500 hover:text-[#2A7FFF] dark:hover:text-white'
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
};

export default LoginRoleSelector;
