import React from 'react';

const LoginRoleSelector = ({ role, setRole, roles }) => {
  return (
    <div className="flex p-1.5 rounded-2xl mb-8 nm-inset">
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
