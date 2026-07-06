/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FitnessLevel, Equipment } from './types';

export type Language = 'en' | 'el';

// UI translation elements
export const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Top bar
    dashboard_title: 'Dashboard',
    lvl: 'LVL',
    t_min: 'T',
    mode: 'MODE',
    equipped: 'EQUIPPED (GEAR)',
    bodyweight_only: 'BODYWEIGHT ONLY',
    recalibrate_btn: 'CHANGE PROFILE',
    lang_btn: 'GR',

    // Onboarding
    onboard_title: 'H:Fit',
    onboard_subtitle: 'Calibrate your home setup & design your personal daily workout parameters.',
    step1_label: '01. Training Mode & Equipment',
    bodyweight_btn_title: 'BODYWEIGHT ONLY',
    bodyweight_btn_desc: 'No equipment required. Ideal for working out anywhere, using only your bodyweight.',
    equip_btn_title: 'WITH EQUIPMENT',
    equip_btn_desc: 'Select what equipment you have. Exercises utilizing your gear, as well as bodyweight movements, will be included.',
    selected_status: 'SELECTED',
    note_label: 'Note:',
    note_details: 'Even with equipment selected, the program will include bodyweight exercises to ensure a fully balanced routine. You can exclude bodyweight moves from daily targets.',
    step2_label: '02. Athletic Fitness Profile',
    compile_btn: 'COMPILE FITNESS PROGRAM',
    onboard_offline_notice: 'H:Fit runs your workouts safely offline in a secure local browser environment.',

    // Onboarding Equipment Options
    dumbbells_name: 'Dumbbells',
    dumbbells_desc: 'Adjustable or fixed pairs',
    bands_name: 'Resistance Bands',
    bands_desc: 'Loop bands or tube bands',
    pullup_bar_name: 'Pull-up Bar',
    pullup_bar_desc: 'Doorway or wall mounted',
    mat_name: 'Exercise Mat',
    mat_desc: 'Comfort for floor exercises',

    // Onboarding Fitness Levels
    level_beginner_title: 'Beginner',
    level_beginner_desc: 'Building joint mobility, form fundamentals, and work capacity. Ideal if returning to fitness.',
    level_intermediate_title: 'Intermediate',
    level_intermediate_desc: 'Moderate strength & metabolic conditioning. Familiar with core movements and active recovery.',
    level_advanced_title: 'Advanced',
    level_advanced_desc: 'High output, explosive strength, low-rest aerobic challenges. Designed for peak functional performance.',

    // Dashboard Goals & Stats Card
    today_workout: "TODAY'S WORKOUT",
    duration_label: 'MINS',
    target_focus: "TODAY'S TARGET FOCUS",
    target_muscle_group: 'TARGET MUSCLE GROUP',
    workout_duration: 'WORKOUT DURATION',
    exclude_bodyweight_label: 'Exclude Bodyweight / Gear Only Mode',
    exclude_bodyweight_desc: 'Enable to filter and display ONLY exercises that require your selected equipment.',
    your_gear_label: 'YOUR GEAR CONFIGURATION:',
    generate_workout_btn: 'GENERATE DAILY WORKOUT',
    start_workout_btn: 'START ACTIVE WORKOUT',
    no_workouts_avail: 'No exercises match your selection. Try disabling the Exclude Bodyweight toggle.',

    // Stats Panel
    stats_title: 'PERFORMANCE STATISTICS',
    total_completed: 'Total Workouts',
    total_minutes: 'Minutes Active',
    avg_duration: 'Average Session',
    streak_gauge_label: '7-DAY STREAK GAUGE',
    consec_days: 'consecutive days',
    weekly_overview: 'WEEKLY OVERVIEW STATUS',

    // Workout history
    recent_logs_title: 'RECENT COMPLETED LOGS',
    no_logs_yet: 'No sessions logged yet. Complete today\'s target program to see your progress recorded here!',
    log_mins: 'mins spent',

    // Theme selector
    theme_selector_title: 'THEME SWITCHER',
    theme_deep_slate: 'Deep Space Slate',
    theme_stealth_amber: 'Stealth Amber',
    theme_cyberpunk_violet: 'Cyberpunk Violet',
    theme_nordic_light: 'Nordic Light',

    // Workout Session screen
    exercise_tag: 'EXERCISE',
    of_tag: 'OF',
    sets_header: 'SETS INSTRUCTION',
    cancel_session_btn: 'CANCEL SESSION',
    completed_tag: 'COMPLETED',
    ready_set: 'READY FOR SET',
    finish_workout_btn: 'COMPLETE WORKOUT',
    completed_sets_desc: 'Complete all sets of an exercise to unlock the next, preserving structural progression.',
    work_timer: 'WORK TIME',
    rest_timer: 'REST TIME',
    sec_left: 's left',
    sec_rest: 's rest',
    start_set_btn: 'START ACTIVE SET TIMER',
    pause_btn: 'PAUSE LIMIT',
    resume_btn: 'RESUME',
    sound_on: 'Beep: ON',
    sound_off: 'Beep: OFF',
    locked_pending: 'LOCKED (PENDING)',
    locked_complete_prev: 'Locked (Complete previous set)',

    // Congrats screen
    congrats_heading: 'WORKOUT COMPILED & MASTERED',
    congrats_desc: 'Excellent effort! Your muscles, lungs, and central nervous system are calibrated. Results are built daily.',
    session_report: 'SESSION METRICS REPORT',
    minutes_spent: 'Minutes Spent',
    current_streak: 'Current Streak',
    streak_suffix: 'day streak',
    keep_going: 'Keep up the rhythm tomorrow!',
    return_dashboard_btn: 'RETURN TO WORKOUT CONSOLE',

    // Confirmation Modals
    confirm_abandon_title: 'Abandon Active Session?',
    confirm_abandon_msg: "Do you want to abandon this session? Reps completed so far won't be logged.",
    confirm_recalibrate_title: 'Reset Program & Re-calibrate?',
    confirm_recalibrate_msg: 'Are you sure you want to re-calibrate? This resets parameters like equipment, duration, and fitness level, but safely keeps your workout history logs.',
    modal_cancel: 'CANCEL',
    modal_confirm: 'CONFIRM ACTION',
  },
  el: {
    // Top bar
    dashboard_title: 'Πίνακας Ελέγχου',
    lvl: 'ΕΠΙΠΕΔΟ',
    t_min: 'ΔΙΑΡΚ',
    mode: 'ΛΕΙΤΟΥΡΓΙΑ',
    equipped: 'ΜΕ ΕΞΟΠΛΙΣΜΟ',
    bodyweight_only: 'ΒΑΡΟΣ ΣΩΜΑΤΟΣ ΜΟΝΟ',
    recalibrate_btn: 'ΑΛΛΑΓΗ ΠΡΟΦΙΛ',
    lang_btn: 'EN',

    // Onboarding
    onboard_title: 'H:Fit',
    onboard_subtitle: 'Βαθμονομήστε τον οικιακό σας εξοπλισμό και σχεδιάστε τις καθημερινές σας προπονήσεις.',
    step1_label: '01. Τύπος Προπόνησης & Εξοπλισμός',
    bodyweight_btn_title: 'ΒΑΡΟΣ ΣΩΜΑΤΟΣ ΜΟΝΟ',
    bodyweight_btn_desc: 'Δεν απαιτείται εξοπλισμός. Ιδανικό για προπόνηση οπουδήποτε, χρησιμοποιώντας μόνο το σώμα σας.',
    equip_btn_title: 'ΜΕ ΕΞΟΠΛΙΣΜΟ',
    equip_btn_desc: 'Επιλέξτε τι εξοπλισμό διαθέτετε. Θα συμπεριληφθούν ασκήσεις με τον εξοπλισμό σας, καθώς και ασκήσεις σωματικού βάρους.',
    selected_status: 'ΕΠΙΛΕΧΘΗΚΕ',
    note_label: 'Σημείωση:',
    note_details: 'Ακόμα και με τον εξοπλισμό επιλεγμένο, το πρόγραμμα θα περιλαμβάνει ασκήσεις σωματικού βάρους για πλήρη ισορροπία. Μπορείτε να τις αποκλείσετε από τις ημερήσιες προτιμήσεις.',
    step2_label: '02. Αθλητικό Προφίλ Φυσικής Κατάστασης',
    compile_btn: 'ΔΗΜΙΟΥΡΓΙΑ ΠΡΟΓΡΑΜΜΑΤΟΣ',
    onboard_offline_notice: 'Το H:Fit εκτελείται με ασφάλεια τοπικά στο πρόγραμμα περιήγησής σας.',

    // Onboarding Equipment Options
    dumbbells_name: 'Αλτήρες (Dumbbells)',
    dumbbells_desc: 'Ρυθμιζόμενοι ή σταθεροί αλτήρες',
    bands_name: 'Λάστιχα Αντίστασης',
    bands_desc: 'Κλειστά λάστιχα ή λάστιχα με λαβές',
    pullup_bar_name: 'Μονόζυγο',
    pullup_bar_desc: 'Πόρτας ή τοίχου',
    mat_name: 'Στρώμα Γυμναστικής',
    mat_desc: 'Για άνεση στις ασκήσεις εδάφους',

    // Onboarding Fitness Levels
    level_beginner_title: 'Αρχάριος (Beginner)',
    level_beginner_desc: 'Εστίαση στην κινητικότητα των αρθρώσεων, τη σωστή τεχνική και την αντοχή. Ιδανικό αν επιστρέφετε στη γυμναστική.',
    level_intermediate_title: 'Μεσαίος (Intermediate)',
    level_intermediate_desc: 'Μέτρια δύναμη και μεταβολική προπόνηση. Εξοικειωμένος με τις βασικές κινήσεις και την ενεργή αποκατάσταση.',
    level_advanced_title: 'Προχωρημένος (Advanced)',
    level_advanced_desc: 'Υψηλή ένταση, εκρηκτική δύναμη και αερόβιες προκλήσεις με ελάχιστη ξεκούραση. Για κορυφαία λειτουργική απόδοση.',

    // Dashboard Goals & Stats Card
    today_workout: 'ΣΗΜΕΡΙΝΗ ΠΡΟΠΟΝΗΣΗ',
    duration_label: 'ΛΕΠΤΑ',
    target_focus: 'ΣΗΜΕΡΙΝΗ ΚΑΤΗΓΟΡΙΑ ΕΣΤΙΑΣΗΣ',
    target_muscle_group: 'ΣΤΟΧΟΣ ΜΥΪΚΗΣ ΟΜΑΔΑΣ',
    workout_duration: 'ΔΙΑΡΚΕΙΑ ΠΡΟΠΟΝΗΣΗΣ',
    exclude_bodyweight_label: 'Αποκλεισμός Σωματικού Βάρους / Μόνο Εξοπλισμός',
    exclude_bodyweight_desc: 'Ενεργοποιήστε το για να εμφανίζονται ΜΟΝΟ ασκήσεις που απαιτούν τον επιλεγμένο σας εξοπλισμό.',
    your_gear_label: 'ΣΥΝΔΕΔΕΜΕΝΟΣ ΕΞΟΠΛΙΣΜΟΣ:',
    generate_workout_btn: 'ΔΗΜΙΟΥΡΓΙΑ ΝΕΑΣ ΠΡΟΠΟΝΗΣΗΣ',
    start_workout_btn: 'ΕΝΑΡΞΗ ΠΡΟΠΟΝΗΣΗΣ',
    no_workouts_avail: 'Δεν βρέθηκαν ασκήσεις με αυτά τα κριτήρια. Δοκιμάστε να απενεργοποιήσετε τον Αποκλεισμό Σωματικού Βάρους.',

    // Stats Panel
    stats_title: 'ΜΕΤΡΗΣΕΙΣ ΑΠΟΔΟΣΗΣ',
    total_completed: 'Σύνολο',
    total_minutes: 'Διάρκεια',
    avg_duration: 'Μέση Διάρκεια',
    streak_gauge_label: 'ΜΕΤΡΗΤΗΣ ΣΕΡΙ 7 ΗΜΕΡΩΝ',
    consec_days: 'συνεχόμενες ημέρες',
    weekly_overview: 'ΚΑΤΑΣΤΑΣΗ ΕΒΔΟΜΑΔΑΣ',

    // Workout history
    recent_logs_title: 'ΠΡΟΣΦΑΤΑ ΟΛΟΚΛΗΡΩΜΕΝΕΣ ΠΡΟΠΟΝΗΣΕΙΣ',
    no_logs_yet: 'Δεν υπάρχουν ακόμη καταγεγραμμένες προπονήσεις. Ολοκληρώστε τη σημερινή σας προπόνηση για να δείτε την πρόοδό σας!',
    log_mins: 'λεπτά προπόνησης',

    // Theme selector
    theme_selector_title: 'ΕΠΙΛΟΓΗ ΘΕΜΑΤΟΣ',
    theme_deep_slate: 'Βαθύ Διάστημα (Slate)',
    theme_stealth_amber: 'Stealth Πορτοκαλί',
    theme_cyberpunk_violet: 'Cyberpunk Βιολετί',
    theme_nordic_light: 'Σκανδιναβικό Φως',

    // Workout Session screen
    exercise_tag: 'ΑΣΚΗΣΗ',
    of_tag: 'ΑΠΟ',
    sets_header: 'ΟΔΗΓΙΕΣ ΣΕΤ',
    cancel_session_btn: 'ΑΚΥΡΩΣΗ ΠΡΟΠΟΝΗΣΗΣ',
    completed_tag: 'ΟΛΟΚΛΗΡΩΘΗΚΕ',
    ready_set: 'ΕΤΟΙΜΟΣ ΓΙΑ ΣΕΤ',
    finish_workout_btn: 'ΟΛΟΚΛΗΡΩΣΗ ΠΡΟΠΟΝΗΣΗΣ',
    completed_sets_desc: 'Ολοκληρώστε όλα τα σετ μιας άσκησης για να ξεκλειδώσετε την επόμενη, διατηρώντας τη σωστή πρόοδο.',
    work_timer: 'ΧΡΟΝΟΣ ΑΣΚΗΣΗΣ',
    rest_timer: 'ΧΡΟΝΟΣ ΞΕΚΟΥΡΑΣΗΣ',
    sec_left: 'δευτ. απομένουν',
    sec_rest: 'δευτ. ξεκούρασης',
    start_set_btn: 'ΕΝΑΡΞΗ ΧΡΟΝΟΜΕΤΡΟΥ ΣΕΤ',
    pause_btn: 'ΠΑΥΣΗ',
    resume_btn: 'ΣΥΝΕΧΕΙΑ',
    sound_on: 'Ήχος: ΝΑΙ',
    sound_off: 'Ήχος: ΟΧΙ',
    locked_pending: 'ΚΛΕΙΔΩΜΕΝΟ (ΣΕ ΑΝΑΜΟΝΗ)',
    locked_complete_prev: 'Κλειδωμένο (Ολοκληρώστε το προηγούμενο σετ)',

    // Congrats screen
    congrats_heading: 'Η ΠΡΟΠΟΝΗΣΗ ΟΛΟΚΛΗΡΩΘΗΚΕ ΜΕ ΕΠΙΤΥΧΙΑ',
    congrats_desc: 'Εξαιρετική προσπάθεια! Οι μύες, οι πνεύμονες και το νευρικό σας σύστημα προσαρμόζονται. Τα αποτελέσματα χτίζονται μέρα με τη μέρα.',
    session_report: 'ΑΝΑΦΟΡΑ ΣΤΟΙΧΕΙΩΝ ΠΡΟΠΟΝΗΣΗΣ',
    minutes_spent: 'Λεπτά που Περάσαν',
    current_streak: 'Τρέχον Σερί',
    streak_suffix: 'ημέρες σερί',
    keep_going: 'Συνεχίστε με τον ίδιο ρυθμό αύριο!',
    return_dashboard_btn: 'ΕΠΙΣΤΡΟΦΗ ΣΤΟΝ ΠΙΝΑΚΑ ΕΛΕΓΧΟΥ',

    // Confirmation Modals
    confirm_abandon_title: 'Ακύρωση Ενεργής Προπόνησης;',
    confirm_abandon_msg: 'Θέλετε να ακυρώσετε αυτήν την προπόνηση; Τα σετ που έχετε ολοκληρώσει μέχρι τώρα δεν θα καταγραφούν.',
    confirm_recalibrate_title: 'Επαναφορά Προγράμματος & Νέα Βαθμονόμηση;',
    confirm_recalibrate_msg: 'Είστε σίγουροι ότι θέλετε να κάνετε νέα βαθμονόμηση; Αυτό θα επαναφέρει τον εξοπλισμό, τη διάρκεια και το επίπεδο φυσικής κατάστασης, αλλά θα κρατήσει με ασφάλεια το ιστορικό προπονήσεών σας.',
    modal_cancel: 'ΑΚΥΡΩΣΗ',
    modal_confirm: 'ΕΠΙΒΕΒΑΙΩΣΗ',
  }
};

