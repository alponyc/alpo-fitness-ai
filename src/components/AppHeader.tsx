import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useProfile, profileMap, ProfileKey } from "@/contexts/ProfileContext";
import alpoLogo from "@/assets/alpo-logo.png";

const AppHeader = () => {
  const { activeProfile, setActiveProfile, info } = useProfile();

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <img src={alpoLogo} alt="Alpo Fitness" className="w-8 h-8 rounded-lg object-cover" />
        <div>
          <h1 className="text-base font-black tracking-tight leading-none">
            Alpo <span className="text-primary">Fitness</span> OS
          </h1>
          <p className="text-[7px] uppercase tracking-[0.2em] text-muted-foreground font-bold leading-none mt-0.5">
            A.L.P.O. — Adaptive Lifestyle Performance Optimization
          </p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1.5 focus:outline-none">
            <Avatar className="h-9 w-9 border-2 border-primary/40">
              <AvatarFallback className="bg-secondary text-foreground text-[10px] font-bold">
                {info.initials}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border-border min-w-[160px]">
          {(Object.keys(profileMap) as ProfileKey[]).map((key) => {
            const p = profileMap[key];
            return (
              <DropdownMenuItem
                key={key}
                onClick={() => setActiveProfile(key)}
                className={`text-xs font-semibold cursor-pointer ${activeProfile === key ? "text-primary" : "text-foreground"}`}
              >
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarFallback className="bg-secondary text-foreground text-[8px] font-bold">{p.initials}</AvatarFallback>
                </Avatar>
                {p.label}
                {activeProfile === key && <span className="ml-auto text-[8px] text-primary">●</span>}
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs font-semibold text-destructive cursor-pointer">
            <LogOut className="w-3.5 h-3.5 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default AppHeader;
