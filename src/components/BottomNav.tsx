import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ScanLine, Heart, BookOpen, Stethoscope, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/scanner", label: "Scanner", icon: ScanLine },
  { path: "/research", label: "Research", icon: BookOpen },
  { path: "/vitality", label: "Vitality", icon: Heart },
  { path: "/medical", label: "Vault", icon: Stethoscope },
  { path: "/settings", label: "Settings", icon: Settings },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border">
      <div className="max-w-md mx-auto flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg transition-colors min-w-0",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className={cn("w-5 h-5", isActive && "drop-shadow-[0_0_6px_hsl(var(--primary))]")} />
              <span className={cn("text-[9px] font-semibold tracking-wide", isActive && "text-primary")}>
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
