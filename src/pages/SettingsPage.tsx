import { useState } from "react";
import { Shield, Users, Lock, Bell, FileText, Instagram, Share2, AlertTriangle, X, Download, Watch, Smartphone, Heart, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useProfile, GoalType, AccountType, ActivityLevel } from "@/contexts/ProfileContext";
import SocialRow from "@/components/SocialRow";
import avatarDefault from "@/assets/avatar-default.png";

const SettingsPage = () => {
  const { addProfile, setActiveProfile } = useProfile();
  const [consentOpen, setConsentOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [aiConsent, setAiConsent] = useState(true);
  const [bioConsent, setBioConsent] = useState(false);

  // Add profile form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regRole, setRegRole] = useState<AccountType | "">("");
  const [regPhone, setRegPhone] = useState("");
  const [regWeight, setRegWeight] = useState("");
  const [regGoal, setRegGoal] = useState<GoalType | "">("");
  const [regAge, setRegAge] = useState("");
  const [regGender, setRegGender] = useState("");
  const [regActivity, setRegActivity] = useState<ActivityLevel | "">("");

  const handleDownload = (format: string) => {
    toast({ title: `Exporting as ${format}`, description: "Your data export will be ready shortly." });
  };

  const resetForm = () => {
    setRegName(""); setRegEmail(""); setRegRole(""); setRegPhone("");
    setRegWeight(""); setRegGoal(""); setRegAge(""); setRegGender(""); setRegActivity("");
  };

  const handleCreateProfile = async () => {
    if (!regName.trim() || !regGoal || !regWeight.trim()) return;
    try {
      const initials = regName.trim().split(" ").map((w) => w[0]?.toUpperCase()).join("").slice(0, 2);
      const newKey = await addProfile({
        name: regName.trim(),
        initials,
        label: regName.trim().split(" ")[0],
        avatar: avatarDefault,
        goal: regGoal as GoalType,
        weight: regWeight.trim(),
        accountType: (regRole || "user") as AccountType,
        email: regEmail.trim() || undefined,
        phone: regPhone.trim() || undefined,
        age: regAge ? parseInt(regAge) : undefined,
        gender: regGender || undefined,
        activityLevel: (regActivity || undefined) as ActivityLevel | undefined,
      });
      resetForm();
      setAddOpen(false);
      if (newKey) {
        setActiveProfile(newKey);
        toast({ title: "Profile created", description: `${regName.trim()} has been added.` });
      }
    } catch (error) {
      console.error("Error adding profile:", error);
      toast({ title: "Error", description: "Failed to add profile. Please try again.", variant: "destructive" });
    }
  };

  const isFormValid = regName.trim() && regGoal && regWeight.trim();

  return (
    <>
      <div className="space-y-1">
        <h2 className="text-xl font-black text-foreground tracking-tight">Settings</h2>
        <p className="text-xs text-muted-foreground">Privacy, sharing, and preferences.</p>
      </div>

      {/* Add Profile Button */}
      <Card className="border-border bg-card">
        <CardContent className="pt-4 pb-4">
          <Button onClick={() => setAddOpen(true)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold h-10">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Profile
          </Button>
        </CardContent>
      </Card>

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

      {/* Add Profile Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="bg-card border-border max-w-[340px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-foreground text-lg font-black">Add Profile</DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs">
              Create a new profile on Alpo Fitness AI
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3.5 pt-1 max-h-[60vh] overflow-y-auto">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-semibold">Full Name *</Label>
              <Input placeholder="e.g. Jordan Smith" value={regName} onChange={(e) => setRegName(e.target.value)} className="bg-secondary/50 border-border text-foreground text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-semibold">Email</Label>
              <Input type="email" placeholder="jordan@example.com" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="bg-secondary/50 border-border text-foreground text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-semibold">Phone (optional)</Label>
              <Input type="tel" placeholder="+1 (555) 000-0000" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} className="bg-secondary/50 border-border text-foreground text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground font-semibold">Weight (lbs) *</Label>
                <Input type="number" placeholder="185" value={regWeight} onChange={(e) => setRegWeight(e.target.value)} className="bg-secondary/50 border-border text-foreground text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground font-semibold">Goal *</Label>
                <Select value={regGoal} onValueChange={(v) => setRegGoal(v as GoalType)}>
                  <SelectTrigger className="bg-secondary/50 border-border text-foreground text-sm">
                    <SelectValue placeholder="Select…" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border z-[60]">
                    <SelectItem value="lose">Lose</SelectItem>
                    <SelectItem value="gain">Gain</SelectItem>
                    <SelectItem value="maintain">Maintain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground font-semibold">Age</Label>
                <Input type="number" placeholder="30" value={regAge} onChange={(e) => setRegAge(e.target.value)} className="bg-secondary/50 border-border text-foreground text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground font-semibold">Gender</Label>
                <Select value={regGender} onValueChange={setRegGender}>
                  <SelectTrigger className="bg-secondary/50 border-border text-foreground text-sm">
                    <SelectValue placeholder="Select…" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border z-[60]">
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-semibold">Activity Level</Label>
              <Select value={regActivity} onValueChange={(v) => setRegActivity(v as ActivityLevel)}>
                <SelectTrigger className="bg-secondary/50 border-border text-foreground text-sm">
                  <SelectValue placeholder="Select activity…" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-[60]">
                  <SelectItem value="sedentary">Sedentary — Desk / Remote</SelectItem>
                  <SelectItem value="light">Light — Office + Commute</SelectItem>
                  <SelectItem value="moderate">Moderate — On-your-feet job</SelectItem>
                  <SelectItem value="active">Active — Physical labor / Training</SelectItem>
                  <SelectItem value="very_active">Very Active — Athlete / Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-semibold">Account Type</Label>
              <Select value={regRole} onValueChange={(v) => setRegRole(v as AccountType)}>
                <SelectTrigger className="bg-secondary/50 border-border text-foreground text-sm">
                  <SelectValue placeholder="Select role…" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-[60]">
                  <SelectItem value="user">User — Personal Training</SelectItem>
                  <SelectItem value="client">Client — Coached Athlete</SelectItem>
                  <SelectItem value="family">Family — Shared Access</SelectItem>
                  <SelectItem value="trainer">Trainer — Coach / PT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button
              onClick={handleCreateProfile}
              disabled={!isFormValid}
              className="w-full bg-primary text-primary-foreground font-bold text-sm py-2.5 rounded-lg hover:bg-primary/90 transition-colors mt-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Create Profile
            </button>
          </div>
        </DialogContent>
      </Dialog>

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
