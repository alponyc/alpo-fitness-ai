import { Moon, Footprints, Brain, TrendingDown, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { vitalityMetricsByProfile, vitalityDetailsByProfile } from "@/data/executive-data";
import { useProfile } from "@/contexts/ProfileContext";
import { getDefaultVitalityMetrics, getDefaultVitalityDetails } from "@/data/default-profile-data";
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
  const { activeProfile, info } = useProfile();
  const metrics = vitalityMetricsByProfile[activeProfile] ?? getDefaultVitalityMetrics(info.name, info.weight || "180", info.goal || "maintain");
  const details = vitalityDetailsByProfile[activeProfile] ?? getDefaultVitalityDetails();

  const sleepOnTrack = details.sleep.progress >= 90;
  const stepsOnTrack = details.steps.progress >= 70;

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
              <p className="text-3xl font-black text-foreground">{details.sleep.total}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Target: {details.sleep.target}</p>
            </div>
            <div className={`flex items-center gap-1 ${sleepOnTrack ? "text-emerald-400" : "text-destructive"}`}>
              {sleepOnTrack ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-xs font-bold">{details.sleep.status}</span>
            </div>
          </div>
          <Progress value={details.sleep.progress} className="h-2 bg-secondary" />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Deep: {details.sleep.deep}</span>
            <span>REM: {details.sleep.rem}</span>
            <span>Light: {details.sleep.light}</span>
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
              <p className="text-3xl font-black text-foreground">{details.steps.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Target: {details.steps.target}</p>
            </div>
            <div className={`flex items-center gap-1 ${stepsOnTrack ? "text-emerald-400" : "text-destructive"}`}>
              {stepsOnTrack ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-xs font-bold">{details.steps.status}</span>
            </div>
          </div>
          <Progress value={details.steps.progress} className="h-2 bg-secondary" />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Distance: {details.steps.distance}</span>
            <span>Calories: {details.steps.calories}</span>
            <span>Floors: {details.steps.floors}</span>
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
            {metrics.map((m) => (
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
          {details.recoveryInsight}
        </p>
      </div>

      <EthicalGuardrail message="Vitality metrics are self-reported estimates. Consult your physician for clinical-grade measurements." />
    </>
  );
};

export default Vitality;
