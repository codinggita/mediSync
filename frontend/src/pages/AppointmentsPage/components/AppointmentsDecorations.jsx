import React from 'react';
import medicineBoxImg from '../../../assets/images/medicine_box.png';
import inhalerImg from '../../../assets/images/inhaler.png';

const AppointmentsDecorations = () => {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,127,255,0.03),transparent)] pointer-events-none" />

      {}
      <div className="absolute top-[15%] right-[5%] animate-float opacity-30 pointer-events-none">
        <img src={medicineBoxImg} alt="" className="w-56 object-contain drop-shadow-2xl" />
      </div>
      <div className="absolute bottom-[10%] left-[20%] animate-float-slow opacity-10 pointer-events-none">
        <img
          src={inhalerImg}
          alt=""
          className="w-44 object-contain drop-shadow-2xl -rotate-12 grayscale"
        />
      </div>
    </>
  );
};

export default AppointmentsDecorations;
