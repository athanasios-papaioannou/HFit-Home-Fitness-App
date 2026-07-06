/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Equipment, FitnessLevel, Workout, Exercise } from './types';

// Large static database of realistic exercises
export const EXERCISE_DATABASE: Exercise[] = [
  {
    id: 'jumping_jacks',
    name: 'Jumping Jacks',
    description: 'A classic high-tempo cardio movement. Stand with feet together and arms at sides. Simultaneously jump feet out to the sides and raise arms above head.',
    sets: 3,
    reps: '45 seconds',
    duration: 45,
    equipmentRequired: [Equipment.BODYWEIGHT],
  },
  {
    id: 'high_knees',
    name: 'High Knees Run',
    description: 'Run in place, lifting your knees up to hip level as fast as possible. Keep your core tight and pump your arms for maximum cardio intensity.',
    sets: 3,
    reps: '45 seconds',
    duration: 45,
    equipmentRequired: [Equipment.BODYWEIGHT],
  },
  {
    id: 'mountain_climbers',
    name: 'Mountain Climbers',
    description: 'Start in a high plank position. Alternately drive knees forward toward chest in a rapid, controlled running motion to fire up your lungs.',
    sets: 3,
    reps: '40 seconds',
    duration: 40,
    equipmentRequired: [Equipment.BODYWEIGHT],
  },
  {
    id: 'burpees',
    name: 'Full Body Burpees',
    description: 'The ultimate bodyweight conditioning drill. Drop to a squat, kick feet back, touch chest to the floor, pull feet in, and jump exploded with arms high.',
    sets: 3,
    reps: '10-12 reps',
    duration: 60,
    equipmentRequired: [Equipment.BODYWEIGHT],
  },
  {
    id: 'shadow_boxing',
    name: 'Shadow Boxing Action',
    description: 'Maintain an active fighting stance, bouncing slightly on your feet. Throw steady combinations of jabs, crosses, hooks, and uppercuts in the air.',
    sets: 3,
    reps: '60 seconds',
    duration: 60,
    equipmentRequired: [Equipment.BODYWEIGHT],
  },
  {
    id: 'skater_jumps',
    name: 'Skater Jumps',
    description: 'Leap laterally to the right, landing on your right foot while sweeping your left leg behind. Jump back to the left. Mimics speed skating.',
    sets: 3,
    reps: '45 seconds',
    duration: 45,
    equipmentRequired: [Equipment.BODYWEIGHT],
  },
  {
    id: 'butt_kicks',
    name: 'Butt Kicks Sprint',
    description: 'Run in place while bringing your heels up to strike your glutes on each stride. Focus on rapid foot turnovers and steady breathing.',
    sets: 3,
    reps: '45 seconds',
    duration: 45,
    equipmentRequired: [Equipment.BODYWEIGHT],
  },
  {
    id: 'plank_jacks',
    name: 'Plank Jacks',
    description: 'From a forearm or high plank position, jump your feet wide and then jump them back together, keeping your hips steady and core braced.',
    sets: 3,
    reps: '40 seconds',
    duration: 40,
    equipmentRequired: [Equipment.BODYWEIGHT, Equipment.MAT],
  },
  {
    id: 'squat_jumps',
    name: 'Jump Squats',
    description: 'Perform a standard squat, then explode upwards into a jump. Land softly in a squat and repeat immediately to improve power and stamina.',
    sets: 3,
    reps: '12-15 reps',
    duration: 45,
    equipmentRequired: [Equipment.BODYWEIGHT],
  },
  {
    id: 'simulated_jump_rope',
    name: 'Simulated Jump Rope',
    description: 'Bounce lightly on the balls of your feet with small, quick jumps while rotating your wrists as if holding a real jump rope.',
    sets: 4,
    reps: '60 seconds',
    duration: 60,
    equipmentRequired: [Equipment.BODYWEIGHT],
  },
  {
    id: 'fast_feet',
    name: 'Fast Feet Agility Sprint',
    description: 'Drop into a shallow athletic stance and tap your feet up and down as fast as possible on the floor. Maximum velocity cardio drill.',
    sets: 3,
    reps: '30 seconds',
    duration: 30,
    equipmentRequired: [Equipment.BODYWEIGHT],
  },
  {
    id: 'star_jumps',
    name: 'Star Jumps',
    description: 'Crouch down slightly, then leap explosively into the air, extending your arms and legs wide to form a star shape before landing softly.',
    sets: 3,
    reps: '10-12 reps',
    duration: 45,
    equipmentRequired: [Equipment.BODYWEIGHT],
  },
  {
    id: 'dumbbell_swings',
    name: 'Dumbbell Power Swings',
    description: 'Hold a single dumbbell with both hands. Hinge back at the hips, then drive hips forward explosively to swing the dumbbell up to eye level.',
    sets: 4,
    reps: '15-20 reps',
    duration: 60,
    equipmentRequired: [Equipment.DUMBBELLS],
  },
  {
    id: 'dumbbell_thrusters',
    name: 'Dumbbell Thrusters',
    description: 'Hold dumbbells at shoulder level. Lower into a squat, and press the dumbbells explosively overhead in a single fluid movement as you rise.',
    sets: 3,
    reps: '10-12 reps',
    duration: 60,
    equipmentRequired: [Equipment.DUMBBELLS],
  },
  {
    id: 'banded_woodchopper_fast',
    name: 'Fast Banded Woodchoppers',
    description: 'Secure band at anchor, grab handle, rotate hip and drive hands diagonally to hips with high velocity core control.',
    sets: 3,
    reps: '15 reps per side',
    duration: 45,
    equipmentRequired: [Equipment.BANDS],
  },
  {
    id: 'bear_crawl',
    name: 'Bear Crawl',
    description: 'Get on hands and knees, lift knees 2 inches off floor. Crawl forward and backward while keeping your back flat like a tabletop.',
    sets: 3,
    reps: '45 seconds',
    duration: 45,
    equipmentRequired: [Equipment.BODYWEIGHT, Equipment.MAT],
  },
  // STRENGTH
  {
    id: 'bodyweight_squat',
    name: 'Bodyweight Squats',
    description: 'Stand with feet shoulder-width apart. Lower your hips back and down as if sitting in a chair, keeping your chest up and knees behind toes.',
    sets: 3,
    reps: '12-15 reps',
    duration: 60,
    equipmentRequired: [Equipment.BODYWEIGHT],
  },
  {
    id: 'pushup',
    name: 'Push-Ups',
    description: 'Keep your body in a straight line from head to heels. Lower your chest until it nearly touches the floor, then push back up to starting position.',
    sets: 3,
    reps: '10-12 reps',
    duration: 60,
    equipmentRequired: [Equipment.BODYWEIGHT],
  },
  {
    id: 'decline_pushup',
    name: 'Decline Push-Ups',
    description: 'Place your feet on an elevated surface (couch, chair) and hands on the floor. Lower your chest to the ground and push back up.',
    sets: 4,
    reps: '8-12 reps',
    duration: 75,
    equipmentRequired: [Equipment.BODYWEIGHT],
  },
  {
    id: 'dumbbell_goblet_squat',
    name: 'Dumbbell Goblet Squats',
    description: 'Hold a single dumbbell vertically by its head securely in front of your chest. Squat down deeply while keeping your back flat.',
    sets: 3,
    reps: '10-12 reps',
    duration: 75,
    equipmentRequired: [Equipment.DUMBBELLS],
  },
  {
    id: 'dumbbell_floor_press',
    name: 'Dumbbell Floor Press',
    description: 'Lie flat on your back on an exercise mat with knees bent. Press dumbbells upward from your chest level until your arms are fully extended.',
    sets: 3,
    reps: '10-12 reps',
    duration: 60,
    equipmentRequired: [Equipment.DUMBBELLS, Equipment.MAT],
  },
  {
    id: 'dumbbell_row',
    name: 'Single-Arm Dumbbell Rows',
    description: 'Hinge forward at the hips, keeping your back flat. Drive your elbow upward, pulling the dumbbell toward your hip bone.',
    sets: 3,
    reps: '10 reps per side',
    duration: 60,
    equipmentRequired: [Equipment.DUMBBELLS],
  },
  {
    id: 'banded_lat_pulldown',
    name: 'Banded Lat Pulldowns',
    description: 'Anchor your band high. Kneel down, extend hands up engaging the band, and pull down toward your upper chest, pinching your shoulder blades.',
    sets: 3,
    reps: '12-15 reps',
    duration: 60,
    equipmentRequired: [Equipment.BANDS],
  },
  {
    id: 'banded_chest_fly',
    name: 'Banded Chest Flyes',
    description: 'Anchor the band behind your back at shoulder level. Bring hands together in a wide hugging motion, squeezing the pectorals.',
    sets: 3,
    reps: '15 reps',
    duration: 45,
    equipmentRequired: [Equipment.BANDS],
  },
  {
    id: 'pullup',
    name: 'Classic Pull-Ups',
    description: 'Hang from the bar with palms facing away. Pull your chest up to the bar, engaging your lats and keeping your shoulders packed.',
    sets: 3,
    reps: '5-8 reps',
    duration: 90,
    equipmentRequired: [Equipment.PULLUP_BAR],
  },
  {
    id: 'chinup',
    name: 'Underhand Chin-Ups',
    description: 'Hang from the bar with an underhand grip (palms facing you). Pull your chin over the bar, targeting your biceps and upper back.',
    sets: 3,
    reps: '6-10 reps',
    duration: 90,
    equipmentRequired: [Equipment.PULLUP_BAR],
  },
  {
    id: 'banded_glute_bridge',
    name: 'Banded Glute Bridges',
    description: 'Place a band around your knees. Lie on your back on the mat, bend knees, and drive hips upward while pushing knees outward against the band.',
    sets: 3,
    reps: '15-20 reps',
    duration: 60,
    equipmentRequired: [Equipment.BANDS, Equipment.MAT],
  },
  {
    id: 'dumbbell_romanian_deadlift',
    name: 'Dumbbell Romanian Deadlifts',
    description: 'Hold dumbbells in front of thighs. Hinge back at the hips, lowering weights down your shins while maintaining a completely flat spine.',
    sets: 3,
    reps: '10-12 reps',
    duration: 75,
    equipmentRequired: [Equipment.DUMBBELLS],
  },
  {
    id: 'dumbbell_bicep_curl',
    name: 'Dumbbell Bicep Curls',
    description: 'Stand tall with dumbbells at sides. Keep elbows pinned close to hips and curl weights upward towards shoulders, rotating palms.',
    sets: 3,
    reps: '12 reps',
    duration: 45,
    equipmentRequired: [Equipment.DUMBBELLS],
  },
  {
    id: 'banded_bicep_curl',
    name: 'Resistance Band Curls',
    description: 'Step on the band with feet shoulder-width apart. Grab handles/ends and curl hands towards shoulders, maintaining tension throughout.',
    sets: 3,
    reps: '15 reps',
    duration: 45,
    equipmentRequired: [Equipment.BANDS],
  },
  {
    id: 'overhead_press',
    name: 'Dumbbell Overhead Press',
    description: 'Stand with core tight. Lift dumbbells to shoulder height, palms forward, and press straight upwards until elbows lock out.',
    sets: 3,
    reps: '10 reps',
    duration: 60,
    equipmentRequired: [Equipment.DUMBBELLS],
  },
  {
    id: 'banded_lateral_raise',
    name: 'Banded Lateral Raises',
    description: 'Anchor band underneath feet. Raise arms outwards to side up to shoulder level keeping a slight bend in your elbow.',
    sets: 3,
    reps: '15 reps',
    duration: 45,
    equipmentRequired: [Equipment.BANDS],
  },
  // CORE
  {
    id: 'plank',
    name: 'Forearm Plank',
    description: 'Hold a pushup-type posture but on your forearms. Keep your core tight, squeezing glutes and quad muscles. Do not let hips sag.',
    sets: 3,
    reps: '45 seconds',
    duration: 45,
    equipmentRequired: [Equipment.BODYWEIGHT, Equipment.MAT],
  },
  {
    id: 'bicycle_crunch',
    name: 'Bicycle Crunches',
    description: 'Lie on your back with hands behind head. Alternately match opposite elbow to opposite knee while cycling legs back and forth.',
    sets: 3,
    reps: '15 per side',
    duration: 45,
    equipmentRequired: [Equipment.BODYWEIGHT, Equipment.MAT],
  },
  {
    id: 'banded_woodchopper',
    name: 'Banded Woodchoppers',
    description: 'Anchor band lower to the ground. Swing band diagonally upwards across body using your core, rotating your hips.',
    sets: 3,
    reps: '12 reps per side',
    duration: 60,
    equipmentRequired: [Equipment.BANDS],
  },
  {
    id: 'flutter_kicks',
    name: 'Flutter Kicks',
    description: 'Lie flat on your mat, lower back flat to the floor. Lift feet slightly and perform small, rapid scissor kicks up and down.',
    sets: 3,
    reps: '30 seconds',
    duration: 30,
    equipmentRequired: [Equipment.BODYWEIGHT, Equipment.MAT],
  }
];

