import React, { useState } from 'react';
import { X, User, Bell, Shield, RotateCcw, Image, Save, Clock } from 'lucide-react';
import { UserProfile, FastingRatio } from '../types';
import { FASTING_PLANS } from '../data/plans';

interface SettingsModalProps {
  isOpen: boolean;
  profile: UserProfile;
  onClose: () => void;
  onSaveProfile: (updated: Partial<UserProfile>) => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSaveProfile,
  onResetData,
}) => {
  const [name, setName] = useState(profile.name);
  const [subtitle, setSubtitle] = useState(profile.subtitle);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [planRatio, setPlanRatio] = useState<FastingRatio>(profile.planRatio);
  const [startTime, setStartTime] = useState(profile.fastingStartTime);
  const [age, setAge] = useState(profile.age);
  const [heightCm, setHeightCm] = useState(profile.heightCm);
  const [weightKg, setWeightKg] = useState(profile.weightKg);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      name,
      subtitle,
      avatarUrl,
      planRatio,
      fastingStartTime: startTime,
      age: Number(age),
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto no-scrollbar p-6 text-white space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-[#D8FF00]" />
            <h2 className="text-lg font-bold font-montserrat text-white">
              App Settings & Profile
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          {/* Avatar Picture URL */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">
              Profile Picture URL
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2 text-xs w-full text-white focus:outline-none focus:border-[#D8FF00]"
              />
              <img
                src={avatarUrl}
                alt="Preview"
                className="w-8 h-8 rounded-full object-cover border border-[#D8FF00]"
              />
            </div>
          </div>

          {/* Name & Subtitle */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2 text-xs w-full text-white focus:outline-none focus:border-[#D8FF00]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">
                Title / Subtitle
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2 text-xs w-full text-white focus:outline-none focus:border-[#D8FF00]"
              />
            </div>
          </div>

          {/* Plan & Start Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">
                Fasting Plan
              </label>
              <select
                value={planRatio}
                onChange={(e) => setPlanRatio(e.target.value as FastingRatio)}
                className="bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2 text-xs w-full text-white focus:outline-none focus:border-[#D8FF00]"
              >
                {FASTING_PLANS.map((p) => (
                  <option key={p.id} value={p.ratio} className="bg-[#1A1A1A]">
                    {p.ratio} ({p.fastingHours}h fast)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">
                Start Time
              </label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="e.g. 08:00 PM"
                className="bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2 text-xs w-full text-white focus:outline-none focus:border-[#D8FF00]"
              />
            </div>
          </div>

          {/* Age, Height, Weight */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2 text-xs w-full text-white focus:outline-none focus:border-[#D8FF00]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">
                Height (cm)
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2 text-xs w-full text-white focus:outline-none focus:border-[#D8FF00]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">
                Weight (kg)
              </label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2 text-xs w-full text-white focus:outline-none focus:border-[#D8FF00]"
              />
            </div>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-xl border border-white/5 pt-3">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-[#D8FF00]" />
              <span className="text-xs font-bold text-white">Fasting Alerts & Reminders</span>
            </div>
            <button
              type="button"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
                notificationsEnabled ? 'bg-[#D8FF00]' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-black transition-transform ${
                  notificationsEnabled ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3 bg-[#D8FF00] text-black font-extrabold font-montserrat rounded-xl text-sm tracking-wider uppercase hover:bg-[#cbf000] transition-colors flex items-center justify-center space-x-2 glow-chartreuse-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </form>

        {/* Reset App Data */}
        <div className="border-t border-white/5 pt-4">
          <button
            type="button"
            onClick={onResetData}
            className="w-full py-2.5 bg-red-950/20 hover:bg-red-950/40 text-[#FFB4AB] border border-red-900/30 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
