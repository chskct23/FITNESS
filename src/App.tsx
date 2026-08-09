import React, { useState, useEffect } from 'react';
import { UserProfile, FastRecord, ActiveTab, ScreenFlow, FastingRatio } from './types';
import { INITIAL_PROFILE, INITIAL_FAST_RECORDS } from './data/initialState';
import { INITIAL_AWARDS } from './data/awards';
import { FASTING_PLANS } from './data/plans';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { TimerView } from './components/TimerView';
import { CalendarView } from './components/CalendarView';
import { StatsView } from './components/StatsView';
import { AwardsView } from './components/AwardsView';
import { ProfileView } from './components/ProfileView';

import { LandingScreen } from './components/LandingScreen';
import { GoalSelectionScreen } from './components/GoalSelectionScreen';
import { PlanSelectionScreen } from './components/PlanSelectionScreen';
import { SetupProfileScreen } from './components/SetupProfileScreen';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  // Screen Flow & Navigation
  const [screenFlow, setScreenFlow] = useState<ScreenFlow>('landing');
  const [activeTab, setActiveTab] = useState<ActiveTab>('timer');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Persistent User Profile
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('kf_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  // Persistent Fast Records
  const [records, setRecords] = useState<FastRecord[]>(() => {
    const saved = localStorage.getItem('kf_records');
    return saved ? JSON.parse(saved) : INITIAL_FAST_RECORDS;
  });

  // Persistent Awards
  const [awards, setAwards] = useState(() => {
    const saved = localStorage.getItem('kf_awards');
    return saved ? JSON.parse(saved) : INITIAL_AWARDS;
  });

  // Live Timer State
  const [isFasting, setIsFasting] = useState<boolean>(() => {
    const saved = localStorage.getItem('kf_is_fasting');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [fastStartTime, setFastStartTime] = useState<number>(() => {
    const saved = localStorage.getItem('kf_fast_start_time');
    // Default: started 12h 14m 32s ago to match screenshot!
    const defaultStart = Date.now() - (12 * 3600 + 14 * 60 + 32) * 1000;
    return saved ? JSON.parse(saved) : defaultStart;
  });

  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Calculate target duration in seconds for selected plan
  const currentPlan = FASTING_PLANS.find((p) => p.ratio === profile.planRatio) || FASTING_PLANS[2];
  const targetSeconds = currentPlan.fastingHours * 3600;

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('kf_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('kf_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('kf_awards', JSON.stringify(awards));
  }, [awards]);

  useEffect(() => {
    localStorage.setItem('kf_is_fasting', JSON.stringify(isFasting));
  }, [isFasting]);

  useEffect(() => {
    localStorage.setItem('kf_fast_start_time', JSON.stringify(fastStartTime));
  }, [fastStartTime]);

  // Live Interval Ticker
  useEffect(() => {
    if (!isFasting) {
      setElapsedSeconds(0);
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const seconds = Math.max(0, Math.floor((now - fastStartTime) / 1000));
      setElapsedSeconds(seconds);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isFasting, fastStartTime]);

  // Actions
  const handleStartFast = () => {
    const now = Date.now();
    setFastStartTime(now);
    setIsFasting(true);
  };

  const handleEndFast = () => {
    setIsFasting(false);

    // Save completed record
    const todayStr = new Date().toISOString().split('T')[0];
    const newRecord: FastRecord = {
      id: `fast-${Date.now()}`,
      date: todayStr,
      ratio: profile.planRatio,
      elapsedSeconds,
      targetSeconds,
      startTime: new Date(fastStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      endTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: elapsedSeconds >= targetSeconds ? 'DONE' : 'PARTIAL',
    };

    const newRecords = [newRecord, ...records];
    setRecords(newRecords);

    // Update profile stats
    const addedHours = Math.round(elapsedSeconds / 3600);
    setProfile((prev) => ({
      ...prev,
      totalHours: prev.totalHours + addedHours,
      fastsDone: prev.fastsDone + 1,
    }));
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to default settings?')) {
      localStorage.clear();
      setProfile(INITIAL_PROFILE);
      setRecords(INITIAL_FAST_RECORDS);
      setAwards(INITIAL_AWARDS);
      setIsFasting(true);
      setFastStartTime(Date.now() - (12 * 3600 + 14 * 60 + 32) * 1000);
      setIsSettingsOpen(false);
      setScreenFlow('main');
      setActiveTab('timer');
    }
  };

  // Render Full Screen Flow (Onboarding / Setup / Flow)
  if (screenFlow === 'landing') {
    return (
      <LandingScreen
        onGetStarted={() => setScreenFlow('goal')}
        onSignIn={() => setScreenFlow('main')}
      />
    );
  }

  if (screenFlow === 'goal') {
    return (
      <GoalSelectionScreen
        selectedGoalId={profile.goalId}
        onBack={() => setScreenFlow('main')}
        onContinue={(goalId) => {
          setProfile((prev) => ({ ...prev, goalId }));
          setScreenFlow('plan');
        }}
      />
    );
  }

  if (screenFlow === 'plan') {
    return (
      <PlanSelectionScreen
        currentPlanRatio={profile.planRatio}
        onBack={() => setScreenFlow('goal')}
        onSetPlan={(planRatio) => {
          setProfile((prev) => ({ ...prev, planRatio }));
          setScreenFlow('setup');
        }}
      />
    );
  }

  if (screenFlow === 'setup') {
    return (
      <SetupProfileScreen
        profile={profile}
        onBack={() => setScreenFlow('plan')}
        onSave={(updated) => {
          setProfile((prev) => ({ ...prev, ...updated }));
          setScreenFlow('main');
          setActiveTab('timer');
        }}
      />
    );
  }

  // Header Titles based on Active Tab
  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'calendar':
        return 'Calendar';
      case 'stats':
        return 'Stats & Progress';
      case 'awards':
        return 'Awards';
      case 'profile':
        return 'Profile';
      case 'timer':
      default:
        return undefined;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0D0D0D] text-[#e5e2e1] flex flex-col font-sans max-w-md mx-auto relative border-x border-white/5 shadow-2xl">
      {/* Top Header */}
      <Header
        profile={profile}
        title={getHeaderTitle()}
        showGreeting={activeTab === 'timer'}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onAvatarClick={() => setActiveTab('profile')}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {activeTab === 'timer' && (
          <TimerView
            profile={profile}
            isFasting={isFasting}
            elapsedSeconds={elapsedSeconds}
            targetSeconds={targetSeconds}
            onStartFast={handleStartFast}
            onEndFast={handleEndFast}
            onEditFast={() => setScreenFlow('plan')}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView profile={profile} records={records} />
        )}

        {activeTab === 'stats' && <StatsView profile={profile} />}

        {activeTab === 'awards' && <AwardsView awards={awards} />}

        {activeTab === 'profile' && (
          <ProfileView
            profile={profile}
            onChangePlan={() => setScreenFlow('plan')}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onEditProfileField={() => setScreenFlow('setup')}
            onLogout={() => setScreenFlow('landing')}
          />
        )}
      </main>

      {/* Bottom Fixed Navigation Bar */}
      <Navigation activeTab={activeTab} onSelectTab={(tab) => setActiveTab(tab)} />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        profile={profile}
        onClose={() => setIsSettingsOpen(false)}
        onSaveProfile={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
        onResetData={handleResetData}
      />
    </div>
  );
}
