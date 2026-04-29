import React from 'react';

const UploadDecorations = () => {
  return (
    <>
      <div className="absolute top-[15%] left-[10%] animate-float opacity-30 pointer-events-none overflow-hidden h-full w-full z-0">
        <img
          src="/src/assets/images/medicine_box.png"
          alt=""
          className="w-64 object-contain drop-shadow-2xl rotate-12"
        />
      </div>
      <div className="absolute bottom-[10%] right-[15%] animate-float-slow opacity-15 pointer-events-none z-0">
        <img
          src="/src/assets/images/first_aid.png"
          alt=""
          className="w-56 object-contain drop-shadow-2xl -rotate-12 grayscale"
        />
      </div>
    </>
  );
};

export default UploadDecorations;
