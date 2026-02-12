import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import alpoLogo from "@/assets/alpo-logo.png";

const AppHeader = () => (
  <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
    <div className="flex items-center gap-2.5">
      <img src={alpoLogo} alt="Alpo Fitness" className="w-8 h-8 rounded-lg object-cover" />
      <h1 className="text-lg font-black tracking-tight">
        Alpo <span className="text-primary">Executive</span> OS
      </h1>
    </div>
    <Avatar className="h-9 w-9 border-2 border-primary/40">
      <AvatarFallback className="bg-secondary text-foreground text-xs font-bold">
        <User className="w-4 h-4" />
      </AvatarFallback>
    </Avatar>
  </header>
);

export default AppHeader;
