import { GoalType } from "@/contexts/ProfileContext";

// Generate default dashboard data for dynamically created profiles
export function getDefaultDashboardData(name: string, weight: string, goal: GoalType) {
  const w = parseFloat(weight) || 180;
  const targetWeight = goal === "lose" ? (w - 10).toFixed(1) : goal === "gain" ? (w + 10).toFixed(1) : w.toFixed(1);
  const proteinTarget = goal === "gain" ? Math.round(w * 1.2) : goal === "lose" ? Math.round(w * 1.0) : Math.round(w * 0.9);

  return {
    timeline: [
      { time: "7:00 AM", item: "Black Coffee", protein: "0g", icon: "☕" },
      { time: "10:00 AM", item: "Protein Shake", protein: "30g", icon: "🥤" },
      { time: "12:30 PM", item: "Grilled Chicken Wrap", protein: "35g", icon: "🌯" },
      { time: "3:00 PM", item: "Greek Yogurt", protein: "15g", icon: "🥛" },
      { time: "7:00 PM", item: "Salmon + Veggies", protein: "40g", icon: "🐟" },
    ],
    executionLogsByDay: {
      Sun: [{ time: "9:00 AM", item: "Protein Pancakes", protein: "28g", icon: "🥞" }, { time: "1:00 PM", item: "Grilled Chicken Salad", protein: "38g", icon: "🥗" }, { time: "7:00 PM", item: "Steak + Rice", protein: "45g", icon: "🥩" }],
      Mon: [{ time: "7:00 AM", item: "Protein Oatmeal", protein: "25g", icon: "🥣" }, { time: "12:00 PM", item: "Turkey Wrap", protein: "32g", icon: "🌯" }, { time: "7:00 PM", item: "Chicken + Broccoli", protein: "40g", icon: "🍗" }],
      Tue: [{ time: "7:00 AM", item: "Egg Whites + Toast", protein: "22g", icon: "🍳" }, { time: "12:00 PM", item: "Tuna Salad", protein: "35g", icon: "🥗" }, { time: "7:00 PM", item: "Ground Turkey Bowl", protein: "38g", icon: "🥘" }],
      Wed: [{ time: "7:00 AM", item: "Smoothie Bowl", protein: "20g", icon: "🫐" }, { time: "12:00 PM", item: "Chicken Caesar", protein: "36g", icon: "🥗" }, { time: "7:00 PM", item: "Salmon + Quinoa", protein: "42g", icon: "🐟" }],
      Thu: [{ time: "7:00 AM", item: "Protein Shake", protein: "30g", icon: "🥤" }, { time: "12:00 PM", item: "Grilled Chicken Bowl", protein: "40g", icon: "🍗" }, { time: "7:00 PM", item: "Lean Beef + Sweet Potato", protein: "45g", icon: "🥩" }],
      Fri: [{ time: "7:00 AM", item: "Overnight Oats", protein: "18g", icon: "🥣" }, { time: "12:00 PM", item: "Poke Bowl", protein: "32g", icon: "🍣" }, { time: "7:00 PM", item: "Grilled Fish", protein: "38g", icon: "🐟" }],
      Sat: [{ time: "9:00 AM", item: "Brunch Omelette", protein: "28g", icon: "🍳" }, { time: "1:00 PM", item: "Chicken Shawarma", protein: "36g", icon: "🫓" }, { time: "7:00 PM", item: "BBQ Chicken", protein: "42g", icon: "🍗" }],
    },
    weightHistory: [
      { date: "Day 1", weight: w.toFixed(1), delta: null as string | null },
      { date: "Day 2", weight: (w - 0.3).toFixed(1), delta: "-0.3" },
      { date: "Day 3", weight: (w - 0.5).toFixed(1), delta: "-0.2" },
      { date: "Day 4", weight: (w - 0.9).toFixed(1), delta: "-0.4" },
      { date: "Day 5", weight: (w - 1.1).toFixed(1), delta: "-0.2" },
    ],
    macros: {
      protein: Math.round(proteinTarget * 0.7),
      carbs: goal === "lose" ? 20 : goal === "gain" ? 150 : 100,
      fats: goal === "lose" ? 30 : goal === "gain" ? 60 : 45,
    },
    insight: `Welcome ${name}! Your ${goal} protocol is active at ${w} lbs. Target: ${targetWeight} lbs. Daily protein goal: ${proteinTarget}g. Let's get to work.`,
  };
}

