import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProfile, GoalType, AccountType, ActivityLevel } from "@/contexts/ProfileContext";
import alpoLogo from "@/assets/alpo-logo.png";
import splashBg from "@/assets/splash-bg.jpg";
import avatarDefault from "@/assets/avatar-default.png";

const Splash = () => {
  const navigate = useNavigate();
  const { setActiveProfile, profiles, profileKeys, addProfile } = useProfile();
  const [showPicker, setShowPicker] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regRole, setRegRole] = useState<AccountType | "">("");
  const [regPhone, setRegPhone] = useState("");
  const [regWeight, setRegWeight] = useState("");
  const [regGoal, setRegGoal] = useState<GoalType | "">("");
  const [regAge, setRegAge] = useState("");
  const [regGender, setRegGender] = useState("");
  const [regActivity, setRegActivity] = useState<ActivityLevel | "">("");

  const handleProfileSelect = (key: string) => {
    setActiveProfile(key);
    navigate("/dashboard");
  };

  const handleCreateAccount = async () => {
    if (!regName.trim() || !regGoal || !regWeight.trim()) return;

    const initials = regName
      .trim()
      .split(" ")
      .map((w) => w[0]?.toUpperCase())
      .join("")
      .slice(0, 2);

    const newKey = await addProfile({
      name: regName.trim(),
      initials,
      label: regName.trim().split(" ")[0],
      avatar: avatarDefault,
      goal: regGoal as GoalType,
      weight: regWeight.trim(),
      accountType: (regRole || "user") as AccountType,
      email: regEmail.trim(),
      phone: regPhone.trim(),
      age: regAge ? parseInt(regAge) : undefined,
      gender: regGender || undefined,
      activityLevel: (regActivity || undefined) as ActivityLevel | undefined,
    });

    // Reset form
    setShowRegister(false);
    setRegName("");
    setRegEmail("");
    setRegRole("");
    setRegPhone("");
    setRegWeight("");
    setRegGoal("");
    setRegAge("");
    setRegGender("");
    setRegActivity("");

    // Auto-select and navigate
    if (newKey) setActiveProfile(newKey);
    navigate("/dashboard");
  };

  const isFormValid = regName.trim() && regGoal && regWeight.trim();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background */}
      <img
        src={splashBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover animate-scale-in"
        style={{ animationDuration: "1.2s" }}
      />
      <div className="absolute inset-0 bg-background/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
        {/* Logo */}
        <div
          className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_40px_rgba(16,185,129,0.2)] animate-scale-in"
          style={{ animationDuration: "0.6s", animationDelay: "0.2s", animationFillMode: "both" }}
        >
          <img src={alpoLogo} alt="Alpo Fitness AI" className="w-full h-full object-cover" />
        </div>

        {/* Title */}
        <div
          className="animate-fade-in"
          style={{ animationDuration: "0.6s", animationDelay: "0.5s", animationFillMode: "both" }}
        >
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Alpo <span className="text-primary">Fitness</span> AI
          </h1>
          <div className="mt-3 space-y-1">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold">A.L.P.O.</p>
            <p className="text-[11px] tracking-[0.15em] text-muted-foreground font-medium">
              Adaptive Lifestyle Performance Optimization
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-16 h-px bg-primary/40 animate-fade-in"
          style={{ animationDuration: "0.4s", animationDelay: "0.8s", animationFillMode: "both" }}
        />

        {/* Tagline */}
        <p
          className="text-xs text-muted-foreground/70 max-w-[260px] leading-relaxed italic animate-fade-in"
          style={{ animationDuration: "0.5s", animationDelay: "1s", animationFillMode: "both" }}
        >
          Tactical Intelligence for the Elite Athlete
        </p>

        {/* Profile Picker */}
        {showPicker ? (
          <div className="animate-fade-in w-full max-w-[280px] space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
              Select Profile
            </p>
            <div className="space-y-2 max-h-[320px] overflow-y-auto scrollbar-hide">
              {profileKeys.map((key) => {
                const info = profiles[key];
                return (
                  <button
                    key={key}
                    onClick={() => handleProfileSelect(key)}
                    className="w-full flex items-center gap-3 bg-card/80 backdrop-blur-sm border border-border rounded-xl px-4 py-3 hover:border-primary/40 transition-colors"
                  >
                    <Avatar className="h-10 w-10 border-2 border-primary/30">
                      <AvatarImage src={info.avatar} alt={info.label} className="object-cover" />
                      <AvatarFallback className="bg-secondary text-foreground text-xs font-bold">
                        {info.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left flex-1">
                      <p className="text-sm font-bold text-foreground">{info.label}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {info.goal ? `${info.goal.charAt(0).toUpperCase() + info.goal.slice(1)} · ${info.weight} lbs` : info.name}
                      </p>
                    </div>
                    {info.goal && (
                      <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                        info.goal === "lose" ? "bg-red-500/20 text-red-400" :
                        info.goal === "gain" ? "bg-emerald-500/20 text-emerald-400" :
                        "bg-amber-500/20 text-amber-400"
                      }`}>
                        {info.goal}
                      </span>
                    )}
                  </button>
                );
              })}
              {/* Add Account */}
              <button
                onClick={() => setShowRegister(true)}
                className="w-full flex items-center gap-3 bg-card/40 backdrop-blur-sm border border-dashed border-border rounded-xl px-4 py-3 hover:border-primary/40 transition-colors"
              >
                <div className="h-10 w-10 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-muted-foreground">Add Account</p>
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowPicker(true)}
            className="text-[10px] uppercase tracking-[0.25em] text-primary/60 font-bold mt-4 animate-pulse animate-fade-in cursor-pointer bg-transparent border-none"
            style={{ animationDuration: "0.4s", animationDelay: "1.4s", animationFillMode: "both" }}
          >
            Tap to enter
          </button>
        )}
      </div>

      {/* Register Dialog */}
      <Dialog open={showRegister} onOpenChange={setShowRegister}>
        <DialogContent className="bg-card border-border max-w-[340px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-foreground text-lg font-black">Create Account</DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs">
              Register a new profile on Alpo Fitness AI
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3.5 pt-1">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-semibold">Full Name *</Label>
              <Input
                placeholder="e.g. Jordan Smith"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="bg-secondary/50 border-border text-foreground text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-semibold">Email</Label>
              <Input
                type="email"
                placeholder="jordan@example.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="bg-secondary/50 border-border text-foreground text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-semibold">Phone (optional)</Label>
              <Input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                className="bg-secondary/50 border-border text-foreground text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground font-semibold">Weight (lbs) *</Label>
                <Input
                  type="number"
                  placeholder="185"
                  value={regWeight}
                  onChange={(e) => setRegWeight(e.target.value)}
                  className="bg-secondary/50 border-border text-foreground text-sm"
                />
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
                <Input
                  type="number"
                  placeholder="30"
                  value={regAge}
                  onChange={(e) => setRegAge(e.target.value)}
                  className="bg-secondary/50 border-border text-foreground text-sm"
                />
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
              onClick={handleCreateAccount}
              disabled={!isFormValid}
              className="w-full bg-primary text-primary-foreground font-bold text-sm py-2.5 rounded-lg hover:bg-primary/90 transition-colors mt-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Create Account
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Splash;