// Map values for fitness profiles
export const FITNESS_LEVEL_TRANSLATION: Record<Language, Record<FitnessLevel, string>> = {
  en: {
    [FitnessLevel.BEGINNER]: 'Beginner',
    [FitnessLevel.INTERMEDIATE]: 'Intermediate',
    [FitnessLevel.ADVANCED]: 'Advanced',
  },
  el: {
    [FitnessLevel.BEGINNER]: 'Αρχάριος',
    [FitnessLevel.INTERMEDIATE]: 'Μεσαίος',
    [FitnessLevel.ADVANCED]: 'Προχωρημένος',
  }
};

export const EQUIPMENT_TRANSLATION: Record<Language, Record<Equipment, string>> = {
  en: {
    [Equipment.BODYWEIGHT]: 'Bodyweight Only',
    [Equipment.DUMBBELLS]: 'Dumbbells',
    [Equipment.BANDS]: 'Resistance Bands',
    [Equipment.PULLUP_BAR]: 'Pull-up Bar',
    [Equipment.MAT]: 'Exercise Mat',
  },
  el: {
    [Equipment.BODYWEIGHT]: 'Μόνο βάρος σώματος',
    [Equipment.DUMBBELLS]: 'Αλτήρες',
    [Equipment.BANDS]: 'Λάστιχα αντίστασης',
    [Equipment.PULLUP_BAR]: 'Μονόζυγο',
    [Equipment.MAT]: 'Στρώμα γυμναστικής',
  }
};

