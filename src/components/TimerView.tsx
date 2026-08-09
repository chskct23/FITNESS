import React, { useState, useEffect } from 'react';
import { Play, Square, Edit3, Flame, BicepsFlexed, CheckCircle2, Clock } from 'lucide-react';
import { UserProfile, FastingRatio } from '../types';
import { FASTING_PLANS } from '../data/plans';

interface TimerViewProps {
  profile: UserProfile;
  isFasting: boolean;
  elapsedSeconds: number;
  targetSeconds: number;
  onStartFast: () => void;
  onEndFast: () => void;
  onEditFast: () => void;
}

export const TimerView: React.FC<TimerViewProps> = ({
  profile,
  isFasting,
  elapsedSeconds,
  targetSeconds,
  onStartFast,
  onEndFast,
  onEditFast,
}) => {
  const currentPlan = FASTING_PLANS.find((p) => p.ratio === profile.planRatio) || FASTING_PLANS[2];

  // Calculations for display
  const progressPercent = Math.min(100, Math.max(0, (elapsedSeconds / targetSeconds) * 100));
  
  const remainingSeconds = Math.max(0, targetSeconds - elapsedSeconds);

  // Format Elapsed (HH:MM) and seconds
  const elapsedHours = Math.floor(elapsedSeconds / 3600);
  const elapsedMins = Math.floor((elapsedSeconds % 3600) / 60);
  const elapsedSecs = Math.floor(elapsedSeconds % 60);

  const formattedHoursMins = `${String(elapsedHours).padStart(2, '0')}:${String(elapsedMins).padStart(2, '0')}`;
  const formattedSecs = String(elapsedSecs).padStart(2, '0');

  // Format Remaining (HH:MM:SS)
  const remHours = Math.floor(remainingSeconds / 3600);
  const remMins = Math.floor((remainingSeconds % 3600) / 60);
  const remSecs = Math.floor(remainingSeconds % 60);
  const formattedRemaining = `${String(remHours).padStart(2, '0')}:${String(remMins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}`;

  // SVG Circular progress dimensions
  const radius = 120;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="flex flex-col items-center px-5 pb-24 max-w-md mx-auto min-h-[calc(100vh-80px)] justify-between">
      {/* Fasting Status Badge */}
      <div className="mt-2 mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D8FF00] text-[#D8FF00] text-xs font-extrabold uppercase tracking-widest bg-[#D8FF00]/5 glow-chartreuse-sm">
          <span className="w-2 h-2 rounded-full bg-[#D8FF00] animate-pulse" />
          {isFasting ? '● FASTING' : '● EATING WINDOW'}
        </div>
      </div>

      {/* Main Timer Dial */}
      <div className="relative flex items-center justify-center my-4 group w-full max-w-[18rem]">
        <svg viewBox="0 0 288 288" className="w-full h-auto transform -rotate-90">
          {/* Background Ring */}
          <circle
            cx="144"
            cy="144"
            r={radius}
            stroke="#1F1F1F"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active Chartreuse Progress Ring */}
          <circle
            cx="144"
            cy="144"
            r={radius}
            stroke="#D8FF00"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center Display Information */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {/* Main Elapsed Digits */}
          <div className="text-5xl font-extrabold font-montserrat tracking-tight text-white">
            {formattedHoursMins}
          </div>
          
          {/* Seconds */}
          <div className="text-lg font-bold font-montserrat text-white/90 mt-1">
            {formattedSecs}
          </div>

          {/* Subtitle Label */}
          <div className="text-[10px] font-extrabold tracking-widest text-white/60 uppercase mt-1">
            ELAPSED
          </div>

          {/* Remaining Subtitle */}
          <div className="text-xs font-medium text-white/70 mt-3">
            {isFasting ? `${formattedRemaining} remaining` : 'Ready to start fast'}
          </div>
        </div>
      </div>

      {/* Main Action Button */}
      <div className="w-full my-4">
        {isFasting ? (
          <button
            onClick={onEndFast}
            className="w-full py-4 bg-[#D8FF00] text-black font-extrabold font-montserrat rounded-2xl text-lg tracking-wider hover:bg-[#cbf000] active:scale-[0.98] transition-all shadow-lg glow-chartreuse uppercase"
          >
            END FASTING
          </button>
        ) : (
          <button
            onClick={onStartFast}
            className="w-full py-4 bg-[#D8FF00] text-black font-extrabold font-montserrat rounded-2xl text-lg tracking-wider hover:bg-[#cbf000] active:scale-[0.98] transition-all shadow-lg glow-chartreuse uppercase flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-black" />
            START FASTING
          </button>
        )}

        <button
          onClick={onEditFast}
          className="w-full mt-2 py-1.5 text-xs font-semibold text-white/40 hover:text-white/80 transition-colors flex items-center justify-center gap-1"
        >
          <Edit3 className="w-3.5 h-3.5" />
          Edit Fasting Schedule ({profile.planRatio})
        </button>
      </div>

      {/* Bottom Summary Metric Cards */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {/* Card 1: Streak */}
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
          <div className="text-3xl mb-1">🔥</div>
          <div className="text-xl font-extrabold font-montserrat text-white tracking-tight">
            {profile.streakDays} DAY
          </div>
          <div className="text-[10px] font-bold tracking-widest text-white/50 uppercase mt-0.5">
            STREAK
          </div>
        </div>

        {/* Card 2: Halfway / Goal Progress */}
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
          <div className="text-3xl mb-1">💪</div>
          <div className="text-xl font-extrabold font-montserrat text-white tracking-tight">
            {Math.round(progressPercent)}%
          </div>
          <div className="text-[10px] font-bold tracking-widest text-white/50 uppercase mt-0.5">
            {progressPercent >= 100 ? 'GOAL COMPLETED!' : progressPercent >= 50 ? 'HALFWAY THERE!' : 'IN PROGRESS'}
          </div>
        </div>
      </div>
    </div>
  );
};
