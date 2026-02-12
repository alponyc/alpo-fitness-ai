import { ProfileKey } from "@/contexts/ProfileContext";

// === 10 Protocols ===
export const protocols = [
  { id: 1, name: "Larry Scott Pump", category: "Gain", description: "High-volume bicep/shoulder focus with preacher curls", icon: "💪" },
  { id: 2, name: "Lyle McDonald RFL", category: "Lose", description: "Rapid fat loss protocol with protein-sparing modified fast", icon: "🔥" },
  { id: 3, name: "Vince Gironda Incline", category: "Gain", description: "45° incline press for upper chest hypertrophy", icon: "📐" },
  { id: 4, name: "Sophie's Audible", category: "Social", description: "Dynamic macro adjustments for spontaneous dining", icon: "🎯" },
  { id: 5, name: "Client Dinner Mode", category: "Social", description: "Stealth dieting protocol for business dinners", icon: "🍽️" },
  { id: 6, name: "Flight Retention", category: "Travel", description: "Anti-bloat strategy for air travel days", icon: "✈️" },
  { id: 7, name: "Fasted Productivity", category: "Performance", description: "16:8 intermittent fasting with cognitive stacking", icon: "🧠" },
  { id: 8, name: "Sodium Flush", category: "Lose", description: "Water manipulation via potassium/sodium cycling", icon: "💧" },
  { id: 9, name: "Cortisol Shield", category: "Recovery", description: "Stress management protocol with adaptogens", icon: "🛡️" },
  { id: 10, name: "Metabolic Reset", category: "Recovery", description: "2-week refeed strategy to restore metabolic rate", icon: "🔄" },
];

// === 10 Vision Scenarios ===
export const visionScenarios = [
  { id: 1, name: "Sophie's Menu", trigger: "Restaurant menu scan", description: "AI-guided order for date night compliance" },
  { id: 2, name: "Fairlife/Oikos Receipt", trigger: "Grocery receipt scan", description: "Protein density verification from store purchases" },
  { id: 3, name: "Fridge Audit", trigger: "Fridge photo scan", description: "Inventory check against current protocol" },
  { id: 4, name: "Supplement Check", trigger: "Supplement label scan", description: "Verify dosage and interaction safety" },
  { id: 5, name: "Meal Sodium Scan", trigger: "Food label scan", description: "Sodium content flagging for water retention days" },
  { id: 6, name: "Alcohol Pivot", trigger: "Drink menu scan", description: "Lowest-impact drink options with calorie mapping" },
  { id: 7, name: "Date Night Guardrail", trigger: "Full menu scan", description: "Balanced order strategy for social compliance" },
  { id: 8, name: "Travel Snack Scan", trigger: "Airport menu scan", description: "Best protein-per-calorie options on the go" },
  { id: 9, name: "Caffeine Timing", trigger: "Beverage scan", description: "Optimal caffeine intake relative to sleep window" },
  { id: 10, name: "Protein Density Check", trigger: "Meal photo scan", description: "Estimate protein content from visual analysis" },
];