export const CATEGORY_TRANSLATION: Record<Language, Record<string, string>> = {
  en: {
    combo: 'Combo',
    strength: 'Strength',
    cardio: 'Cardio',
    core: 'Core',

    'combo_sub': 'Full Mix',
    'strength_sub': 'Weighted',
    'cardio_sub': 'Endurance',
    'core_sub': 'Abs',
  },
  el: {
    combo: 'Συνδυασμός',
    strength: 'Δύναμη',
    cardio: 'Cardio',
    core: 'Κορμός',

    'combo_sub': 'Μεικτή',
    'strength_sub': 'Με Βάρη',
    'cardio_sub': 'Αντοχή',
    'core_sub': 'Κοιλιακοί',
  }
};

export const BODYPART_TRANSLATION: Record<Language, Record<string, string>> = {
  en: {
    all: 'Full Body',
    chest: 'Chest Focus',
    back: 'Back Isolation',
    arms: 'Arms & Shoulders',
    legs: 'Lower Body Base',

    'all_sub': 'Entire Structure',
    'chest_sub': 'Pectorals',
    'back_sub': 'Lats & Rhomboids',
    'arms_sub': 'Biceps/Triceps/Delts',
    'legs_sub': 'Quads/Hamstrings/Calves',
  },
  el: {
    all: 'Όλο το Σώμα',
    chest: 'Στήθος',
    back: 'Πλάτη',
    arms: 'Χέρια & Ώμοι',
    legs: 'Πόδια & Κάτω Σύστημα',

    'all_sub': 'Full Body',
    'chest_sub': 'Θωρακικοί',
    'back_sub': 'Πλατύς Ραχιαίος',
    'arms_sub': 'Δικέφαλοι/Τρικέφαλοι/Ώμοι',
    'legs_sub': 'Τετρακέφαλοι/Μηριαίοι',
  }
};

