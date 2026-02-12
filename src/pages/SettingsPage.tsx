import { useState } from "react";
import { Shield, Users, Lock, Bell, FileText, Instagram, Share2, AlertTriangle, X, Download, Watch, Smartphone, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import SocialRow from "@/components/SocialRow";

const SettingsPage = () => {
  const [consentOpen, setConsentOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [aiConsent, setAiConsent] = useState(true);
  const [bioConsent, setBioConsent] = useState(false);

  const handleDownload = (format: string) => {
    toast({ title: `Exporting as ${format}`, description: "Your data export will be ready shortly." });
  };

  return (
    <>
      <div className="space-y-1">
        <h2 className="text-xl font-black text-foreground tracking-tight">Settings</h2>
        <p className="text-xs text-muted-foreground">Privacy, sharing, and preferences.</p>
      </div>

      {/* Social Command Center */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Instagram className="w-4 h-4 text-primary" />
            Social Command Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SocialRow />
        </CardContent>
      </Card>

      {/* Health Sync */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Heart className="w-4 h-4 text-primary" />
            Health Sync
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Watch className="w-4 h-4 text-foreground" />
              <div>
                <p className="text-xs font-semibold text-foreground">Apple Health</p>
                <p className="text-[10px] text-muted-foreground">Sync steps, sleep, and heart rate</p>
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-foreground" />
              <div>
                <p className="text-xs font-semibold text-foreground">Samsung Health</p>
                <p className="text-[10px] text-muted-foreground">Sync Galaxy Watch biometrics</p>
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Shared Executive */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Users className="w-4 h-4 text-primary" />
            Shared Executive
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">Share Dashboard</p>
              <p className="text-[10px] text-muted-foreground">Allow your coach to view your stats</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">Share Meal Log</p>
              <p className="text-[10px] text-muted-foreground">Nutritionist can review your meals</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">Share Vitality Data</p>
              <p className="text-[10px] text-muted-foreground">Sleep & step data visible to team</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Social Sharing */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Share2 className="w-4 h-4 text-primary" />
            Social Sharing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-destructive" />
              <div>
                <p className="text-xs font-semibold text-foreground">Instagram</p>
                <p className="text-[10px] text-muted-foreground">Share progress photos & PRs</p>
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-foreground" />
              <div>
                <p className="text-xs font-semibold text-foreground">X (Twitter)</p>
                <p className="text-[10px] text-muted-foreground">Post workout summaries</p>
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <div>
                <p className="text-xs font-semibold text-foreground">Facebook</p>
                <p className="text-[10px] text-muted-foreground">Share progress updates & milestones</p>
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.24 8.24 0 0 0 4.76 1.51v-3.4a4.85 4.85 0 0 1-1-.11z"/></svg>
              <div>
                <p className="text-xs font-semibold text-foreground">TikTok</p>
                <p className="text-[10px] text-muted-foreground">Share workout clips & transformations</p>
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Data Rights (GDPR) */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Shield className="w-4 h-4 text-primary" />
            Privacy & Data Rights (GDPR)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => handleDownload("PDF")} className="justify-start text-xs font-semibold h-10 border-border text-foreground">
              <Download className="w-4 h-4 mr-1.5 text-primary" />
              Export PDF
            </Button>
            <Button variant="outline" onClick={() => handleDownload("JSON")} className="justify-start text-xs font-semibold h-10 border-border text-foreground">
              <FileText className="w-4 h-4 mr-1.5 text-primary" />
              Export JSON
            </Button>
          </div>
          <Button variant="outline" onClick={() => setConsentOpen(true)} className="w-full justify-start text-xs font-semibold h-10 border-border text-foreground">
            <Lock className="w-4 h-4 mr-2 text-primary" />
            Manage Consent Preferences
          </Button>
          <Button variant="outline" onClick={() => setDeleteOpen(true)} className="w-full justify-start text-xs font-semibold h-10 border-destructive text-destructive hover:bg-destructive/10">
            <Shield className="w-4 h-4 mr-2" />
            Request Data Deletion
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Bell className="w-4 h-4 text-primary" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">AI Insights</p>
              <p className="text-[10px] text-muted-foreground">Get notified of new recommendations</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">Workout Reminders</p>
              <p className="text-[10px] text-muted-foreground">Daily workout schedule alerts</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Consent Modal */}
      <Dialog open={consentOpen} onOpenChange={setConsentOpen}>
        <DialogContent className="bg-card border-border max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-foreground text-sm font-bold flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              Consent Preferences
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs">
              Control how your data is processed by AI and biometric systems.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-foreground">AI Data Processing</p>
                <p className="text-[10px] text-muted-foreground">Allow Gemini to analyze your health data</p>
              </div>
              <Switch checked={aiConsent} onCheckedChange={setAiConsent} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-foreground">Biometric Syncing</p>
                <p className="text-[10px] text-muted-foreground">Sync watch/ring data for vitality metrics</p>
              </div>
              <Switch checked={bioConsent} onCheckedChange={setBioConsent} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setConsentOpen(false)} className="bg-primary text-primary-foreground text-xs font-bold h-9">
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="bg-card border-destructive/50 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-destructive text-sm font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Permanent Wipe
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs">
              This action is irreversible. All your health data, workout logs, AI insights, and medical vault records will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 my-2">
            <p className="text-[10px] text-destructive font-bold uppercase tracking-widest">Warning</p>
            <p className="text-xs text-foreground mt-1">This cannot be undone. Your data will be erased from all systems within 30 days per GDPR compliance.</p>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteOpen(false)} className="text-xs font-semibold border-border text-foreground h-9">
              Cancel
            </Button>
            <Button onClick={() => setDeleteOpen(false)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-bold h-9">
              Confirm Permanent Wipe
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingsPage;
