import { Upload, ScanLine, Sparkles, ShieldCheck, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const safeItems = [
  { name: "Grilled Chicken Breast", cal: "280 cal", note: "High protein, clean" },
  { name: "Steamed Broccoli", cal: "55 cal", note: "Low carb, fiber-rich" },
  { name: "Brown Rice (half)", cal: "110 cal", note: "Moderate carb source" },
];

const avoidItems = [
  { name: "Pad Thai Noodles", cal: "580 cal", note: "High sodium & sugar" },
  { name: "Fried Spring Rolls", cal: "320 cal", note: "Deep fried, inflammatory" },
  { name: "Sweet Chili Sauce", cal: "90 cal", note: "Hidden sugars" },
];

const Scanner = () => {
  return (
    <>
      {/* Page Title */}
      <div className="space-y-1">
        <h2 className="text-xl font-black text-foreground tracking-tight">Menu Analysis</h2>
        <p className="text-xs text-muted-foreground">Upload an Uber Eats screenshot or paste a menu for AI breakdown.</p>
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
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold h-9 px-5">
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
            placeholder="Paste restaurant menu items here..."
            className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground text-sm min-h-[80px] resize-none"
          />
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold h-9">
            <Sparkles className="w-4 h-4 mr-1.5" />
            Analyze with Gemini
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <div className="glass rounded-2xl p-4 space-y-1.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Gemini-Powered Analysis</span>
        </div>
        <p className="text-[10px] text-muted-foreground">Sample analysis based on a Thai restaurant menu</p>
      </div>

      {/* Safe Foods */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            Safe – Eat These
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {safeItems.map((item) => (
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

      {/* Avoid Foods */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
            <ShieldAlert className="w-4 h-4" />
            Avoid – Skip These
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {avoidItems.map((item) => (
            <div key={item.name} className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-lg px-3 py-2.5">
              <div>
                <p className="text-xs font-semibold text-foreground">{item.name}</p>
                <p className="text-[10px] text-muted-foreground">{item.note}</p>
              </div>
              <span className="text-[10px] font-bold text-primary">{item.cal}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default Scanner;
