import { useState } from "react";
import { Moon, Footprints, Brain, TrendingDown, TrendingUp, Activity, Smartphone, Watch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { vitalityMetricsByProfile, vitalityDetailsByProfile, getDataKey } from "@/data/executive-data";
import { useProfile } from "@/contexts/ProfileContext";
import { getDefaultVitalityMetrics, getDefaultVitalityDetails, getSyncedVitalityMetrics, getSyncedVitalityDetails } from "@/data/default-profile-data";
import RAGBadge from "@/components/RAGBadge";
import EthicalGuardrail from "@/components/EthicalGuardrail";

const statusColor: Record<string, string> = {
  tracking: "text-foreground",
  building: "text-foreground",
  low: "text-primary",
  normal: "text-muted-foreground",
  under: "text-primary",
  active: "text-primary",
};

const Vitality = () => {
  const { activeProfile, info } = useProfile();
  const dataKey = getDataKey(info);
  const [healthSynced, setHealthSynced] = useState(false);
  const [syncSource, setSyncSource] = useState<"apple" | "samsung" | null>(null);

  const hasHardcodedData = !!vitalityMetricsByProfile[dataKey];

  const metrics = hasHardcodedData
    ? vitalityMetricsByProfile[dataKey]
    : healthSynced
      ? getSyncedVitalityMetrics(info.name, info.weight || "180", info.goal || "maintain")
      : getDefaultVitalityMetrics(info.name, info.weight || "180", info.goal || "maintain");

  const details = hasHardcodedData
    ? vitalityDetailsByProfile[dataKey]
    : healthSynced
      ? getSyncedVitalityDetails(info.goal || "maintain")
      : getDefaultVitalityDetails();

  const handleSync = (source: "apple" | "samsung") => {
    setSyncSource(source);
    setHealthSynced(true);
  };

  const sleepOnTrack = details.sleep.progress >= 90;
  const stepsOnTrack = details.steps.progress >= 70;

  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-foreground tracking-tight">VITALITY HUB</h2>
            <RAGBadge />
          </div>
          {!hasHardcodedData && (
            <div className="flex gap-1.5">
              <Button
                size="sm"
                variant={syncSource === "apple" ? "default" : "outline"}
                onClick={() => handleSync("apple")}
                className={syncSource === "apple"
                  ? "bg-primary text-primary-foreground text-[10px] font-black h-7 px-2.5 uppercase tracking-wider"
                  : "border-border text-muted-foreground text-[10px] font-black h-7 px-2.5 uppercase tracking-wider"
                }
              >
                <Watch className="w-3 h-3 mr-1" />
                {syncSource === "apple" ? "APPLE ✓" : "APPLE"}
              </Button>
              <Button
                size="sm"
                variant={syncSource === "samsung" ? "default" : "outline"}
                onClick={() => handleSync("samsung")}
                className={syncSource === "samsung"
                  ? "bg-primary text-primary-foreground text-[10px] font-black h-7 px-2.5 uppercase tracking-wider"
                  : "border-border text-muted-foreground text-[10px] font-black h-7 px-2.5 uppercase tracking-wider"
                }
              >
                <Smartphone className="w-3 h-3 mr-1" />
                {syncSource === "samsung" ? "SAMSUNG ✓" : "SAMSUNG"}
              </Button>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">10 EXECUTIVE HEALTH METRICS</p>
      </div>

      {/* Sleep Card */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Moon className="w-4 h-4 text-foreground" />
            SLEEP
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-black text-foreground">{details.sleep.total}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-bold uppercase">TARGET: {details.sleep.target}</p>
            </div>
            <div className={`flex items-center gap-1 ${sleepOnTrack ? "text-foreground" : "text-primary"}`}>
              {sleepOnTrack ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-xs font-black uppercase">{details.sleep.status}</span>
            </div>
          </div>
          <Progress value={details.sleep.progress} className="h-2 bg-secondary" />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono-data">
            <span>DEEP: {details.sleep.deep}</span>
            <span>REM: {details.sleep.rem}</span>
            <span>LIGHT: {details.sleep.light}</span>
          </div>
        </CardContent>
      </Card>

      {/* Steps Card */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Footprints className="w-4 h-4 text-foreground" />
            STEPS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-black text-foreground">{details.steps.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-bold uppercase">TARGET: {details.steps.target}</p>
            </div>
            <div className={`flex items-center gap-1 ${stepsOnTrack ? "text-foreground" : "text-primary"}`}>
              {stepsOnTrack ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-xs font-black uppercase">{details.steps.status}</span>
            </div>
          </div>
          <Progress value={details.steps.progress} className="h-2 bg-secondary" />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono-data">
            <span>DIST: {details.steps.distance}</span>
            <span>CAL: {details.steps.calories}</span>
            <span>FLOORS: {details.steps.floors}</span>
          </div>
        </CardContent>
      </Card>

      {/* Full Vitality Metrics Grid */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Activity className="w-4 h-4 text-foreground" />
            ALL METRICS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {metrics.map((m) => (
              <div key={m.id} className="bg-secondary border border-border px-3 py-2.5">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{m.name}</p>
                <p className="text-sm font-black text-foreground font-mono-data">
                  {m.value}<span className="text-[10px] text-muted-foreground ml-0.5">{m.unit}</span>
                </p>
                <p className={`text-[9px] font-black uppercase tracking-wider ${statusColor[m.status] || "text-muted-foreground"}`}>
                  {m.status === "normal" ? "✓ NOMINAL" : m.status === "low" || m.status === "under" ? "↓ " + m.status.toUpperCase() : m.status.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recovery Note */}
      <div className="glass p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          <span className="text-[10px] uppercase tracking-widest text-primary font-black">RECOVERY INSIGHT</span>
          <RAGBadge />
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed">
          {details.recoveryInsight}
        </p>
      </div>

      <EthicalGuardrail message="VITALITY METRICS ARE SELF-REPORTED ESTIMATES. CONSULT YOUR PHYSICIAN FOR CLINICAL-GRADE MEASUREMENTS." />
    </>
  );
};

export default Vitality;
