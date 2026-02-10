import { useState } from "react";
import { ChevronLeft, ChevronRight, User, Dumbbell, Trophy, UtensilsCrossed, Brain, AlertTriangle, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MacroRing from "@/components/MacroRing";
import alpoLogo from "@/assets/alpo-logo.png";

const workoutDays = [
  { label: "2 Days Ago", workout: "Upper Body Push (Chest & Shoulders)" },
  { label: "Yesterday", workout: "High Volume Legs (Scott Protocol)" },
  { label: "Today", workout: "Active Recovery Cardio (The Flush) – 30 mins" },
];

const fridgeItems = [
  { name: "Churrasco", detail: "2 portions" },
  { name: "Arabic Chicken", detail: "3 portions" },
  { name: "Asparagus", detail: null },
  { name: "Peppers", detail: null },
  { name: "Onions", detail: null },
  { name: "42g Fairlife", detail: "1" },
];

const Index = () => {
  const [dayIndex, setDayIndex] = useState(1);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Injury Status Badge */}
      <div className="fixed top-16 right-3 z-50">
        <Badge className="animate-pulse-red bg-primary text-primary-foreground border-none px-3 py-1.5 text-[10px] font-bold shadow-lg shadow-primary/30">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Elbow: Neutral Grip Only
        </Badge>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src={alpoLogo} alt="Alpo Fitness" className="w-8 h-8 rounded-lg object-cover" />
          <h1 className="text-lg font-black tracking-tight">
            Alpo <span className="text-primary">Fitness</span> AI
          </h1>
        </div>
        <Avatar className="h-9 w-9 border-2 border-primary/40">
          <AvatarFallback className="bg-secondary text-foreground text-xs font-bold">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto">
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
              <button
                onClick={() => setDayIndex(Math.max(0, dayIndex - 1))}
                disabled={dayIndex === 0}
                className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-center flex-1 px-2">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                  {workoutDays[dayIndex].label}
                </p>
                <p className="text-sm font-semibold text-foreground mt-0.5">
                  {workoutDays[dayIndex].workout}
                </p>
              </div>
              <button
                onClick={() => setDayIndex(Math.min(workoutDays.length - 1, dayIndex + 1))}
                disabled={dayIndex === workoutDays.length - 1}
                className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="border-t border-border pt-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Today</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">
                Active Recovery Cardio (The Flush) – 30 mins
              </p>
            </div>
          </CardContent>
        </Card>

        {/* PR Tracker */}
        <Card className="bg-foreground border-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-background" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-background/60 font-medium">Personal Record</p>
                <p className="text-sm font-black text-background">Chest Press Max: 200 lbs</p>
              </div>
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold h-8 px-3">
              Log New PR
            </Button>
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
                  {item.detail && (
                    <p className="text-[10px] text-muted-foreground">{item.detail}</p>
                  )}
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
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            I noticed the <span className="font-bold text-foreground">198.6</span> weigh-in. Based on Saturday's sodium, this is water. Skip the peppers/onions tonight to minimize bloat; stick to the <span className="font-bold text-foreground">Chicken and Water</span>. Kitchen is <span className="font-black text-primary">CLOSED</span>.
          </p>
        </div>

        {/* Macro Rings */}
        <div className="pt-2 pb-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium text-center mb-4">Daily Macros</p>
          <div className="flex justify-center gap-6">
            <MacroRing label="Protein" value={142} max={200} unit="g" />
            <MacroRing label="Carbs" value={20} max={150} unit="g" />
            <MacroRing label="Fats" value={35} max={80} unit="g" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
