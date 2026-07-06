/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum FitnessLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum AppTheme {
  DEEP_SLATE = 'deep_slate',
  STEALTH_AMBER = 'stealth_amber',
  CYBERPUNK_VIOLET = 'cyberpunk_violet',
  NORDIC_LIGHT = 'nordic_light',
}

export enum Equipment {
  DUMBBELLS = 'dumbbells',
  BANDS = 'bands',
  MAT = 'mat',
  BODYWEIGHT = 'bodyweight',
  PULLUP_BAR = 'pullup_bar',
}

export type WorkoutDuration = 10 | 20 | 30 | 45 | 60;

export interface UserProfile {
  equipment: Equipment[];
  duration: WorkoutDuration;
  level: FitnessLevel;
  theme?: AppTheme;
  isOnboarded: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: string;
  duration: number; // timer in seconds
  equipmentRequired: Equipment[];
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  exercises: Exercise[];
  targetFocus: string; // E.g., "Full Body", "Upper Body", "Core & Legs"
}

export interface WorkoutHistoryEntry {
  id: string;
  date: string; // YYYY-MM-DD
  workoutId: string;
  workoutName: string;
  completedAt: string; // ISO String
  durationSpent: number; // minutes
}

export interface WeeklyStreak {
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
}
