/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { UserProfile, Workout, WorkoutHistoryEntry, WeeklyStreak, AppTheme, Equipment, WorkoutDuration } from '../types';
import { ThemeStyles } from '../themeStore';
import { 
  Flame, 
  Calendar, 
  Clock, 
  Settings, 
  Sparkles, 
  TrendingUp, 
  Trophy, 
  ArrowRight, 
  History,
  Dumbbell,
  CheckCircle,
  HelpCircle,
  Timer
} from 'lucide-react';
import { 
  Language, 
  UI_TRANSLATIONS, 
  FITNESS_LEVEL_TRANSLATION, 
  EQUIPMENT_TRANSLATION, 
  CATEGORY_TRANSLATION, 
  BODYPART_TRANSLATION, 
  EXERCISE_TRANSLATIONS 
} from '../i18n';

interface DashboardProps {
  profile: UserProfile;
  todayWorkout: Workout;
  history: WorkoutHistoryEntry[];
  streak: WeeklyStreak;
  activeTheme: AppTheme;
  themeStyles: ThemeStyles;
  onThemeChange: (theme: AppTheme) => void;
  onStartWorkout: () => void;
  onResetOnboarding: () => void;
  focusCategory: 'strength' | 'cardio' | 'core' | 'combo';
  onFocusCategoryChange: (cat: 'strength' | 'cardio' | 'core' | 'combo') => void;
  bodyPart: 'all' | 'chest' | 'back' | 'arms' | 'legs';
  onBodyPartChange: (part: 'all' | 'chest' | 'back' | 'arms' | 'legs') => void;
  excludeBodyweight: boolean;
  onExcludeBodyweightChange: (excl: boolean) => void;
  sessionDuration: WorkoutDuration;
  onDurationChange: (dur: WorkoutDuration) => void;
  language: Language;
  onLanguageToggle: () => void;
}

const translateWorkoutName = (name: string, lang: Language): string => {
  if (lang === 'en') return name;
  let translated = name;
  translated = translated.replace('Strength Specialist', 'Ειδικός Δύναμης');
  translated = translated.replace('Metabolic Cardio Burn', 'Μεταβολικό Κάρδιο');
  translated = translated.replace('Core Sculptor', 'Ενδυνάμωση Κορμού');
  translated = translated.replace('Hybrid Athlete Mix', 'Υβριδική Μικτή Προπόνηση');
  translated = translated.replace('Gym Gear Power Blast', 'Προπόνηση Ισχύος με Όργανα');
  translated = translated.replace('Home Bodyweight Warrior', 'Προπόνηση Σωματικού Βάρους');
  translated = translated.replace('BEGINNER', 'ΑΡΧΑΡΙΟΣ');
  translated = translated.replace('INTERMEDIATE', 'ΜΕΣΑΙΟΣ');
  translated = translated.replace('ADVANCED', 'ΠΡΟΧΩΡΗΜΕΝΟΣ');
  return translated;
};

const translateWorkoutDesc = (desc: string, lang: Language): string => {
  if (lang === 'en') return desc;
  let translated = desc;
  translated = translated.replace('Dumbbells and resistance gear mixed with bodyweight flows to build robust strength muscles.', 'Αλτήρες, λάστιχα αντίστασης και ασκήσεις σωματικού βάρους για μέγιστη ενδυνάμωση.');
  translated = translated.replace('Sweat-inducing cardio and endurance moves to elevate heart rate and maximize burning.', 'Ασκήσεις αντοχής και ταχύτητας για αύξηση των καρδιακών παλμών και μέγιστη καύση.');
  translated = translated.replace('Target your lats, upper back and arms for complete pull-strength development.', 'Στόχευση στους πλατείς ραχιαίους, την πλάτη και τα χέρια για έλξεις και δύναμη.');
  translated = translated.replace('Harnessing dumbbell movements paired with bodyweight push fundamentals.', 'Κινήσεις αλτήρων σε συνδυασμό με βασικές πιέσεις σωματικού βάρους.');
  translated = translated.replace('Pumping biceps, triceps, and shoulders with weights and bands.', 'Ενδυνάμωση και διέγερση δικεφάλων, τρικεφάλων και ώμων με βάρη και λάστιχα.');
  translated = translated.replace('Building quads, hamstrings, and calves using weights and high workload.', 'Ενδυνάμωση τετρακεφάλων, μηριαίων δικεφάλων και γαμπών με βάρη.');
  translated = translated.replace('Focusing entirely on bodyweight movements of chest, back, and arms.', 'Εστίαση αποκλειστικά σε ασκήσεις σωματικού βάρους για στήθος, πλάτη και χέρια.');
  translated = translated.replace('Core power, resistance rotation, and stabilization drill setup.', 'Δύναμη κορμού, στροφές με αντίσταση και ασκήσεις σταθεροποίησης.');
  translated = translated.replace('Targeting your pectorals, shoulders, and triceps with focused pressing patterns.', 'Στόχευση στους θωρακικούς, τους ώμους και τους τρικεφάλους.');
  translated = translated.replace('A balanced hybrid mix challenging strength, cardio engines, and core control.', 'Ένα ισορροπημένο υβριδικό μίγμα που προκαλεί τη δύναμη, την αντοχή και τον κορμό.');
  return translated;
};

