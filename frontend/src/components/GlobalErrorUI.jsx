import React from 'react';

const GlobalErrorUI = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d] p-6 font-outfit">
      <div className="max-w-md w-full rounded-[2.5rem] bg-[#0a0f1d] shadow-[15px_15px_30px_#0a0f1d,-15px_-15px_30px_#121a32] border border-white/5 p-10 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Tactical Error Detected</h2>
        <p className="text-slate-400 mb-8">
          The system encountered an unexpected anomaly during synchronization.
          <br />
          <span className="text-red-400/80 text-sm italic">{error?.message}</span>
        </p>
        <button
          onClick={resetErrorBoundary}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-[0_10px_20px_rgba(79,70,229,0.3)] transition-all duration-300"
        >
          Resolve & Restart Protocol
        </button>
      </div>
    </div>
  );
};

export default GlobalErrorUI;
