import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profileMap, ProfileKey, useProfile } from "@/contexts/ProfileContext";
import alpoLogo from "@/assets/alpo-logo.png";
import splashBg from "@/assets/splash-bg.jpg";

const profiles: { key: ProfileKey; label: string }[] = [
  { key: "alpo", label: "Alpo" },
  { key: "client", label: "Client 1" },
  { key: "family", label: "Sophie" },
];

const Splash = () => {
  const navigate = useNavigate();
  const { setActiveProfile } = useProfile();
  const [showPicker, setShowPicker] = useState(false);

  const handleProfileSelect = (key: ProfileKey) => {
    setActiveProfile(key);
    navigate("/dashboard");
  };

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

        {/* Phase 2: Profile Picker */}
        {showPicker ? (
          <div className="animate-fade-in w-full max-w-[280px] space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
              Select Profile
            </p>
            <div className="space-y-2">
              {profiles.map((p) => {
                const info = profileMap[p.key];
                return (
                  <button
                    key={p.key}
                    onClick={() => handleProfileSelect(p.key)}
                    className="w-full flex items-center gap-3 bg-card/80 backdrop-blur-sm border border-border rounded-xl px-4 py-3 hover:border-primary/40 transition-colors"
                  >
                    <Avatar className="h-10 w-10 border-2 border-primary/30">
                      <AvatarImage src={info.avatar} alt={info.label} className="object-cover" />
                      <AvatarFallback className="bg-secondary text-foreground text-xs font-bold">
                        {info.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-bold text-foreground">{p.label}</p>
                      <p className="text-[10px] text-muted-foreground">{info.name}</p>
                    </div>
                  </button>
                );
              })}
              {/* Add Account */}
              <button className="w-full flex items-center gap-3 bg-card/40 backdrop-blur-sm border border-dashed border-border rounded-xl px-4 py-3 hover:border-primary/40 transition-colors">
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
    </div>
  );
};

export default Splash;