export default function Dashboard({
  profile,
  todayWorkout,
  history,
  streak,
  activeTheme,
  themeStyles,
  onThemeChange,
  onStartWorkout,
  onResetOnboarding,
  focusCategory,
  onFocusCategoryChange,
  bodyPart,
  onBodyPartChange,
  excludeBodyweight,
  onExcludeBodyweightChange,
  sessionDuration,
  onDurationChange,
  language,
  onLanguageToggle,
}: DashboardProps) {
  // Calculate historical stats
  const totalCompleted = history.length;
  const totalMinutes = history.reduce((acc, curr) => acc + curr.durationSpent, 0);
  const averageMinutes = totalCompleted > 0 ? Math.round(totalMinutes / totalCompleted) : 0;

  const currentStreak = calculateStreak(history);

  // Circular gauge definitions
  const gradientMap = {
    emerald: { start: '#005f96', end: '#29a0e6' },
    amber: { start: '#d97706', end: '#fbbf24' },
    fuchsia: { start: '#c084fc', end: '#f472b6' },
    indigo: { start: '#4f46e5', end: '#818cf8' },
  };

  const activeColor = (themeStyles.accentColor || 'emerald') as 'emerald' | 'amber' | 'fuchsia' | 'indigo';
  const colors = gradientMap[activeColor] || gradientMap.emerald;

  const progressRatio = Math.min(currentStreak, 7) / 7;
  const strokeLength = 314.16;
  const strokeOffset = strokeLength - (progressRatio * strokeLength);

  const hasRealEquipment = profile.equipment.length > 0 &&
    !(profile.equipment.length === 1 && profile.equipment[0] === Equipment.BODYWEIGHT);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 selection:bg-[#0075ba]/30 selection:text-white">
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-slate-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-6 relative" id="dashboard-container">
        
        {/* TOP STATUS HEADER BAR */}
        <header className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b ${themeStyles.border} text-xs transition-colors duration-300`}>
          <div className="flex items-center gap-3">
            <div className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] aspect-square rounded-full bg-[#152439] border border-[#0075ba]/30 flex items-center justify-center font-display font-extrabold text-2xl leading-none tracking-tight shrink-0">
              <span className="text-white">H</span>
              <span className="text-[#0075ba] mx-[1px]">:</span>
              <span className="text-white">F</span>
            </div>
            <div>
              <h1 className={`text-lg font-bold ${themeStyles.highContrastText} tracking-tight font-display`}>H<span className="text-[#0075ba]">:</span>Fit {UI_TRANSLATIONS[language].dashboard_title}</h1>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className={`${themeStyles.pillBg} px-2 py-0.5 rounded uppercase text-[10px] font-semibold`}>
                  {UI_TRANSLATIONS[language].lvl}: {FITNESS_LEVEL_TRANSLATION[language][profile.level]}
                </span>
                <span className={`${themeStyles.pillBg} px-2 py-0.5 rounded uppercase text-[10px] font-semibold`}>
                  {UI_TRANSLATIONS[language].t_min}: {sessionDuration}M
                </span>
                <span className={`${themeStyles.pillBg} px-2 py-0.5 rounded uppercase text-[10px] font-semibold`}>
                  {UI_TRANSLATIONS[language].mode}: {hasRealEquipment ? UI_TRANSLATIONS[language].equipped : UI_TRANSLATIONS[language].bodyweight_only}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto mt-2 md:mt-0">
            {/* Language switch */}
            <button
              onClick={onLanguageToggle}
              id="language-switcher-btn"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border ${themeStyles.border} bg-[#152439]/75 text-[#29a0e6] font-bold tracking-tight transition-colors cursor-pointer text-xs font-display hover:text-white filter drop-shadow-sm`}
            >
              {UI_TRANSLATIONS[language].lang_btn}
            </button>

            {/* Recalibrate */}
            <button
              onClick={onResetOnboarding}
              id="recalibrate-program-btn"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border ${themeStyles.pillBg} transition-colors cursor-pointer text-xs font-bold`}
            >
              <Settings className="w-3.5 h-3.5" />
              {UI_TRANSLATIONS[language].recalibrate_btn}
            </button>
          </div>
        </header>

        {/* TWO COLUMN GRID BENTO OUTLINE */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* TODAY'S MISSION CARD (COLLAPSES INTO MAIN FOCUS) */}
          <section className="md:col-span-8 space-y-4">
            <div className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.border} p-6 relative overflow-hidden flex flex-col justify-between min-h-[380px] transition-all duration-300 shadow-sm`} id="today-routine-pane">
              {/* Glow backdrop color maps to theme highlight */}
              <div className="absolute inset-0 bg-radial-[ellipse_at_top_right,var(--tw-gradient-stops)] from-transparent via-transparent to-transparent opacity-20 pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded tracking-wider text-[10px] uppercase text-[#90a1b9] bg-[#121a2d] border-none font-semibold">
                    <Sparkles className="w-3 h-3 text-[#29a0e6]" />
                    {UI_TRANSLATIONS[language].today_workout}
                  </div>
                  <div className={`flex items-center gap-1 ${themeStyles.subtleText} text-xs font-semibold`}>
                    <Clock className="w-3.5 h-3.5" />
                    {todayWorkout.duration} {UI_TRANSLATIONS[language].duration_label}
                  </div>
                </div>

                {/* DAILY MISSION FOCUS SELECTOR */}
                <div className="mb-6 p-4 bg-[#152439] border border-slate-800/60 rounded-xl space-y-3" id="daily-focus-selector-panel">
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                    <span className={`w-1.5 h-1.5 rounded-full ${themeStyles.accentBg} animate-pulse`} />
                    {UI_TRANSLATIONS[language].target_focus}
                  </div>

                  {/* Focus Categories Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-display">
                    {[
                      { id: 'combo', laEl: CATEGORY_TRANSLATION[language].combo, laEn: CATEGORY_TRANSLATION[language].combo_sub },
                      { id: 'strength', laEl: CATEGORY_TRANSLATION[language].strength, laEn: CATEGORY_TRANSLATION[language].strength_sub },
                      { id: 'cardio', laEl: CATEGORY_TRANSLATION[language].cardio, laEn: CATEGORY_TRANSLATION[language].cardio_sub },
                      { id: 'core', laEl: CATEGORY_TRANSLATION[language].core, laEn: CATEGORY_TRANSLATION[language].core_sub },
                    ].map((btn) => {
                      const active = focusCategory === btn.id;
                      return (
                        <button
                          key={btn.id}
                          type="button"
                          onClick={() => {
                            onFocusCategoryChange(btn.id as any);
                            if (btn.id !== 'strength') {
                              onBodyPartChange('all');
                            }
                          }}
                          className={`py-2 px-3 rounded-lg border text-xs transition-all text-center cursor-pointer ${
                            active
                              ? 'bg-[#0075ba] border-[#0075ba] text-white font-bold shadow-sm'
                              : 'bg-[#142036] border-slate-800/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                          }`}
                        >
                          <div className="daily-focus-label text-[13px] leading-tight font-extrabold">{btn.laEl}</div>
                          <div className="text-[10px] opacity-60 font-sans tracking-wide leading-none mt-1">{btn.laEn}</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Body Part Sub-Selection (Only visible if focusCategory is strength) */}
                  {focusCategory === 'strength' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pt-3 border-t border-slate-800/50 space-y-2"
                    >
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        {UI_TRANSLATIONS[language].target_muscle_group}
                      </div>
                      <div className="grid grid-cols-1 gap-1.5">
                        {[
                          { id: 'all', laEl: BODYPART_TRANSLATION[language].all, laEn: BODYPART_TRANSLATION[language].all_sub },
                          { id: 'chest', laEl: BODYPART_TRANSLATION[language].chest, laEn: BODYPART_TRANSLATION[language].chest_sub },
                          { id: 'back', laEl: BODYPART_TRANSLATION[language].back, laEn: BODYPART_TRANSLATION[language].back_sub },
                          { id: 'arms', laEl: BODYPART_TRANSLATION[language].arms, laEn: BODYPART_TRANSLATION[language].arms_sub },
                          { id: 'legs', laEl: BODYPART_TRANSLATION[language].legs, laEn: BODYPART_TRANSLATION[language].legs_sub },
                        ].map((part) => {
                          const active = bodyPart === part.id;
                          return (
                            <button
                              key={part.id}
                              type="button;onClick"
                              onClick={() => onBodyPartChange(part.id as any)}
                              className={`flex items-center justify-between py-2.5 px-3.5 rounded-lg border text-xs transition-all cursor-pointer ${
                                active
                                  ? 'bg-[#0075ba] border-[#0075ba]/80 text-white font-bold'
                                  : 'bg-[#142036] border-slate-800/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                              }`}
                            >
                              <span>
                                {part.laEl} <span className="opacity-60 text-[10px] font-sans">({part.laEn})</span>
                              </span>
                              {active && (
                                <span className={`w-1.5 h-1.5 rounded-full bg-white`} />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Daily Duration Selector */}
                  <div className="pt-3 border-t border-slate-800/50 space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                      <Timer className="w-3.5 h-3.5 text-[#29a0e6] shrink-0" />
                      {UI_TRANSLATIONS[language].workout_duration}
                    </div>
                    
                    <div className="grid grid-cols-5 gap-1.5" id="daily-duration-select-grid">
                      {([10, 20, 30, 45, 60] as WorkoutDuration[]).map((v) => {
                        const active = sessionDuration === v;
                        return (
                          <button
                            key={v}
                            type="button"
                            id={`daily-duration-btn-${v}`}
                            onClick={() => onDurationChange(v)}
                            className={`py-1.5 sm:py-2 rounded-lg border text-xs transition-all text-center cursor-pointer ${
                              active
                                ? 'bg-[#0075ba] border-[#0075ba] text-white font-extrabold shadow-sm'
                                : 'bg-[#142036] border-slate-800/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                            }`}
                          >
                            <span className="text-xs">{v}</span>
                            <span className="text-[10px] opacity-60 font-sans tracking-tight ml-0.5">m</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Equipment Exclusions option (Only available if the user profile actually has real equipment configured) */}
                  {hasRealEquipment && (
                    <div className="pt-3 mt-2 border-t border-slate-800/55 flex items-start gap-3 select-none" id="gear-only-toggle-wrapper">
                      <label className="flex items-center gap-2.5 cursor-pointer mt-1">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={excludeBodyweight}
                            onChange={(e) => onExcludeBodyweightChange(e.target.checked)}
                          />
                          <div className="w-8 h-4.5 bg-[#142036] border border-[#0075ba] rounded-full peer peer-focus:ring-2 peer-focus:ring-[#0075ba]/20 peer-checked:after:translate-x-3.5 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-slate-500 peer-checked:after:bg-[#29a0e6] after:rounded-full after:h-2.5 after:w-2.5 after:shadow-none after:transition-all peer-checked:bg-[#0075ba]/30 peer-checked:border-[#0075ba]/40 transition-colors" />
                        </div>
                      </label>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-slate-200 block">
                          {UI_TRANSLATIONS[language].exclude_bodyweight_label}
                        </span>
                        <span className="text-[10px] text-slate-500 block leading-normal mt-0.5">
                          {UI_TRANSLATIONS[language].exclude_bodyweight_desc}
                        </span>
                        {/* List of active equipment choices */}
                        <div className="mt-2.5 space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 block">
                            {UI_TRANSLATIONS[language].your_gear_label}
                          </span>
                          <div className="flex flex-wrap gap-1 md:gap-1.5 pt-0.5" id="selected-gears-badges-list">
                            {profile.equipment
                              .filter(eq => eq !== Equipment.BODYWEIGHT)
                              .map((eq) => {
                                return (
                                  <span
                                    key={eq}
                                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#142036] border border-slate-800/60 text-[9px] font-semibold text-[#29a0e6]"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-[#29a0e6]" />
                                    {EQUIPMENT_TRANSLATION[language][eq] || eq}
                                  </span>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {!todayWorkout.exercises || todayWorkout.exercises.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-500">
                    {UI_TRANSLATIONS[language].no_workouts_avail}
                  </div>
                ) : (
                  <>
                    <h2 className={`text-2xl font-black ${themeStyles.highContrastText} tracking-tight font-display mb-2 flex flex-wrap items-center gap-1.5`} id="workout-hdr-title">
                      {(() => {
                        const match = todayWorkout.name.match(/(.*?)\s*\[(.*?)\]$/);
                        if (match) {
                          const [_, baseName, levelText] = match;
                          const mappedLvl = levelText.toUpperCase() === 'PRO' 
                            ? (language === 'el' ? 'ΜΕΣΑΙΟ' : 'Pro') 
                            : levelText.toUpperCase() === 'ELITE' 
                              ? (language === 'el' ? 'ΚΟΡΥΦΗ' : 'Elite') 
                              : (language === 'el' ? 'ΑΡΧΑΡΙΟΣ' : 'Base');
                          return (
                            <>
                              <span>{translateWorkoutName(baseName, language)}</span>
                              <span className="inline-flex items-center justify-center px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[#0075ba]/10 border border-[#0075ba]/25 text-[#29a0e6] rounded">
                                {mappedLvl}
                              </span>
                            </>
                          );
                        }
                        return translateWorkoutName(todayWorkout.name, language);
                      })()}
                    </h2>
                    <p className={`${themeStyles.subtleText} text-xs sm:text-sm leading-relaxed mb-6`}>
                      {translateWorkoutDesc(todayWorkout.description, language)}
                    </p>

                    <div className="space-y-3">
                      <h3 className={`text-[10px] ${themeStyles.subtleText} uppercase tracking-widest opacity-85 font-extrabold`}>
                        {language === 'el' ? 'ΣΕΙΡΑ ΑΣΚΗΣΕΩΝ' : 'EXERCISE PIPELINE'} ({todayWorkout.exercises.length} {language === 'el' ? 'Ασκήσεις' : 'Exercises'})
                      </h3>
                      <div className="flex flex-col gap-2" id="routine-exercises-overview">
                        {todayWorkout.exercises.map((ex, index) => {
                          const translatedInfo = EXERCISE_TRANSLATIONS[language]?.[ex.id] || { name: ex.name };
                          const clearReps = ex.reps.split(' work')[0];
                          const translatedReps = language === 'el' ? clearReps.replace('seconds', 'δευτ.').replace('reps', 'επαν.').replace('per side', 'ανά πλευρά') : clearReps;
                          return (
                            <div 
                              key={ex.id}
                              className={`flex items-center justify-between p-2.5 rounded-lg bg-[#152439] border border-slate-800/50 text-xs text-slate-300 transition-colors gap-4`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`${themeStyles.accentText} font-bold`}>{index + 1}.</span>
                                <span className="text-slate-300 text-opacity-95 font-semibold">{translatedInfo.name}</span>
                              </div>
                              <span className="text-[10px] shrink-0 bg-[#142036] px-2 py-1 rounded text-slate-400 font-semibold border border-slate-800/30 font-mono">
                                {ex.sets} × {translatedReps}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {todayWorkout.exercises && todayWorkout.exercises.length > 0 && (
                <div className="pt-8">
                  <button
                    onClick={onStartWorkout}
                    id="dashboard-start-active-btn"
                    className="w-full py-4 px-6 rounded-xl bg-[#83b900] hover:bg-[#96d200] text-white font-black tracking-wide text-sm flex items-center justify-center gap-3 cursor-pointer shadow-lg hover:opacity-95 transition-all transform hover:scale-[1.01] active:scale-[0.99] font-display"
                  >
                    {UI_TRANSLATIONS[language].start_workout_btn}
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* SIDE PROGRESS & STREAK PANE */}
          <section className="md:col-span-4 space-y-6">
            
            {/* WEEKLY STREAK MODULE */}
            <div className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.border} p-5 space-y-4 transition-colors duration-300`} id="streak-tracker-module">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className={`w-5 h-5 ${currentStreak > 0 ? 'text-orange-500 fill-orange-500/20' : 'text-slate-600'}`} />
                  <h3 className={`text-sm font-extrabold ${themeStyles.highContrastText} tracking-tight`}>
                    {language === 'el' ? 'Σερί Συνέπειας' : 'Consistency Streak'}
                  </h3>
                </div>
                <div className={`text-[10px] ${themeStyles.pillBg} px-2 py-0.5 rounded font-extrabold font-mono`}>
                  {currentStreak} {language === 'el' ? 'ΗΜΕΡΕΣ' : 'DAYS'}
                </div>
              </div>

              {/* Circular Semicircular Gauge */}
              <div className="flex justify-center py-2 relative" id="circular-gauge-wrapper">
                <svg className="w-48 h-36" viewBox="0 0 200 150">
                  <defs>
                    {/* Linear gradient for progress stroke */}
                    <linearGradient id="gauge-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={colors.start} />
                      <stop offset="100%" stopColor={colors.end} />
                    </linearGradient>
                    {/* Glow filter */}
                    <filter id="gauge-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Background Arc (track) */}
                  <path 
                    d="M 35.05 137.5 A 75 75 0 1 1 164.95 137.5" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="11" 
                    strokeLinecap="round" 
                    className="opacity-10 text-slate-400 dark:text-slate-600"
                  />

                  {/* Active Progress Arc */}
                  <motion.path 
                    d="M 35.05 137.5 A 75 75 0 1 1 164.95 137.5" 
                    fill="none" 
                    stroke="url(#gauge-grad)" 
                    strokeWidth="11" 
                    strokeLinecap="round"
                    strokeDasharray={strokeLength}
                    initial={{ strokeDashoffset: strokeLength }}
                    animate={{ strokeDashoffset: strokeOffset }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{ filter: 'url(#gauge-glow)' }}
                  />

                  {/* Text labels inside gauge */}
                  <text 
                    x="100" 
                    y="95" 
                    textAnchor="middle" 
                    className={`font-sans font-black text-4xl fill-current ${themeStyles.highContrastText}`}
                  >
                    {currentStreak}
                  </text>
                  <text 
                    x="100" 
                    y="118" 
                    textAnchor="middle" 
                    className={`text-[9px] tracking-widest uppercase fill-current ${themeStyles.subtleText} opacity-85 font-extrabold`}
                  >
                    {language === 'el' ? 'ημέρες' : 'streak'}
                  </text>
                </svg>
              </div>

              {/* Day capsules */}
              <div className="grid grid-cols-7 gap-1 text-[9px] text-center pt-2 border-t border-slate-800/20" id="weekly-grid-capsules">
                {Object.entries(streak).map(([dayKey, completed]) => {
                  const dayLabels: Record<string, string> = {
                    mon: language === 'el' ? 'ΔΕΥ' : 'MON',
                    tue: language === 'el' ? 'ΤΡΙ' : 'TUE',
                    wed: language === 'el' ? 'ΤΕΤ' : 'WED',
                    thu: language === 'el' ? 'ΠΕΜ' : 'THU',
                    fri: language === 'el' ? 'ΠΑΡ' : 'FRI',
                    sat: language === 'el' ? 'ΣΑΒ' : 'SAT',
                    sun: language === 'el' ? 'ΚΥΡ' : 'SUN',
                  };
                  const label = dayLabels[dayKey] || dayKey.toUpperCase();
                  return (
                    <div key={dayKey} className="space-y-1">
                      <div className={`py-1.5 px-0.5 rounded-lg border transition-all flex flex-col items-center justify-center ${
                        completed
                          ? `${themeStyles.accentBgDeemphasized} border-[#0075ba]/25`
                          : 'bg-[#142036]/50 border-transparent text-slate-500'
                      }`}>
                        <div className={`w-1 h-1 rounded-full mb-0.5 ${completed ? `${themeStyles.accentBg} animate-pulse` : 'bg-slate-800'}`} />
                        <span className="scale-90 text-[8px] sm:text-[9px] font-bold">{label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className={`text-[11px] ${themeStyles.subtleText} leading-relaxed font-sans`}>
                {currentStreak > 0 
                  ? (language === 'el' ? 'Είστε σε σερί προπονήσεων! Ολοκληρώστε τη σημερινή προπόνηση για να το διατηρήσετε.' : 'You’re on a streak. Complete today’s workout to keep your consistency going.')
                  : (language === 'el' ? 'Ξεκινήστε να χτίζετε συνέπεια! Ολοκληρώστε την πρώτη σας προπόνηση.' : 'Start building consistency. Complete workouts regularly for better health.')}
              </p>
            </div>

            {/* PERFORMANCE ANALYSIS (BENTO SQUARES) */}
            <div className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.border} p-5 space-y-4 transition-colors duration-300`} id="statistics-overview-pane">
              <h3 className={`text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-1`}>
                {UI_TRANSLATIONS[language].stats_title}
              </h3>

              {/* DESKTOP & LANDSCAPE TABLET VIEW */}
              <div className="hidden md:landscape:grid lg:grid grid-cols-2 gap-3" id="stats-desktop-layout">
                {/* COMPLETED */}
                <div className={`bg-[#152439] border ${themeStyles.border} p-4 rounded-xl flex flex-col justify-between relative overflow-hidden group hover:border-[#0075ba]/40 transition-all duration-300`}>
                  <div className="flex justify-between items-start w-full">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">{UI_TRANSLATIONS[language].total_completed}</span>
                    <CheckCircle className={`w-4 h-4 ${themeStyles.accentText} opacity-80`} />
                  </div>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className={`text-2xl font-black ${themeStyles.highContrastText}`}>{totalCompleted}</span>
                    <span className="text-[10px] text-slate-500">{language === 'el' ? 'προπονήσεις' : 'sessions'}</span>
                  </div>
                </div>

                {/* TRAINING */}
                <div className={`bg-[#152439] border ${themeStyles.border} p-4 rounded-xl flex flex-col justify-between relative overflow-hidden group hover:border-[#0075ba]/40 transition-all duration-300`}>
                  <div className="flex justify-between items-start w-full">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">{UI_TRANSLATIONS[language].total_minutes}</span>
                    <Dumbbell className={`w-4 h-4 ${themeStyles.accentText} opacity-80`} />
                  </div>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className={`text-2xl font-black ${themeStyles.highContrastText}`}>{totalMinutes}</span>
                    <span className="text-[10px] text-slate-500">{language === 'el' ? 'λεπτά' : 'min'}</span>
                  </div>
                </div>

                {/* TRAINING AVERAGE */}
                <div className={`bg-[#152439] border ${themeStyles.border} p-5 rounded-xl flex flex-col items-center justify-center text-center col-span-2 relative overflow-hidden group hover:border-[#0075ba]/40 transition-all duration-300`}>
                  <div className="mb-2">
                    <Trophy className={`w-14 h-14 ${themeStyles.accentText} mx-auto opacity-90 filter drop-shadow-[0_0_12px_rgba(0,117,186,0.35)]`} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">{UI_TRANSLATIONS[language].avg_duration}</span>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-2xl font-black ${themeStyles.highContrastText}`}>{averageMinutes}</span>
                      <span className="text-[10px] text-slate-500">{language === 'el' ? 'λεπτά / προπόνηση' : 'min/session avg'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* MOBILE & PORTRAIT TABLET VIEW */}
              <div className="flex flex-col gap-3 md:landscape:hidden lg:hidden" id="stats-mobile-layout">
                {/* COMPLETED */}
                <div className={`bg-[#142036]/50 border ${themeStyles.border} p-4 rounded-xl flex items-center justify-between relative overflow-hidden group hover:border-[#0075ba]/40 transition-all duration-300`}>
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">{UI_TRANSLATIONS[language].total_completed}</span>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl font-black ${themeStyles.highContrastText}`}>{totalCompleted}</span>
                      <span className="text-[10px] text-slate-500">{language === 'el' ? 'προπονήσεις' : 'sessions'}</span>
                    </div>
                  </div>
                  <CheckCircle className={`w-5 h-5 ${themeStyles.accentText} opacity-80`} />
                </div>

                {/* TRAINING */}
                <div className={`bg-[#142036]/50 border ${themeStyles.border} p-4 rounded-xl flex items-center justify-between relative overflow-hidden group hover:border-[#0075ba]/40 transition-all duration-300`}>
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">{UI_TRANSLATIONS[language].total_minutes}</span>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl font-black ${themeStyles.highContrastText}`}>{totalMinutes}</span>
                      <span className="text-[10px] text-slate-500">{language === 'el' ? 'λεπτά' : 'min'}</span>
                    </div>
                  </div>
                  <Dumbbell className={`w-5 h-5 ${themeStyles.accentText} opacity-80`} />
                </div>

                {/* TRAINING AVERAGE */}
                <div className={`bg-[#142036]/50 border ${themeStyles.border} p-4 rounded-xl flex items-center justify-between relative overflow-hidden group hover:border-[#0075ba]/40 transition-all duration-300`}>
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">{UI_TRANSLATIONS[language].avg_duration}</span>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl font-black ${themeStyles.highContrastText}`}>{averageMinutes}</span>
                      <span className="text-[10px] text-slate-500">{language === 'el' ? 'λεπτά μ.ο.' : 'min/session avg'}</span>
                    </div>
                  </div>
                  <Trophy className={`w-5 h-5 ${themeStyles.accentText} opacity-90 filter drop-shadow-[0_0_8px_rgba(0,117,186,0.3)]`} />
                </div>
              </div>
            </div>           

          </section>

        </div>

        {/* LOG PANEL SYSTEM TERMINAL */}
        <div className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.border} p-5 space-y-3 transition-colors duration-300`} id="system-terminal-logs">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 ${themeStyles.highContrastText} text-xs uppercase tracking-widest font-extrabold`}>
              <History className={`w-3.5 h-3.5 ${themeStyles.accentText}`} />
              {UI_TRANSLATIONS[language].recent_logs_title}
            </div>
            <span className="text-[9px] text-slate-500 font-semibold tracking-wider font-mono">
              {language === 'el' ? 'ΚΑΤΑΣΤΑΣΗ: ΣΥΓΧΡΟΝΙΣΜΕΝΟ' : 'STATUS: SYNCHRONIZED'}
            </span>
          </div>

          <div className="bg-[#142036]/55 rounded-xl p-3 border border-slate-800/60 text-xs space-y-1.5 max-h-[140px] overflow-y-auto">
            {history.length === 0 ? (
              <div className="text-slate-500 py-4 text-center">
                {UI_TRANSLATIONS[language].no_logs_yet}
              </div>
            ) : (
              [...history].reverse().map((entry) => (
                <div key={entry.id} className="flex items-start sm:items-center justify-between gap-2 border-b border-slate-800/30 pb-1.5 last:border-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-[11px]">
                    <span className={`${themeStyles.accentText} opacity-80 font-semibold font-mono`}>[{entry.date}]</span>
                    <span className={`${themeStyles.highContrastText} font-semibold truncate hover:text-opacity-80 max-w-[200px] sm:max-w-[400px]`}>
                      {translateWorkoutName(entry.workoutName, language)}
                    </span>
                  </div>
                  <span className={`text-[10px] ${themeStyles.accentText} font-bold shrink-0 font-display`}>
                    +{entry.durationSpent}m {language === 'el' ? 'ΟΛΟΚΛΗΡΩΘΗΚΕ' : 'COMPLETED'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// Helper calculation of local calendar streak
function calculateStreak(history: WorkoutHistoryEntry[]): number {
  if (history.length === 0) return 0;

  const sortedDates = [...new Set(history.map(h => h.date))].sort();
  if (sortedDates.length === 0) return 0;

  let streak = 0;
  const todayStr = new Date().toISOString().split('T')[0];
  const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  const lastDate = sortedDates[sortedDates.length - 1];
  if (lastDate !== todayStr && lastDate !== yesterdayStr) {
    return 0;
  }

  let currentTarget = lastDate;
  while (sortedDates.includes(currentTarget)) {
    streak++;
    const prevDate = new Date(new Date(currentTarget).getTime() - 86400000);
    currentTarget = prevDate.toISOString().split('T')[0];
  }

  return streak;
}
