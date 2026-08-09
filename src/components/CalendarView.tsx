import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Utensils, Coffee, Check, Star } from 'lucide-react';
import { UserProfile, FastRecord } from '../types';

interface CalendarViewProps {
  profile: UserProfile;
  records: FastRecord[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ profile, records }) => {
  const [selectedDay, setSelectedDay] = useState<number>(12);
  const [currentMonth, setCurrentMonth] = useState<{ name: string; year: number }>({
    name: 'October',
    year: 2023,
  });

  // Calendar days grid generator for October 2023
  // October 1 2023 was a Sunday. If week starts on Monday: Oct 1 is day 7 (index 6)
  const daysInMonth = 31;
  const startOffset = 6; // Sunday start in M T W T F S S layout

  // Map of date -> status from records
  const getDayRecord = (day: number) => {
    const dateStr = `2023-10-${String(day).padStart(2, '0')}`;
    return records.find((r) => r.date === dateStr);
  };

  const selectedRecord = getDayRecord(selectedDay) || {
    id: `fast-oct-${selectedDay}`,
    date: `2023-10-${selectedDay}`,
    ratio: profile.planRatio,
    elapsedSeconds: 45900, // 12h 45m
    targetSeconds: 57600, // 16h
    startTime: '8:00 PM (Oct 11)',
    endTime: '12:00 PM',
    status: selectedDay === 12 ? 'IN_PROGRESS' : selectedDay < 12 ? 'DONE' : 'PARTIAL',
  };

  return (
    <div className="flex flex-col px-5 pb-24 max-w-md mx-auto space-y-4">
      {/* Top Stat Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 text-center">
          <div className="text-3xl font-extrabold font-montserrat text-[#D8FF00] tracking-tight">
            {profile.streakDays}
          </div>
          <div className="text-[10px] font-bold tracking-widest text-white/50 uppercase mt-1">
            DAY STREAK
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 text-center">
          <div className="text-3xl font-extrabold font-montserrat text-white tracking-tight">
            {profile.fastsDone}
          </div>
          <div className="text-[10px] font-bold tracking-widest text-white/50 uppercase mt-1">
            TOTAL DAYS
          </div>
        </div>
      </div>

      {/* Main Monthly Calendar Card */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-5">
        {/* Month Header Navigation */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold font-montserrat text-white">
            {currentMonth.name} {currentMonth.year}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                setCurrentMonth((prev) =>
                  prev.name === 'October'
                    ? { name: 'September', year: 2023 }
                    : { name: 'October', year: 2023 }
                )
              }
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setCurrentMonth((prev) =>
                  prev.name === 'October'
                    ? { name: 'November', year: 2023 }
                    : { name: 'October', year: 2023 }
                )
              }
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Weekday Labels */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-white/40 mb-3">
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
          <span>S</span>
        </div>

        {/* Calendar Day Grid */}
        <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center">
          {/* Empty offset spaces before 1st */}
          {Array.from({ length: startOffset }).map((_, idx) => (
            <div key={`offset-${idx}`} className="h-9" />
          ))}

          {/* Month Days */}
          {Array.from({ length: 14 }).map((_, idx) => {
            const dayNum = idx + 1;
            const record = getDayRecord(dayNum);
            const isSelected = selectedDay === dayNum;

            let dotColor = 'bg-[#D8FF00]'; // DONE
            if (dayNum === 4) dotColor = 'bg-[#FFB4AB]'; // MISSED
            else if (dayNum > 12) dotColor = 'bg-transparent';

            return (
              <button
                key={`day-${dayNum}`}
                onClick={() => setSelectedDay(dayNum)}
                className="flex flex-col items-center justify-center relative focus:outline-none"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all relative ${
                    isSelected
                      ? 'bg-[#D8FF00] text-black font-extrabold shadow-md scale-110'
                      : dayNum > 12
                      ? 'text-white/30 hover:text-white/70'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {dayNum === 7 && !isSelected && (
                    <Star className="w-2.5 h-2.5 text-[#D8FF00] absolute -top-1 right-0 fill-[#D8FF00]" />
                  )}
                  {dayNum}
                </div>

                {/* Status Dot */}
                {dayNum <= 12 && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                      isSelected ? 'bg-black' : dotColor
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-white/5 text-[11px] font-bold text-white/60">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D8FF00]" />
            <span>DONE</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span>PARTIAL</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FFB4AB]" />
            <span>MISSED</span>
          </div>
        </div>
      </div>

      {/* Selected Day Fast Details Card */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-montserrat text-white">
              Thursday, Oct {selectedDay}
            </h3>
            <p className="text-xs text-white/50 mt-0.5">
              {profile.planRatio} Intermittent Fast
            </p>
          </div>
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#D8FF00] text-[#D8FF00] text-[10px] font-extrabold uppercase tracking-wider bg-[#D8FF00]/10">
            ● {selectedRecord.status === 'IN_PROGRESS' ? 'IN PROGRESS' : selectedRecord.status}
          </div>
        </div>

        {/* Elapsed vs Goal stats */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-[#141414] rounded-xl p-3 border border-white/5">
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
              ELAPSED
            </div>
            <div className="text-lg font-bold font-montserrat text-white mt-0.5">
              {Math.floor(selectedRecord.elapsedSeconds / 3600)}h {Math.floor((selectedRecord.elapsedSeconds % 3600) / 60)}m
            </div>
          </div>

          <div className="bg-[#141414] rounded-xl p-3 border border-white/5">
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
              GOAL
            </div>
            <div className="text-lg font-bold font-montserrat text-white mt-0.5">
              {Math.floor(selectedRecord.targetSeconds / 3600)}h 00m
            </div>
          </div>
        </div>

        {/* Timeline representation */}
        <div className="flex items-center justify-between pt-2 text-xs text-white/70">
          <div className="flex items-center space-x-2">
            <Utensils className="w-4 h-4 text-white/40" />
            <span>{selectedRecord.startTime}</span>
          </div>
          <div className="h-[2px] flex-1 mx-3 bg-gradient-to-r from-white/10 via-[#D8FF00]/40 to-white/10" />
          <div className="flex items-center space-x-2">
            <Coffee className="w-4 h-4 text-white/40" />
            <span>{selectedRecord.endTime || '12:00 PM'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
