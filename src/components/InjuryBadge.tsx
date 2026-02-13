import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/contexts/ProfileContext";
import { vitalityMetricsByProfile, getDataKey } from "@/data/executive-data";

const InjuryBadge = () => {
  const [dismissed, setDismissed] = useState(false);
  const { info } = useProfile();
  const dataKey = getDataKey(info);
  const metrics = vitalityMetricsByProfile[dataKey];
  const injury = metrics?.find((m) => m.name === "Injury Status");

  if (dismissed || !injury || injury.status === "normal" || injury.value === "None") return null;

  return (
    <div className="fixed top-16 right-3 z-50">
      <Badge className="animate-pulse-red bg-primary text-primary-foreground border border-primary px-3 py-1.5 text-[10px] font-black shadow-lg shadow-primary/40 flex items-center gap-1.5 uppercase tracking-wider">
        <AlertTriangle className="w-3 h-3" />
        {injury.value}: {injury.target}
        <button onClick={() => setDismissed(true)} className="ml-1 hover:opacity-70 transition-opacity">
          <X className="w-3 h-3" />
        </button>
      </Badge>
    </div>
  );
};

export default InjuryBadge;
