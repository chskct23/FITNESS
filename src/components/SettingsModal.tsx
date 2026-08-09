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
  const [isCropping, setIsCropping] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [cropScale, setCropScale] = useState(1);
  const [cropOffset, setCropOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{
    x: number;
    y: number;
    startX: number;
    startY: number;
  } | null>(null);

  const handleAvatarUpload = (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCropImageSrc(reader.result);
        setCropScale(1);
        setCropOffset({ x: 0, y: 0 });
        setIsCropping(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const loadImage = async (src: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Image failed to load'));
      image.src = src;
    });
  };

  const getCroppedAvatar = async () => {
    if (!cropImageSrc) return null;

    let image: HTMLImageElement;
    try {
      image = await loadImage(cropImageSrc);
    } catch {
      return null;
    }

    const canvasSize = 300;
    const canvas = document.createElement('canvas');
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const drawWidth = image.naturalWidth * cropScale;
    const drawHeight = image.naturalHeight * cropScale;
    const dx = cropOffset.x + (canvasSize - drawWidth) / 2;
    const dy = cropOffset.y + (canvasSize - drawHeight) / 2;

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, dx, dy, drawWidth, drawHeight);

    return canvas.toDataURL('image/png');
  };

  const handleSaveCrop = async () => {
    const cropped = await getCroppedAvatar();
    if (cropped) {
      setAvatarUrl(cropped);
      onSaveProfile({ avatarUrl: cropped });
    } else if (cropImageSrc) {
      setAvatarUrl(cropImageSrc);
      onSaveProfile({ avatarUrl: cropImageSrc });
    }
    setCropImageSrc(null);
    setIsCropping(false);
  };

  const handleCropPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      startX: cropOffset.x,
      startY: cropOffset.y,
    });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleCropPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart) return;
    setCropOffset({
      x: dragStart.startX + e.clientX - dragStart.x,
      y: dragStart.startY + e.clientY - dragStart.y,
    });
  };

  const handleCropPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    setDragStart(null);
  };

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
      <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-[min(100%,32rem)] max-h-[90vh] overflow-y-auto no-scrollbar p-4 sm:p-6 text-white space-y-6">
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
              Profile Picture
            </label>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="Paste image URL or upload a file"
                  className="bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2 text-xs w-full text-white focus:outline-none focus:border-[#D8FF00]"
                />
                <img
                  src={avatarUrl}
                  alt="Preview"
                  className="w-10 h-10 rounded-full object-cover border border-[#D8FF00]"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleAvatarUpload(e.target.files?.[0] ?? null)}
                className="bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2 text-xs w-full text-white focus:outline-none focus:border-[#D8FF00]"
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

        {isCropping && cropImageSrc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#141414] border border-white/10 rounded-3xl max-w-[min(100%,28rem)] w-full p-4 sm:p-5 text-white space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Crop Your Profile Image</h3>
                  <p className="text-xs text-white/60 mt-1">
                    Drag the image to reposition it, then use zoom to fit the crop.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCropping(false)}
                  className="text-white/60 hover:text-white"
                >
                  Cancel
                </button>
              </div>
              <div className="mx-auto w-full max-w-[320px]">
                <div
                  className="relative overflow-hidden rounded-3xl bg-[#0F0F0F] border border-white/10"
                  style={{ width: '100%', aspectRatio: '1 / 1', touchAction: 'none', minHeight: 240 }}
                  onPointerDown={handleCropPointerDown}
                  onPointerMove={handleCropPointerMove}
                  onPointerUp={handleCropPointerUp}
                  onPointerCancel={handleCropPointerUp}
                >
                  <img
                    src={cropImageSrc}
                    alt="Crop preview"
                    className="absolute top-1/2 left-1/2 select-none"
                    style={{
                      transform: `translate(-50%, -50%) scale(${cropScale}) translate(${cropOffset.x}px, ${cropOffset.y}px)`,
                      transformOrigin: 'center center',
                      cursor: dragStart ? 'grabbing' : 'grab',
                      userSelect: 'none',
                      touchAction: 'none',
                      maxWidth: 'none',
                    }}
                    draggable={false}
                  />
                  <div className="pointer-events-none absolute inset-0 border-2 border-dashed border-white/20 rounded-3xl" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Zoom</span>
                  <span>{(cropScale * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={cropScale}
                  onChange={(e) => setCropScale(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsCropping(false)}
                  className="flex-1 py-3 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveCrop}
                  className="flex-1 py-3 rounded-2xl bg-[#D8FF00] text-black font-bold hover:bg-[#cbf000]"
                >
                  Save crop
                </button>
              </div>
            </div>
          </div>
        )}

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
