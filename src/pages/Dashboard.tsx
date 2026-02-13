import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Dumbbell, Trophy, UtensilsCrossed, Brain, Clock, Scale, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MacroRing from "@/components/MacroRing";
import RAGBadge from "@/components/RAGBadge";
import EthicalGuardrail from "@/components/EthicalGuardrail";
import { useProfile } from "@/contexts/ProfileContext";
import { dashboardDataByProfile, kitchenDataByProfile, workoutsByProfile, prCardsByProfile, getDataKey } from "@/data/executive-data";
import { getDefaultDashboardData, getDefaultKitchenData, getDefaultWorkouts, getDefaultPRCards } from "@/data/default-profile-data";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Dashboard = () => {
  const { activeProfile, info } = useProfile();
  const dataKey = getDataKey(info);
  const data = dashboardDataByProfile[dataKey] ?? getDefaultDashboardData(info.name, info.weight || "180", info.goal || "maintain");
  const kitchen = kitchenDataByProfile[dataKey] ?? getDefaultKitchenData(info.goal || "maintain");
  const workoutDays = workoutsByProfile[dataKey] ?? getDefaultWorkouts(info.goal || "maintain");
  const prCards = prCardsByProfile[dataKey] ?? getDefaultPRCards();
  const [execDayIndex, setExecDayIndex] = useState(3);
  const [workoutIndex, setWorkoutIndex] = useState(1);
  const [weightIndex, setWeightIndex] = useState(data.weightHistory.length - 1);

  const safeWeightIndex = Math.min(weightIndex, data.weightHistory.length - 1);
  const currentWeight = data.weightHistory[safeWeightIndex];
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentDayKey = weekDays[execDayIndex];
  const currentTimeline = data.executionLogsByDay[currentDayKey] || data.timeline;
  const totalProtein = currentTimeline.reduce((sum, t) => sum + parseInt(t.protein), 0);

  return (
    <>
      {/* HERO WEIGHT — THE HANDLE */}
      <div className="border border-primary/30 bg-card p-6 text-center space-y-1">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-black">CURRENT HANDLE</p>
        <p className="text-5xl font-black text-primary leading-none">{currentWeight?.weight ?? "—"}</p>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">LBS</p>
        {currentWeight?.delta && (
          <div className="flex items-center justify-center gap-1 mt-2">
            <TrendingDown className="w-4 h-4 text-primary" />
            <span className="text-sm font-black text-primary">{currentWeight.delta} LBS</span>
          </div>
        )}
        <p className="text-[9px] text-muted-foreground mt-1 font-bold">{currentWeight?.date ?? ""}</p>
      </div>

      {/* Swipeable Execution Log */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Clock className="w-4 h-4 text-foreground" />
            EXECUTION LOG
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => setExecDayIndex(Math.max(0, execDayIndex - 1))} disabled={execDayIndex === 0} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-black text-primary uppercase tracking-widest">{currentDayKey}</span>
            <button onClick={() => setExecDayIndex(Math.min(6, execDayIndex + 1))} disabled={execDayIndex === 6} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex justify-between mb-3 gap-1">
            {weekDays.map((d, i) => (
              <button
                key={d}
                onClick={() => setExecDayIndex(i)}
                className={`text-[9px] font-black px-2 py-1 transition-colors uppercase tracking-wider ${i === execDayIndex ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground border border-border"}`}
              >
                {d}
              </button>
            ))}
          </div>
          {currentTimeline.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-xs text-muted-foreground font-bold uppercase">NO ENTRIES — LOG FIRST MEAL</p>
            </div>
          ) : (
            <div className="relative pl-4 space-y-3">
              <div className="absolute left-[7px] top-1 bottom-1 w-px bg-primary/30" />
              {currentTimeline.map((entry, i) => (
                <div key={i} className="relative flex items-start gap-3">
                  <div className="absolute left-[-13px] top-1.5 w-2.5 h-2.5 bg-primary border-2 border-background z-10" />
                  <div className="flex-1 flex items-center justify-between bg-secondary border border-border px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{entry.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-foreground uppercase">{entry.item}</p>
                        <p className="text-[10px] text-muted-foreground font-mono-data">{entry.time}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-primary">{entry.protein} P</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {totalProtein > 0 && (
            <div className="mt-3 flex items-center justify-between bg-primary/10 border border-primary/30 px-3 py-2">
              <span className="text-[10px] uppercase tracking-widest text-primary font-black">TOTAL PROTEIN</span>
              <span className="text-sm font-black text-primary">~{totalProtein}g</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weight History */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Scale className="w-4 h-4 text-foreground" />
            WEIGHT HISTORY
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between bg-secondary border border-border p-3">
            <button onClick={() => setWeightIndex(Math.max(0, safeWeightIndex - 1))} disabled={safeWeightIndex === 0} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center flex-1 px-2">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{currentWeight?.date ?? "—"}</p>
              <p className="text-2xl font-black text-foreground mt-0.5">{currentWeight?.weight ?? "—"} LBS</p>
              {currentWeight?.delta && (
                <div className="flex items-center justify-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-primary" />
                  <span className="text-xs font-black text-primary">{currentWeight.delta} LBS</span>
                </div>
              )}
            </div>
            <button onClick={() => setWeightIndex(Math.min(data.weightHistory.length - 1, safeWeightIndex + 1))} disabled={safeWeightIndex === data.weightHistory.length - 1} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* PR Carousel */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Trophy className="w-4 h-4 text-foreground" />
            PR TRACKER
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-1">
            <button onClick={() => carouselRef.current?.scrollBy({ left: -140, behavior: "smooth" })} className="p-1 text-muted-foreground hover:text-foreground transition-colors shrink-0">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div ref={carouselRef} className="flex gap-2 overflow-x-hidden pb-2 scrollbar-hide flex-1">
              {prCards.map((pr, i) => (
                <div key={i} className="snap-start shrink-0 w-28 bg-secondary border border-border px-3 py-2.5 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{pr.date}</p>
                  <p className="text-xs font-black text-foreground mt-1 truncate uppercase">{pr.lift}</p>
                  <p className="text-sm font-black text-primary mt-0.5">{pr.weight}</p>
                </div>
              ))}
            </div>
            <button onClick={() => carouselRef.current?.scrollBy({ left: 140, behavior: "smooth" })} className="p-1 text-muted-foreground hover:text-foreground transition-colors shrink-0">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Workout Log */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Dumbbell className="w-4 h-4 text-foreground" />
            WORKOUT LOG
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between bg-secondary border border-border p-3">
            <button onClick={() => setWorkoutIndex(Math.max(0, workoutIndex - 1))} disabled={workoutIndex === 0} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center flex-1 px-2">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{workoutDays[workoutIndex].label}</p>
              <p className="text-sm font-bold text-foreground mt-0.5 uppercase">{workoutDays[workoutIndex].workout}</p>
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
            <UtensilsCrossed className="w-4 h-4 text-foreground" />
            FRIDGE INVENTORY
          </CardTitle>
        </CardHeader>
        <CardContent>
          {kitchen.fridgeItems.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-xs text-muted-foreground font-bold uppercase">NO INVENTORY — SCAN FRIDGE TO START</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {kitchen.fridgeItems.map((item) => {
                const isLow = item.level === "low";
                const isMid = item.level === "mid";
                const levelStyles = isLow
                  ? "bg-primary/10 border border-primary/30"
                  : isMid
                  ? "bg-secondary border border-border"
                  : "bg-secondary border border-border";
                const badgeStyles = isLow ? "text-primary" : "text-muted-foreground";
                const badgeLabel = isLow ? "LOW" : isMid ? "MID" : "FULL";
                return (
                  <div key={item.name} className={`px-3 py-2 ${levelStyles}`}>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-foreground uppercase">{item.name}</p>
                      <span className={`text-[9px] font-black uppercase tracking-wider ${badgeStyles}`}>{badgeLabel}</span>
                    </div>
                    {item.detail && <p className="text-[10px] text-muted-foreground">{item.detail}</p>}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Accountability */}
      <div className="glass p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          <span className="text-[10px] uppercase tracking-widest text-primary font-black">EXECUTIVE INSIGHT</span>
          <RAGBadge />
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed">{data.insight}</p>
      </div>

      {/* Macro Rings */}
      <div className="pt-2 pb-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-black text-center mb-4">DAILY MACROS</p>
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
