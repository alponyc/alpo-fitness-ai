import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProfile, GoalType, ActivityLevel } from "@/contexts/ProfileContext";
import { useAuth } from "@/contexts/AuthContext";
import alpoLogo from "@/assets/alpo-logo.png";
import splashBg from "@/assets/splash-bg.jpg";

const Onboarding = () => {
  const navigate = useNavigate();
  const { info, updateProfile } = useProfile();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const [name, setName] = useState(info.name || "");
  const [weight, setWeight] = useState(info.weight || "");
  const [goal, setGoal] = useState<GoalType | "">(info.goal || "");
  const [age, setAge] = useState(info.age?.toString() || "");
  const [gender, setGender] = useState(info.gender || "");
  const [activity, setActivity] = useState<ActivityLevel | "">(info.activityLevel || "");
  const [submitting, setSubmitting] = useState(false);

  const isFormValid = name.trim() && goal && weight.trim();

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setSubmitting(true);

    await updateProfile({
      name: name.trim(),
      weight: weight.trim(),
      goal: goal as GoalType,
      age: age ? parseInt(age) : undefined,
      gender: gender || undefined,
      activityLevel: (activity || undefined) as ActivityLevel | undefined,
    });

    setSubmitting(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <img src={splashBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-background/70" />

      {/* Sign out button */}
      <button
        onClick={handleSignOut}
        className="absolute top-4 right-4 z-20 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors bg-secondary/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border"
      >
        <LogOut className="w-3.5 h-3.5" />
        Sign Out
      </button>

      <div className="relative z-10 flex flex-col items-center gap-5 px-6 w-full max-w-[360px]">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <img src={alpoLogo} alt="Alpo Fitness AI" className="w-full h-full object-cover" />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            Complete Your <span className="text-primary">Profile</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mt-1">
            Tell us about yourself to get started
          </p>
        </div>

        <div className="w-full space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground font-semibold">Full Name *</Label>
            <Input
              placeholder="e.g. Jordan Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary/50 border-border text-foreground text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-semibold">Weight (lbs) *</Label>
              <Input
                type="number"
                placeholder="185"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="bg-secondary/50 border-border text-foreground text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-semibold">Goal *</Label>
              <Select value={goal} onValueChange={(v) => setGoal(v as GoalType)}>
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
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="bg-secondary/50 border-border text-foreground text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-semibold">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
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
            <Select value={activity} onValueChange={(v) => setActivity(v as ActivityLevel)}>
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

          <button
            onClick={handleSubmit}
            disabled={!isFormValid || submitting}
            className="w-full bg-primary text-primary-foreground font-bold text-sm py-2.5 rounded-lg hover:bg-primary/90 transition-colors mt-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? "Saving..." : "Get Started"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