// === 10 Vitality Metrics (per profile) ===
type VitalityMetric = { id: number; name: string; value: string; unit: string; target: string; status: string };
export const vitalityMetricsByProfile: Record<ProfileKey, VitalityMetric[]> = {
  alpo: [
    { id: 1, name: "Weight", value: "196.2", unit: "lbs", target: "195.0", status: "tracking" },
    { id: 2, name: "Body Fat %", value: "18.4", unit: "%", target: "15.0", status: "tracking" },
    { id: 3, name: "Skeletal Muscle Mass", value: "82.1", unit: "lbs", target: "85.0", status: "building" },
    { id: 4, name: "Sleep Score", value: "68", unit: "/100", target: "85", status: "low" },
    { id: 5, name: "Cortisol Level", value: "18.2", unit: "μg/dL", target: "<20", status: "normal" },
    { id: 6, name: "Daily Protein", value: "153", unit: "g", target: "200", status: "under" },
    { id: 7, name: "Water Intake", value: "2.1", unit: "L", target: "3.5", status: "under" },
    { id: 8, name: "Step Count", value: "4,144", unit: "steps", target: "10,000", status: "low" },
    { id: 9, name: "Commute Energy", value: "Medium", unit: "", target: "Low", status: "tracking" },
    { id: 10, name: "Injury Status", value: "Left Elbow", unit: "", target: "Neutral Grip", status: "active" },
  ],
   client: [
     { id: 1, name: "Weight", value: "267.4", unit: "lbs", target: "260.0", status: "tracking" },
    { id: 2, name: "Body Fat %", value: "22.1", unit: "%", target: "18.0", status: "tracking" },
    { id: 3, name: "Skeletal Muscle Mass", value: "78.4", unit: "lbs", target: "82.0", status: "building" },
    { id: 4, name: "Sleep Score", value: "74", unit: "/100", target: "85", status: "low" },
    { id: 5, name: "Cortisol Level", value: "21.5", unit: "μg/dL", target: "<20", status: "active" },
    { id: 6, name: "Daily Protein", value: "130", unit: "g", target: "180", status: "under" },
    { id: 7, name: "Water Intake", value: "1.8", unit: "L", target: "3.0", status: "under" },
    { id: 8, name: "Step Count", value: "6,210", unit: "steps", target: "8,000", status: "low" },
    { id: 9, name: "Commute Energy", value: "High", unit: "", target: "Medium", status: "tracking" },
    { id: 10, name: "Injury Status", value: "Lower Back", unit: "", target: "Core Brace", status: "active" },
  ],
  family: [
    { id: 1, name: "Weight", value: "138.0", unit: "lbs", target: "135.0", status: "tracking" },
    { id: 2, name: "Body Fat %", value: "24.2", unit: "%", target: "22.0", status: "tracking" },
    { id: 3, name: "Skeletal Muscle Mass", value: "52.3", unit: "lbs", target: "54.0", status: "building" },
    { id: 4, name: "Sleep Score", value: "82", unit: "/100", target: "85", status: "normal" },
    { id: 5, name: "Cortisol Level", value: "14.1", unit: "μg/dL", target: "<20", status: "normal" },
    { id: 6, name: "Daily Protein", value: "95", unit: "g", target: "120", status: "under" },
    { id: 7, name: "Water Intake", value: "2.5", unit: "L", target: "2.5", status: "normal" },
    { id: 8, name: "Step Count", value: "8,320", unit: "steps", target: "10,000", status: "tracking" },
    { id: 9, name: "Commute Energy", value: "Low", unit: "", target: "Low", status: "normal" },
    { id: 10, name: "Injury Status", value: "None", unit: "", target: "—", status: "normal" },
  ],
};

export const vitalityMetrics = vitalityMetricsByProfile.alpo;

// === Medical Profiles per user ===
type MedicalProfile = {
  age: number; gender: string; workWeek: string;
  surgicalHistory: { procedure: string; date: string; notes: string }[];
  injuryGuardrails: { area: string; protocol: string; severity: string; notes: string }[];
  allergies: string[]; medications: string[];
};
export const medicalProfilesByUser: Record<ProfileKey, MedicalProfile> = {
  alpo: {
    age: 43,
    gender: "Male",
    workWeek: "37.5 hours",
    surgicalHistory: [
      { procedure: "Right Knee Meniscus Repair", date: "2011", notes: "Partial meniscectomy, arthroscopic. Full recovery." },
      { procedure: "Left Elbow Arthroscopy", date: "2022", notes: "Loose body removal, lateral epicondyle debridement" },
    ],
    injuryGuardrails: [
      { area: "Left Elbow Sensitivity", protocol: "Neutral Grip Only", severity: "Active", notes: "Avoid pronated curls, skull crushers, close-grip bench" },
    ],
    allergies: ["None known"],
    medications: ["Vitamin D3 5000IU", "Omega-3 2g", "Magnesium Glycinate 400mg"],
  },
  client: {
    age: 38,
    gender: "Male",
    workWeek: "45 hours",
    surgicalHistory: [
      { procedure: "ACL Reconstruction (Right)", date: "2015", notes: "Hamstring graft, full return to activity" },
    ],
    injuryGuardrails: [
      { area: "Lower Back", protocol: "Core Brace + Belt", severity: "Moderate", notes: "Avoid deadlifts >315, no good mornings" },
    ],
    allergies: ["Shellfish"],
    medications: ["Creatine 5g", "Vitamin D3 2000IU", "Zinc 30mg"],
  },
  family: {
    age: 34,
    gender: "Female",
    workWeek: "40 hours",
    surgicalHistory: [],
    injuryGuardrails: [],
    allergies: ["None known"],
    medications: ["Multivitamin", "Iron 18mg", "Biotin 5000mcg"],
  },
};

