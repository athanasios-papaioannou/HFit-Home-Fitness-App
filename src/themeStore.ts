/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppTheme } from './types';

export interface ThemeStyles {
  bg: string;
  bgGlass: string;
  cardBg: string;
  border: string;
  accentText: string;
  accentBg: string;
  accentBgDeemphasized: string;
  accentBorder: string;
  selection: string;
  highContrastText: string;
  glowGradient: string;
  subtleText: string;
  btnPrimary: string;
  pillBg: string;
  accentColor: string; // 'emerald' | 'amber' | 'fuchsia' | 'indigo'
}

export const THEME_MAP: Record<AppTheme, ThemeStyles> = {
  [AppTheme.DEEP_SLATE]: {
    bg: 'bg-[linear-gradient(to_bottom,#0b1320,#121a2d,#152439)] text-slate-100',
    bgGlass: 'bg-slate-900/40',
    cardBg: 'bg-[#121a2d]',
    border: 'border-slate-800/80',
    accentText: 'text-[#29a0e6]',
    accentBg: 'bg-[#0075ba] text-white',
    accentBgDeemphasized: 'bg-[#0075ba]/10 text-[#29a0e6] border border-[#0075ba]/20',
    accentBorder: 'border-[#0075ba]/40',
    selection: 'selection:bg-[#0075ba]/30 selection:text-[#29a0e6]',
    highContrastText: 'text-white',
    glowGradient: 'from-[#0075ba]/10',
    subtleText: 'text-slate-400',
    btnPrimary: 'bg-[#83b900] hover:bg-[#96d200] text-white',
    pillBg: 'bg-[#152439] border border-slate-800/60 text-slate-400',
    accentColor: 'emerald',
  },
  [AppTheme.STEALTH_AMBER]: {
    bg: 'bg-[#0c0a09] text-stone-200',
    bgGlass: 'bg-stone-900/40',
    cardBg: 'bg-[#1c1917]',
    border: 'border-stone-800/80',
    accentText: 'text-amber-500',
    accentBg: 'bg-amber-500 text-stone-950',
    accentBgDeemphasized: 'bg-amber-500/15 text-amber-500 border border-amber-500/20',
    accentBorder: 'border-amber-500/40',
    selection: 'selection:bg-amber-500/30 selection:text-amber-500',
    highContrastText: 'text-stone-100',
    glowGradient: 'from-amber-950/15',
    subtleText: 'text-stone-400',
    btnPrimary: 'bg-amber-500 hover:bg-amber-400 text-stone-950',
    pillBg: 'bg-stone-900 border border-stone-800 text-stone-400',
    accentColor: 'amber',
  },
  [AppTheme.CYBERPUNK_VIOLET]: {
    bg: 'bg-[#0b0314] text-purple-200',
    bgGlass: 'bg-purple-950/20',
    cardBg: 'bg-[#140b24]',
    border: 'border-purple-950/80',
    accentText: 'text-fuchsia-400',
    accentBg: 'bg-fuchsia-500 text-purple-950',
    accentBgDeemphasized: 'bg-fuchsia-500/15 text-fuchsia-400 border border-fuchsia-500/20',
    accentBorder: 'border-fuchsia-500/40',
    selection: 'selection:bg-fuchsia-500/30 selection:text-fuchsia-400',
    highContrastText: 'text-white',
    glowGradient: 'from-fuchsia-950/15',
    subtleText: 'text-purple-400/80',
    btnPrimary: 'bg-fuchsia-500 hover:bg-fuchsia-400 text-purple-950',
    pillBg: 'bg-purple-950/30 border border-purple-900/55 text-purple-300',
    accentColor: 'fuchsia',
  },
  [AppTheme.NORDIC_LIGHT]: {
    bg: 'bg-[#f8fafc] text-slate-800',
    bgGlass: 'bg-slate-100/60',
    cardBg: 'bg-white',
    border: 'border-slate-200',
    accentText: 'text-indigo-600',
    accentBg: 'bg-indigo-600 text-white',
    accentBgDeemphasized: 'bg-indigo-50 text-indigo-600 border border-indigo-200',
    accentBorder: 'border-indigo-400/40',
    selection: 'selection:bg-indigo-200 selection:text-indigo-900',
    highContrastText: 'text-slate-900',
    glowGradient: 'from-slate-200/50',
    subtleText: 'text-slate-500',
    btnPrimary: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    pillBg: 'bg-slate-100 border border-slate-200/80 text-slate-600',
    accentColor: 'indigo',
  }
};
