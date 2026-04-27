import React from 'react';
import securityImg from '../../assets/images/security.png';
import medicineBoxImg from '../../assets/images/medicine_box.png';

const SharingDecorations = () => {
  return (
    <>
      <div className="absolute top-[10%] right-[10%] animate-float opacity-30 pointer-events-none">
        <img src={securityImg} alt="" className="w-56 object-contain drop-shadow-2xl grayscale-[0.2]" />
      </div>
      <div className="absolute bottom-[5%] left-[25%] animate-float-slow opacity-10 pointer-events-none">
        <img src={medicineBoxImg} alt="" className="w-40 object-contain drop-shadow-2xl -rotate-12" />
      </div>
    </>
  );
};

export default SharingDecorations;
