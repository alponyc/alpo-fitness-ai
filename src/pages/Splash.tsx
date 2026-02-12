import { useNavigate } from "react-router-dom";
import alpoLogo from "@/assets/alpo-logo.png";
import splashBg from "@/assets/splash-bg.jpg";

const Splash = () => {
  const navigate = useNavigate();

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

        {/* Enter Button */}
        <button
          onClick={() => navigate("/auth")}
          className="text-[10px] uppercase tracking-[0.25em] text-primary/60 font-bold mt-4 animate-pulse animate-fade-in cursor-pointer bg-transparent border-none"
          style={{ animationDuration: "0.4s", animationDelay: "1.4s", animationFillMode: "both" }}
        >
          Tap to enter
        </button>
      </div>
    </div>
  );
};

export default Splash;
