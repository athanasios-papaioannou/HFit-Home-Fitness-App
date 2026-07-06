/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, Workout, WorkoutHistoryEntry, WeeklyStreak, AppTheme, WorkoutDuration } from './types';
import { generateWorkoutForUser } from './workoutsData';
import { THEME_MAP } from './themeStore';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import WorkoutSession from './components/WorkoutSession';
import CongratsScreen from './components/CongratsScreen';
import { Language, UI_TRANSLATIONS } from './i18n';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<WorkoutHistoryEntry[]>([]);
  const [activeScreen, setActiveScreen] = useState<'loading' | 'onboarding' | 'dashboard' | 'session' | 'congrats'>('loading');
  const [todayWorkout, setTodayWorkout] = useState<Workout | null>(null);
  const [lastWorkoutMinutes, setLastWorkoutMinutes] = useState<number>(0);
  const [activeTheme, setActiveTheme] = useState<AppTheme>(AppTheme.DEEP_SLATE);
  const [focusCategory, setFocusCategory] = useState<'strength' | 'cardio' | 'core' | 'combo'>('combo');
  const [bodyPart, setBodyPart] = useState<'all' | 'chest' | 'back' | 'arms' | 'legs'>('all');
  const [excludeBodyweight, setExcludeBodyweight] = useState<boolean>(false);
  const [sessionDuration, setSessionDuration] = useState<WorkoutDuration>(30);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'recalibrate' | 'abandon' | null;
    onConfirm: () => void;
  }>({
    isOpen: false,
    type: null,
    onConfirm: () => {},
  });

  // 1. Initial hydration on mount
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('hfit_user_profile');
      const storedHistory = localStorage.getItem('hfit_workout_history');
      const storedLang = localStorage.getItem('hfit_lang') as Language;

      if (storedLang === 'el' || storedLang === 'en') {
        setLanguage(storedLang);
      }

      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile) as UserProfile;
        setProfile(parsedProfile);
        setSessionDuration(parsedProfile.duration || 30);
        
        // Load stored theme if available
        if (parsedProfile.theme) {
          setActiveTheme(parsedProfile.theme);
        } else {
          setActiveTheme(AppTheme.DEEP_SLATE);
        }
        
        setActiveScreen('dashboard');
      } else {
        setActiveScreen('onboarding');
      }

      if (storedHistory) {
        setHistory(JSON.parse(storedHistory) as WorkoutHistoryEntry[]);
      }
    } catch (e) {
      console.error('Error hydrating state from local storage:', e);
      setActiveScreen('onboarding');
    }
  }, []);

  const handleLanguageToggle = () => {
    const nextLang = language === 'en' ? 'el' : 'en';
    setLanguage(nextLang);
    localStorage.setItem('hfit_lang', nextLang);
  };

  // Synchronize dynamic document lang attribute to ensure correct browser-level Greek capitalization rules
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Scroll to top of window smoothly on screen change (especially relevant for mobile/tablets)
  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    handleScroll();
    const t = setTimeout(handleScroll, 100);
    return () => clearTimeout(t);
  }, [activeScreen]);

  // Regenerate workout when profile, focusCategory, bodyPart, excludeBodyweight or sessionDuration changes
  useEffect(() => {
    if (profile) {
      const weekdayOffset = new Date().getDay();
      const generated = generateWorkoutForUser(
        profile.equipment,
        sessionDuration,
        profile.level,
        weekdayOffset,
        focusCategory,
        bodyPart,
        excludeBodyweight
      );
      setTodayWorkout(generated);
    }
  }, [profile, focusCategory, bodyPart, excludeBodyweight, sessionDuration]);

  // 2. Handle onboarding completed
  const handleOnboardingComplete = (newProfile: UserProfile) => {
    // Preserve current theme if selected during onboarding, otherwise default
    const finalProfile = { ...newProfile, theme: activeTheme };
    setProfile(finalProfile);
    setSessionDuration(finalProfile.duration || 30);
    localStorage.setItem('hfit_user_profile', JSON.stringify(finalProfile));
    setActiveScreen('dashboard');
  };

  // 2.5 Handle theme change
  const handleThemeChange = (newTheme: AppTheme) => {
    setActiveTheme(newTheme);
    if (profile) {
      const updatedProfile = { ...profile, theme: newTheme };
      setProfile(updatedProfile);
      localStorage.setItem('hfit_user_profile', JSON.stringify(updatedProfile));
    }
  };

  const handleDurationChange = (newDuration: WorkoutDuration) => {
    setSessionDuration(newDuration);
    if (profile) {
      const updatedProfile = { ...profile, duration: newDuration };
      setProfile(updatedProfile);
      localStorage.setItem('hfit_user_profile', JSON.stringify(updatedProfile));
    }
  };

  // 3. Reset profile and history safely
  const handleResetProfile = () => {
    setConfirmModal({
      isOpen: true,
      type: 'recalibrate',
      onConfirm: () => {
        setProfile(null);
        localStorage.removeItem('hfit_user_profile');
        setActiveScreen('onboarding');
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // 4. Record workout completion
  const handleCompleteWorkout = (elapsedMinutes: number) => {
    if (!todayWorkout) return;

    const todayDateStr = new Date().toISOString().split('T')[0];
    const newEntry: WorkoutHistoryEntry = {
      id: `history_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      date: todayDateStr,
      workoutId: todayWorkout.id,
      workoutName: todayWorkout.name,
      completedAt: new Date().toISOString(),
      durationSpent: elapsedMinutes,
    };

    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);
    localStorage.setItem('hfit_workout_history', JSON.stringify(updatedHistory));

    setLastWorkoutMinutes(elapsedMinutes);
    setActiveScreen('congrats');
  };

  // Calculate current weekly streak indicator (Mon-Sun)
  const computeCurrentWeekDays = (): WeeklyStreak => {
    const weeklyStatus: WeeklyStreak = {
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    };

    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sun, 1 is Mon...
    // Adjust Sunday to index 7 to make Monday index 1
    const normalizedIndex = currentDay === 0 ? 7 : currentDay;

    // Calculate current week's Monday
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (normalizedIndex - 1));
    startOfWeek.setHours(0, 0, 0, 0);

    // Calculate current week's Sunday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Find all completions this week
    const currentWeekEntries = history.filter(entry => {
      const entryTime = new Date(entry.completedAt);
      return entryTime >= startOfWeek && entryTime <= endOfWeek;
    });

    currentWeekEntries.forEach(entry => {
      const entryTime = new Date(entry.completedAt);
      // 'en-US' standard translation for day codes ('mon', 'tue' etc.)
      const weekdayStr = entryTime.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
      if (weekdayStr in weeklyStatus) {
        weeklyStatus[weekdayStr as keyof WeeklyStreak] = true;
      }
    });

    return weeklyStatus;
  };

  // Calculate current consecutive days count
  const computeConsecutiveStreakCount = (): number => {
    if (history.length === 0) return 0;

    const uniqueDates = Array.from(new Set(history.map(entry => entry.date))).sort();
    if (uniqueDates.length === 0) return 0;

    const todayStr = new Date().toISOString().split('T')[0];
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    const lastCompletedDate = uniqueDates[uniqueDates.length - 1];

    // If the latest log isn't today or yesterday, streak is broken
    if (lastCompletedDate !== todayStr && lastCompletedDate !== yesterdayStr) {
      return 0;
    }

    let streak = 0;
    let target = lastCompletedDate;

    while (uniqueDates.includes(target)) {
      streak++;
      // Determine calendar date string of preceding day
      const targetDate = new Date(target);
      targetDate.setDate(targetDate.getDate() - 1);
      target = targetDate.toISOString().split('T')[0];
    }

    return streak;
  };

  const styles = THEME_MAP[activeTheme];

  const modalTitle = confirmModal.type === 'recalibrate'
    ? UI_TRANSLATIONS[language].confirm_recalibrate_title
    : UI_TRANSLATIONS[language].confirm_abandon_title;

  const modalMessage = confirmModal.type === 'recalibrate'
    ? UI_TRANSLATIONS[language].confirm_recalibrate_msg
    : UI_TRANSLATIONS[language].confirm_abandon_msg;

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-500 ${styles.bg} ${styles.selection}`}>
      
      {/* APP SCREEN CONTAINER VIEW CONSOLE */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeScreen === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex items-center justify-center font-sans"
            >
              <div className="text-center space-y-4">
                <div className="text-2xl font-black text-white tracking-widest animate-pulse font-display">H:FIT</div>
                <p className="text-slate-500 text-xs tracking-wider uppercase">
                  {language === 'el' ? 'Φόρτωση Περιβάλλοντος...' : 'Loading Sandbox Environment...'}
                </p>
              </div>
            </motion.div>
          )}

          {activeScreen === 'onboarding' && (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Onboarding 
                onComplete={handleOnboardingComplete} 
                language={language}
                onLanguageToggle={handleLanguageToggle}
              />
            </motion.div>
          )}

          {activeScreen === 'dashboard' && profile && todayWorkout && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard
                profile={profile}
                todayWorkout={todayWorkout}
                history={history}
                streak={computeCurrentWeekDays()}
                activeTheme={activeTheme}
                themeStyles={styles}
                onThemeChange={handleThemeChange}
                onStartWorkout={() => setActiveScreen('session')}
                onResetOnboarding={handleResetProfile}
                focusCategory={focusCategory}
                onFocusCategoryChange={setFocusCategory}
                bodyPart={bodyPart}
                onBodyPartChange={setBodyPart}
                excludeBodyweight={excludeBodyweight}
                onExcludeBodyweightChange={setExcludeBodyweight}
                sessionDuration={sessionDuration}
                onDurationChange={handleDurationChange}
                language={language}
                onLanguageToggle={handleLanguageToggle}
              />
            </motion.div>
          )}

          {activeScreen === 'session' && todayWorkout && profile && (
            <motion.div
              key="session"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <WorkoutSession
                profile={profile}
                workout={todayWorkout}
                themeStyles={styles}
                onCompleteWorkout={handleCompleteWorkout}
                language={language}
                onLanguageToggle={handleLanguageToggle}
                onCancelWorkout={() => {
                  setConfirmModal({
                    isOpen: true,
                    type: 'abandon',
                    onConfirm: () => {
                      setActiveScreen('dashboard');
                      setConfirmModal(prev => ({ ...prev, isOpen: false }));
                    }
                  });
                }}
              />
            </motion.div>
          )}

          {activeScreen === 'congrats' && todayWorkout && (
            <motion.div
              key="congrats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CongratsScreen
                workout={todayWorkout}
                durationSpent={lastWorkoutMinutes}
                newStreakCount={computeConsecutiveStreakCount()}
                themeStyles={styles}
                language={language}
                onLanguageToggle={handleLanguageToggle}
                onReturn={() => {
                  setFocusCategory('combo');
                  setBodyPart('all');
                  setActiveScreen('dashboard');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER METRICS SYSTEM BRANDING */}
      <footer className={`py-4 border-t ${styles.border} bg-[#060a12]/40 text-center font-sans text-[10px] ${styles.subtleText} relative select-none`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        <div className="relative font-bold leading-normal">
          {language === 'el' 
            ? <>H:FIT Κονσόλα Προπόνησης v1.0.4 • Ασφαλής τοπική εκτέλεση <br/> Σχεδιάστηκε & αναπτύχθηκε από τον Αθανάσιο Παπαϊωάννου</>
            : <>H:FIT Workout Console v1.0.4 • Secure offline execution <br/> Designed & built by Athanasios Papaioannou</>
          }
        </div>
      </footer>

      {/* CUSTOM THEMED CONFIRMATION MODAL */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
              className="absolute inset-0 bg-black/75 backdrop-blur-xs cursor-pointer"
            />
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className={`relative w-full max-w-sm ${styles.cardBg} border ${styles.border} p-6 rounded-2xl shadow-2xl space-y-4`}
            >
              <div className="space-y-2">
                <h3 className={`text-base font-bold ${styles.highContrastText} font-display tracking-tight`}>
                  {modalTitle}
                </h3>
                <p className={`text-xs ${styles.subtleText} leading-relaxed font-sans`}>
                  {modalMessage}
                </p>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 font-sans text-xs">
                <button
                  onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                  className={`px-4 py-2.5 rounded-xl border ${styles.pillBg} cursor-pointer transition-colors hover:text-white`}
                >
                  {UI_TRANSLATIONS[language].modal_cancel}
                </button>
                <button
                  onClick={() => {
                    confirmModal.onConfirm();
                  }}
                  className={`px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer transition-all shadow-lg active:scale-95`}
                >
                  {UI_TRANSLATIONS[language].modal_confirm}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

