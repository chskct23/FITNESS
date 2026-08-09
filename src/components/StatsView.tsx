import React from 'react';
import { Clock, CheckCircle, TrendingUp, Award, Zap } from 'lucide-react';
import { UserProfile } from '../types';

interface StatsViewProps {
  profile: UserProfile;
}

export const StatsView: React.FC<StatsViewProps> = ({ profile }) => {
  // Weekly data (M, T, W, T, F, S, S)
  const weeklyData = [
    { day: 'M', hours: 16 },
    { day: 'T', hours: 16.5 },
    { day: 'W', hours: 16 },
    { day: 'T', hours: 15 },
    { day: 'F', hours: 16 },
    { day: 'S', hours: 17 },
    { day: 'S', hours: 16 },
  ];

  const maxHours = 20;

  return (
    <div className="flex flex-col px-5 pb-24 w-full max-w-md mx-auto space-y-4">
      {/* Weekly Fasting Bar Chart */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold font-montserrat text-white">
            Weekly Fasting
          </h3>
          <span className="text-[10px] font-extrabold text-[#D8FF00] uppercase tracking-widest">
            THIS WEEK
          </span>
        </div>

        {/* Bar Graph */}
        <div className="flex items-end justify-between h-36 pt-4 px-2">
          {weeklyData.map((item, idx) => {
            const heightPercent = (item.hours / maxHours) * 100;
            return (
              <div key={idx} className="flex flex-col items-center flex-1 space-y-2 group">
                <div className="text-[10px] text-white/0 group-hover:text-white transition-opacity font-bold">
                  {item.hours}h
                </div>
                <div className="w-full max-w-[20px] bg-white/5 rounded-t-lg h-full flex items-end overflow-hidden">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-[#D8FF00] rounded-t-md group-hover:brightness-125 transition-all duration-300 glow-chartreuse-sm"
                  />
                </div>
                <span className="text-xs font-bold text-white/60">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid Cards 1: Total Time & Fasts Completed */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Time */}
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/80 mb-6">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-2xl font-extrabold font-montserrat text-white tracking-tight">
              {profile.totalHours}h
            </div>
            <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase mt-0.5">
              TOTAL TIME
            </div>
          </div>
        </div>

        {/* Fasts Completed */}
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
          <div className="w-8 h-8 rounded-full bg-[#D8FF00]/10 flex items-center justify-center text-[#D8FF00] mb-6">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-2xl font-extrabold font-montserrat text-white tracking-tight">
              {profile.fastsDone}
            </div>
            <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase mt-0.5">
              COMPLETED
            </div>
          </div>
        </div>
      </div>

      {/* Average Fast Card */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
              AVERAGE FAST
            </div>
            <div className="text-xl font-extrabold font-montserrat text-white mt-0.5">
              16h 18m
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-[#D8FF00] text-xs font-bold">
          <TrendingUp className="w-4 h-4" />
          <span>+2%</span>
        </div>
      </div>

      {/* Consistency Score */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold font-montserrat text-white">
            Consistency Score
          </h4>
          <span className="text-lg font-extrabold font-montserrat text-[#D8FF00]">
            {profile.consistencyScore} <span className="text-xs text-white/40 font-normal">/ 100</span>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
          <div
            style={{ width: `${profile.consistencyScore}%` }}
            className="h-full bg-[#D8FF00] rounded-full glow-chartreuse-sm"
          />
        </div>

        <div className="text-right text-[11px] font-bold text-white/50 tracking-tight">
          Top 15% of users
        </div>
      </div>

      {/* Monthly Rate Card */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold font-montserrat text-white">
            Monthly Rate
          </h4>
          <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase mt-0.5 block">
            FEBRUARY
          </span>
        </div>

        {/* Circular Progress Gauge */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="26"
              stroke="#262626"
              strokeWidth="5"
              fill="transparent"
            />
            <circle
              cx="32"
              cy="32"
              r="26"
              stroke="#D8FF00"
              strokeWidth="5"
              strokeDasharray={2 * Math.PI * 26}
              strokeDashoffset={2 * Math.PI * 26 * (1 - profile.monthlyRate / 100)}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <span className="absolute text-xs font-extrabold font-montserrat text-white">
            {profile.monthlyRate}%
          </span>
        </div>
      </div>
    </div>
  );
};
