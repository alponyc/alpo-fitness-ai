import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RAGBadge = () => (
  <Badge className="bg-primary/20 text-primary border-primary/30 text-[9px] font-bold gap-1">
    <ShieldCheck className="w-3 h-3" />
    RAG-Verified
  </Badge>
);

export default RAGBadge;
