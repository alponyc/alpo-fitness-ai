import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const InjuryBadge = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed top-16 right-3 z-50">
      <Badge className="animate-pulse-red bg-primary text-primary-foreground border-none px-3 py-1.5 text-[10px] font-bold shadow-lg shadow-primary/30 flex items-center gap-1.5">
        <AlertTriangle className="w-3 h-3" />
        Elbow: Neutral Grip Only
        <button onClick={() => setDismissed(true)} className="ml-1 hover:opacity-70 transition-opacity">
          <X className="w-3 h-3" />
        </button>
      </Badge>
    </div>
  );
};

export default InjuryBadge;
