import { User, Briefcase, Scissors, AlertTriangle, Pill, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { medicalProfile } from "@/data/executive-data";
import RAGBadge from "@/components/RAGBadge";
import EthicalGuardrail from "@/components/EthicalGuardrail";

const MedicalVault = () => {
  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-black text-foreground tracking-tight">Medical Vault</h2>
          <RAGBadge />
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
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/50 rounded-lg px-3 py-2.5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Age</p>
              <p className="text-sm font-bold text-foreground">{medicalProfile.age}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg px-3 py-2.5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Gender</p>
              <p className="text-sm font-bold text-foreground">{medicalProfile.gender}</p>
            </div>
            <div className="col-span-2 bg-secondary/50 rounded-lg px-3 py-2.5 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Work Week</p>
                <p className="text-sm font-bold text-foreground">{medicalProfile.workWeek}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Surgical History */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Scissors className="w-4 h-4 text-primary" />
            Surgical History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {medicalProfile.surgicalHistory.map((s) => (
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

      {/* Injury Guardrails */}
      <Card className="border-destructive/30 bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-4 h-4" />
            Injury Guardrails
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {medicalProfile.injuryGuardrails.map((g) => (
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
            {medicalProfile.medications.map((med) => (
              <Badge key={med} variant="secondary" className="text-[10px] font-medium">{med}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MedicalVault;
