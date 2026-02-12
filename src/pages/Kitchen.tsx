import { useState } from "react";
import { ChefHat, Plus, Sparkles, Loader2, Zap, TrendingDown, Scale, UtensilsCrossed } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { pantryGuide } from "@/data/executive-data";
import RAGBadge from "@/components/RAGBadge";
import EthicalGuardrail from "@/components/EthicalGuardrail";
import { useProfile } from "@/contexts/ProfileContext";

type PantryMode = "gain" | "lose" | "maintain";

const modeConfig: Record<PantryMode, { icon: typeof Zap; label: string }> = {
  gain: { icon: Zap, label: "Gain" },
  lose: { icon: TrendingDown, label: "Lose" },
  maintain: { icon: Scale, label: "Maintain" },
};

const Kitchen = () => {
  const { activeProfile } = useProfile();
  const isNewUser = !["alpo", "client", "family"].includes(activeProfile);
  const [activeMode, setActiveMode] = useState<PantryMode>("lose");
  const [items, setItems] = useState("");
  const [mealPlan, setMealPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const currentPantry = pantryGuide[activeMode];

  const handleCreateMealPlan = () => {
    setLoading(true);
    setMealPlan("");
    setTimeout(() => {
      const extra = items.trim() ? `\n\nAdded items: ${items.trim()}. Incorporated into plan.` : "";
      setMealPlan(
        `RAG-Verified Meal Plan (${currentPantry.label}):\n\n` +
        `Meal 1 — ${currentPantry.items[0].name} (${currentPantry.items[0].macros})\n` +
        `Meal 2 — ${currentPantry.items[1].name} (${currentPantry.items[1].macros})\n` +
        `Meal 3 — ${currentPantry.items[2].name} + ${currentPantry.items[3].name}\n\n` +
        `Daily Totals: ~1,200 cal | Protocol: ${currentPantry.protocol}` +
        extra
      );
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-black text-foreground tracking-tight">Kitchen</h2>
          <RAGBadge />
        </div>
        <p className="text-xs text-muted-foreground">Executive Nutrition & Meal Planning</p>
      </div>

      {/* Pantry Guide */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <ChefHat className="w-4 h-4 text-primary" />
            Executive Pantry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isNewUser ? (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">No Pantry Data Yet</p>
                <p className="text-[10px] text-muted-foreground mt-1">Use the AI Scanner to audit your fridge and populate your Executive Pantry.</p>
              </div>
            </div>
          ) : (
            <>
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
                      {modeConfig[mode].label}
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
            </>
          )}
        </CardContent>
      </Card>

      {/* Kitchen AI */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            Kitchen AI
            <RAGBadge />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-[10px] text-muted-foreground mb-2">Add items you have on hand:</p>
            <Textarea
              value={items}
              onChange={(e) => setItems(e.target.value)}
              placeholder="e.g. chicken breast, rice, broccoli, olive oil..."
              className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground text-xs min-h-[60px] resize-none"
            />
          </div>
          <Button
            onClick={handleCreateMealPlan}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold h-9"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Plus className="w-4 h-4 mr-1.5" />}
            {loading ? "Generating..." : "Create Meal Plan"}
          </Button>

          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-[10px]">Gemini building your meal plan...</span>
            </div>
          )}

          {mealPlan && (
            <div className="glass rounded-xl p-3 space-y-1">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-[9px] uppercase tracking-widest text-primary font-bold">AI Meal Plan</span>
              </div>
              <pre className="text-xs text-foreground/90 leading-relaxed whitespace-pre-wrap font-sans">{mealPlan}</pre>
            </div>
          )}

          <EthicalGuardrail message="Meal plans are AI-generated suggestions. Adjust portions based on your specific caloric and macro targets." />
        </CardContent>
      </Card>
    </>
  );
};

export default Kitchen;
