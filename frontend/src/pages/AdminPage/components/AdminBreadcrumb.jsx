import React from 'react';

const AdminBreadcrumb = ({ activeTabData, sidebar, main }) => {
  return (
    <div
      className="px-8 py-3 flex items-center gap-3 border-b transition-colors"
      style={{
        backgroundColor: main.breadcrumb,
        borderColor: main.breadcrumbBorder,
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${activeTabData?.color}18` }}
      >
        {activeTabData && <activeTabData.icon size={13} style={{ color: activeTabData.color }} />}
      </div>
      <span
        className="text-[0.65rem] font-black uppercase tracking-widest"
        style={{ color: sidebar.sub }}
      >
        Admin
      </span>
      <span style={{ color: sidebar.sub }}>›</span>
      <span
        className="text-[0.65rem] font-black uppercase tracking-widest"
        style={{ color: activeTabData?.color }}
      >
        {activeTabData?.label}
      </span>
      <div className="ml-auto flex items-center gap-2">
        <div className="w-2 h-2 bg-[#2ECC71] rounded-full animate-pulse" />
        <span className="text-[0.6rem] font-black text-[#2ECC71] uppercase tracking-widest">
          System Online
        </span>
      </div>
    </div>
  );
};

export default AdminBreadcrumb;