export const medicalProfile = medicalProfilesByUser.alpo;

// === Executive Pantry ===
export const pantryGuide = {
  gain: {
    label: "Gain (Scott)",
    protocol: "Larry Scott Pump",
    items: [
      { name: "Ribeye Steak", macros: "52g P / 0g C / 38g F", cal: "560 cal" },
      { name: "Whole Eggs (4)", macros: "24g P / 2g C / 20g F", cal: "280 cal" },
      { name: "Steel Cut Oats", macros: "5g P / 27g C / 3g F", cal: "150 cal" },
      { name: "Avocado", macros: "2g P / 9g C / 15g F", cal: "160 cal" },
    ],
  },
  lose: {
    label: "Lose (McDonald RFL)",
    protocol: "Lyle McDonald RFL",
    items: [
      { name: "Fairlife 42g", macros: "42g P / 6g C / 3g F", cal: "230 cal" },
      { name: "Grilled Chicken Breast", macros: "43g P / 0g C / 3g F", cal: "200 cal" },
      { name: "Veggie Medley", macros: "3g P / 12g C / 0g F", cal: "60 cal" },
      { name: "Egg Whites (6)", macros: "22g P / 1g C / 0g F", cal: "100 cal" },
    ],
  },
  maintain: {
    label: "Maintain (Gironda)",
    protocol: "Vince Gironda Incline",
    items: [
      { name: "Lean Turkey", macros: "34g P / 0g C / 5g F", cal: "180 cal" },
      { name: "Quinoa (1 cup)", macros: "8g P / 39g C / 4g F", cal: "222 cal" },
      { name: "Mixed Berries", macros: "1g P / 18g C / 0g F", cal: "70 cal" },
      { name: "Almonds (1 oz)", macros: "6g P / 6g C / 14g F", cal: "164 cal" },
    ],
  },
};

