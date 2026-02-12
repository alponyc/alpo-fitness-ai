import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Dumbbell, Trophy, UtensilsCrossed, Brain, Clock, Scale, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MacroRing from "@/components/MacroRing";
import RAGBadge from "@/components/RAGBadge";
import EthicalGuardrail from "@/components/EthicalGuardrail";
import { useProfile } from "@/contexts/ProfileContext";
import { dashboardDataByProfile, kitchenDataByProfile, workoutsByProfile, prCardsByProfile } from "@/data/executive-data";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];



const Dashboard = () => {
  const { activeProfile } = useProfile();
  const data = dashboardDataByProfile[activeProfile];
  const kitchen = kitchenDataByProfile[activeProfile];
  const workoutDays = workoutsByProfile[activeProfile];
  const prCards = prCardsByProfile[activeProfile];
  const [execDayIndex, setExecDayIndex] = useState(3); // Wed
  const [workoutIndex, setWorkoutIndex] = useState(1); // Today
  const [weightIndex, setWeightIndex] = useState(data.weightHistory.length - 1);
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentDayKey = weekDays[execDayIndex];
  const currentTimeline = data.executionLogsByDay[currentDayKey] || data.timeline;
  const totalProtein = currentTimeline.reduce((sum, t) => sum + parseInt(t.protein), 0);

  return (
    <>
      {/* Swipeable Execution Log */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Clock className="w-4 h-4 text-primary" />
            Execution Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Day Selector */}
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => setExecDayIndex(Math.max(0, execDayIndex - 1))} disabled={execDayIndex === 0} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-black text-primary">{currentDayKey}</span>
            <button onClick={() => setExecDayIndex(Math.min(6, execDayIndex + 1))} disabled={execDayIndex === 6} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          {/* Day pills */}
          <div className="flex justify-between mb-3 gap-1">
            {weekDays.map((d, i) => (
              <button
                key={d}
                onClick={() => setExecDayIndex(i)}
                className={`text-[9px] font-bold px-2 py-1 rounded-full transition-colors ${i === execDayIndex ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground"}`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="relative pl-4 space-y-3">
            <div className="absolute left-[7px] top-1 bottom-1 w-px bg-primary/30" />
            {currentTimeline.map((entry, i) => (
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
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between bg-secondary/50 rounded-lg p-3">
            <button onClick={() => setWeightIndex(Math.max(0, weightIndex - 1))} disabled={weightIndex === 0} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center flex-1 px-2">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">{data.weightHistory[weightIndex].date}</p>
              <p className="text-2xl font-black text-foreground mt-0.5">{data.weightHistory[weightIndex].weight} lbs</p>
              {data.weightHistory[weightIndex].delta && (
                <div className="flex items-center justify-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-primary" />
                  <span className="text-xs font-bold text-primary">{data.weightHistory[weightIndex].delta} lbs</span>
                </div>
              )}
            </div>
            <button onClick={() => setWeightIndex(Math.min(data.weightHistory.length - 1, weightIndex + 1))} disabled={weightIndex === data.weightHistory.length - 1} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
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
          <div className="flex items-center gap-1">
            <button
              onClick={() => carouselRef.current?.scrollBy({ left: -140, behavior: "smooth" })}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div ref={carouselRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory flex-1">
              {prCards.map((pr, i) => (
                <div key={i} className="snap-start shrink-0 w-28 bg-secondary/50 rounded-lg px-3 py-2.5 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{pr.date}</p>
                  <p className="text-xs font-bold text-foreground mt-1 truncate">{pr.lift}</p>
                  <p className="text-sm font-black text-primary mt-0.5">{pr.weight}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => carouselRef.current?.scrollBy({ left: 140, behavior: "smooth" })}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <Button size="sm" className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold h-8">
            Log New PR
          </Button>
        </CardContent>
      </Card>

      {/* Swipeable Workout Log */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Dumbbell className="w-4 h-4 text-primary" />
            Workout Log
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between bg-secondary/50 rounded-lg p-3">
            <button onClick={() => setWorkoutIndex(Math.max(0, workoutIndex - 1))} disabled={workoutIndex === 0} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center flex-1 px-2">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">{workoutDays[workoutIndex].label}</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">{workoutDays[workoutIndex].workout}</p>
            </div>
            <button onClick={() => setWorkoutIndex(Math.min(workoutDays.length - 1, workoutIndex + 1))} disabled={workoutIndex === workoutDays.length - 1} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
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
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {kitchen.fridgeItems.map((item) => {
              const levelStyles = item.level === "low"
                ? "bg-destructive/10 border border-destructive/20"
                : item.level === "mid"
                ? "bg-amber-500/10 border border-amber-500/20"
                : "bg-emerald-500/10 border border-emerald-500/20";
              const badgeStyles = item.level === "low"
                ? "text-destructive"
                : item.level === "mid"
                ? "text-amber-400"
                : "text-emerald-400";
              const badgeLabel = item.level === "low" ? "Low" : item.level === "mid" ? "Mid" : "Full";
              return (
                <div key={item.name} className={`rounded-lg px-3 py-2 ${levelStyles}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-foreground">{item.name}</p>
                    <span className={`text-[9px] font-black uppercase ${badgeStyles}`}>{badgeLabel}</span>
                  </div>
                  {item.detail && <p className="text-[10px] text-muted-foreground">{item.detail}</p>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Accountability Chat */}
      <div className="glass rounded-2xl p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Executive Insight</span>
          <RAGBadge />
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed">{data.insight}</p>
      </div>

      

      {/* Macro Rings */}
      <div className="pt-2 pb-4">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium text-center mb-4">Daily Macros</p>
        <div className="flex justify-center gap-6">
          <MacroRing label="Protein" value={data.macros.protein} max={200} unit="g" />
          <MacroRing label="Carbs" value={data.macros.carbs} max={150} unit="g" />
          <MacroRing label="Fats" value={data.macros.fats} max={80} unit="g" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
