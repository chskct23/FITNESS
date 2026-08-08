import React from 'react';
import { Zap } from 'lucide-react';

interface LandingScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onGetStarted, onSignIn }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D0D] text-white p-6 max-w-md mx-auto justify-between items-center text-center">
      {/* Spacer */}
      <div className="h-8" />

      {/* Hero Badge & Title */}
      <div className="flex flex-col items-center space-y-6 my-auto w-full">
        {/* Lightning Circle Icon */}
        <div className="relative flex items-center justify-center w-28 h-28 rounded-full border border-[#D8FF00]/40 bg-[#D8FF00]/5 glow-chartreuse">
          <div className="w-20 h-20 rounded-full border border-[#D8FF00]/60 flex items-center justify-center">
            <Zap className="w-10 h-10 text-[#D8FF00] fill-[#D8FF00]" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold font-montserrat tracking-tight text-[#D8FF00] drop-shadow-md">
            KINETIC FAST
          </h1>
          <p className="text-sm font-semibold text-white/70 tracking-wide">
            Track. Commit. Achieve.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3 pb-8">
        <button
          onClick={onGetStarted}
          className="w-full py-4 bg-[#D8FF00] text-black font-extrabold font-montserrat rounded-2xl text-base tracking-wider hover:bg-[#cbf000] active:scale-[0.98] transition-all shadow-lg glow-chartreuse uppercase"
        >
          Get Started
        </button>

        <button
          onClick={onSignIn}
          className="w-full py-4 bg-transparent border border-white/20 text-white font-bold font-montserrat rounded-2xl text-base tracking-wider hover:bg-white/5 active:scale-[0.98] transition-all uppercase"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