// === Dashboard Data per Profile ===
export const dashboardDataByProfile: Record<ProfileKey, {
  timeline: { time: string; item: string; protein: string; icon: string }[];
  weightHistory: { date: string; weight: string; delta: string | null; note?: string }[];
  macros: { protein: number; carbs: number; fats: number };
  insight: string;
}> = {
  alpo: {
    timeline: [
      { time: "6:30 AM", item: "Black Coffee", protein: "0g", icon: "☕" },
      { time: "10:00 AM", item: "Fairlife 42g Shake", protein: "42g", icon: "🥤" },
      { time: "12:30 PM", item: "Sophie's Grilled Chicken Wrap", protein: "38g", icon: "🌯" },
      { time: "3:00 PM", item: "Oikos Triple Zero", protein: "15g", icon: "🥛" },
      { time: "7:00 PM", item: "Grilled Salmon + Asparagus", protein: "42g", icon: "🐟" },
    ],
    weightHistory: [
      { date: "Thu 2/5", weight: "201.8", delta: null, note: "Office Stress / High Sodium" },
      { date: "Fri 2/6", weight: "201.2", delta: "-0.6", note: "Transition to RFL" },
      { date: "Sat 2/7", weight: "200.4", delta: "-0.8", note: "The \"Arabic Chicken\" Baseline" },
      { date: "Sun 2/8", weight: "199.5", delta: "-0.9", note: "First \"Sub-200\" dip / Leg Day" },
      { date: "Mon 2/9", weight: "198.6", delta: "-0.9", note: "Scott Protocol / Chest & Back" },
      { date: "Tue 2/10", weight: "197.4", delta: "-1.2", note: "Machine Flush / Neutral Grip" },
      { date: "Wed 2/11", weight: "196.2", delta: "-1.2", note: "Current PR / 4,144 steps / Salmon Victory" },
    ],
    macros: { protein: 153, carbs: 20, fats: 35 },
    insight: 'I noticed the 196.2 weigh-in. Based on Saturday\'s sodium, this is water. Skip the peppers/onions tonight to minimize bloat; stick to the Chicken and Water. Kitchen is CLOSED.',
  },
  client: {
    timeline: [
      { time: "7:00 AM", item: "Protein Oatmeal", protein: "30g", icon: "🥣" },
      { time: "10:30 AM", item: "Protein Bar", protein: "20g", icon: "🍫" },
      { time: "1:00 PM", item: "Grilled Chicken Salad", protein: "40g", icon: "🥗" },
      { time: "4:00 PM", item: "Greek Yogurt", protein: "18g", icon: "🥛" },
      { time: "7:30 PM", item: "Steak + Sweet Potato", protein: "45g", icon: "🥩" },
    ],
    weightHistory: [
      { date: "Thu 2/5", weight: "218.3", delta: null },
      { date: "Fri 2/6", weight: "217.8", delta: "-0.5" },
      { date: "Sat 2/7", weight: "217.1", delta: "-0.7" },
      { date: "Sun 2/8", weight: "216.2", delta: "-0.9" },
      { date: "Mon 2/9", weight: "215.0", delta: "-1.2" },
      { date: "Tue 2/10", weight: "213.8", delta: "-1.2" },
      { date: "Wed 2/11", weight: "212.5", delta: "-1.3" },
    ],
    macros: { protein: 130, carbs: 95, fats: 55 },
    insight: 'Client is trending well at 212.5. Cortisol is elevated — recommend reducing PM caffeine and adding a 20-min walk. Protein gap of 50g needs addressing.',
  },
  family: {
    timeline: [
      { time: "7:30 AM", item: "Smoothie Bowl", protein: "22g", icon: "🫐" },
      { time: "12:00 PM", item: "Turkey Wrap", protein: "28g", icon: "🌯" },
      { time: "3:30 PM", item: "Apple + Almonds", protein: "6g", icon: "🍎" },
      { time: "7:00 PM", item: "Grilled Chicken + Quinoa", protein: "39g", icon: "🍗" },
    ],
    weightHistory: [
      { date: "Thu 2/5", weight: "140.2", delta: null },
      { date: "Fri 2/6", weight: "139.9", delta: "-0.3" },
      { date: "Sat 2/7", weight: "139.6", delta: "-0.3" },
      { date: "Sun 2/8", weight: "139.2", delta: "-0.4" },
      { date: "Mon 2/9", weight: "139.0", delta: "-0.2" },
      { date: "Tue 2/10", weight: "138.5", delta: "-0.5" },
      { date: "Wed 2/11", weight: "138.0", delta: "-0.5" },
    ],
    macros: { protein: 95, carbs: 120, fats: 45 },
    insight: 'Sophie is on track at 138. Sleep score is excellent. Recommend maintaining current plan and increasing protein by 25g for muscle retention.',
  },
};

