import React from 'react';
import { Timer, Calendar, BarChart2, Trophy, User } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'timer', label: 'Timer', icon: <Timer className="w-5 h-5" /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-5 h-5" /> },
    { id: 'stats', label: 'Stats', icon: <BarChart2 className="w-5 h-5" /> },
    { id: 'awards', label: 'Awards', icon: <Trophy className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#121212]/95 backdrop-blur-md border-t border-white/5 max-w-md mx-auto">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full py-1 transition-all duration-200 ${
                isActive ? 'text-[#D8FF00]' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <div className="relative flex items-center justify-center">
                {tab.icon}
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 bg-[#D8FF00] rounded-full glow-chartreuse-sm" />
                )}
              </div>
              <span className={`text-[11px] mt-1 font-medium tracking-tight ${isActive ? 'font-bold text-[#D8FF00]' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
