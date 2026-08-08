import React, { useState } from 'react';
import { ArrowLeft, User, Cake, ArrowUpDown, Scale } from 'lucide-react';
import { UserProfile } from '../types';

interface SetupProfileScreenProps {
  profile: UserProfile;
  onBack: () => void;
  onSave: (updatedProfile: Partial<UserProfile>) => void;
}

export const SetupProfileScreen: React.FC<SetupProfileScreenProps> = ({
  profile,
  onBack,
  onSave,
}) => {
  const [name, setName] = useState(profile.name || 'Cheska');
  const [age, setAge] = useState<number | string>(profile.age || 28);
  const [height, setHeight] = useState<number | string>(profile.heightCm || 165);
  const [weight, setWeight] = useState<number | string>(profile.weightKg || 62);
  const [unitHeight, setUnitHeight] = useState<'cm' | 'ft'>(profile.unitHeight || 'cm');
  const [unitWeight, setUnitWeight] = useState<'kg' | 'lbs'>(profile.unitWeight || 'kg');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim() || 'User',
      age: Number(age) || 28,
      heightCm: Number(height) || 165,
      weightKg: Number(weight) || 62,
      unitHeight,
      unitWeight,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D0D] text-white p-5 max-w-md mx-auto justify-between">
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 justify-between">
        <div>
          {/* Top Header */}
          <div className="flex items-center justify-between pt-2 pb-6">
            <button
              type="button"
              onClick={onBack}
              className="p-2 -ml-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-bold font-montserrat text-white tracking-wide">
              Setup
            </span>
            <div className="w-8" />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold font-montserrat tracking-tight text-white">
              Tell us about yourself
            </h1>
            <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
              Personalize your journey for better fasting insights.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* NAME */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 space-y-1">
              <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase block">
                NAME
              </label>
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-white/50" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="bg-transparent w-full text-sm font-semibold text-white placeholder-white/30 focus:outline-none"
                />
              </div>
            </div>

            {/* AGE */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 space-y-1">
              <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase block">
                AGE
              </label>
              <div className="flex items-center space-x-3">
                <Cake className="w-4 h-4 text-white/50" />
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Years"
                  className="bg-transparent w-full text-sm font-semibold text-white placeholder-white/30 focus:outline-none"
                />
              </div>
            </div>

            {/* HEIGHT */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                  HEIGHT
                </label>
                {/* Unit Switcher */}
                <div className="flex items-center bg-white/5 rounded-lg p-0.5 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setUnitHeight('cm')}
                    className={`px-2 py-0.5 rounded-md transition-colors ${
                      unitHeight === 'cm'
                        ? 'bg-[#D8FF00] text-black font-extrabold'
                        : 'text-white/50'
                    }`}
                  >
                    cm
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnitHeight('ft')}
                    className={`px-2 py-0.5 rounded-md transition-colors ${
                      unitHeight === 'ft'
                        ? 'bg-[#D8FF00] text-black font-extrabold'
                        : 'text-white/50'
                    }`}
                  >
                    ft
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-1">
                <ArrowUpDown className="w-4 h-4 text-white/50" />
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Your height"
                  className="bg-transparent w-full text-sm font-semibold text-white placeholder-white/30 focus:outline-none"
                />
              </div>
            </div>

            {/* CURRENT WEIGHT */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                  CURRENT WEIGHT
                </label>
                {/* Unit Switcher */}
                <div className="flex items-center bg-white/5 rounded-lg p-0.5 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setUnitWeight('kg')}
                    className={`px-2 py-0.5 rounded-md transition-colors ${
                      unitWeight === 'kg'
                        ? 'bg-[#D8FF00] text-black font-extrabold'
                        : 'text-white/50'
                    }`}
                  >
                    kg
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnitWeight('lbs')}
                    className={`px-2 py-0.5 rounded-md transition-colors ${
                      unitWeight === 'lbs'
                        ? 'bg-[#D8FF00] text-black font-extrabold'
                        : 'text-white/50'
                    }`}
                  >
                    lbs
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-1">
                <Scale className="w-4 h-4 text-white/50" />
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Your weight"
                  className="bg-transparent w-full text-sm font-semibold text-white placeholder-white/30 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="pt-8 pb-4">
          <button
            type="submit"
            className="w-full py-4 bg-[#D8FF00] text-black font-extrabold font-montserrat rounded-2xl text-base tracking-wider hover:bg-[#cbf000] active:scale-[0.98] transition-all shadow-lg glow-chartreuse uppercase"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};
