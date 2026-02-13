import { AlertTriangle } from "lucide-react";

const EthicalGuardrail = ({ message }: { message?: string }) => (
  <div className="flex items-start gap-2 bg-primary/5 border border-primary/20 px-3 py-2">
    <AlertTriangle className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
    <p className="text-[10px] text-primary font-bold leading-relaxed uppercase tracking-wide">
      {message || "GUARDRAIL: AI output is informational only. Consult a licensed professional before modifying protocols."}
    </p>
  </div>
);

export default EthicalGuardrail;