// Helper to check if user has all the equipment required.
// Note: bodyweight only is always true.
export function canPerform(exercise: Exercise, userEquipment: Equipment[]): boolean {
  const req = exercise.equipmentRequired;
  if (req.length === 0) {
    return true;
  }
  
  // If the only requirement is bodyweight, it's always allowed.
  if (req.length === 1 && req[0] === Equipment.BODYWEIGHT) {
    return true;
  }

  // Filter out BODYWEIGHT from the checklist since it's always available
  const actualRequirements = req.filter(eq => eq !== Equipment.BODYWEIGHT);
  if (actualRequirements.length === 0) {
    return true;
  }

  // Every single actual equipment required must be present in userEquipment
  return actualRequirements.every(eq => userEquipment.includes(eq));
}

export function getExerciseCategory(id: string): { isStrength: boolean; isCardio: boolean; isCore: boolean; bodyParts: string[] } {
  const mapping: Record<string, { isStrength: boolean; isCardio: boolean; isCore: boolean; bodyParts: string[] }> = {
    jumping_jacks: { isStrength: false, isCardio: true, isCore: false, bodyParts: [] },
    high_knees: { isStrength: false, isCardio: true, isCore: false, bodyParts: [] },
    mountain_climbers: { isStrength: false, isCardio: true, isCore: true, bodyParts: ['legs'] },
    burpees: { isStrength: true, isCardio: true, isCore: false, bodyParts: ['chest', 'legs'] },
    shadow_boxing: { isStrength: false, isCardio: true, isCore: false, bodyParts: [] },
    skater_jumps: { isStrength: false, isCardio: true, isCore: false, bodyParts: ['legs'] },
    butt_kicks: { isStrength: false, isCardio: true, isCore: false, bodyParts: [] },
    plank_jacks: { isStrength: false, isCardio: true, isCore: true, bodyParts: [] },
    squat_jumps: { isStrength: false, isCardio: true, isCore: false, bodyParts: ['legs'] },
    simulated_jump_rope: { isStrength: false, isCardio: true, isCore: false, bodyParts: [] },
    fast_feet: { isStrength: false, isCardio: true, isCore: false, bodyParts: [] },
    star_jumps: { isStrength: false, isCardio: true, isCore: false, bodyParts: [] },
    dumbbell_swings: { isStrength: true, isCardio: true, isCore: false, bodyParts: ['legs'] },
    dumbbell_thrusters: { isStrength: true, isCardio: true, isCore: false, bodyParts: ['legs', 'arms'] },
    banded_woodchopper_fast: { isStrength: false, isCardio: true, isCore: true, bodyParts: [] },
    bear_crawl: { isStrength: true, isCardio: true, isCore: true, bodyParts: [] },
    
    bodyweight_squat: { isStrength: true, isCardio: false, isCore: false, bodyParts: ['legs'] },
    pushup: { isStrength: true, isCardio: false, isCore: false, bodyParts: ['chest', 'arms'] },
    decline_pushup: { isStrength: true, isCardio: false, isCore: false, bodyParts: ['chest', 'arms'] },
    dumbbell_goblet_squat: { isStrength: true, isCardio: false, isCore: false, bodyParts: ['legs'] },
    dumbbell_floor_press: { isStrength: true, isCardio: false, isCore: false, bodyParts: ['chest', 'arms'] },
    dumbbell_row: { isStrength: true, isCardio: false, isCore: false, bodyParts: ['back', 'arms'] },
    banded_lat_pulldown: { isStrength: true, isCardio: false, isCore: false, bodyParts: ['back', 'arms'] },
    banded_chest_fly: { isStrength: true, isCardio: false, isCore: false, bodyParts: ['chest'] },
    pullup: { isStrength: true, isCardio: false, isCore: false, bodyParts: ['back', 'arms'] },
    chinup: { isStrength: true, isCardio: false, isCore: false, bodyParts: ['back', 'arms'] },
    banded_glute_bridge: { isStrength: true, isCardio: false, isCore: false, bodyParts: ['legs'] },
    dumbbell_romanian_deadlift: { isStrength: true, isCardio: false, isCore: false, bodyParts: ['legs'] },
    dumbbell_bicep_curl: { isStrength: true, isCardio: false, isCore: false, bodyParts: ['arms'] },
    banded_bicep_curl: { isStrength: true, isCardio: false, isCore: false, bodyParts: ['arms'] },
    overhead_press: { isStrength: true, isCardio: false, isCore: false, bodyParts: ['arms'] },
    banded_lateral_raise: { isStrength: true, isCardio: false, isCore: false, bodyParts: ['arms'] },
    
    plank: { isStrength: false, isCardio: false, isCore: true, bodyParts: [] },
    bicycle_crunch: { isStrength: false, isCardio: false, isCore: true, bodyParts: [] },
    banded_woodchopper: { isStrength: true, isCardio: false, isCore: true, bodyParts: [] },
    flutter_kicks: { isStrength: false, isCardio: false, isCore: true, bodyParts: [] }
  };
  return mapping[id] || { isStrength: true, isCardio: false, isCore: false, bodyParts: [] };
}

