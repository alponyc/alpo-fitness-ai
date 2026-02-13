import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RAGBadge = () => (
  <Badge className="bg-primary/15 text-primary border border-primary/40 text-[9px] font-black gap-1 uppercase tracking-wider">
    <ShieldCheck className="w-3 h-3" />
    RAG-VERIFIED
  </Badge>
);

export default RAGBadge;
