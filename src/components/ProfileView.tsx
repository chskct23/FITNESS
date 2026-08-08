import React from 'react';
import { Pencil, ChevronRight, Clock, Settings, LogOut } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  onChangePlan: () => void;
  onOpenSettings: () => void;
  onEditProfileField: (field: keyof UserProfile) => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onChangePlan,
  onOpenSettings,
  onEditProfileField,
  onLogout,
}) => {
  return (
    <div className="flex flex-col items-center px-5 pb-24 max-w-md mx-auto space-y-6">
      {/* Profile Header Avatar */}
      <div className="flex flex-col items-center text-center pt-2">
        <div className="relative group">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-[#D8FF00] shadow-xl"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={onOpenSettings}
            className="absolute bottom-0 right-0 p-2 rounded-full bg-[#202020] border border-white/10 text-white/80 hover:text-white transition-all hover:scale-110 focus:outline-none"
            title="Edit avatar"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>

        <h2 className="text-2xl font-bold font-montserrat text-white mt-3">
          {profile.name}
        </h2>
        <span className="text-xs text-white/50 font-medium mt-0.5">
          {profile.subtitle}
        </span>
      </div>

      {/* Profile Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {/* Day Streak */}
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 text-center">
          <div className="text-xl font-extrabold font-montserrat text-white">
            {profile.streakDays}
          </div>
          <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase mt-1">
            Day Streak
          </div>
        </div>

        {/* Total Hours */}
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 text-center">
          <div className="text-xl font-extrabold font-montserrat text-white">
            {profile.totalHours}
          </div>
          <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase mt-1">
            Total Hours
          </div>
        </div>

        {/* Fasts Done */}
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 text-center">
          <div className="text-xl font-extrabold font-montserrat text-white">
            {profile.fastsDone}
          </div>
          <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase mt-1">
            Fasts Done
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 text-center">
          <div className="text-xl font-extrabold font-montserrat text-white">
            {profile.achievementsCount}
          </div>
          <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase mt-1">
            Achievements
          </div>
        </div>
      </div>

      {/* Profile Settings List */}
      <div className="w-full space-y-2">
        <h3 className="text-base font-bold font-montserrat text-white">
          Profile Settings
        </h3>

        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl divide-y divide-white/5 overflow-hidden">
          {/* Age */}
          <button
            onClick={() => onEditProfileField('age')}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-medium text-white/80">Age</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-white/90">{profile.age}</span>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </div>
          </button>

          {/* Height */}
          <button
            onClick={() => onEditProfileField('heightCm')}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-medium text-white/80">Height</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-white/90">
                {profile.heightCm} {profile.unitHeight}
              </span>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </div>
          </button>

          {/* Weight */}
          <button
            onClick={() => onEditProfileField('weightKg')}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-medium text-white/80">Weight</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-white/90">
                {profile.weightKg} {profile.unitWeight}
              </span>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </div>
          </button>

          {/* Gender */}
          <button
            onClick={() => onEditProfileField('gender')}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-medium text-white/80">Gender</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-white/90">{profile.gender}</span>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </div>
          </button>
        </div>
      </div>

      {/* My Plan Section */}
      <div className="w-full space-y-2">
        <h3 className="text-base font-bold font-montserrat text-white">
          My Plan
        </h3>

        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-[#D8FF00]/15 border border-[#D8FF00]/30 flex items-center justify-center text-[#D8FF00]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-bold font-montserrat text-white">
                {profile.planRatio} Experienced
              </div>
              <div className="text-xs text-white/50 mt-0.5">
                Fasting starts at {profile.fastingStartTime}
              </div>
            </div>
          </div>

          <button
            onClick={onChangePlan}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            title="Change Plan"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* General Settings & Logout Buttons */}
      <div className="w-full space-y-3 pt-2">
        <button
          onClick={onOpenSettings}
          className="w-full py-3.5 px-4 bg-[#1F1F1F] hover:bg-[#282828] text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 transition-colors border border-white/5"
        >
          <Settings className="w-4 h-4" />
          <span>General Settings</span>
        </button>

        <button
          onClick={onLogout}
          className="w-full py-3.5 px-4 bg-[#211414] hover:bg-[#2d1818] text-[#FFB4AB] font-bold text-sm rounded-xl flex items-center justify-center space-x-2 transition-colors border border-red-950/30"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