// Generate workout based on user profile and day offset (to give different workouts for different days)
export function generateWorkoutForUser(
  equipment: Equipment[],
  duration: number,
  level: FitnessLevel,
  dayOffset: number = 0,
  focusCategory: 'strength' | 'cardio' | 'core' | 'combo' = 'combo',
  bodyPart: 'all' | 'chest' | 'back' | 'arms' | 'legs' = 'all',
  excludeBodyweight: boolean = false
): Workout {
  // Filter exercise database by user equipment capability
  let allowedExercises = EXERCISE_DATABASE.filter(ex => canPerform(ex, equipment));

  if (excludeBodyweight) {
    allowedExercises = allowedExercises.filter(ex => {
      const isBodyweightOnly = ex.equipmentRequired.length === 0 || 
        (ex.equipmentRequired.length === 1 && ex.equipmentRequired[0] === Equipment.BODYWEIGHT);
      return !isBodyweightOnly;
    });
  } else {
    if (allowedExercises.length < 3) {
      // Fallback: add bodyweight exercises to ensure we have enough
      allowedExercises = [...allowedExercises, ...EXERCISE_DATABASE.filter(ex => ex.equipmentRequired.includes(Equipment.BODYWEIGHT))];
    }
  }

  // Filter by daily focus category
  let filtered = [...allowedExercises];
  if (focusCategory === 'strength') {
    filtered = filtered.filter(ex => {
      const cat = getExerciseCategory(ex.id);
      if (!cat.isStrength) return false;
      if (bodyPart !== 'all') {
        const hasBodyPart = cat.bodyParts.includes(bodyPart);
        return hasBodyPart;
      }
      return true;
    });
  } else if (focusCategory === 'cardio') {
    filtered = filtered.filter(ex => getExerciseCategory(ex.id).isCardio);
  } else if (focusCategory === 'core') {
    filtered = filtered.filter(ex => getExerciseCategory(ex.id).isCore);
  }

  // Fallback if we don't have enough exercises under this tight filter
  if (filtered.length < 2) {
    if (focusCategory === 'strength' && bodyPart !== 'all') {
      // Relax body part to get any strength exercise
      filtered = allowedExercises.filter(ex => getExerciseCategory(ex.id).isStrength);
    }
    if (filtered.length < 2) {
      // Return to general allowed exercises
      filtered = [...allowedExercises];
    }
  }

  // Deduplicate
  const uniqueAllowed = Array.from(new Set(filtered));

  // Determine workout categories & length based on duration chosen (10, 20, 30, 45, 60)
  // Number of exercises
  let targetCount = 3;
  if (duration === 10) targetCount = 3;
  else if (duration === 20) targetCount = 4;
  else if (duration === 30) targetCount = 5;
  else if (duration === 45) targetCount = 6;
  else if (duration === 60) targetCount = 8;

  // Let's create specific focus themes based on the inputs
  let focusTitle = '';
  let focusDesc = '';
  if (focusCategory === 'strength') {
    const partNames: Record<string, string> = {
      all: 'Full Body Workout',
      chest: 'Chest Focus',
      back: 'Back Isolation',
      arms: 'Arms & Shoulders',
      legs: 'Lower Body Base',
    };
    focusTitle = `${partNames[bodyPart] || 'Full Body Strength'}`;
    focusDesc = `Focusing on muscle building, tone, and power for ${partNames[bodyPart]?.toLowerCase() || 'muscle groups'}.`;
  } else if (focusCategory === 'cardio') {
    focusTitle = 'Pure Cardio Ignition';
    focusDesc = 'Focusing on elevated heart rate, athletic endurance, fat burn, and respiratory health.';
  } else if (focusCategory === 'core') {
    focusTitle = 'Abs & Core Fortitude';
    focusDesc = 'Focusing on midsection stability, abdominal strength, pelvic control, and posture.';
  } else {
    const themes = [
      { name: 'Core & Endurance Ignition', focus: 'Core & Conditioning' },
      { name: 'Full-Body Athletic Build', focus: 'Full Body' },
      { name: 'Upper Body Power & Pump', focus: 'Upper Body Focus' },
      { name: 'Lower Body & Core Fortitude', focus: 'Legs & Midsection' },
      { name: 'Peak Aerobic Burnout', focus: 'High Intensity Cardio' },
    ];
    const theme = themes[dayOffset % themes.length];
    focusTitle = theme.name;
    focusDesc = `A customized home routine targeting ${theme.focus.toLowerCase()} built for you.`;
  }

  // Adjust sets and reps multipliers based on fitness level
  let setsMultiplier = 3;
  let levelDescriptor = '';
  switch (level) {
    case FitnessLevel.BEGINNER:
      setsMultiplier = 3;
      levelDescriptor = 'Base';
      break;
    case FitnessLevel.INTERMEDIATE:
      setsMultiplier = 3;
      levelDescriptor = 'Pro';
      break;
    case FitnessLevel.ADVANCED:
      setsMultiplier = 4;
      levelDescriptor = 'Elite';
      break;
  }

  // Shuffle or reliably pick based on dayOffset
  const selected: Exercise[] = [];
  const tempArray = [...uniqueAllowed];

  // Let's seed shuffling using dayOffset to get varying workouts
  for (let i = 0; i < tempArray.length; i++) {
    const seed = (i + dayOffset * 3) % tempArray.length;
    const temp = tempArray[i];
    tempArray[i] = tempArray[seed];
    tempArray[seed] = temp;
  }

  // Make sure we have a diverse mix
  // Try to fit up to targeted count
  for (const ex of tempArray) {
    if (selected.length >= targetCount) break;

    // Adapt sets based on fitness level and selected duration
    let computedSets = setsMultiplier;
    if (duration === 10) {
      computedSets = Math.min(3, computedSets);
    } else if (duration === 20) {
      computedSets = Math.min(3, computedSets);
    } else if (duration === 30) {
      computedSets = Math.max(3, computedSets);
    } else if (duration === 45) {
      computedSets = Math.max(4, computedSets);
    } else if (duration === 60) {
      computedSets = level === FitnessLevel.ADVANCED ? 6 : (level === FitnessLevel.BEGINNER ? 4 : 5);
    }

    selected.push({
      ...ex,
      // Adapt sets based on calculation
      sets: computedSets,
      // Adapt reps description slightly
      reps: adaptRepsForLevel(ex.reps, level),
    });
  }

  return {
    id: `workout_${level}_${duration}_${dayOffset}_${focusCategory}_${bodyPart}`,
    name: `${focusTitle} [${levelDescriptor}]`,
    description: `${focusDesc} Customized for your ${level} level and ${duration}-minute window.`,
    duration: duration,
    exercises: selected,
    targetFocus: focusTitle,
  };
}

function adaptRepsForLevel(reps: string, level: FitnessLevel): string {
  if (reps.includes('seconds') || reps.includes('second')) {
    const seconds = parseInt(reps);
    if (!isNaN(seconds)) {
      if (level === FitnessLevel.BEGINNER) return `${Math.max(20, seconds - 15)}s work / 30s rest`;
      if (level === FitnessLevel.INTERMEDIATE) return `${seconds}s work / 20s rest`;
      if (level === FitnessLevel.ADVANCED) return `${seconds + 15}s work / 15s rest`;
    }
    return reps;
  }

  // e.g., "10-12 reps" -> parsing reps
  const match = reps.match(/(\d+)-?(\d+)?\s*(reps|rep)?/);
  if (match) {
    const min = parseInt(match[1]);
    const max = match[2] ? parseInt(match[2]) : min;
    if (level === FitnessLevel.BEGINNER) {
      return `${Math.max(6, min - 2)}-${Math.max(8, max - 2)} reps`;
    }
    if (level === FitnessLevel.ADVANCED) {
      return `${min + 4}-${max + 6} reps`;
    }
  }
  return reps;
}
