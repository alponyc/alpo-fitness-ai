import { Moon, Footprints, Brain, TrendingDown, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { vitalityMetrics } from "@/data/executive-data";
import RAGBadge from "@/components/RAGBadge";
import EthicalGuardrail from "@/components/EthicalGuardrail";

const statusColor: Record<string, string> = {
  tracking: "text-primary",
  building: "text-primary",
  low: "text-destructive",
  normal: "text-emerald-400",
  under: "text-warning",
  active: "text-destructive",
};

const Vitality = () => {
  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-black text-foreground tracking-tight">Vitality Hub</h2>
          <RAGBadge />
        </div>
        <p className="text-xs text-muted-foreground">10 Executive Health Metrics</p>
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
            <div className="flex items-center gap-1 text-destructive">
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
              <p className="text-3xl font-black text-foreground">4,144</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Target: 10,000</p>
            </div>
            <div className="flex items-center gap-1 text-destructive">
              <span className="text-xs font-bold">Below Target</span>
            </div>
          </div>
          <Progress value={41} className="h-2 bg-secondary" />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Distance: 1.9 mi</span>
            <span>Calories: 178 kcal</span>
            <span>Floors: 4</span>
          </div>
        </CardContent>
      </Card>

      {/* Full Vitality Metrics Grid */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Activity className="w-4 h-4 text-primary" />
            All Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {vitalityMetrics.map((m) => (
              <div key={m.id} className="bg-secondary/50 rounded-lg px-3 py-2.5">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{m.name}</p>
                <p className="text-sm font-bold text-foreground">
                  {m.value}<span className="text-[10px] text-muted-foreground ml-0.5">{m.unit}</span>
                </p>
                <p className={`text-[9px] font-bold uppercase ${statusColor[m.status] || "text-muted-foreground"}`}>
                  {m.status === "normal" ? "✓ Normal" : m.status === "low" || m.status === "under" ? "↓ " + m.status : m.status}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recovery Note */}
      <div className="glass rounded-2xl p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Recovery Insight</span>
          <RAGBadge />
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed">
          Sleep is low (<span className="font-bold text-destructive">6h 45m</span>); keeping caffeine high and sodium low for today's <span className="font-bold text-foreground">196.x goal</span>. Step count at <span className="font-bold text-destructive">4,144</span> — consider a 30-min evening walk to hit target. Cortisol within range but monitor post-commute.
        </p>
      </div>

      <EthicalGuardrail message="Vitality metrics are self-reported estimates. Consult your physician for clinical-grade measurements." />
    </>
  );
};

export default Vitality;
