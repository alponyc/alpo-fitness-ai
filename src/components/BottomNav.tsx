import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ScanLine, BookOpen, Heart, Stethoscope, ChefHat, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { path: "/dashboard", label: "DASH", icon: LayoutDashboard },
  { path: "/scanner", label: "SCAN", icon: ScanLine },
  { path: "/research", label: "INTEL", icon: BookOpen },
  { path: "/vitality", label: "VITALS", icon: Heart },
  { path: "/medical", label: "VAULT", icon: Stethoscope },
  { path: "/kitchen", label: "FUEL", icon: ChefHat },
  { path: "/settings", label: "SYS", icon: Settings },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="max-w-md mx-auto flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-1 py-2 transition-colors min-w-0",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="w-4.5 h-4.5" strokeWidth={1.5} />
              <span className={cn("text-[7px] font-black tracking-widest uppercase", isActive && "text-primary")}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
