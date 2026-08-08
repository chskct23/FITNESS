export type FastingRatio = '12:12' | '14:10' | '16:8' | '18:6' | '20:4' | 'OMAD';

export interface FastingPlan {
  id: FastingRatio;
  ratio: FastingRatio;
  title: string;
  category: 'BEGINNER' | 'ADVANCED';
  description: string;
  fastingHours: number;
  eatingHours: number;
  popular?: boolean;
}

export type FastStatus = 'DONE' | 'PARTIAL' | 'MISSED' | 'IN_PROGRESS';

export interface FastRecord {
  id: string;
  date: string; // YYYY-MM-DD
  ratio: FastingRatio;
  elapsedSeconds: number;
  targetSeconds: number;
  startTime: string; // ISO String or readable time
  endTime?: string;
  status: FastStatus;
  notes?: string;
}

export interface UserProfile {
  name: string;
  subtitle: string;
  avatarUrl: string;
  age: number;
  heightCm: number;
  weightKg: number;
  gender: 'Female' | 'Male' | 'Other';
  goalId: string;
  planRatio: FastingRatio;
  fastingStartTime: string; // e.g., "08:00 PM"
  unitHeight: 'cm' | 'ft';
  unitWeight: 'kg' | 'lbs';
  streakDays: number;
  totalHours: number;
  fastsDone: number;
  achievementsCount: number;
  consistencyScore: number;
  monthlyRate: number;
}

export interface AwardItem {
  id: string;
  title: string;
  description: string;
  category: string;
  iconType: 'flame' | 'dumbbell' | 'diamond' | 'sparkles' | 'trophy' | 'target' | 'star';
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export type ActiveTab = 'timer' | 'calendar' | 'stats' | 'awards' | 'profile';

export type ScreenFlow = 'main' | 'landing' | 'goal' | 'plan' | 'setup';
