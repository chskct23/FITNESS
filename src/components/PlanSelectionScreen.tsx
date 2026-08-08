import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { FASTING_PLANS } from '../data/plans';
import { FastingRatio } from '../types';

interface PlanSelectionScreenProps {
  currentPlanRatio: FastingRatio;
  onBack: () => void;
  onSetPlan: (planRatio: FastingRatio) => void;
}

export const PlanSelectionScreen: React.FC<PlanSelectionScreenProps> = ({
  currentPlanRatio,
  onBack,
  onSetPlan,
}) => {
  const [selectedRatio, setSelectedRatio] = useState<FastingRatio>(currentPlanRatio || '16:8');

  const beginnerPlans = FASTING_PLANS.filter((p) => p.category === 'BEGINNER');
  const advancedPlans = FASTING_PLANS.filter((p) => p.category === 'ADVANCED');

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D0D] text-white p-5 max-w-md mx-auto justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pt-2 pb-6">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold font-montserrat text-[#D8FF00] tracking-wide">
            Fasting Journey
          </span>
          <div className="w-8" />
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold font-montserrat tracking-tight text-white">
            Choose your plan
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Select a fasting schedule that fits your lifestyle.
          </p>
        </div>

        {/* BEGINNER Section */}
        <div className="space-y-3 mb-6">
          <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase px-1">
            BEGINNER
          </div>

          {beginnerPlans.map((plan) => {
            const isSelected = selectedRatio === plan.ratio;
            return (
              <button
                key={plan.id}
                onClick={() => setSelectedRatio(plan.ratio)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between ${
                  isSelected
                    ? 'border-[#D8FF00] bg-[#1A1A1A] glow-chartreuse-sm'
                    : 'border-white/10 bg-[#141414] hover:bg-[#1a1a1a] opacity-80'
                }`}
              >
                <div className="pr-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-extrabold font-montserrat text-white">
                      {plan.ratio}
                    </span>
                    {plan.popular && (
                      <span className="text-[9px] font-extrabold tracking-wider bg-[#D8FF00]/15 text-[#D8FF00] px-2 py-0.5 rounded-full uppercase">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="pt-0.5">
                  <CheckCircle2
                    className={`w-5 h-5 transition-colors ${
                      isSelected
                        ? 'text-[#D8FF00] fill-[#D8FF00] stroke-black'
                        : 'text-white/20'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* ADVANCED Section */}
        <div className="space-y-3">
          <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase px-1">
            ADVANCED
          </div>

          {advancedPlans.map((plan) => {
            const isSelected = selectedRatio === plan.ratio;
            return (
              <button
                key={plan.id}
                onClick={() => setSelectedRatio(plan.ratio)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between ${
                  isSelected
                    ? 'border-[#D8FF00] bg-[#1A1A1A] glow-chartreuse-sm'
                    : 'border-white/10 bg-[#141414] hover:bg-[#1a1a1a] opacity-80'
                }`}
              >
                <div className="pr-3">
                  <span className="text-base font-extrabold font-montserrat text-white block">
                    {plan.ratio}
                  </span>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="pt-0.5">
                  <CheckCircle2
                    className={`w-5 h-5 transition-colors ${
                      isSelected
                        ? 'text-[#D8FF00] fill-[#D8FF00] stroke-black'
                        : 'text-white/20'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-6 pb-4">
        <button
          onClick={() => onSetPlan(selectedRatio)}
          className="w-full py-4 bg-[#D8FF00] text-black font-extrabold font-montserrat rounded-2xl text-base tracking-wider hover:bg-[#cbf000] active:scale-[0.98] transition-all shadow-lg glow-chartreuse uppercase flex items-center justify-center space-x-2"
        >
          <span>Set Plan</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
