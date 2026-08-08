import React from 'react';
import { Settings } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  profile: UserProfile;
  title?: string;
  showGreeting?: boolean;
  onOpenSettings: () => void;
  onAvatarClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  title,
  showGreeting = false,
  onOpenSettings,
  onAvatarClick,
}) => {
  return (
    <header className="flex items-center justify-between px-5 pt-5 pb-3 bg-[#0D0D0D] sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <button
          onClick={onAvatarClick || onOpenSettings}
          className="relative group transition-transform active:scale-95 focus:outline-none"
        >
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-[#D8FF00]/50 transition-all"
            referrerPolicy="no-referrer"
          />
        </button>

        <div>
          {showGreeting ? (
            <div>
              <h1 className="text-xl font-bold font-montserrat tracking-tight text-white leading-tight">
                Good morning,
              </h1>
              <span className="text-xl font-extrabold font-montserrat text-white block">
                {profile.name}
              </span>
            </div>
          ) : (
            <h1 className="text-xl font-bold font-montserrat tracking-tight text-white">
              {title}
            </h1>
          )}
        </div>
      </div>

      <button
        onClick={onOpenSettings}
        className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors focus:outline-none active:scale-90"
        title="Settings"
      >
        <Settings className="w-5 h-5" />
      </button>
    </header>
  );
};
