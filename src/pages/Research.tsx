import { useState } from "react";
import { Zap, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { protocols, weeklyScheduleByProfile } from "@/data/executive-data";
import { useProfile } from "@/contexts/ProfileContext";
import { getDefaultWeeklySchedule } from "@/data/default-profile-data";
import RAGBadge from "@/components/RAGBadge";
import EthicalGuardrail from "@/components/EthicalGuardrail";

const Research = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { activeProfile, info } = useProfile();
  const weeklySchedule = weeklyScheduleByProfile[activeProfile] ?? getDefaultWeeklySchedule(info.goal || "maintain");

  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-black text-foreground tracking-tight">Research</h2>
          <RAGBadge />
        </div>
        <p className="text-xs text-muted-foreground">Protocol Library & Weekly Schedule</p>
      </div>

      {/* Weekly Schedule */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            {weeklySchedule.map((d) => (
              <div key={d.day} className="flex items-center gap-3 bg-secondary/50 rounded-lg px-3 py-2">
                <span className="text-xs font-black text-primary w-8">{d.day}</span>
                <span className="text-base">{d.icon}</span>
                <span className="text-xs font-semibold text-foreground flex-1">{d.protocol}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Protocol Library */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Zap className="w-4 h-4 text-primary" />
            Protocol Library
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {protocols.map((p) => (
            <button
              key={p.id}
              onClick={() => setExpanded(expanded === p.id ? null : p.id)}
              className="w-full text-left bg-secondary/50 hover:bg-secondary/70 rounded-lg px-3 py-2.5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{p.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{p.description}</p>
                </div>
                <Badge variant="outline" className="text-[8px] font-bold border-primary/30 text-primary shrink-0">
                  {p.category}
                </Badge>
              </div>
              {expanded === p.id && (
                <div className="mt-2 pt-2 border-t border-border">
                  <p className="text-[10px] text-foreground/80 leading-relaxed">
                    {p.description}. This protocol is categorized under <span className="font-bold text-primary">{p.category}</span> and can be combined with complementary protocols for optimized results.
                  </p>
                </div>
              )}
            </button>
          ))}
        </CardContent>
      </Card>

      <EthicalGuardrail message="Protocols are for educational purposes. Consult a certified trainer before starting any new program." />
    </>
  );
};

export default Research;
