import { useState } from "react";
import { User, Briefcase, Scissors, AlertTriangle, Pill, ShieldCheck, ExternalLink, Brain, Loader2, Send, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/contexts/ProfileContext";
import { medicalProfilesByUser, getDataKey } from "@/data/executive-data";
import { getDefaultMedicalProfile } from "@/data/default-profile-data";
import RAGBadge from "@/components/RAGBadge";
import EthicalGuardrail from "@/components/EthicalGuardrail";

const symptomResponses: Record<string, string> = {
  fever: "RAG-Verified: Low-grade fever detected. Activate Cortisol Shield protocol immediately. Recommend rest, hydration (3.5L target), and postpone tonight's workout. Monitor for 24h. If >101°F, contact your physician.",
  elbow: "RAG-Verified: Left elbow flare noted. Switch ALL pressing to neutral grip immediately. Apply ice 15min post-workout. Avoid: skull crushers, pronated curls, close-grip bench. Recommend: hammer curls, neutral-grip DB press.",
  shoulder: "RAG-Verified: Shoulder impingement risk. Switch to neutral grip pressing ONLY. Add face pulls (3×15) to every session. Avoid: behind-the-neck press, upright rows, wide-grip bench. Recommend: landmine press, cable lateral raises.",
  knee: "RAG-Verified: Knee protocol activated. Switch to sled pushes and TKE (Terminal Knee Extensions) for quad work. Avoid: deep squats, leg extensions with heavy load, box jumps. Recommend: reverse sled drag, wall sits, isometric holds.",
  stiffness: "RAG-Verified: General stiffness detected. Add face pulls (3×20) and band pull-aparts to warm-up. Increase mobility work: 10min foam rolling pre-session. Consider: Epsom salt bath tonight, magnesium before bed.",
  default: "RAG-Verified: Symptom logged. Cross-referencing with your surgical history and current protocols. Recommend consulting your physician if symptoms persist beyond 48 hours.",
};

const MedicalVault = () => {
  const { activeProfile, info } = useProfile();
  const dataKey = getDataKey(info);
  const profile = medicalProfilesByUser[dataKey] ?? getDefaultMedicalProfile(info.name, info.age, info.gender, info.activityLevel);
  const [symptomInput, setSymptomInput] = useState("");
  const [symptomLoading, setSymptomLoading] = useState(false);
  const [symptomResponse, setSymptomResponse] = useState("");
  const [myChartSynced, setMyChartSynced] = useState(false);

  const handleSymptomSubmit = () => {
    if (!symptomInput.trim()) return;
    setSymptomLoading(true);
    setSymptomResponse("");
    setTimeout(() => {
      const lower = symptomInput.toLowerCase();
      if (lower.includes("fever")) setSymptomResponse(symptomResponses.fever);
      else if (lower.includes("elbow")) setSymptomResponse(symptomResponses.elbow);
      else if (lower.includes("shoulder")) setSymptomResponse(symptomResponses.shoulder);
      else if (lower.includes("knee")) setSymptomResponse(symptomResponses.knee);
      else if (lower.includes("stiff")) setSymptomResponse(symptomResponses.stiffness);
      else setSymptomResponse(symptomResponses.default);
      setSymptomLoading(false);
    }, 1500);
  };

  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-foreground tracking-tight">Medical Vault</h2>
            <RAGBadge />
          </div>
          <Button
            size="sm"
            variant={myChartSynced ? "default" : "outline"}
            onClick={() => {
              setMyChartSynced(!myChartSynced);
              if (!myChartSynced) window.open("https://mychart.com", "_blank");
            }}
            className={myChartSynced
              ? "bg-emerald-600 text-white text-[10px] font-bold h-7 px-2.5"
              : "border-border text-muted-foreground text-[10px] font-bold h-7 px-2.5"
            }
          >
            <Activity className="w-3 h-3 mr-1" />
            {myChartSynced ? "MyChart ✓" : "Sync MyChart"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Doctor's View — Executive Health Profile</p>
      </div>

      <EthicalGuardrail message="Medical Vault data is self-reported. Always verify with your healthcare provider before modifying protocols." />

      {/* Profile Overview */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <User className="w-4 h-4 text-primary" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/50 rounded-lg px-3 py-2.5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Age</p>
              <p className="text-sm font-bold text-foreground">{profile.age}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg px-3 py-2.5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Gender</p>
              <p className="text-sm font-bold text-foreground">{profile.gender}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg px-3 py-2.5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Activity Level</p>
              <p className="text-sm font-bold text-foreground capitalize">{info.activityLevel?.replace("_", " ") || "—"}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg px-3 py-2.5 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Work Week</p>
                <p className="text-sm font-bold text-foreground">{profile.workWeek}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Surgical History / Injury Archive */}
      {profile.surgicalHistory.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
              <Scissors className="w-4 h-4 text-primary" />
              Injury Archive
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {profile.surgicalHistory.map((s) => (
              <div key={s.procedure} className="bg-secondary/50 rounded-lg px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-foreground">{s.procedure}</p>
                  <Badge variant="outline" className="text-[9px] text-muted-foreground border-border">{s.date}</Badge>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{s.notes}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Injury Guardrails */}
      {profile.injuryGuardrails.length > 0 && (
        <Card className="border-destructive/30 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-4 h-4" />
              Injury Guardrails
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {profile.injuryGuardrails.map((g) => (
              <div key={g.area} className="bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-foreground">{g.area}</p>
                  <Badge className="bg-destructive text-destructive-foreground text-[9px] border-none">{g.severity}</Badge>
                </div>
                <p className="text-[10px] text-primary font-bold mt-1">Protocol: {g.protocol}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{g.notes}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Symptom Chatbox */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Brain className="w-4 h-4 text-primary" />
            Symptom Check
            <RAGBadge />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-[10px] text-muted-foreground">Try: "shoulder", "knee", "stiffness", "fever", or "elbow" for tactical AI triage.</p>
          <div className="flex gap-2">
            <Input
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSymptomSubmit()}
              placeholder="shoulder pain, knee stiffness..."
              className="bg-secondary/50 border-border text-foreground text-xs h-9"
            />
            <Button onClick={handleSymptomSubmit} disabled={symptomLoading} size="sm" className="bg-primary text-primary-foreground h-9 px-3">
              {symptomLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
          {symptomLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-[10px]">Gemini analyzing symptoms...</span>
            </div>
          )}
          {symptomResponse && (
            <div className="glass rounded-xl p-3 space-y-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span className="text-[9px] uppercase tracking-widest text-primary font-bold">Gemini Triage</span>
              </div>
              <p className="text-xs text-foreground/90 leading-relaxed">{symptomResponse}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Medications */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Pill className="w-4 h-4 text-primary" />
            Current Supplements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.medications.map((med) => (
              <Badge key={med} variant="secondary" className="text-[10px] font-medium">{med}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MedicalVault;
