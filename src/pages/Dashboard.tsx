import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Dumbbell, Trophy, UtensilsCrossed, Brain, ScanLine, Clock, Scale, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MacroRing from "@/components/MacroRing";
import RAGBadge from "@/components/RAGBadge";
import EthicalGuardrail from "@/components/EthicalGuardrail";

const workoutDays = [
  { label: "2 Days Ago", workout: "Upper Body Push (Chest & Shoulders)" },
  { label: "Yesterday", workout: "High Volume Legs (Scott Protocol)" },
  { label: "Today", workout: "Active Recovery Cardio (The Flush) – 30 mins" },
];

const fridgeItems = [
  { name: "Churrasco", detail: "2 portions" },
  { name: "Chicken", detail: "3 portions" },
  { name: "Asparagus", detail: null },
  { name: "Peppers", detail: null },
  { name: "Onions", detail: null },
  { name: "42g Fairlife", detail: "1" },
];

const timeline = [
  { time: "6:30 AM", item: "Black Coffee", protein: "0g", icon: "☕" },
  { time: "10:00 AM", item: "Fairlife 42g Shake", protein: "42g", icon: "🥤" },
  { time: "12:30 PM", item: "Sophie's Grilled Chicken Wrap", protein: "38g", icon: "🌯" },
  { time: "3:00 PM", item: "Oikos Triple Zero", protein: "15g", icon: "🥛" },
  { time: "7:00 PM", item: "Grilled Salmon + Asparagus", protein: "42g", icon: "🐟" },
];

const weightHistory = [
  { date: "1/13", weight: "204.8", delta: null },
  { date: "1/29", weight: "196.7", delta: "-8.1" },
  { date: "2/11", weight: "196.2", delta: "-0.5" },
];

const prCards = [
  { lift: "Incline DB Press", weight: "110 lbs", date: "2/8" },
  { lift: "Lat Pulldown", weight: "140 lbs", date: "2/5" },
  { lift: "Chest Press", weight: "200 lbs", date: "1/30" },
  { lift: "Leg Press", weight: "450 lbs", date: "1/28" },
  { lift: "Cable Row", weight: "160 lbs", date: "1/25" },
  { lift: "Shoulder Press", weight: "70 lbs", date: "1/22" },
  { lift: "Preacher Curl", weight: "80 lbs", date: "1/20" },
  { lift: "Tricep Pushdown", weight: "90 lbs", date: "1/18" },
  { lift: "Hack Squat", weight: "320 lbs", date: "1/15" },
  { lift: "Calf Raise", weight: "280 lbs", date: "1/12" },
];

const Dashboard = () => {
  const [dayIndex, setDayIndex] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalProtein = timeline.reduce((sum, t) => sum + parseInt(t.protein), 0);

  return (
    <>
      {/* Wednesday Execution Log */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Clock className="w-4 h-4 text-primary" />
            Wednesday Execution Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative pl-4 space-y-3">
            <div className="absolute left-[7px] top-1 bottom-1 w-px bg-primary/30" />
            {timeline.map((entry, i) => (
              <div key={i} className="relative flex items-start gap-3">
                <div className="absolute left-[-13px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background z-10" />
                <div className="flex-1 flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{entry.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{entry.item}</p>
                      <p className="text-[10px] text-muted-foreground">{entry.time}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-primary">{entry.protein} P</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between bg-primary/10 border border-primary/20 rounded-lg px-3 py-2">
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Total Protein</span>
            <span className="text-sm font-black text-primary">~{totalProtein}g</span>
          </div>
        </CardContent>
      </Card>

      {/* Weight History */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Scale className="w-4 h-4 text-primary" />
            Weight History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {weightHistory.map((w) => (
              <div key={w.date} className="bg-secondary/50 rounded-lg px-3 py-2.5 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{w.date}</p>
                <p className="text-lg font-black text-foreground">{w.weight}</p>
                {w.delta && (
                  <div className="flex items-center justify-center gap-0.5 mt-0.5">
                    <TrendingDown className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-bold text-primary">{w.delta}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PR Carousel */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Trophy className="w-4 h-4 text-primary" />
            PR Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={carouselRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {prCards.map((pr, i) => (
              <div key={i} className="snap-start shrink-0 w-28 bg-secondary/50 rounded-lg px-3 py-2.5 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{pr.date}</p>
                <p className="text-xs font-bold text-foreground mt-1 truncate">{pr.lift}</p>
                <p className="text-sm font-black text-primary mt-0.5">{pr.weight}</p>
              </div>
            ))}
          </div>
          <Button size="sm" className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold h-8">
            Log New PR
          </Button>
        </CardContent>
      </Card>

      {/* Workout Log */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Dumbbell className="w-4 h-4 text-primary" />
            Workout Log
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between bg-secondary/50 rounded-lg p-3">
            <button onClick={() => setDayIndex(Math.max(0, dayIndex - 1))} disabled={dayIndex === 0} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center flex-1 px-2">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">{workoutDays[dayIndex].label}</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">{workoutDays[dayIndex].workout}</p>
            </div>
            <button onClick={() => setDayIndex(Math.min(workoutDays.length - 1, dayIndex + 1))} disabled={dayIndex === workoutDays.length - 1} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Fridge Inventory */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <UtensilsCrossed className="w-4 h-4 text-primary" />
            Fridge Inventory
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {fridgeItems.map((item) => (
              <div key={item.name} className="bg-secondary/50 rounded-lg px-3 py-2">
                <p className="text-xs font-semibold text-foreground">{item.name}</p>
                {item.detail && <p className="text-[10px] text-muted-foreground">{item.detail}</p>}
              </div>
            ))}
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold h-9">
            <ScanLine className="w-4 h-4 mr-1.5" />
            Scan Grocery Receipt
          </Button>
        </CardContent>
      </Card>

      {/* AI Accountability Chat */}
      <div className="glass rounded-2xl p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Executive Insight</span>
          <RAGBadge />
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed">
          I noticed the <span className="font-bold text-foreground">198.6</span> weigh-in. Based on Saturday's sodium, this is water. Skip the peppers/onions tonight to minimize bloat; stick to the <span className="font-bold text-foreground">Chicken and Water</span>. Kitchen is <span className="font-black text-primary">CLOSED</span>.
        </p>
      </div>

      <EthicalGuardrail />

      {/* Macro Rings */}
      <div className="pt-2 pb-4">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium text-center mb-4">Daily Macros</p>
        <div className="flex justify-center gap-6">
          <MacroRing label="Protein" value={153} max={200} unit="g" />
          <MacroRing label="Carbs" value={20} max={150} unit="g" />
          <MacroRing label="Fats" value={35} max={80} unit="g" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
