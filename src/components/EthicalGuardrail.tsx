import { AlertTriangle } from "lucide-react";

const EthicalGuardrail = ({ message }: { message?: string }) => (
  <div className="flex items-start gap-2 bg-warning/10 border border-warning/20 rounded-lg px-3 py-2">
    <AlertTriangle className="w-3.5 h-3.5 text-warning mt-0.5 shrink-0" />
    <p className="text-[10px] text-warning font-medium leading-relaxed">
      {message || "Ethical Guardrail: This AI output is for informational purposes only. Consult a licensed professional before making health decisions."}
    </p>
  </div>
);

export default EthicalGuardrail;
