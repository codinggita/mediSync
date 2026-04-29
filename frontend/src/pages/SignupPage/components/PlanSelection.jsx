import { AlertCircle, ArrowRight } from 'lucide-react';
import { SIGNUP_PLANS } from '../utils/SignupConstants';
import PlanCard from './PlanCard';

const PlanSelection = ({ selectedPlan, setSelectedPlan, setStep }) => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[0.6rem] font-black uppercase tracking-widest mb-3 shadow-sm border border-amber-200">
          <AlertCircle size={10} /> Selection Required
        </div>
        <h3 className="text-[1.4rem] font-black text-slate-800 leading-tight">
          Activate Your Biological Vault
        </h3>
        <p className="text-[0.8rem] text-slate-500 font-bold mt-1">
          Choose a foundation for your health data.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {SIGNUP_PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan === plan.id}
            onSelect={setSelectedPlan}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setStep(1)}
        className="w-full flex items-center justify-center gap-2 bg-[#2A7FFF] text-white py-5 rounded-2xl font-black text-[1rem] shadow-[0_10px_20px_rgba(42,127,255,0.3)] hover:-translate-y-1 transition-all active:scale-95 mt-4 group"
      >
        Continue to Setup{' '}
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>

      <p className="text-center text-[0.75rem] text-slate-400 font-medium">
        You can upgrade or change plans anytime later.
      </p>
    </div>
  );
};

export default PlanSelection;
