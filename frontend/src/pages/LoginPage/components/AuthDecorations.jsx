import React from 'react';

const AuthDecorations = () => {
  return (
    <>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2A7FFF]/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#2ECC71]/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[4s]" />
      <div className="absolute inset-0 bg-white/10 dark:bg-black/10 pointer-events-none" />
    </>
  );
};

export default AuthDecorations;
