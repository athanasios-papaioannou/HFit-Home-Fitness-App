/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Workout } from '../types';
import { ThemeStyles } from '../themeStore';
import { Trophy, CheckCircle, Flame, Calendar, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { Language } from '../i18n';

interface CongratsScreenProps {
  workout: Workout;
  durationSpent: number;
  newStreakCount: number;
  themeStyles: ThemeStyles;
  onReturn: () => void;
  language: Language;
  onLanguageToggle?: () => void;
}

export default function CongratsScreen({
  workout,
  durationSpent,
  newStreakCount,
  themeStyles,
  onReturn,
  language,
}: CongratsScreenProps) {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="absolute top-0 left-0 right-0 h-[450px] bg-gradient-to-b from-transparent via-transparent to-transparent pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`max-w-md w-full space-y-8 ${themeStyles.cardBg} p-8 rounded-2xl border ${themeStyles.border} shadow-lg relative overflow-hidden text-center transition-all duration-300`}
        id="congrats-modal"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b1320_1px,transparent_1px),linear-gradient(to_bottom,#0b1320_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none" />

        <div className="relative space-y-4">
          <div className={`mx-auto w-16 h-16 rounded-full ${themeStyles.accentBgDeemphasized} flex items-center justify-center`}>
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${themeStyles.accentBgDeemphasized} text-[10px] sm:text-xs font-sans tracking-wider uppercase font-bold`}>
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'el' ? 'Η ΠΡΟΠΟΝΗΣΗ ΟΛΟΚΛΗΡΩΘΗΚΕ ΕΠΙΤΥΧΩΣ' : 'SESSION COMPLETED SUCCESSFULLY'}
            </div>
            <h1 className={`text-2xl sm:text-3xl font-black ${themeStyles.highContrastText} tracking-tight font-display mt-3`}>
              {language === 'el' ? 'Συγχρονισμός Προπόνησης' : 'Workout Synchronized'}
            </h1>
            <p className={`text-xs ${themeStyles.subtleText} font-sans`}>
              {language === 'el' ? 'Η πρόοδος της προπόνησής σας έχει αποθηκευτεί με επιτυχία.' : 'Your training progress has been successfully saved.'}
            </p>
          </div>
        </div>

        {/* METRICS ROW SECTION */}
        <div className="grid grid-cols-2 gap-3 relative font-sans text-xs" id="congrats-metrics-panel">
          <div className={`bg-[#142036]/50 border ${themeStyles.border} p-4 rounded-xl text-center space-y-1`}>
            <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">
              {language === 'el' ? 'ΔΙΑΡΚΕΙΑ ΠΡΟΠΟΝΗΣΗΣ' : 'DURATION TRAINED'}
            </span>
            <div className="flex items-center justify-center gap-1">
              <span className={`text-lg sm:text-xl font-bold ${themeStyles.highContrastText}`}>+{durationSpent}</span>
              <span className="text-[10px] text-slate-500">{language === 'el' ? 'λεπτά' : 'mins'}</span>
            </div>
          </div>

          <div className={`bg-[#142036]/50 border ${themeStyles.border} p-4 rounded-xl text-center space-y-1`}>
            <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">
              {language === 'el' ? 'ΑΣΚΗΣΕΙΣ ΠΟΥ ΕΚΤΕΛΕΣΤΗΚΑΝ' : 'EXERCISES RAN'}
            </span>
            <div className="flex items-center justify-center gap-1">
              <span className={`text-lg sm:text-xl font-bold ${themeStyles.highContrastText}`}>{workout.exercises.length}</span>
              <span className="text-[10px] text-slate-500">{language === 'el' ? 'ασκήσεις' : 'exercises'}</span>
            </div>
          </div>

          <div className={`bg-[#142036]/50 border ${themeStyles.border} p-4 rounded-xl col-span-2 flex items-center justify-between text-left`}>
            <div className="space-y-0.5">
              <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">
                {language === 'el' ? 'ΒΑΘΜΟΛΟΓΙΑ ΣΥΝΕΠΕΙΑΣ' : 'CONSISTENCY SCORE'}
              </span>
              <p className={`text-xs sm:text-sm font-bold ${themeStyles.highContrastText}`}>
                {language === 'el' ? 'Το σερί σας αυξήθηκε!' : 'Streak level elevated'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-lg text-orange-400 font-bold font-mono">
              <Flame className="w-4 h-4 fill-orange-500/10" />
              {newStreakCount} {language === 'el' ? 'ΗΜΕΡΕΣ' : 'DAYS'}
            </div>
          </div>
        </div>

        {/* Recovery advice text block */}
        <div className={`p-4 rounded-xl bg-[#142036]/30 border ${themeStyles.border} text-left space-y-1.5`} id="recovery-advice-panel">
          <div className={`flex items-center gap-1 text-[11px] font-sans ${themeStyles.accentText} uppercase tracking-widest font-extrabold`}>
            <Zap className="w-3.5 h-3.5" />
            {language === 'el' ? 'ΑΠΟΚΑΤΑΣΤΑΣΗ & ΑΝΑΖΩΟΓΟΝΗΣΗ' : 'RECOVERY & RE-CALIBRATION'}
          </div>
          <p className={`text-xs ${themeStyles.subtleText} leading-relaxed font-sans`}>
            {language === 'el' 
              ? 'Ενυδατωθείτε, τραφείτε σωστά, ξεκουραστείτε και ανακάμψτε. Επιστρέψτε αύριο για να συνεχίσετε!' 
              : 'Hydrate, refuel, get some rest and recover. Come back tomorrow and keep the momentum going!'}
          </p>
        </div>

        {/* RETURN BUTTON */}
        <div className="pt-2 relative font-display">
          <button
            onClick={onReturn}
            id="congrats-back-dashboard-btn"
            className={`w-full py-4 px-6 rounded-xl ${themeStyles.btnPrimary} font-bold tracking-wide text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-transform duration-100 hover:scale-[1.01] active:scale-[0.99]`}
          >
            {language === 'el' ? 'ΕΠΙΣΤΡΟΦΗ ΣΤΟ DASHBOARD' : 'RETURN TO DASHBOARD'}
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
