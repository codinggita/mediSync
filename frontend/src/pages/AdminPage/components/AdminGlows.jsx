import React from 'react';

const AdminGlows = ({ isDarkMode }) => {
  if (!isDarkMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#2A7FFF]/6 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-[#8B5CF6]/6 rounded-full blur-[100px]" />
    </div>
  );
};

export default AdminGlows;
