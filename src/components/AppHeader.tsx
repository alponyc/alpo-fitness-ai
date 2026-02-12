import { useState } from "react";
import { User, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import alpoLogo from "@/assets/alpo-logo.png";

const profiles = [
  { name: "Executive", initials: "EX" },
  { name: "Coach View", initials: "CV" },
  { name: "Sophie", initials: "SO" },
];

const AppHeader = () => {
  const [activeProfile, setActiveProfile] = useState(0);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <img src={alpoLogo} alt="Alpo Fitness" className="w-8 h-8 rounded-lg object-cover" />
        <div>
          <h1 className="text-base font-black tracking-tight leading-none">
            Alpo <span className="text-primary">Fitness</span> OS
          </h1>
          <p className="text-[8px] uppercase tracking-[0.25em] text-muted-foreground font-bold leading-none mt-0.5">
            A.L.P.O.
          </p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1.5 focus:outline-none">
            <Avatar className="h-9 w-9 border-2 border-primary/40">
              <AvatarFallback className="bg-secondary text-foreground text-[10px] font-bold">
                {profiles[activeProfile].initials}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border-border min-w-[140px]">
          {profiles.map((p, i) => (
            <DropdownMenuItem
              key={p.name}
              onClick={() => setActiveProfile(i)}
              className="text-xs font-semibold text-foreground cursor-pointer"
            >
              <Avatar className="h-6 w-6 mr-2">
                <AvatarFallback className="bg-secondary text-foreground text-[8px] font-bold">{p.initials}</AvatarFallback>
              </Avatar>
              {p.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default AppHeader;
