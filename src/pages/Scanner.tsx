import { useState, useRef } from "react";
import { Upload, ScanLine, Sparkles, ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { scannerHotspots } from "@/data/executive-data";
import RAGBadge from "@/components/RAGBadge";
import EthicalGuardrail from "@/components/EthicalGuardrail";
import { useProfile } from "@/contexts/ProfileContext";

type HotspotKey = keyof typeof scannerHotspots;

const stripEthicalLabel = (text: string) => text.replace(/^Ethical Guardrail:/, "").trim();

const Scanner = () => {
  const { activeProfile, info } = useProfile();
  const [menuText, setMenuText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<HotspotKey | null>(null);
  const [animationPhase, setAnimationPhase] = useState<"idle" | "scanning" | "verifying">("idle");
  const resultsRef = useRef<HTMLDivElement>(null);

  // Hardcoded profiles have fridge data; dynamically created ones don't
  const hasExistingData = !!info.goal; // Users with profile data have existing data
  const isFridgeEmpty = activeHotspot === "fridgeAudit" && !hasExistingData;

  const currentResult = activeHotspot ? scannerHotspots[activeHotspot] : scannerHotspots.sampleMenu;

  const runGeminiAnimation = (callback: () => void) => {
    setAnalyzing(true);
    setShowResults(false);
    setAnimationPhase("scanning");
    setTimeout(() => {
      setAnimationPhase("verifying");
      setTimeout(() => {
        setAnimationPhase("idle");
        setAnalyzing(false);
        setShowResults(true);
        callback();
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }, 1000);
    }, 1000);
  };

  const handleAnalyze = () => {
    setActiveHotspot(null);
    runGeminiAnimation(() => {});
  };

  const handleHotspot = (key: HotspotKey) => {
    setActiveHotspot(key);
    runGeminiAnimation(() => {});
  };

  const handleUpload = () => {
    toast({ title: "Photo uploaded", description: "Analyzing macros..." });
    setActiveHotspot("fridgeAudit");
    runGeminiAnimation(() => {});
  };

  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-black text-foreground tracking-tight">Menu Analysis</h2>
          <RAGBadge />
        </div>
        <p className="text-xs text-muted-foreground">Upload an Uber Eats screenshot or paste a menu for AI breakdown.</p>
      </div>

      {/* Hotspot Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(scannerHotspots) as HotspotKey[]).map((key) => {
          const spot = scannerHotspots[key];
          return (
            <Button
              key={key}
              variant={activeHotspot === key ? "default" : "outline"}
              onClick={() => handleHotspot(key)}
              className={
                activeHotspot === key
                  ? "bg-primary text-primary-foreground text-[10px] font-bold h-auto py-2 flex flex-col gap-1"
                  : "border-border text-muted-foreground hover:text-foreground text-[10px] font-bold h-auto py-2 flex flex-col gap-1"
              }
            >
              <span className="text-base">{spot.icon}</span>
              {spot.label}
            </Button>
          );
        })}
      </div>

      {/* Upload Area */}
      <Card className="border-border bg-card border-dashed">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
            <Upload className="w-7 h-7 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Upload Screenshot</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Uber Eats, DoorDash, or any menu image</p>
          </div>
          <Button onClick={handleUpload} className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold h-9 px-5">
            <ScanLine className="w-4 h-4 mr-1.5" />
            Choose Image
          </Button>
        </CardContent>
      </Card>

      {/* Paste Menu */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold text-foreground">Paste Menu Text</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={menuText}
            onChange={(e) => setMenuText(e.target.value)}
            placeholder="Paste restaurant menu items here..."
            className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground text-sm min-h-[80px] resize-none"
          />
          <Button onClick={handleAnalyze} disabled={analyzing} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold h-9">
            {analyzing ? (
              <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-1.5" />
            )}
            {analyzing ? "Analyzing..." : "Analyze with Gemini"}
          </Button>
        </CardContent>
      </Card>

      {/* Gemini RAG-Audit Animation */}
      {analyzing && (
        <div className="glass rounded-2xl p-6 flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-xs text-muted-foreground font-medium">
            {animationPhase === "scanning" ? "Gemini scanning menu data..." : "RAG-Verifying against your protocols..."}
          </p>
          <div className="flex gap-1.5">
            <div className={`w-2 h-2 rounded-full ${animationPhase === "scanning" ? "bg-primary animate-pulse" : "bg-primary"}`} />
            <div className={`w-2 h-2 rounded-full ${animationPhase === "verifying" ? "bg-primary animate-pulse" : animationPhase === "scanning" ? "bg-muted" : "bg-primary"}`} />
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {showResults && isFridgeEmpty ? (
        <div ref={resultsRef} className="glass rounded-2xl p-6 flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <Upload className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-foreground">No Inventory Yet</p>
            <p className="text-xs text-muted-foreground">Upload a fridge photo or enter your inventory list to get started.</p>
          </div>
        </div>
      ) : showResults && (
        <div ref={resultsRef}>
          <div className="glass rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Gemini RAG-Audit</span>
              <RAGBadge />
            </div>
            <div className="space-y-2">
              {currentResult.aiResponse.split("\n").map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                  return <p key={i} className="text-xs font-black text-foreground mt-3 first:mt-0">{trimmed.replace(/\*\*/g, "")}</p>;
                }
                if (trimmed.startsWith("**") && trimmed.includes(":**")) {
                  const parts = trimmed.split(":**");
                  return <p key={i} className="text-xs font-black text-foreground mt-3 first:mt-0">{parts[0].replace(/\*\*/g, "")}: <span className="font-normal text-foreground/80">{parts.slice(1).join(":**").replace(/\*\*/g, "")}</span></p>;
                }
                if (trimmed.startsWith("•")) {
                  return <p key={i} className="text-xs text-foreground/80 leading-relaxed pl-3">{trimmed}</p>;
                }
                return <p key={i} className="text-sm text-foreground/90 leading-relaxed">{trimmed}</p>;
              })}
            </div>
          </div>

          

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Safe – Eat These
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {currentResult.safe.map((item) => (
                <div key={item.name} className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2.5">
                  <div>
                    <p className="text-xs font-semibold text-foreground">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">{item.note}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400">{item.cal}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className={`text-sm font-bold flex items-center gap-2 ${activeHotspot === "fridgeAudit" ? "text-amber-400" : "text-destructive"}`}>
                <ShieldAlert className="w-4 h-4" />
                {activeHotspot === "fridgeAudit" ? "⚠️ Low Inventory" : "Avoid – Skip These"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {currentResult.avoid.map((item) => (
                <div key={item.name} className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${activeHotspot === "fridgeAudit" ? "bg-amber-500/10 border border-amber-500/20" : "bg-destructive/10 border border-destructive/20"}`}>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">{item.note}</p>
                  </div>
                  <span className={`text-[10px] font-bold ${activeHotspot === "fridgeAudit" ? "text-amber-400" : "text-destructive"}`}>{item.cal}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Scanner;
