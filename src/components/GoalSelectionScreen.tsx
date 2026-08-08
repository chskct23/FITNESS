import React, { useState } from 'react';
import { ArrowLeft, Repeat, Activity, Lightbulb, Calendar, Sliders, CheckCircle2 } from 'lucide-react';
import { FASTING_GOALS, FastingGoal } from '../data/goals';

interface GoalSelectionScreenProps {
  selectedGoalId: string;
  onBack: () => void;
  onContinue: (goalId: string) => void;
}

export const GoalSelectionScreen: React.FC<GoalSelectionScreenProps> = ({
  selectedGoalId,
  onBack,
  onContinue,
}) => {
  const [currentGoal, setCurrentGoal] = useState<string>(selectedGoalId || 'habit');

  const getIcon = (iconName: FastingGoal['iconName'], isSelected: boolean) => {
    const className = `w-5 h-5 ${isSelected ? 'text-[#D8FF00]' : 'text-white/70'}`;
    switch (iconName) {
      case 'repeat':
        return <Repeat className={className} />;
      case 'activity':
        return <Activity className={className} />;
      case 'lightbulb':
        return <Lightbulb className={className} />;
      case 'calendar':
        return <Calendar className={className} />;
      case 'sliders':
      default:
        return <Sliders className={className} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D0D] text-white p-5 max-w-md mx-auto justify-between">
      <div>
        {/* Top Header */}
        <div className="pt-2 pb-6">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-extrabold font-montserrat tracking-tight">
            What is your primary goal?
          </h1>
          <p className="text-xs text-white/60 max-w-xs mx-auto">
            Select one to help us personalize your journey.
          </p>
        </div>

        {/* Goal Cards List */}
        <div className="space-y-3">
          {FASTING_GOALS.map((goal) => {
            const isSelected = currentGoal === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setCurrentGoal(goal.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start space-x-4 ${
                  isSelected
                    ? 'border-[#D8FF00] bg-[#1A1A1A] glow-chartreuse-sm'
                    : 'border-white/10 bg-[#141414] hover:bg-[#1a1a1a] opacity-80 hover:opacity-100'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#D8FF00]/15' : 'bg-white/5'}`}>
                  {getIcon(goal.iconName, isSelected)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold font-montserrat text-white">
                      {goal.title}
                    </h3>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-[#D8FF00] fill-[#D8FF00] stroke-black" />
                    )}
                  </div>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-6 pb-4">
        <button
          onClick={() => onContinue(currentGoal)}
          className="w-full py-4 bg-[#D8FF00] text-black font-extrabold font-montserrat rounded-2xl text-base tracking-wider hover:bg-[#cbf000] active:scale-[0.98] transition-all shadow-lg glow-chartreuse uppercase"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};
