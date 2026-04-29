import React from 'react';
import { Link } from 'react-router-dom';

const SignupFooter = () => {
  return (
    <div className="text-center mt-6 text-[0.85rem] text-slate-500 font-medium pb-4">
      Already have an account?{' '}
      <Link to="/login" className="text-[#2A7FFF] font-bold hover:underline">
        Log in
      </Link>
    </div>
  );
};

export default SignupFooter;
