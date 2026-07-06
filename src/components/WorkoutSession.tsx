/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Workout, Exercise, UserProfile, Equipment } from '../types';
import { ThemeStyles } from '../themeStore';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Dumbbell, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  Timer, 
  Award,
  Sparkles,
  Lock
} from 'lucide-react';
import { 
  Language, 
  UI_TRANSLATIONS, 
  FITNESS_LEVEL_TRANSLATION, 
  EQUIPMENT_TRANSLATION, 
  CATEGORY_TRANSLATION, 
  BODYPART_TRANSLATION, 
  EXERCISE_TRANSLATIONS,
  translateRepsText
} from '../i18n';

interface WorkoutSessionProps {
  profile: UserProfile;
  workout: Workout;
  themeStyles: ThemeStyles;
  onCompleteWorkout: (elapsedMinutes: number) => void;
  onCancelWorkout: () => void;
  language: Language;
  onLanguageToggle: () => void;
}

export default function WorkoutSession({
  profile,
  workout,
  themeStyles,
  onCompleteWorkout,
  onCancelWorkout,
  language,
  onLanguageToggle,
}: WorkoutSessionProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentExercise = workout.exercises[currentIdx];

  const hasRealEquipment = profile.equipment.length > 0 &&
    !(profile.equipment.length === 1 && profile.equipment[0] === Equipment.BODYWEIGHT);

  // Set-by-set completion tracking
  // Key: exerciseId_setIndex, Value: boolean (completed)
  const [completedSets, setCompletedSets] = useState<Record<string, boolean>>({});

  // Active Set-specific Timer States
  const [activeSetIndex, setActiveSetIndex] = useState<number | null>(null);
  const [setTimerMode, setSetTimerMode] = useState<'idle' | 'working' | 'resting'>('idle');
  const [setTimeLeft, setSetTimeLeft] = useState(currentExercise.duration);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Stats
  const startTime = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Whenever we change exercises, reset timer state and configurations
  useEffect(() => {
    setActiveSetIndex(null);
    setSetTimerMode('idle');
    setIsTimerRunning(false);
    setSetTimeLeft(currentExercise.duration);
  }, [currentIdx, currentExercise.duration]);

  // Smooth scroll to active exercise card on mobile and tablets when user changes exercises/taps next/prev
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const isMobileOrTablet = typeof window !== 'undefined' && window.innerWidth < 1024;
    if (isMobileOrTablet) {
      const element = document.getElementById('exercise-action-card');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [currentIdx]);

  // Audio synthesizer countdown beeper
  const triggerAudioCountdown = (isFinal: boolean) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.frequency.setValueAtTime(isFinal ? 880 : 440, audioCtx.currentTime); // higher frequency for final beep
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      // Ignored if browser restricts context
    }
  };

  // Timer logic for active set
  useEffect(() => {
    if (isTimerRunning && activeSetIndex !== null) {
      timerRef.current = setInterval(() => {
        setSetTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            triggerAudioCountdown(true);
            
            if (setTimerMode === 'working') {
              // Transition to rest mode automatically
              setSetTimerMode('resting');
              return 30; // 30 seconds rest timer
            } else {
              // Mark set as finished automatically
              const key = `${currentExercise.id}_${activeSetIndex}`;
              setCompletedSets((prevCompleted) => ({
                ...prevCompleted,
                [key]: true,
              }));
              
              // Reset timer state
              setActiveSetIndex(null);
              setSetTimerMode('idle');
              setIsTimerRunning(false);
              return currentExercise.duration;
            }
          }
          
          // Countdown warning beep for last 3 seconds
          if (prev <= 4) {
            triggerAudioCountdown(false);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, setTimerMode, activeSetIndex, currentIdx, currentExercise.duration, currentExercise.id]);

  // Helper to check if a specific exercise index is unlocked
  const isExUnlocked = (targetIdx: number) => {
    for (let i = 0; i < targetIdx; i++) {
      const { isFinished } = getExerciseStatus(workout.exercises[i]);
      if (!isFinished) return false;
    }
    return true;
  };

  // Handler for toggle single set done manually
  const toggleSetComplete = (setIndex: number) => {
    const isSetUnlocked = setIndex === 0 || completedSets[`${currentExercise.id}_${setIndex - 1}`];
    if (!isSetUnlocked) return;

    const key = `${currentExercise.id}_${setIndex}`;
    const wasCompleted = !!completedSets[key];

    setCompletedSets((prev) => {
      const updated = { ...prev };
      if (wasCompleted) {
        // Uncompleting a set -> uncomplete all future sets of this exercise too!
        for (let i = setIndex; i < currentExercise.sets; i++) {
          const k = `${currentExercise.id}_${i}`;
          updated[k] = false;
          if (activeSetIndex === i) {
            setActiveSetIndex(null);
            setSetTimerMode('idle');
            setIsTimerRunning(false);
          }
        }
      } else {
        updated[key] = true;
        if (activeSetIndex === setIndex) {
          setActiveSetIndex(null);
          setSetTimerMode('idle');
          setIsTimerRunning(false);
        }
      }
      return updated;
    });
  };

  // Skip step or manual progress
  const navNext = () => {
    if (currentIdx < workout.exercises.length - 1 && getExerciseStatus(currentExercise).isFinished) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const navPrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const getExerciseStatus = (ex: Exercise) => {
    let completedCount = 0;
    for (let i = 0; i < ex.sets; i++) {
      if (completedSets[`${ex.id}_${i}`]) {
        completedCount++;
      }
    }
    const isFinished = completedCount === ex.sets;
    return { completedCount, isFinished };
  };

  // Finish full session
  const finishWorkout = () => {
    // Determine elapsed time
    const elapsedMs = Date.now() - startTime.current;
    const elapsedMinutes = Math.max(1, Math.round(elapsedMs / 60000));
    
    // Complete callback
    onCompleteWorkout(elapsedMinutes);
  };

  // Formatting helper
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Resolve translated target focus labels
  const focusName = workout.targetFocus === 'combo' ? (language === 'el' ? 'ΜΙΚΤΗ' : 'COMBO')
                : workout.targetFocus === 'strength' ? (language === 'el' ? 'ΔΥΝΑΜΗ' : 'STRENGTH')
                : workout.targetFocus === 'cardio' ? (language === 'el' ? 'ΚΑΡΔΙΟ' : 'CARDIO')
                : (language === 'el' ? 'ΚΟΡΜΟΣ' : 'CORE');

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-slate-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-6 relative" id="workout-session-container">
        
        {/* TOP STATUS HEADER BAR */}
        <header className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b ${themeStyles.border} text-xs transition-colors duration-300`}>
          <div className="flex items-center gap-3">
            <div className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] aspect-square rounded-full bg-[#152439] border border-[#0075ba]/30 flex items-center justify-center font-display font-extrabold text-2xl leading-none tracking-tight shrink-0">
              <span className="text-white">H</span>
              <span className="text-[#0075ba] mx-[1px]">:</span>
              <span className="text-white">F</span>
            </div>
            <div>
              <h1 className={`text-lg font-bold ${themeStyles.highContrastText} tracking-tight font-display`}>
                H<span className="text-[#0075ba]">:</span>Fit {UI_TRANSLATIONS[language].workout_session_title}
              </h1>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className={`${themeStyles.pillBg} px-2 py-0.5 rounded uppercase text-[10px] font-semibold`}>
                  {UI_TRANSLATIONS[language].lvl}: {FITNESS_LEVEL_TRANSLATION[language][profile.level]}
                </span>
                <span className={`${themeStyles.pillBg} px-2 py-0.5 rounded uppercase text-[10px] font-semibold`}>
                  {UI_TRANSLATIONS[language].t_min}: {workout.duration}M
                </span>
                <span className={`${themeStyles.pillBg} px-2 py-0.5 rounded uppercase text-[10px] font-semibold`}>
                  {UI_TRANSLATIONS[language].mode}: {hasRealEquipment ? UI_TRANSLATIONS[language].equipped : UI_TRANSLATIONS[language].bodyweight_only}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 ml-auto md:ml-0">
            {/* Language switcher */}
            <button
              onClick={onLanguageToggle}
              id="language-switcher-session-btn"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border ${themeStyles.border} bg-[#152439]/70 text-[#29a0e6] font-bold tracking-tight transition-colors cursor-pointer text-xs font-display hover:text-white`}
            >
              {UI_TRANSLATIONS[language].lang_btn}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFTSIDE BAR: EXERCISE PIPELINE STACKS OR NAVIGATION STEPS */}
        <section className="lg:col-span-4 space-y-4">
          <div className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.border} p-5 space-y-3 transition-colors duration-300`} id="pipeline-panel">
            <h3 className={`text-xs uppercase tracking-widest ${themeStyles.subtleText} opacity-80 font-extrabold`}>
              {language === 'el' ? 'ΛΙΣΤΑ ΑΣΚΗΣΕΩΝ' : 'EXERCISE LIST'}
            </h3>
            
            <div className="space-y-1.5 max-h-[280px] lg:max-h-none overflow-y-auto pr-1">
              {workout.exercises.map((ex, idx) => {
                const { completedCount, isFinished } = getExerciseStatus(ex);
                const isCurrent = idx === currentIdx;
                const isUnlocked = isExUnlocked(idx);
                const translatedExInfo = EXERCISE_TRANSLATIONS[language]?.[ex.id] || { name: ex.name };

                return (
                  <button
                    key={ex.id}
                    onClick={() => {
                      if (isUnlocked) {
                        setCurrentIdx(idx);
                      }
                    }}
                    disabled={!isUnlocked}
                    id={`roadmap-step-${ex.id}`}
                    className={`w-full text-left p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                      !isUnlocked
                        ? 'bg-[#142036]/20 border-slate-900/10 text-slate-600 opacity-40 cursor-not-allowed'
                        : isCurrent
                          ? `${themeStyles.accentBgDeemphasized} border-[#0075ba]/30 cursor-pointer`
                          : `bg-[#142036]/40 ${themeStyles.border} text-slate-400 hover:text-slate-100 cursor-pointer`
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-[11px] ${
                        !isUnlocked
                          ? 'bg-[#142036]/30 border border-slate-800/40 text-slate-600'
                          : isFinished 
                            ? `${themeStyles.accentBg} font-bold` 
                            : isCurrent 
                              ? `${themeStyles.accentBgDeemphasized} ${themeStyles.accentText} border ${themeStyles.accentBorder} font-bold` 
                              : 'bg-[#142036] border border-slate-800/60 text-slate-500'
                      }`}>
                        {!isUnlocked ? <Lock className="w-3.5 h-3.5 text-slate-600" /> : isFinished ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                      </div>
                      <span className={`text-xs font-semibold truncate font-display ${isCurrent ? themeStyles.highContrastText : isUnlocked ? 'text-slate-400' : 'text-slate-600'}`}>
                        {translatedExInfo.name}
                      </span>
                    </div>
                    
                    <div className="shrink-0 text-[10px] text-slate-500 text-right flex items-center gap-1.5 font-semibold font-mono">
                      {!isUnlocked && <Lock className="w-3 h-3 text-slate-500/75" />}
                      <span>{completedCount}/{ex.sets} {language === 'el' ? 'σετ' : 'sets'}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className={`pt-3 border-t ${themeStyles.border} hidden lg:block`}>
              <button
                onClick={onCancelWorkout}
                id="cancel-workout-alert-btn"
                className="w-full py-2.5 rounded-lg border border-red-500/20 bg-red-950/10 hover:bg-red-950/20 text-red-400 text-xs hover:text-red-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-bold duration-200"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                {language === 'el' ? 'ΕΓΚΑΤΑΛΕΙΨΗ ΠΡΟΠΟΝΗΣΗΣ' : 'ABANDON ACTIVE WORKOUT'}
              </button>
            </div>
          </div>
        </section>

        {/* RIGHTSIDE BAR: MAIN INTERACTIVE SCREEN ACTION AREA */}
        <section className="lg:col-span-8 space-y-6">
          
          {/* CORE EXERCISE DETAIL COMPONENT */}
          <div className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.border} p-6 space-y-6 relative overflow-hidden transition-colors duration-300`} id="exercise-action-card">
            <div className="
              absolute top-0 right-0 p-2 md:p-3
              text-[10px] text-slate-400 font-bold
              bg-[#142036]/50 rounded-bl-xl border-l border-b border-transparent font-mono
             flex items-center gap-1 uppercase">
              [{language === 'el' ? 'ΣΤΟΧΟΣ' : 'FOCUS'}: {focusName}]
            </div>

            <div className="space-y-2 mt-[20px]">
              <div className="flex flex-wrap gap-1.5">
                {currentExercise.equipmentRequired.map(eq => (
                  <span key={eq} className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${themeStyles.pillBg} px-2.5 py-0.5 rounded uppercase`}>
                    <Dumbbell className={`w-3.5 h-3.5 ${themeStyles.accentText}`} />
                    {EQUIPMENT_TRANSLATION[language][eq as Equipment] || eq.replace('_', ' ')}
                  </span>
                ))}
              </div>
              
              <h2 className={`text-2xl font-black ${themeStyles.highContrastText} tracking-tight font-display`}>
                {(EXERCISE_TRANSLATIONS[language]?.[currentExercise.id]?.name || currentExercise.name)}
              </h2>
              <p className={`text-xs sm:text-sm ${themeStyles.subtleText} leading-relaxed max-w-2xl`}>
                {(EXERCISE_TRANSLATIONS[language]?.[currentExercise.id]?.desc || currentExercise.description)}
              </p>
            </div>

            {/* INTERACTIVE COMPLETED SET BOX PROGRESS GRID */}
            <div className={`bg-[#142036]/40 border ${themeStyles.border} p-4 rounded-xl space-y-3`} id="interactive-set-grid">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] text-slate-400 font-extrabold uppercase tracking-widest`}>
                  {language === 'el' ? 'ΚΑΤΑΓΡΑΦΗ ΣΕΤ' : 'SET STATUS TRACKER'} ({currentExercise.sets} {language === 'el' ? 'ΣΥΝΟΛΙΚΑ ΣΕΤ' : 'TOTAL SETS'})
                </span>
                
                {/* Dynamic countdown volume switcher */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#142036] border border-slate-800/60 transition-colors text-slate-400 hover:text-slate-200 cursor-pointer text-[10px] font-extrabold font-display leading-none"
                  title="Toggle Audio Alarms"
                >
                  {soundEnabled ? <Volume2 className={`w-3.5 h-3.5 ${themeStyles.accentText}`} /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{soundEnabled ? (language === 'el' ? 'ΗΧΟΙ: ΝΑΙ' : 'SOUNDS ON') : (language === 'el' ? 'ΣΙΓΑΣΗ' : 'MUTED')}</span>
                </button>
              </div>

              <div className="space-y-3" id="sets-row-container-stack">
                {Array.from({ length: currentExercise.sets }).map((_, sIdx) => {
                  const key = `${currentExercise.id}_${sIdx}`;
                  const isDone = completedSets[key];
                  const isActive = activeSetIndex === sIdx;
                  const sUnlocked = sIdx === 0 || !!completedSets[`${currentExercise.id}_${sIdx - 1}`];

                  return (
                    <div
                      key={sIdx}
                      id={`set-box-${currentExercise.id}-${sIdx}`}
                      className={`p-3.5 rounded-xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 transition-all duration-300 ${
                        !sUnlocked
                          ? 'bg-[#142036]/10 border-slate-900/30 opacity-40'
                          : isDone
                            ? 'bg-[#0075ba]/10 border-[#0075ba]/25 opacity-90'
                            : isActive
                              ? setTimerMode === 'resting'
                                ? 'bg-violet-500/10 border-violet-500/30 ring-1 ring-violet-500/20 shadow-lg'
                                : `${themeStyles.accentBgDeemphasized} ${themeStyles.accentBorder} ring-1 ring-[#0075ba]/10 shadow-lg`
                              : `bg-[#142036]/40 ${themeStyles.border}`
                      }`}
                    >
                      {/* Left Block: Checkbox with labels */}
                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={() => sUnlocked && toggleSetComplete(sIdx)}
                          disabled={!sUnlocked}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-all ${
                            !sUnlocked
                              ? 'border-slate-800/80 bg-[#142036]/55 text-slate-700 cursor-not-allowed'
                              : isDone 
                                ? 'bg-[#0075ba] border-[#29a0e6] text-white shadow-md cursor-pointer' 
                                : `border-slate-700 bg-[#142036]/55 hover:border-[#0075ba]/40 hover:bg-[#142036] ${themeStyles.accentText} cursor-pointer`
                          }`}
                          title={!sUnlocked ? "Locked Set" : isDone ? "Mark incomplete" : "Mark complete manually"}
                        >
                          {!sUnlocked ? (
                            <Lock className="w-3.5 h-3.5 text-slate-600" />
                          ) : isDone ? (
                            <Check className="w-4 h-4 stroke-[3]" />
                          ) : (
                            <span className="text-xs font-black">{sIdx + 1}</span>
                          )}
                        </button>
                        <div>
                          <div className={`text-sm font-black ${!sUnlocked ? 'text-slate-600' : themeStyles.highContrastText} font-display flex items-center gap-2`}>
                            <span>{language === 'el' ? 'Σετ' : 'Set'} {sIdx + 1}</span>
                            {isDone && <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#0075ba]/15 text-[#29a0e6] font-bold">{language === 'el' ? 'OK' : 'Done'}</span>}
                            {!sUnlocked && <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#142036] text-slate-600 font-bold flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> {language === 'el' ? 'Κλειδ.' : 'Locked'}</span>}
                          </div>
                          <p className={`text-xs ${!sUnlocked ? 'text-slate-600' : 'text-slate-550'} font-semibold`}>
                            {language === 'el' ? 'Στόχος' : 'Target'}: {translateRepsText(currentExercise.reps, language)}
                          </p>
                        </div>
                      </div>

                      {/* Middle Area: Active Timer Playback and Info */}
                      <div className="flex-1 flex items-center justify-center">
                        {!sUnlocked ? (
                          <div className="text-xs text-slate-600 flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5" />
                            <span>{language === 'el' ? 'Κλειδωμένο (Ολοκληρώστε το προηγούμενο σετ)' : 'Locked (Complete previous set)'}</span>
                          </div>
                        ) : isActive ? (
                          <div className="w-full max-w-sm px-4 py-2 bg-[#142036]/55 border border-slate-800/60 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full animate-ping ${setTimerMode === 'resting' ? 'bg-sky-400' : 'bg-[#0075ba]'}`} />
                              <span className="text-[10px] font-extrabold tracking-wider text-slate-300">
                                {setTimerMode === 'resting' ? (language === 'el' ? 'RESTING' : 'RESTING') : (language === 'el' ? 'WORKING' : 'WORKING')}
                              </span>
                              <span className={`w-[60px] text-right text-base font-black transition-colors ${setTimerMode === 'resting' ? 'text-sky-400' : themeStyles.accentText}`}>
                                {formatTime(setTimeLeft)}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 p-1 bg-[#142036]/80 rounded-lg border border-slate-800/60">
                              {/* Play / Pause Toggle */}
                              <button
                                onClick={() => setIsTimerRunning(!isTimerRunning)}
                                className={`p-1.5 rounded-md hover:bg-slate-800 transition-colors cursor-pointer ${isTimerRunning ? themeStyles.accentText : 'text-slate-400'}`}
                                title={isTimerRunning ? 'Pause' : 'Play'}
                              >
                                {isTimerRunning ? <Pause className="w-3.5 h-3.5 stroke-[2.5]" /> : <Play className="w-3.5 h-3.5 stroke-[2.5]" />}
                              </button>

                              {/* Reset Clocks */}
                              <button
                                onClick={() => {
                                  setIsTimerRunning(false);
                                  setSetTimeLeft(setTimerMode === 'resting' ? 30 : currentExercise.duration);
                                }}
                                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                                title="Reset"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>

                              {/* Skip Clock Transition */}
                              <button
                                onClick={() => {
                                  triggerAudioCountdown(true);
                                  if (setTimerMode === 'working') {
                                    setSetTimerMode('resting');
                                    setSetTimeLeft(30);
                                  } else {
                                    // Complete rest phase
                                    const key = `${currentExercise.id}_${sIdx}`;
                                    setCompletedSets(prev => ({ ...prev, [key]: true }));
                                    setActiveSetIndex(null);
                                    setSetTimerMode('idle');
                                    setIsTimerRunning(false);
                                  }
                                }}
                                className="p-1 px-2 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-[10px] font-bold cursor-pointer border border-slate-800 uppercase"
                                title="Skip"
                              >
                                {language === 'el' ? 'ΠΑΡΑΚΑΜΨΗ' : 'SKIP'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-slate-500">
                            {isDone ? (
                              <span className="text-[#29a0e6] flex items-center gap-1.5 font-bold">
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" /> {language === 'el' ? 'Έγινε' : 'Done'}
                              </span>
                            ) : (
                              <span>{language === 'el' ? 'Ρυθμισμένο χρονόμετρο' : 'Timer configured'} ({currentExercise.duration}s)</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Right Block: Start Actions */}
                      <div className="flex items-center justify-end gap-2 shrink-0">
                        {!sUnlocked ? (
                          <span className="text-[10px] bg-[#142036] border border-slate-800/60 px-2.5 py-1.5 rounded text-slate-600 flex items-center gap-1.5 font-bold">
                            <Lock className="w-3.5 h-3.5 text-slate-600" />
                            {language === 'el' ? 'ΚΛΕΙΔΩΜΕΝΟ' : 'LOCKED'}
                          </span>
                        ) : !isDone && !isActive ? (
                          <button
                            onClick={() => {
                              setActiveSetIndex(sIdx);
                              setSetTimerMode('working');
                              setSetTimeLeft(currentExercise.duration);
                              setIsTimerRunning(true);
                            }}
                            className={`px-3 py-1.5 rounded-lg border ${themeStyles.pillBg} hover:border-[#0075ba]/35 text-xs hover:text-white transition-all cursor-pointer flex items-center gap-1.5 font-semibold text-[#d3d3d3]`}
                          >
                            <Play className="w-3.5 h-3.5 text-[#29a0e6] fill-[#29a0e6]/10" />
                            {language === 'el' ? 'ΕΝΑΡΞΗ ΧΡΟΝΟΥ' : 'START TIMER'} ({currentExercise.duration}s)
                          </button>
                        ) 
                          : isDone ? (
                          <button
                            onClick={() => toggleSetComplete(sIdx)}
                            className="text-[10px] uppercase px-2 py-1 bg-red-950/10 border border-red-900/50 text-red-400 rounded hover:bg-red-950/20 transition-colors cursor-pointer font-bold"
                          >
                            {language === 'el' ? 'RESET' : 'RESET'}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SELECTION NAVIGATION ROW */}
            <div className={`flex flex-col md:flex-row items-center justify-between gap-3 pt-4 border-t ${themeStyles.border} text-xs`}>
              <button
                onClick={navPrev}
                disabled={currentIdx === 0}
                id="prev-slide-btn"
                className={`flex items-center gap-1 py-1 px-3 w-full justify-center rounded-lg border ${themeStyles.pillBg} disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer order-3 md:order-1 md:w-auto md:justify-start md:py-1.5 text-xs font-bold font-display`}
              >
                <ChevronLeft className="w-4 h-4" />
                {language === 'el' ? 'ΠΡΟΗΓΟΥΜΕΝΟ' : 'PREVIOUS'}
              </button>

              <div className="text-[10px] text-slate-400 font-extrabold tracking-wider order-1 md:order-2 text-center uppercase font-mono">
                {language === 'el' ? `ΑΣΚΗΣΗ ${currentIdx + 1} ΑΠΟ ${workout.exercises.length}` : `EXERCISE ${currentIdx + 1} OF ${workout.exercises.length}`}
              </div>

              {currentIdx < workout.exercises.length - 1 ? (
                <button
                  onClick={navNext}
                  disabled={!getExerciseStatus(currentExercise).isFinished}
                  id="next-slide-btn"
                  className={`flex items-center gap-1.5 py-1 px-3 w-full justify-center rounded-lg border ${themeStyles.pillBg} disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer transition-all order-2 md:order-3 md:w-auto md:justify-start md:py-1.5 text-xs font-bold font-display`}
                >
                  <span>{language === 'el' ? 'ΕΠΟΜΕΝΟ' : 'NEXT'}</span>
                  {getExerciseStatus(currentExercise).isFinished ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-550 shrink-0" />
                  )}
                </button>
              ) : (
                <button
                  onClick={finishWorkout}
                  disabled={!getExerciseStatus(currentExercise).isFinished}
                  id="end-session-prematurely-btn"
                  className={`flex items-center gap-1.5 py-1 px-4 w-full justify-center rounded-lg font-black tracking-wider transition-all order-2 md:order-3 md:w-auto md:justify-start md:py-1.5 ${
                    getExerciseStatus(currentExercise).isFinished
                      ? `${themeStyles.btnPrimary} cursor-pointer`
                      : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed opacity-50'
                  }`}
                >
                  <span>{language === 'el' ? 'ΟΛΟΚΛΗΡΩΣΗ' : 'FINISH WORKOUT'}</span>
                  {getExerciseStatus(currentExercise).isFinished ? (
                    <Award className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <Lock className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
            </div>

            {/* MOBILE/TABLET ONLY ABANDON BUTTON */}
            <div className={`pt-4 border-t ${themeStyles.border} block lg:hidden`}>
              <button
                onClick={onCancelWorkout}
                id="cancel-workout-alert-btn"
                className="w-full py-2.5 rounded-lg border border-red-500/20 bg-red-950/10 hover:bg-red-950/20 text-red-400 text-xs hover:text-red-350 transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-bold"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                {language === 'el' ? 'ΕΓΚΑΤΑΛΕΙΨΗ ΠΡΟΠΟΝΗΣΗΣ' : 'ABANDON ACTIVE WORKOUT'}
              </button>
            </div>

          </div>

        </section>

        </div>
      </div>
    </div>
  );
}
