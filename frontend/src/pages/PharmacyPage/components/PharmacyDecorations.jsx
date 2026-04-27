import React from 'react';
import medicineBoxImg from '../../assets/images/medicine_box.png';
import inhalerImg from '../../assets/images/inhaler.png';
import eyeDropsImg from '../../assets/images/eye_drops.png';

const PharmacyDecorations = () => {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,127,255,0.03),transparent)] pointer-events-none" />
      
      <div className="absolute top-[15%] right-[5%] animate-float opacity-30 pointer-events-none" style={{ animationDelay: '0s' }}>
        <img src={medicineBoxImg} alt="" className="w-48 object-contain drop-shadow-2xl" />
      </div>
      <div className="absolute bottom-[10%] left-[20%] animate-float-slow opacity-20 pointer-events-none" style={{ animationDelay: '1s' }}>
        <img src={inhalerImg} alt="" className="w-40 object-contain drop-shadow-2xl rotate-12" />
      </div>
      <div className="absolute top-[40%] right-[15%] animate-float opacity-10 pointer-events-none" style={{ animationDelay: '2s' }}>
        <img src={eyeDropsImg} alt="" className="w-32 object-contain drop-shadow-2xl -rotate-12" />
      </div>
    </>
  );
};

export default PharmacyDecorations;