export const EXERCISE_TRANSLATIONS: Record<Language, Record<string, { name: string; desc: string }>> = {
  en: {
    jumping_jacks: {
      name: 'Jumping Jacks',
      desc: 'A classic high-tempo cardio movement. Stand with feet together and arms at sides. Simultaneously jump feet out to the sides and raise arms above head.',
    },
    high_knees: {
      name: 'High Knees Run',
      desc: 'Run in place, lifting your knees up to hip level as fast as possible. Keep your core tight and pump your arms for maximum cardio intensity.',
    },
    mountain_climbers: {
      name: 'Mountain Climbers',
      desc: 'Start in a high plank position. Alternately drive knees forward toward chest in a rapid, controlled running motion to fire up your lungs.',
    },
    burpees: {
      name: 'Full Body Burpees',
      desc: 'The ultimate bodyweight conditioning drill. Drop to a squat, kick feet back, touch chest to the floor, pull feet in, and jump exploded with arms high.',
    },
    shadow_boxing: {
      name: 'Shadow Boxing Action',
      desc: 'Maintain an active fighting stance, bouncing slightly on your feet. Throw steady combinations of jabs, crosses, hooks, and uppercuts in the air.',
    },
    skater_jumps: {
      name: 'Skater Jumps',
      desc: 'Leap laterally to the right, landing on your right foot while sweeping your left leg behind. Jump back to the left. Mimics speed skating.',
    },
    butt_kicks: {
      name: 'Butt Kicks Sprint',
      desc: 'Run in place while bringing your heels up to strike your glutes on each stride. Focus on rapid foot turnovers and steady breathing.',
    },
    plank_jacks: {
      name: 'Plank Jacks',
      desc: 'From a forearm or high plank position, jump your feet wide and then jump them back together, keeping your hips steady and core braced.',
    },
    squat_jumps: {
      name: 'Jump Squats',
      desc: 'Perform a standard squat, then explode upwards into a jump. Land softly in a squat and repeat immediately to improve power and stamina.',
    },
    simulated_jump_rope: {
      name: 'Simulated Jump Rope',
      desc: 'Bounce lightly on the balls of your feet with small, quick jumps while rotating your wrists as if holding a real jump rope.',
    },
    fast_feet: {
      name: 'Fast Feet Agility Sprint',
      desc: 'Drop into a shallow athletic stance and tap your feet up and down as fast as possible on the floor. Maximum velocity cardio drill.',
    },
    star_jumps: {
      name: 'Star Jumps',
      desc: 'Crouch down slightly, then leap explosively into the air, extending your arms and legs wide to form a star shape before landing softly.',
    },
    dumbbell_swings: {
      name: 'Dumbbell Power Swings',
      desc: 'Hold a single dumbbell with both hands. Hinge back at the hips, then drive hips forward explosively to swing the dumbbell up to eye level.',
    },
    dumbbell_thrusters: {
      name: 'Dumbbell Thrusters',
      desc: 'Hold dumbbells at shoulder level. Lower into a squat, and press the dumbbells explosively overhead in a single fluid movement as you rise.',
    },
    banded_woodchopper_fast: {
      name: 'Fast Banded Woodchoppers',
      desc: 'Secure band at anchor, grab handle, rotate hip and drive hands diagonally to hips with high velocity core control.',
    },
    bear_crawl: {
      name: 'Bear Crawl',
      desc: 'Get on hands and knees, lift knees 2 inches off floor. Crawl forward and backward while keeping your back flat like a tabletop.',
    },
    bodyweight_squat: {
      name: 'Bodyweight Squats',
      desc: 'Stand with feet shoulder-width apart. Lower your hips back and down as if sitting in a chair, keeping your chest up and knees behind toes.',
    },
    pushup: {
      name: 'Push-Ups',
      desc: 'Keep your body in a straight line from head to heels. Lower your chest until it nearly touches the floor, then push back up to starting position.',
    },
    decline_pushup: {
      name: 'Decline Push-Ups',
      desc: 'Place your feet on an elevated surface (couch, chair) and hands on the floor. Lower your chest to the ground and push back up.',
    },
    dumbbell_goblet_squat: {
      name: 'Dumbbell Goblet Squats',
      desc: 'Hold a single dumbbell vertically by its head securely in front of your chest. Squat down deeply while keeping your back flat.',
    },
    dumbbell_floor_press: {
      name: 'Dumbbell Floor Press',
      desc: 'Lie flat on your back on an exercise mat with knees bent. Press dumbbells upward from your chest level until your arms are fully extended.',
    },
    dumbbell_row: {
      name: 'Single-Arm Dumbbell Rows',
      desc: 'Hinge forward at the hips, keeping your back flat. Drive your elbow upward, pulling the dumbbell toward your hip bone.',
    },
    banded_lat_pulldown: {
      name: 'Banded Lat Pulldowns',
      desc: 'Anchor your band high. Kneel down, extend hands up engaging the band, and pull down toward your upper chest, pinching your shoulder blades.',
    },
    banded_chest_fly: {
      name: 'Banded Chest Flyes',
      desc: 'Anchor the band behind your back at shoulder level. Bring hands together in a wide hugging motion, squeezing the pectorals.',
    },
    pullup: {
      name: 'Classic Pull-Ups',
      desc: 'Hang from the bar with palms facing away. Pull your chest up to the bar, engaging your lats and keeping your shoulders packed.',
    },
    chinup: {
      name: 'Underhand Chin-Ups',
      desc: 'Hang from the bar with an underhand grip (palms facing you). Pull your chin over the bar, targeting your biceps and upper back.',
    },
    banded_glute_bridge: {
      name: 'Banded Glute Bridges',
      desc: 'Place a band around your knees. Lie on your back on the mat, bend knees, and drive hips upward while pushing knees outward against the band.',
    },
    dumbbell_romanian_deadlift: {
      name: 'Dumbbell Romanian Deadlifts',
      desc: 'Hold dumbbells in front of thighs. Hinge back at the hips, lowering weights down your shins while maintaining a completely flat spine.',
    },
    dumbbell_bicep_curl: {
      name: 'Dumbbell Bicep Curls',
      desc: 'Stand tall with dumbbells at sides. Keep elbows pinned close to hips and curl weights upward towards shoulders, rotating palms.',
    },
    banded_bicep_curl: {
      name: 'Resistance Band Curls',
      desc: 'Step on the band with feet shoulder-width apart. Grab handles/ends and curl hands towards shoulders, maintaining tension throughout.',
    },
    overhead_press: {
      name: 'Dumbbell Overhead Press',
      desc: 'Stand with core tight. Lift dumbbells to shoulder height, palms forward, and press straight upwards until elbows lock out.',
    },
    banded_lateral_raise: {
      name: 'Banded Lateral Raises',
      desc: 'Anchor band underneath feet. Raise arms outwards to side up to shoulder level keeping a slight bend in your elbow.',
    },
    plank: {
      name: 'Forearm Plank',
      desc: 'Hold a pushup-type posture but on your forearms. Keep your core tight, squeezing glutes and quad muscles. Do not let hips sag.',
    },
    bicycle_crunch: {
      name: 'Bicycle Crunches',
      desc: 'Lie on your back with hands behind head. Alternately match opposite elbow to opposite knee while cycling legs back and forth.',
    },
    banded_woodchopper: {
      name: 'Banded Woodchoppers',
      desc: 'Anchor band lower to the ground. Swing band diagonally upwards across body using your core, rotating your hips.',
    },
    flutter_kicks: {
      name: 'Flutter Kicks',
      desc: 'Lie flat on your mat, lower back flat to the floor. Lift feet slightly and perform small, rapid scissor kicks up and down.',
    }
  },
  el: {
    jumping_jacks: {
      name: 'Jumping Jacks (Αλματάκια)',
      desc: 'Μια κλασική αερόβια κίνηση υψηλού ρυθμού. Σταθείτε με τα πόδια ενωμένα και τα χέρια στα πλάγια. Πηδήξτε ανοίγοντας τα πόδια ενώ ταυτόχρονα σηκώνετε τα χέρια πάνω από το κεφάλι.',
    },
    high_knees: {
      name: 'Τρέξιμο με Γόνατα Ψηλά (High Knees)',
      desc: 'Τρέξτε επιτόπου, σηκώνοντας τα γόνατά σας στο ύψος των γοφών όσο το δυνατόν γρηγορότερα. Κρατήστε τον κορμό σας σφιχτό και κινήστε τα χέρια σας για μέγιστη ένταση.',
    },
    mountain_climbers: {
      name: 'Ορειβάτης (Mountain Climbers)',
      desc: 'Ξεκινήστε από σανίδα με τεντωμένα χέρια. Οδηγήστε εναλλάξ τα γόνατα γρήγορα μπροστά προς το στήθος σαν να ανεβαίνετε ένα βουνό.',
    },
    burpees: {
      name: 'Burpees για όλο το Σώμα',
      desc: 'Η απόλυτη άσκηση με το βάρος του σώματος. Πέστε σε κάθισμα, εκτείνετε τα πόδια προς τα πίσω, αγγίξτε το στήθος στο πάτωμα, μαζέψτε τα πόδια και κάντε άλμα.',
    },
    shadow_boxing: {
      name: 'Σκιαμαχία (Shadow Boxing)',
      desc: 'Διατηρήστε μια ενεργή στάση μάχης, αναπηδώντας ελαφρώς. Ρίξτε σταθερούς συνδυασμούς γροθιών (τζαμπ, κρος, κροσέ) στον αέρα.',
    },
    skater_jumps: {
      name: 'Άλματα Σκιέρ (Skater Jumps)',
      desc: 'Κάντε άλμα πλάγια προς τα δεξιά, προσγειώνοντας στο δεξί πόδι ενώ φέρετε το αριστερό πόδι πίσω. Πηδήξτε πίσω στα αριστερά.',
    },
    butt_kicks: {
      name: 'Λακτίσματα Γλουτών (Butt Kicks)',
      desc: 'Τρέξτε επιτόπου, φέρνοντας τις φτέρνες σας πίσω ώστε να αγγίζουν τους γλουτούς σας σε κάθε βήμα. Εστιάστε στη γρήγορη εναλλαγή.',
    },
    plank_jacks: {
      name: 'Άλματα από Σανίδα (Plank Jacks)',
      desc: 'Από θέση σανίδας, ανοίξτε και κλείστε τα πόδια με άλμα, κρατώντας τους γοφούς σας σταθερούς και τον κορμό σας σφιχτό.',
    },
    squat_jumps: {
      name: 'Άλματα από Κάθισμα (Jump Squats)',
      desc: 'Εκτελέστε ένα κανονικό κάθισμα και στη συνέχεια πηδήξτε εκρηκτικά προς τα πάνω. Προσγειωθείτε απαλά και επαναλάβετε αμέσως.',
    },
    simulated_jump_rope: {
      name: 'Εικονικό Σχοινάκι',
      desc: 'Αναπηδήστε ελαφρά στα δάχτυλα των ποδιών σας με μικρά, γρήγορα άλματα ενώ περιστρέφετε τους καρπούς σας σαν να κρατάτε σχοινάκι.',
    },
    fast_feet: {
      name: 'Γρήγορα Πόδια (Fast Feet)',
      desc: 'Χαμηλώστε ελαφρώς σε αθλητική στάση και χτυπήστε τα πόδια σας πάνω κάτω στο πάτωμα όσο πιο γρήγορα γίνεται.',
    },
    star_jumps: {
      name: 'Εκρηκτικά Άλματα Αστέρι',
      desc: 'Χαμηλώστε ελαφρά το σώμα σας και πηδήξτε εκρηκτικά στον αέρα, τεντώνοντας τα χέρια και τα πόδια σας διάπλατα.',
    },
    dumbbell_swings: {
      name: 'Αιωρήσεις Αλτήρα (Dumbbell Swings)',
      desc: 'Κρατήστε έναν αλτήρα και με τα δύο χέρια. Κάντε κάμψη στους γοφούς και σπρώξτε τους εκρηκτικά μπροστά για να αιωρήσετε τον αλτήρα.',
    },
    dumbbell_thrusters: {
      name: 'Dumbbell Thrusters (Κάθισμα με Πίεση)',
      desc: 'Κρατήστε τους αλτήρες στο ύψος των ώμων. Χαμηλώστε σε κάθισμα και πιέστε τους εκρηκτικά πάνω από το κεφάλι καθώς σηκώνεστε.',
    },
    banded_woodchopper_fast: {
      name: 'Γρήγορος Ξυλοκόπος με Λάστιχο',
      desc: 'Στερεώστε το λάστιχο, πιάστε τη λαβή, στρίψτε το γοφό και οδηγήστε τα χέρια διαγώνια προς τους γοφούς με ταχύτητα.',
    },
    bear_crawl: {
      name: 'Μπουσούλημα Αρκούδας (Bear Crawl)',
      desc: 'Σταθείτε στα χέρια και τα γόνατα, σηκώστε τα γόνατα 5 εκατοστά από το πάτωμα. Μπουσουλήστε μπροστά και πίσω με επίπεδη πλάτη.',
    },
    bodyweight_squat: {
      name: 'Καθίσματα με το Βάρος του Σώματος',
      desc: 'Σταθείτε με τα πόδια στο άνοιγμα των ώμων. Χαμηλώστε τους γοφούς σας πίσω και κάτω, κρατώντας το στήθος ψηλά.',
    },
    pushup: {
      name: 'Κάμψεις (Push-Ups)',
      desc: 'Κρατήστε το σώμα σε ευθεία γραμμή. Χαμηλώστε το στήθος μέχρι να αγγίξει σχεδόν το πάτωμα και σπρώξτε προς τα πάνω.',
    },
    decline_pushup: {
      name: 'Κάμψεις με Ανύψωση Ποδιών',
      desc: 'Τοποθετήστε τα πόδια σας σε μια υπερυψωμένη επιφάνεια και τις παλάμες στο πάτωμα. Χαμηλώστε το στήθος στο έδαφος και σπρώξτε.',
    },
    dumbbell_goblet_squat: {
      name: 'Καθίσματα Goblet με Αλτήρα',
      desc: 'Κρατήστε έναν αλτήρα κατακόρυφα μπροστά από το στήθος σας. Κάντε βαθύ κάθισμα διατηρώντας την πλάτη σας επίπεδη.',
    },
    dumbbell_floor_press: {
      name: 'Πιέσεις Στήθους στο Πάτωμα (Αλτήρες)',
      desc: 'Ξαπλώστε ανάσκελα με τα γόνατα λυγισμένα. Πιέστε τους αλτήρες προς τα πάνω από το ύψος του στήθους μέχρι τα χέρια να τεντώσουν.',
    },
    dumbbell_row: {
      name: 'Κωπηλατική με Αλτήρα (Ένα Χέρι)',
      desc: 'Γείρετε μπροστά από τους γοφούς, κρατώντας την πλάτη επίπεδη. Τραβήξτε τον αλτήρα προς το ισχίο σας, οδηγώντας τον αγκώνα ψηλά.',
    },
    banded_lat_pulldown: {
      name: 'Έλξεις Πλάτης με Λάστιχο (Lat Pulldowns)',
      desc: 'Στερεώστε το λάστιχο ψηλά. Γονατίστε, τεντώστε τα χέρια ψηλά και τραβήξτε προς το πάνω μέρος του στήθους.',
    },
    banded_chest_fly: {
      name: 'Ανοίγματα Στήθους με Λάστιχο',
      desc: 'Στερεώστε το λάστιχο πίσω από την πλάτη σας στο ύψος των ώμων. Φέρτε τα χέρια μπροστά σε μια κίνηση αγκαλιάς.',
    },
    pullup: {
      name: 'Κλασικές Έλξεις στο Μονόζυγο (Pull-Ups)',
      desc: 'Κρεμαστείτε από το μονόζυγο με τις παλάμες στραμμένες προς τα έξω. Τραβήξτε το στήθος σας προς τη μπάρα.',
    },
    chinup: {
      name: 'Έλξεις με Ανάποδη Λαβή (Chin-Ups)',
      desc: 'Κρεμαστείτε από τη μπάρα με ανάποδη λαβή (παλάμες προς εσάς). Τραβήξτε το πηγούνι σας πάνω από τη μπάρα.',
    },
    banded_glute_bridge: {
      name: 'Γέφυρα Γλουτών με Λάστιχο',
      desc: 'Τοποθετήστε λάστιχο γύρω από τα γόνατα. Ξαπλώστε, λυγίστε τα γόνατα και σπρώξτε τους γοφούς προς τα πάνω πιέζοντας έξω.',
    },
    dumbbell_romanian_deadlift: {
      name: 'Ρουμανικές Άρσεις Θανάτου με Αλτήρες',
      desc: 'Κρατήστε τους αλτήρες μπροστά από τους μηρούς. Κάντε κάμψη στους γοφούς πίσω, κατεβάζοντας τα βάρη με επίπεδη πλάτη.',
    },
    dumbbell_bicep_curl: {
      name: 'Κάμψεις Δικεφάλων με Αλτήρες',
      desc: 'Σταθείτε όρθιοι με τους αλτήρες στα πλάγια. Κρατήστε τους αγκώνες κολλημένους και λυγίστε τα χέρια προς τους ώμους.',
    },
    banded_bicep_curl: {
      name: 'Κάμψεις Δικεφάλων με Λάστιχο',
      desc: 'Πατήστε το λάστιχο με τα πόδια στο άνοιγμα των ώμων. Πιάστε τις λαβές και λυγίστε τα χέρια προς τους ώμους.',
    },
    overhead_press: {
      name: 'Πιέσεις Ώμων με Αλτήρες (Overhead Press)',
      desc: 'Σταθείτε με σφιχτό κορμό. Σηκώστε τους αλτήρες στο ύψος των ώμων και πιέστε προς τα πάνω μέχρι να τεντώσουν οι αγκώνες.',
    },
    banded_lateral_raise: {
      name: 'Εκτάσεις Ώμων με Λάστιχο (Πλάγιες)',
      desc: 'Σταθεροποιήστε το λάστιχο κάτω από τα πόδια. Σηκώστε τα χέρια προς τα πλάγια μέχρι το ύψος των ώμων.',
    },
    plank: {
      name: 'Σανίδα στους Πήχεις (Forearm Plank)',
      desc: 'Κρατήστε θέση κάμψης στηριζόμενοι στους πήχεις σας. Διατηρήστε τον κορμό, τους γλουτούς και τους τετρακέφαλους σφιχτούς.',
    },
    bicycle_crunch: {
      name: 'Ροκανίσματα Ποδήλατο (Bicycle Crunches)',
      desc: 'Ξαπλώστε ανάσκελα με τα χέρια πίσω από το κεφάλι. Φέρτε εναλλάξ τον αντίθετο αγκώνα στο αντίθετο γόνατο κάνοντας ποδήλατο.',
    },
    banded_woodchopper: {
      name: 'Ξυλοκόπος με Λάστιχο (Banded Woodchoppers)',
      desc: 'Στερεώστε το λάστιχο χαμηλά. Τραβήξτε το λάστιχο διαγώνια προς τα πάνω διασχίζοντας το σώμα με στροφή του κορμού.',
    },
    flutter_kicks: {
      name: 'Ψαλιδάκια Κοιλιακών (Flutter Kicks)',
      desc: 'Ξαπλώστε στο στρώμα με τη μέση επίπεδη στο πάτωμα. Σηκώστε ελαφρώς τα πόδια και κάντε μικρά, γρήγορα ψαλιδάκια πάνω-κάτω.',
    }
  }
};

// Simple helper to translate reps text like "45 seconds", "10-12 reps", "15 reps per side"
export function translateRepsText(reps: string, lang: Language): string {
  if (lang === 'en') return reps;

  let text = reps;
  text = text.replace(/seconds/gi, 'δευτερόλεπτα');
  text = text.replace(/second/gi, 'δευτερόλεπτο');
  text = text.replace(/reps per side/gi, 'επαναλήψεις ανά πλευρά');
  text = text.replace(/reps/gi, 'επαναλήψεις');
  text = text.replace(/per side/gi, 'ανά πλευρά');
  return text;
}
