import React from 'react';
import { Sparkles, Flame, Dumbbell, Diamond, Trophy, CheckCircle, Lock } from 'lucide-react';
import { AwardItem } from '../types';

interface AwardsViewProps {
  awards: AwardItem[];
}

export const AwardsView: React.FC<AwardsViewProps> = ({ awards }) => {
  const getIcon = (type: AwardItem['iconType'], unlocked: boolean) => {
    const className = `w-6 h-6 ${unlocked ? 'text-[#D8FF00]' : 'text-white/20'}`;
    switch (type) {
      case 'flame':
        return <Flame className={className} />;
      case 'dumbbell':
        return <Dumbbell className={className} />;
      case 'diamond':
        return <Diamond className={className} />;
      case 'sparkles':
        return <Sparkles className={className} />;
      case 'trophy':
      default:
        return <Trophy className={className} />;
    }
  };

  return (
    <div className="flex flex-col px-5 pb-24 w-full max-w-md mx-auto space-y-6">
      {/* Title Header */}
      <h2 className="text-xl font-bold font-montserrat text-white pt-2">
        Awards
      </h2>

      {/* Next Milestone Card */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
          <span className="text-white/40">NEXT MILESTONE</span>
          <span className="text-white/70">8 / 14</span>
        </div>
        <div className="text-xl font-extrabold font-montserrat text-[#D8FF00]">
          14-Day Streak
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
          <div
            style={{ width: `${(8 / 14) * 100}%` }}
            className="h-full bg-[#D8FF00] rounded-full glow-chartreuse-sm"
          />
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 gap-3">
        {awards.map((award) => (
          <div
            key={award.id}
            className={`bg-[#1A1A1A] border rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all ${
              award.unlocked
                ? 'border-[#D8FF00]/30 shadow-md'
                : 'border-white/5 opacity-60'
            }`}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-transform ${
                award.unlocked
                  ? 'bg-[#141414] ring-1 ring-[#D8FF00]/50 glow-chartreuse-sm'
                  : 'bg-[#141414]'
              }`}
            >
              {getIcon(award.iconType, award.unlocked)}
            </div>
            <div className="text-xs font-extrabold font-montserrat text-white tracking-tight">
              {award.title}
            </div>
            {!award.unlocked && (
              <div className="flex items-center space-x-1 text-[10px] text-white/40 mt-1">
                <Lock className="w-3 h-3" />
                <span>Locked</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Journey Timeline Section */}
      <div className="space-y-4 pt-2">
        <h3 className="text-lg font-bold font-montserrat text-white">
          Journey
        </h3>

        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 space-y-6">
          {/* Milestone 1 */}
          <div className="flex space-x-4 relative">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#D8FF00] flex items-center justify-center text-black font-bold z-10 glow-chartreuse-sm">
                <CheckCircle className="w-4 h-4 fill-black text-[#D8FF00]" />
              </div>
              <div className="w-[2px] bg-[#D8FF00] flex-1 my-1" />
            </div>
            <div>
              <div className="text-xs font-extrabold tracking-widest text-[#D8FF00] uppercase">
                FIRST FAST
              </div>
              <p className="text-xs text-white/70 mt-0.5">
                Completed your first 16h window.
              </p>
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="flex space-x-4 relative">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#D8FF00] flex items-center justify-center text-black font-bold z-10 glow-chartreuse-sm">
                <CheckCircle className="w-4 h-4 fill-black text-[#D8FF00]" />
              </div>
              <div className="w-[2px] bg-[#D8FF00] flex-1 my-1" />
            </div>
            <div>
              <div className="text-xs font-extrabold tracking-widest text-[#D8FF00] uppercase">
                3 DAYS
              </div>
              <p className="text-xs text-white/70 mt-0.5">
                Maintained a 3-day fasting streak.
              </p>
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="flex space-x-4 relative">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#D8FF00] flex items-center justify-center text-black font-bold z-10 glow-chartreuse-sm">
                <CheckCircle className="w-4 h-4 fill-black text-[#D8FF00]" />
              </div>
              <div className="w-[2px] bg-white/10 flex-1 my-1" />
            </div>
            <div>
              <div className="text-xs font-extrabold tracking-widest text-[#D8FF00] uppercase">
                7 DAYS
              </div>
              <p className="text-xs text-white/70 mt-0.5">
                Reached warrior status.
              </p>
            </div>
          </div>

          {/* Milestone 4 (In Progress) */}
          <div className="flex space-x-4 relative">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/40 font-bold z-10">
                <span className="w-2 h-2 rounded-full bg-white/40" />
              </div>
            </div>
            <div>
              <div className="text-xs font-extrabold tracking-widest text-white/40 uppercase">
                14 DAYS
              </div>
              <p className="text-xs text-white/40 mt-0.5">
                In progress (8 / 14 days completed).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