// === Kitchen Data per Profile ===
export const kitchenDataByProfile: Record<ProfileKey, { fridgeItems: { name: string; detail: string | null; level: "full" | "mid" | "low" }[] }> = {
  alpo: {
    fridgeItems: [
      { name: "Churrasco", detail: "2 portions", level: "full" },
      { name: "Chicken", detail: "3 portions", level: "full" },
      { name: "Asparagus", detail: "1 bunch", level: "mid" },
      { name: "Peppers", detail: "4", level: "full" },
      { name: "Onions", detail: "3", level: "mid" },
      { name: "42g Fairlife", detail: "1 left", level: "low" },
      { name: "Salmon", detail: "2 fillets", level: "full" },
      { name: "Oikos Triple Zero", detail: "2", level: "mid" },
      { name: "Eggs", detail: "4 left", level: "low" },
      { name: "Leafy Greens", detail: "Low", level: "low" },
    ],
  },
  client: {
    fridgeItems: [
      { name: "Chicken Breast", detail: "4 portions", level: "full" },
      { name: "Sweet Potato", detail: "3", level: "full" },
      { name: "Broccoli", detail: "1 head", level: "mid" },
      { name: "Rice", detail: "2 cups", level: "full" },
      { name: "Protein Bars", detail: "2 left", level: "low" },
      { name: "Greek Yogurt", detail: "2", level: "mid" },
    ],
  },
  family: {
    fridgeItems: [
      { name: "Turkey Breast", detail: "2 portions", level: "full" },
      { name: "Quinoa", detail: "1 bag", level: "full" },
      { name: "Mixed Berries", detail: "Half box", level: "mid" },
      { name: "Almonds", detail: "1 bag", level: "full" },
      { name: "Smoothie Mix", detail: "Low", level: "low" },
      { name: "Eggs", detail: "12", level: "full" },
    ],
  },
};

