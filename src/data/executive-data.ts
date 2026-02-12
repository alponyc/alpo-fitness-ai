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

// === 10 Vitality Metrics ===
export const vitalityMetrics = [
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
];

// === Medical Vault ===
export const medicalProfile = {
  age: 34,
  gender: "Male",
  workWeek: "37.5 hours",
  surgicalHistory: [
    { procedure: "Left Elbow Arthroscopy", date: "2022-03", notes: "Loose body removal, lateral epicondyle debridement" },
    { procedure: "Wisdom Teeth Extraction", date: "2019-08", notes: "All four impacted, general anesthesia" },
  ],
  injuryGuardrails: [
    { area: "Left Elbow Sensitivity", protocol: "Neutral Grip Only", severity: "Active", notes: "Avoid pronated curls, skull crushers, close-grip bench" },
  ],
  allergies: ["None known"],
  medications: ["Vitamin D3 5000IU", "Omega-3 2g", "Magnesium Glycinate 400mg"],
};

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

// === Scanner Hotspot Mock Responses ===
export const scannerHotspots = {
  sampleMenu: {
    label: "Sample Menu",
    icon: "🍽️",
    aiResponse: "RAG-Verified Analysis: Detected 'Grilled Salmon' (360 cal, 42g P) — Safe for current RFL protocol. 'Caesar Salad w/ Dressing' (280 cal, 18g sodium flag) — Swap to oil & vinegar. 'Garlic Bread' — AVOID (310 cal, refined carbs, high sodium). Recommendation: Salmon + side salad, skip the bread basket.",
    safe: [
      { name: "Grilled Salmon", cal: "360 cal", note: "42g protein, omega-3 rich" },
      { name: "Steamed Broccoli", cal: "55 cal", note: "Fiber-dense, anti-inflammatory" },
    ],
    avoid: [
      { name: "Garlic Bread", cal: "310 cal", note: "Refined carbs, high sodium" },
      { name: "Caesar Dressing", cal: "180 cal", note: "Hidden sodium, excess fat" },
    ],
  },
  sampleReceipt: {
    label: "Sample Receipt",
    icon: "🧾",
    aiResponse: "RAG-Verified Receipt Scan: Fairlife 42g Protein Shake (✓ Protocol-aligned), Oikos Triple Zero (✓ 15g protein, low sugar), Chicken Breast 2lb (✓ Lean protein staple), Doritos Family Size — FLAGGED (non-compliant, 140mg sodium/serving). Overall: 3/4 items compliant with current McDonald RFL protocol.",
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
    aiResponse: "RAG-Verified Fridge Audit: Current inventory supports 2.5 days of McDonald RFL protocol. Protein reserves: Adequate (Churrasco 2 portions, Arabic Chicken 3 portions). Vegetable stock: Low — restock asparagus and leafy greens. Alert: No Fairlife detected. Recommend grocery run for protein shakes and egg whites.",
    safe: [
      { name: "Churrasco (2 portions)", cal: "480 cal", note: "High protein, moderate fat" },
      { name: "Arabic Chicken (3 portions)", cal: "200 cal/serv", note: "Lean, well-seasoned" },
      { name: "Asparagus", cal: "40 cal", note: "Low carb, anti-inflammatory" },
    ],
    avoid: [
      { name: "⚠️ Missing: Fairlife Shakes", cal: "—", note: "Restock needed for protein targets" },
      { name: "⚠️ Low: Leafy Greens", cal: "—", note: "Fiber and micronutrient gap" },
    ],
  },
};