export function getDefaultKitchenData(goal: GoalType) {
  const base = [
    { name: "Chicken Breast", detail: "3 portions", level: "full" as const },
    { name: "Eggs", detail: "12", level: "full" as const },
    { name: "Greek Yogurt", detail: "2", level: "mid" as const },
    { name: "Mixed Greens", detail: "1 bag", level: "mid" as const },
  ];
  if (goal === "gain") {
    base.push({ name: "Ribeye Steak", detail: "2 portions", level: "full" as const }, { name: "Oats", detail: "1 bag", level: "full" as const });
  } else if (goal === "lose") {
    base.push({ name: "Protein Shake", detail: "3 left", level: "mid" as const }, { name: "Egg Whites", detail: "1 carton", level: "full" as const });
  } else {
    base.push({ name: "Quinoa", detail: "1 bag", level: "full" as const }, { name: "Almonds", detail: "1 bag", level: "full" as const });
  }
  return { fridgeItems: base };
}

export function getDefaultWorkouts(goal: GoalType) {
  if (goal === "gain") return [
    { label: "Day 1", day: "Mon", workout: "Upper Body Push (Chest & Shoulders)" },
    { label: "Day 2", day: "Tue", workout: "Pull Day (Back & Biceps)" },
    { label: "Day 3", day: "Wed", workout: "Rest / Active Recovery" },
    { label: "Day 4", day: "Thu", workout: "Legs (Squat Focus)" },
    { label: "Day 5", day: "Fri", workout: "Upper Body Volume" },
    { label: "Day 6", day: "Sat", workout: "Arms & Accessories" },
    { label: "Day 7", day: "Sun", workout: "Rest Day" },
  ];
  if (goal === "lose") return [
    { label: "Day 1", day: "Mon", workout: "Full Body Circuit A" },
    { label: "Day 2", day: "Tue", workout: "LISS Cardio — 40 min" },
    { label: "Day 3", day: "Wed", workout: "Full Body Circuit B" },
    { label: "Day 4", day: "Thu", workout: "HIIT — 25 min" },
    { label: "Day 5", day: "Fri", workout: "Upper Body + Core" },
    { label: "Day 6", day: "Sat", workout: "Active Recovery Walk" },
    { label: "Day 7", day: "Sun", workout: "Rest Day" },
  ];
  return [
    { label: "Day 1", day: "Mon", workout: "Push (Chest, Shoulders, Triceps)" },
    { label: "Day 2", day: "Tue", workout: "Pull (Back, Biceps)" },
    { label: "Day 3", day: "Wed", workout: "Cardio + Core" },
    { label: "Day 4", day: "Thu", workout: "Legs & Glutes" },
    { label: "Day 5", day: "Fri", workout: "Full Body Conditioning" },
    { label: "Day 6", day: "Sat", workout: "Yoga / Mobility" },
    { label: "Day 7", day: "Sun", workout: "Rest Day" },
  ];
}

export function getDefaultPRCards() {
  return [
    { lift: "Bench Press", weight: "—", date: "New" },
    { lift: "Squat", weight: "—", date: "New" },
    { lift: "Deadlift", weight: "—", date: "New" },
    { lift: "Shoulder Press", weight: "—", date: "New" },
    { lift: "Lat Pulldown", weight: "—", date: "New" },
  ];
}

