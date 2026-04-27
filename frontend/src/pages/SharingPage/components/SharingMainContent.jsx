import React from 'react';
import VerifiedSpecialists from './VerifiedSpecialists';

const SharingMainContent = ({ loading, doctors, onShareClick }) => {
  return (
    <div className="grid grid-cols-1 gap-10">
      <VerifiedSpecialists 
        loading={loading} 
        doctors={doctors} 
        onShareClick={onShareClick} 
      />
    </div>
  );
};

export default SharingMainContent;
