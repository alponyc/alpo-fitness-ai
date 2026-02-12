import { GoalType, ActivityLevel } from "@/contexts/ProfileContext";

// Generate default dashboard data for dynamically created profiles — starts EMPTY
export function getDefaultDashboardData(name: string, weight: string, goal: GoalType) {
  const w = parseFloat(weight) || 180;

  return {
    timeline: [] as { time: string; item: string; protein: string; icon: string }[],
    executionLogsByDay: {
      Sun: [], Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [],
    } as Record<string, { time: string; item: string; protein: string; icon: string }[]>,
    weightHistory: [
      { date: "Today", weight: w.toFixed(1), delta: null as string | null },
    ],
    macros: {
      protein: 0,
      carbs: 0,
      fats: 0,
    },
    insight: `Welcome ${name}! Your ${goal} protocol is ready. Starting weight: ${w} lbs. Log your first meal and workout to get started.`,
  };
}

export function getDefaultKitchenData(_goal: GoalType) {
  return { fridgeItems: [] as { name: string; detail: string; level: "full" | "mid" | "low" }[] };
}

export function getDefaultWorkouts(_goal: GoalType) {
  return [
    { label: "Day 1", day: "Mon", workout: "—" },
    { label: "Day 2", day: "Tue", workout: "—" },
    { label: "Day 3", day: "Wed", workout: "—" },
    { label: "Day 4", day: "Thu", workout: "—" },
    { label: "Day 5", day: "Fri", workout: "—" },
    { label: "Day 6", day: "Sat", workout: "—" },
    { label: "Day 7", day: "Sun", workout: "—" },
  ];
}

export function getDefaultPRCards() {
  return [
    { lift: "Bench Press", weight: "—", date: "—" },
    { lift: "Squat", weight: "—", date: "—" },
    { lift: "Deadlift", weight: "—", date: "—" },
    { lift: "Shoulder Press", weight: "—", date: "—" },
    { lift: "Lat Pulldown", weight: "—", date: "—" },
  ];
}

export function getDefaultWeeklySchedule(_goal: GoalType) {
  return [
    { day: "Sun", protocol: "—", icon: "📋" },
    { day: "Mon", protocol: "—", icon: "📋" },
    { day: "Tue", protocol: "—", icon: "📋" },
    { day: "Wed", protocol: "—", icon: "📋" },
    { day: "Thu", protocol: "—", icon: "📋" },
    { day: "Fri", protocol: "—", icon: "📋" },
    { day: "Sat", protocol: "—", icon: "📋" },
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
    recoveryInsight: "Welcome! Sync your Apple Health or Samsung Health to receive personalized recovery insights.",
  };
}

export function getSyncedVitalityMetrics(_name: string, weight: string, goal: GoalType) {
  const w = parseFloat(weight) || 180;
  const targetWeight = goal === "lose" ? (w - 10).toFixed(1) : goal === "gain" ? (w + 10).toFixed(1) : w.toFixed(1);
  return [
    { id: 1, name: "Weight", value: w.toFixed(1), unit: "lbs", target: targetWeight, status: "tracking" },
    { id: 2, name: "Body Fat %", value: "19.8", unit: "%", target: "17.0", status: "tracking" },
    { id: 3, name: "Skeletal Muscle Mass", value: (w * 0.4).toFixed(1), unit: "lbs", target: (w * 0.43).toFixed(1), status: "building" },
    { id: 4, name: "Sleep Score", value: "72", unit: "/100", target: "85", status: "low" },
    { id: 5, name: "Cortisol Level", value: "16.4", unit: "μg/dL", target: "<20", status: "normal" },
    { id: 6, name: "Daily Protein", value: "0", unit: "g", target: `${Math.round(w)}`, status: "tracking" },
    { id: 7, name: "Water Intake", value: "1.8", unit: "L", target: "3.0", status: "under" },
    { id: 8, name: "Step Count", value: "6,241", unit: "steps", target: "10,000", status: "low" },
    { id: 9, name: "Commute Energy", value: "Medium", unit: "", target: "Low", status: "tracking" },
    { id: 10, name: "Injury Status", value: "None", unit: "", target: "—", status: "normal" },
  ];
}

export function getSyncedVitalityDetails(goal: GoalType) {
  return {
    sleep: { total: "6h 48m", deep: "1h 12m", rem: "1h 34m", light: "4h 02m", target: "8h 00m", progress: 72, status: "Below Target" },
    steps: { value: "6,241", target: "10,000", progress: 62, distance: "2.8 mi", calories: "284 kcal", floors: "4", status: "In Progress" },
    recoveryInsight: goal === "lose"
      ? "Sleep deficit detected — 6h 48m vs 8h target. Cortisol may be elevated which slows fat loss. Prioritize 30min earlier bedtime tonight. Step count is progressing but aim for 10K to support your deficit protocol."
      : goal === "gain"
        ? "Sleep quality is moderate — deep sleep at 1h 12m supports muscle recovery but could improve. Consider magnesium supplementation before bed. Step count is solid for a gain phase — don't overdo cardio."
        : "Maintenance metrics look steady. Sleep could use improvement — aim for 7.5h minimum. Activity level is on track. Keep hydration above 2.5L today.",
  };
}

export function activityToWorkWeek(activity?: ActivityLevel): string {
  switch (activity) {
    case "sedentary": return "Remote / Desk — ~20 hours";
    case "light": return "Office + Commute — ~37.5 hours";
    case "moderate": return "On-feet role — ~40 hours";
    case "active": return "Physical / Training — ~45 hours";
    case "very_active": return "Athlete / Manual — ~50+ hours";
    default: return "—";
  }
}

export function getDefaultMedicalProfile(name: string, age?: number, gender?: string, activity?: ActivityLevel) {
  return {
    age: age || 0,
    gender: gender || "—",
    workWeek: activityToWorkWeek(activity),
    surgicalHistory: [] as { procedure: string; date: string; notes: string }[],
    injuryGuardrails: [] as { area: string; protocol: string; severity: string; notes: string }[],
    allergies: ["None known"],
    medications: [] as string[],
  };
}