export function getDefaultWeeklySchedule(goal: GoalType) {
  if (goal === "gain") return [
    { day: "Sun", protocol: "Rest / Refeed", icon: "🔄" },
    { day: "Mon", protocol: "Larry Scott Pump", icon: "💪" },
    { day: "Tue", protocol: "Pull Volume", icon: "🏋️" },
    { day: "Wed", protocol: "Active Recovery", icon: "🧘" },
    { day: "Thu", protocol: "Leg Hypertrophy", icon: "🦵" },
    { day: "Fri", protocol: "Upper Volume", icon: "💪" },
    { day: "Sat", protocol: "Arms & Accessories", icon: "🎯" },
  ];
  if (goal === "lose") return [
    { day: "Sun", protocol: "Rest / Sodium Flush", icon: "💧" },
    { day: "Mon", protocol: "Lyle McDonald RFL", icon: "🔥" },
    { day: "Tue", protocol: "Fasted Cardio", icon: "🏃" },
    { day: "Wed", protocol: "Full Body Circuit", icon: "⚡" },
    { day: "Thu", protocol: "HIIT Protocol", icon: "🔥" },
    { day: "Fri", protocol: "Cortisol Shield", icon: "🛡️" },
    { day: "Sat", protocol: "Metabolic Reset", icon: "🔄" },
  ];
  return [
    { day: "Sun", protocol: "Yoga Flow", icon: "🧘" },
    { day: "Mon", protocol: "Push Day", icon: "💪" },
    { day: "Tue", protocol: "Pull Day", icon: "🏋️" },
    { day: "Wed", protocol: "Cardio + Core", icon: "🎯" },
    { day: "Thu", protocol: "Legs & Glutes", icon: "🦵" },
    { day: "Fri", protocol: "Full Body", icon: "⚡" },
    { day: "Sat", protocol: "Active Recovery", icon: "🚶" },
  ];
}

export function getDefaultVitalityMetrics(name: string, weight: string, goal: GoalType) {
  const w = parseFloat(weight) || 180;
  const targetWeight = goal === "lose" ? (w - 10).toFixed(1) : goal === "gain" ? (w + 10).toFixed(1) : w.toFixed(1);
  return [
    { id: 1, name: "Weight", value: w.toFixed(1), unit: "lbs", target: targetWeight, status: "tracking" },
    { id: 2, name: "Body Fat %", value: "—", unit: "%", target: "—", status: "tracking" },
    { id: 3, name: "Skeletal Muscle Mass", value: "—", unit: "lbs", target: "—", status: "tracking" },
    { id: 4, name: "Sleep Score", value: "—", unit: "/100", target: "85", status: "tracking" },
    { id: 5, name: "Cortisol Level", value: "—", unit: "μg/dL", target: "<20", status: "tracking" },
    { id: 6, name: "Daily Protein", value: "0", unit: "g", target: `${Math.round(w)}`, status: "tracking" },
    { id: 7, name: "Water Intake", value: "0", unit: "L", target: "3.0", status: "tracking" },
    { id: 8, name: "Step Count", value: "0", unit: "steps", target: "10,000", status: "tracking" },
    { id: 9, name: "Commute Energy", value: "—", unit: "", target: "—", status: "tracking" },
    { id: 10, name: "Injury Status", value: "None", unit: "", target: "—", status: "normal" },
  ];
}

export function getDefaultVitalityDetails() {
  return {
    sleep: { total: "—", deep: "—", rem: "—", light: "—", target: "8h 00m", progress: 0, status: "No Data" },
    steps: { value: "0", target: "10,000", progress: 0, distance: "0 mi", calories: "0 kcal", floors: "0", status: "No Data" },
    recoveryInsight: "Welcome! Start logging your sleep and activity to receive personalized recovery insights.",
  };
}

export function getDefaultMedicalProfile(name: string) {
  return {
    age: 0,
    gender: "—",
    workWeek: "—",
    surgicalHistory: [] as { procedure: string; date: string; notes: string }[],
    injuryGuardrails: [] as { area: string; protocol: string; severity: string; notes: string }[],
    allergies: ["None known"],
    medications: [] as string[],
  };
}
