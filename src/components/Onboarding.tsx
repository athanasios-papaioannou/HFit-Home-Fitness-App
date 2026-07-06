/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Equipment, FitnessLevel, UserProfile } from '../types';
import { Dumbbell, ShieldCheck, Flame, Zap, Check, Activity, Info } from 'lucide-react';
import { Language, UI_TRANSLATIONS } from '../i18n';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
  language: Language;
  onLanguageToggle: () => void;
}

export default function Onboarding({ onComplete, language, onLanguageToggle }: OnboardingProps) {
  const [trainingType, setTrainingType] = useState<'bodyweight' | 'equipment'>('bodyweight');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const [level, setLevel] = useState<FitnessLevel>(FitnessLevel.INTERMEDIATE);

  // Toggle equipment select
  const toggleEquipment = (eq: Equipment) => {
    setSelectedEquipment(prev => {
      if (prev.includes(eq)) {
        return prev.filter(e => e !== eq);
      } else {
        return [...prev, eq];
      }
    });
  };

  const handleStart = () => {
    // Collect the appropriate list of equipment
    const equipmentList = trainingType === 'bodyweight'
      ? [Equipment.BODYWEIGHT]
      : (selectedEquipment.length === 0 ? [Equipment.BODYWEIGHT] : selectedEquipment);

    onComplete({
      equipment: equipmentList,
      duration: 30, // Default duration, since it's now selectable in daily options
      level,
      isOnboarded: true,
    });
  };

  const equipmentOptions = [
    { 
      id: Equipment.DUMBBELLS, 
      name: UI_TRANSLATIONS[language].dumbbells_name, 
      description: UI_TRANSLATIONS[language].dumbbells_desc, 
      icon: Dumbbell 
    },
    { 
      id: Equipment.BANDS, 
      name: UI_TRANSLATIONS[language].bands_name, 
      description: UI_TRANSLATIONS[language].bands_desc, 
      icon: Activity 
    },
    { 
      id: Equipment.PULLUP_BAR, 
      name: UI_TRANSLATIONS[language].pullup_bar_name, 
      description: UI_TRANSLATIONS[language].pullup_bar_desc, 
      icon: Flame 
    },
    { 
      id: Equipment.MAT, 
      name: UI_TRANSLATIONS[language].mat_name, 
      description: UI_TRANSLATIONS[language].mat_desc, 
      icon: Zap 
    },
  ];

  const levels = [
    {
      id: FitnessLevel.BEGINNER,
      title: UI_TRANSLATIONS[language].level_beginner_title,
      badge: language === 'el' ? 'ΒΑΣΗ' : 'Base',
      desc: UI_TRANSLATIONS[language].level_beginner_desc,
    },
    {
      id: FitnessLevel.INTERMEDIATE,
      title: UI_TRANSLATIONS[language].level_intermediate_title,
      badge: language === 'el' ? 'ΜΕΣΑΙΟ' : 'Pro',
      desc: UI_TRANSLATIONS[language].level_intermediate_desc,
    },
    {
      id: FitnessLevel.ADVANCED,
      title: UI_TRANSLATIONS[language].level_advanced_title,
      badge: language === 'el' ? 'ΚΟΡΥΦΗ' : 'Elite',
      desc: UI_TRANSLATIONS[language].level_advanced_desc,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500/30 selection:text-emerald-400">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-emerald-950/10 via-transparent to-transparent pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl w-full space-y-8 bg-[#121a2d] p-8 rounded-2xl border border-slate-800/80 shadow-2xl relative overflow-hidden"
        id="onboarding-container"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_15%_15%,rgba(0,117,186,0.28),transparent_55%)] animate-pulse" />

        {/* Brand Header & Language Switcher */}
        <div className="flex items-center justify-between border-b border-slate-800/50 pb-5">
          <div className="text-left">
            <h1 className="text-4xl font-extrabold tracking-tight font-display text-white" id="brand-logo">
              H<span className="text-[#0075ba]">:</span>Fit
            </h1>
          </div>
          <button
            onClick={onLanguageToggle}
            type="button"
            className="px-3.5 py-1.5 rounded-xl border border-[#0075ba]/35 bg-[#152439]/80 text-[#29a0e6] hover:text-white hover:border-[#0075ba] hover:bg-[#0075ba]/10 transition-all text-xs cursor-pointer font-bold relative z-10 font-display flex items-center gap-1 leading-none"
          >
            {UI_TRANSLATIONS[language].lang_btn}
          </button>
        </div>

        <div className="relative text-center sm:text-left">
          <p className="text-sm text-slate-400 leading-relaxed">
            {UI_TRANSLATIONS[language].onboard_subtitle}
          </p>
        </div>

        <div className="space-y-6 relative">
          {/* Step 1: Equipment */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold">
              {UI_TRANSLATIONS[language].step1_label}
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2" id="training-mode-toggle-group">
              <button
                type="button"
                id="training-type-bodyweight"
                onClick={() => setTrainingType('bodyweight')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  trainingType === 'bodyweight'
                    ? 'bg-[#0075ba] border-[#0075ba]/80 text-white shadow-[0_0_15px_-3px_rgba(0,117,186,0.25)]'
                    : 'bg-[#152439] border-slate-800/85 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-lg transition-colors ${trainingType === 'bodyweight' ? 'bg-[#d3d3d3] text-[#0075ba]' : 'bg-slate-800 text-slate-400'}`}>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-bold tracking-tight ${trainingType === 'bodyweight' ? 'text-[#d3d3d3]' : 'text-slate-200'}`}>
                      {UI_TRANSLATIONS[language].bodyweight_btn_title}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 tracking-tight leading-snug">
                    {UI_TRANSLATIONS[language].bodyweight_btn_title}
                  </h4>
                  <p className={`text-[11px] leading-relaxed mt-1 ${trainingType === 'bodyweight' ? 'text-slate-200/95' : 'text-slate-400'}`}>
                    {UI_TRANSLATIONS[language].bodyweight_btn_desc}
                  </p>
                </div>
                {trainingType === 'bodyweight' && (
                  <div className="mt-3 text-[10px] text-white font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {UI_TRANSLATIONS[language].selected_status}
                  </div>
                )}
              </button>

              <button
                type="button"
                id="training-type-equipment"
                onClick={() => setTrainingType('equipment')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  trainingType === 'equipment'
                    ? 'bg-[#0075ba] border-[#0075ba]/80 text-white shadow-[0_0_15px_-3px_rgba(0,117,186,0.25)]'
                    : 'bg-[#152439] border-slate-800/85 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-lg transition-colors ${trainingType === 'equipment' ? 'bg-[#d3d3d3] text-[#0075ba]' : 'bg-slate-800 text-slate-400'}`}>
                      <Dumbbell className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-bold tracking-tight ${trainingType === 'equipment' ? 'text-[#d3d3d3]' : 'text-slate-200'}`}>
                      {UI_TRANSLATIONS[language].equip_btn_title}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 tracking-tight leading-snug">
                    {UI_TRANSLATIONS[language].equip_btn_title}
                  </h4>
                  <p className={`text-[11px] leading-relaxed mt-1 ${trainingType === 'equipment' ? 'text-slate-200/95' : 'text-slate-400'}`}>
                    {UI_TRANSLATIONS[language].equip_btn_desc}
                  </p>
                </div>
                {trainingType === 'equipment' && (
                  <div className="mt-3 text-[10px] text-white font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {UI_TRANSLATIONS[language].selected_status}
                  </div>
                )}
              </button>
            </div>

            {/* If with equipment is selected, animate & display the modular checkbox list */}
            {trainingType === 'equipment' && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-3 p-4 bg-[#152439] border border-slate-800/65 rounded-xl mt-3-override"
                id="equipment-options-block"
              >
                {/* Visual Note describing helper logic */}
                <div className="flex items-start gap-2.5 text-xs leading-relaxed font-sans bg-[#1b2b48] border-r-4 border-r-[#0075ba] p-2.5 rounded-lg">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#0075ba]" />
                  <span className="text-[11px] leading-relaxed text-[#d3d3d3]">
                    <strong>{UI_TRANSLATIONS[language].note_label}</strong> {UI_TRANSLATIONS[language].note_details}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1" id="equipment-select-grid">
                  {equipmentOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = selectedEquipment.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        id={`equip-btn-${opt.id}`}
                        onClick={() => toggleEquipment(opt.id)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl text-left border cursor-pointer transition-all duration-200 group relative ${
                          isSelected
                            ? 'bg-[#0075ba] border-[#0075ba]/80 text-white shadow-[0_0_10px_-2px_rgba(0,117,186,0.25)]'
                            : 'bg-[#142036] border-slate-800/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <div className={`p-2 rounded-lg transition-colors ${
                          isSelected ? 'bg-[#d3d3d3] text-[#0075ba]' : 'bg-slate-800/70 text-slate-400 group-hover:bg-slate-700/80'
                        }`}>
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-semibold truncate tracking-tight ${isSelected ? 'text-white' : 'text-slate-200'}`}>{opt.name}</p>
                          <p className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-[#d3d3d3]/90' : 'text-slate-400'}`}>{opt.description}</p>
                        </div>
                        {isSelected && (
                          <div className="w-3.5 h-3.5 rounded-full bg-slate-950/40 text-[#f1f5f9] flex items-center justify-center border border-slate-700/30">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Step 2: Fitness Level */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold">
              {UI_TRANSLATIONS[language].step2_label}
            </label>
            <div className="space-y-2" id="level-select-grid">
              {levels.map((lvl) => {
                const isSelected = level === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    id={`level-btn-${lvl.id}`}
                    onClick={() => setLevel(lvl.id)}
                    className={`w-full text-left p-4 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                      isSelected
                        ? 'bg-[#0075ba] border-[#0075ba]/80 text-white shadow-[0_0_15px_-3px_rgba(0,117,186,0.25)]'
                        : 'bg-[#152439] border-slate-800/85 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold tracking-tight ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {lvl.title}
                        </span>
                        <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-extrabold tracking-wider ${
                          isSelected 
                            ? 'bg-slate-950/40 text-[#f1f5f9] border border-slate-700/30' 
                            : 'bg-[#0075ba]/10 text-[#29a0e6] border border-[#0075ba]/25'
                        }`}>
                          {lvl.badge}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-slate-950/40 text-[#f1f5f9] flex items-center justify-center border border-slate-700/30">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className={`text-xs mt-1 leading-relaxed ${isSelected ? 'text-slate-200/95' : 'text-slate-400'}`}>{lvl.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-4 relative" id="onboarding-action-area">
          <button
            onClick={handleStart}
            id="start-workout-program-btn"
            className="w-full py-4 px-6 rounded-xl bg-[#83b900] hover:bg-[#96d200] text-white font-bold tracking-wide text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-transform duration-100 hover:scale-[1.01] active:scale-[0.99] font-display"
          >
            {UI_TRANSLATIONS[language].compile_btn}
            <Check className="w-4 h-4 text-white stroke-[3]" />
          </button>
          <p className="text-center text-[10px] text-slate-500 mt-3">
            {UI_TRANSLATIONS[language].onboard_offline_notice}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