// === Scanner Hotspot Mock Responses ===
export const scannerHotspots = {
   sampleMenu: {
     label: "Sophie's Cuban",
     icon: "🍽️",
     aiResponse: "**RAG-Verified Analysis: Sophie's Cuban**\n\n**Assessment:**\n• 75% menu compliance — stick to grilled proteins + beans\n• Sodium risk is ELEVATED at 196.2 handle\n• Request low-salt on all sides\n\n**Post-Meal Protocol:**\n• Drink 16oz water flush within 30 mins\n• Monitor sodium intake for next 4 hours\n• Kitchen is CLOSED after this meal",
     safe: [
       { name: "Grilled Chicken/Pechuga", cal: "360 cal", note: "42g protein, clean grilled" },
       { name: "Black Beans (low-salt)", cal: "150 cal", note: "Fiber + carbs, request low sodium" },
       { name: "White Rice", cal: "200 cal", note: "Clean carb base" },
     ],
     avoid: [
       { name: "Plantain Chips", cal: "280 cal", note: "Refined carbs, high sodium" },
       { name: "Ropa Vieja", cal: "420 cal", note: "Heavy sauce, sodium bomb" },
     ],
   },
  steakhouse: {
    label: "Steakhouse",
    icon: "🥩",
    aiResponse: "**RAG-Verified Analysis: Steakhouse**\n\n**Assessment:**\n• Strong Scott Protocol alignment — protein-dense options available\n• Carb sensitivity is elevated at 196.2 handle\n• Order steak with asparagus only, no sides\n\n**Post-Meal Protocol:**\n• Skip bread basket entirely — triggers bloat at 196.2\n• Request steamed spinach instead of creamed\n• No dessert — close the kitchen after this meal",
    safe: [
      { name: "NY Strip 12oz", cal: "580 cal", note: "62g protein, ideal for gain protocol" },
      { name: "Grilled Asparagus", cal: "40 cal", note: "Low cal, anti-inflammatory" },
    ],
    avoid: [
      { name: "Loaded Baked Potato", cal: "420 cal", note: "38g carbs, butter/sour cream" },
      { name: "Bread Basket", cal: "280 cal", note: "Refined carbs, sodium spike at 196.2" },
    ],
  },
  greek: {
    label: "Greek",
    icon: "🫒",
    aiResponse: "**RAG-Verified Analysis: Greek Menu**\n\n**Assessment:**\n• Moderate compliance — grilled proteins are strong here\n• Feta sodium is a concern — limit to 1oz at 196.2 handle\n• Request oil & vinegar dressing, skip pita bread\n\n**Post-Meal Protocol:**\n• Stick to grilled proteins + salad only\n• Monitor sodium for next 4 hours\n• No baklava — sugar bomb, triggers insulin spike",
    safe: [
      { name: "Chicken Souvlaki (no pita)", cal: "320 cal", note: "38g protein, lean grilled" },
      { name: "Greek Salad", cal: "180 cal", note: "Oil & vinegar dressing only" },
    ],
    avoid: [
      { name: "Moussaka", cal: "480 cal", note: "Heavy béchamel, high fat" },
      { name: "Baklava", cal: "310 cal", note: "Sugar bomb, refined pastry" },
    ],
  },
   italianGrill: {
     label: "Italian Grill",
     icon: "🍝",
     aiResponse: "**RAG-Verified Analysis: Italian Grill**\n\n**Assessment:**\n• HIGH RISK venue — sodium minefield at 196.2 handle\n• Only grilled proteins are compliant here\n• Caesar dressing alone is 680mg sodium — request on the side\n\n**Post-Meal Protocol:**\n• Skip bread + olive oil entirely — triggers bloat\n• Request all sauces on the side\n• 16oz water flush within 30 mins post-meal",
     safe: [
       { name: "Chicken Spiedini", cal: "380 cal", note: "44g protein, skip pasta side" },
       { name: "Steamed Vegetables", cal: "80 cal", note: "Request no butter" },
     ],
     avoid: [
       { name: "Fettuccine Alfredo", cal: "1,220 cal", note: "72g fat, sodium overload" },
       { name: "Bread + Olive Oil", cal: "340 cal", note: "Refined carbs, triggers bloat at 196.2" },
     ],
   },
  sampleReceipt: {
    label: "Receipt",
    icon: "🧾",
    aiResponse: "**RAG-Verified Analysis: Receipt Scan**\n\n**Assessment:**\n• 75% compliance with McDonald RFL protocol\n• 3 of 4 items are protocol-aligned\n• Replace Doritos with rice cakes or protein chips\n\n**Action Items:**\n• Add egg whites to next grocery run\n• Stock up on leafy greens for fiber gap\n• Overall grocery haul is solid — keep this pattern",
    safe: [
      { name: "Fairlife 42g Shake", cal: "230 cal", note: "Protocol-aligned protein source" },
      { name: "Oikos Triple Zero", cal: "120 cal", note: "15g protein, zero added sugar" },
      { name: "Chicken Breast 2lb", cal: "200 cal/serv", note: "Lean protein staple" },
    ],
    avoid: [
      { name: "Doritos Family Size", cal: "140 cal/serv", note: "Non-compliant, 140mg sodium/serving" },
    ],
  },
  fridgeAudit: {
    label: "Fridge Audit",
    icon: "🧊",
    aiResponse: "**RAG-Verified Analysis: Fridge Audit**\n\n**Assessment:**\n• 2.5 days of RFL protocol coverage remaining\n• Protein sources are adequate but need restocking soon\n• Critical gap: no Fairlife shakes detected\n\n**Action Items:**\n• Grocery run needed — protein shakes + egg whites\n• Restock leafy greens within 24 hours\n• Add Greek yogurt for snack-tier protein",
    safe: [
      { name: "Churrasco (2 portions)", cal: "480 cal", note: "High protein, moderate fat" },
      { name: "Chicken (3 portions)", cal: "200 cal/serv", note: "Lean, well-seasoned" },
      { name: "Asparagus", cal: "40 cal", note: "Low carb, anti-inflammatory" },
    ],
    avoid: [
      { name: "Fairlife Shakes", cal: "Restock", note: "Critical for hitting daily protein targets" },
      { name: "Leafy Greens", cal: "Restock", note: "Fiber and micronutrient gap detected" },
    ],
  },
};
