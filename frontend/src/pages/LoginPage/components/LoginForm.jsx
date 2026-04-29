import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const LoginForm = ({ formik, role, isLoading }) => {
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">
          {role === 'Admin' ? 'Admin ID' : 'Email or Mobile Number'}
        </label>
        <div className="relative flex items-center group">
          <Mail
            className={`absolute left-4 transition-colors z-10 ${formik.errors.email && formik.touched.email ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#2A7FFF]'}`}
            size={16}
          />
          <input
            {...formik.getFieldProps('email')}
            placeholder={
              role === 'Doctor' ? 'hospital.id@medisync.app' : 'you@example.com or 9999999999'
            }
            className={`w-full py-4 pl-12 pr-4 nm-inset rounded-2xl text-[0.9rem] font-bold text-slate-800 dark:text-white border-none focus:outline-none ${formik.errors.email && formik.touched.email ? 'ring-2 ring-red-400/20' : ''}`}
            autoComplete="off"
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <span className="text-[0.65rem] font-bold text-red-500 ml-1">{formik.errors.email}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">
          Password
        </label>
        <div className="relative flex items-center group">
          <Lock
            className={`absolute left-4 transition-colors z-10 ${formik.errors.password && formik.touched.password ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#2A7FFF]'}`}
            size={16}
          />
          <input
            type="password"
            {...formik.getFieldProps('password')}
            placeholder="••••••••"
            className={`w-full py-4 pl-12 pr-4 nm-inset rounded-2xl text-[0.9rem] font-bold text-slate-800 dark:text-white border-none focus:outline-none ${formik.errors.password && formik.touched.password ? 'ring-2 ring-red-400/20' : ''}`}
            autoComplete="new-password"
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <span className="text-[0.65rem] font-bold text-red-500 ml-1">
            {formik.errors.password}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-[0.75rem] mt-1 font-bold">
        <label className="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-700">
          <input
            type="checkbox"
            {...formik.getFieldProps('rememberMe')}
            className="w-4 h-4 rounded border-slate-300 text-[#2A7FFF] focus:ring-[#2A7FFF]/30"
          />
          Remember device
        </label>
        <Link
          to="/forgot-password"
          title="Recover access"
          className="text-[#2A7FFF] hover:underline"
        >
          Recover access
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center justify-center gap-3 bg-[#2A7FFF] text-white py-5 rounded-2xl font-black text-[1rem] mt-6 shadow-[0_12px_24px_rgba(42,127,255,0.3)] nm-button hover:bg-[#1C71E1] hover:-translate-y-1 active:scale-[0.98] transition-all disabled:opacity-70 group"
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" /> Authenticating...
          </>
        ) : (
          <>
            Access Portal{' '}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
