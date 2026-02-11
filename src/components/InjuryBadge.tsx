import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const InjuryBadge = () => (
  <div className="fixed top-16 right-3 z-50">
    <Badge className="animate-pulse-red bg-primary text-primary-foreground border-none px-3 py-1.5 text-[10px] font-bold shadow-lg shadow-primary/30">
      <AlertTriangle className="w-3 h-3 mr-1" />
      Elbow: Neutral Grip Only
    </Badge>
  </div>
);

export default InjuryBadge;
