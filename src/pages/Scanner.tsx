import { useState } from "react";
import { Upload, ScanLine, Sparkles, ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { scannerHotspots } from "@/data/executive-data";
import RAGBadge from "@/components/RAGBadge";
import EthicalGuardrail from "@/components/EthicalGuardrail";

type HotspotKey = keyof typeof scannerHotspots;

const Scanner = () => {
  const [menuText, setMenuText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<HotspotKey | null>(null);

  const currentResult = activeHotspot ? scannerHotspots[activeHotspot] : scannerHotspots.sampleMenu;

  const handleAnalyze = () => {
    setAnalyzing(true);
    setShowResults(false);
    setActiveHotspot(null);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const handleHotspot = (key: HotspotKey) => {
    setActiveHotspot(key);
    setAnalyzing(true);
    setShowResults(false);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 1500);
  };

  const handleUpload = () => {
    toast({
      title: "Photo uploaded",
      description: "Analyzing macros...",
    });
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

      {/* Loading State */}
      {analyzing && (
        <div className="glass rounded-2xl p-6 flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-xs text-muted-foreground font-medium">Gemini is analyzing your menu...</p>
        </div>
      )}

      {/* Analysis Results */}
      {showResults && (
        <>
          <div className="glass rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Gemini-Powered Analysis</span>
              <RAGBadge />
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {currentResult.aiResponse}
            </p>
          </div>

          <EthicalGuardrail />

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
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-destructive">
                <ShieldAlert className="w-4 h-4" />
                Avoid – Skip These
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {currentResult.avoid.map((item) => (
                <div key={item.name} className="flex items-center justify-between bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2.5">
                  <div>
                    <p className="text-xs font-semibold text-foreground">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">{item.note}</p>
                  </div>
                  <span className="text-[10px] font-bold text-destructive">{item.cal}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default Scanner;
