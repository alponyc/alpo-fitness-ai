import { useState } from "react";
import { BookOpen, Zap, TrendingDown, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pantryGuide, protocols } from "@/data/executive-data";
import RAGBadge from "@/components/RAGBadge";
import EthicalGuardrail from "@/components/EthicalGuardrail";

type PantryMode = "gain" | "lose" | "maintain";

const modeConfig: Record<PantryMode, { icon: typeof Zap; color: string }> = {
  gain: { icon: Zap, color: "text-primary" },
  lose: { icon: TrendingDown, color: "text-destructive" },
  maintain: { icon: Scale, color: "text-muted-foreground" },
};

const Research = () => {
  const [activeMode, setActiveMode] = useState<PantryMode>("lose");
  const currentPantry = pantryGuide[activeMode];

  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-black text-foreground tracking-tight">Research</h2>
          <RAGBadge />
        </div>
        <p className="text-xs text-muted-foreground">Pantry Guide & Protocol Library</p>
      </div>

      {/* Pantry Mode Toggle */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <BookOpen className="w-4 h-4 text-primary" />
            Executive Pantry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(pantryGuide) as PantryMode[]).map((mode) => {
              const Icon = modeConfig[mode].icon;
              return (
                <Button
                  key={mode}
                  variant={activeMode === mode ? "default" : "outline"}
                  onClick={() => setActiveMode(mode)}
                  className={cn(
                    "text-[10px] font-bold h-9 flex flex-col gap-0.5 py-1",
                    activeMode === mode
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {pantryGuide[mode].label.split(" ")[0]}
                </Button>
              );
            })}
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-foreground">{currentPantry.label}</p>
            <p className="text-[10px] text-muted-foreground">Protocol: {currentPantry.protocol}</p>
          </div>

          <div className="space-y-2">
            {currentPantry.items.map((item) => (
              <div key={item.name} className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2.5">
                <div>
                  <p className="text-xs font-semibold text-foreground">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground">{item.macros}</p>
                </div>
                <span className="text-[10px] font-bold text-primary">{item.cal}</span>
              </div>
            ))}
          </div>

          <EthicalGuardrail message="Pantry recommendations are based on general macronutrient targets. Individual needs may vary." />
        </CardContent>
      </Card>

      {/* Protocol Library Preview */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Zap className="w-4 h-4 text-primary" />
            Protocol Library
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {protocols.map((p) => (
            <div key={p.id} className="flex items-center gap-3 bg-secondary/50 rounded-lg px-3 py-2.5">
              <span className="text-lg">{p.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{p.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{p.description}</p>
              </div>
              <span className="text-[9px] font-bold text-primary/70 uppercase tracking-wider shrink-0">{p.category}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default Research;
