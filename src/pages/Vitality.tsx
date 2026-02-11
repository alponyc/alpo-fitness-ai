import { Moon, Footprints, Brain, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Vitality = () => {
  return (
    <>
      {/* Page Title */}
      <div className="space-y-1">
        <h2 className="text-xl font-black text-foreground tracking-tight">Vitality Hub</h2>
        <p className="text-xs text-muted-foreground">Sleep, steps, and recovery insights.</p>
      </div>

      {/* Sleep Card */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Moon className="w-4 h-4 text-primary" />
            Sleep
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-black text-foreground">6h 45m</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Target: 8h 00m</p>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <TrendingDown className="w-4 h-4" />
              <span className="text-xs font-bold">Below Target</span>
            </div>
          </div>
          <Progress value={84} className="h-2 bg-secondary" />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Deep: 1h 20m</span>
            <span>REM: 2h 05m</span>
            <span>Light: 3h 20m</span>
          </div>
        </CardContent>
      </Card>

      {/* Steps Card */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Footprints className="w-4 h-4 text-primary" />
            Steps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-black text-foreground">10,042</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Target: 10,000</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-400">
              <span className="text-xs font-bold">✓ Goal Hit</span>
            </div>
          </div>
          <Progress value={100} className="h-2 bg-secondary" />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Distance: 4.8 mi</span>
            <span>Calories: 420 kcal</span>
            <span>Floors: 12</span>
          </div>
        </CardContent>
      </Card>

      {/* AI Recovery Note */}
      <div className="glass rounded-2xl p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Recovery Insight</span>
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed">
          Sleep is low (<span className="font-bold text-primary">6h 45m</span>); keeping caffeine high and sodium low for today's <span className="font-bold text-foreground">196.x goal</span>. Consider a 20-min power nap before the afternoon flush cardio to optimize recovery.
        </p>
      </div>
    </>
  );
};

export default Vitality;
