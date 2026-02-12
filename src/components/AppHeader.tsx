import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useProfile } from "@/contexts/ProfileContext";
import { useAuth } from "@/contexts/AuthContext";
import alpoLogo from "@/assets/alpo-logo.png";

const AppHeader = () => {
  const { info } = useProfile();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <img src={alpoLogo} alt="Alpo Fitness" className="w-8 h-8 rounded-lg object-cover" />
        <div>
          <h1 className="text-base font-black tracking-tight leading-none">
            Alpo <span className="text-primary">Fitness</span> AI
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
              <AvatarImage src={info.avatar} alt={info.label} className="object-cover" />
              <AvatarFallback className="bg-secondary text-foreground text-[10px] font-bold">
                {info.initials}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border-border min-w-[160px]">
          <DropdownMenuItem className="text-xs font-semibold text-foreground cursor-default">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={info.avatar} alt={info.label} className="object-cover" />
              <AvatarFallback className="bg-secondary text-foreground text-[8px] font-bold">{info.initials}</AvatarFallback>
            </Avatar>
            {info.name || "User"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-xs font-semibold text-destructive cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default AppHeader;
