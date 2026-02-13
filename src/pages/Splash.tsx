import { useNavigate } from "react-router-dom";
import alpoLogo from "@/assets/alpo-logo.png";
import splashBg from "@/assets/splash-bg.jpg";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#000000]">
      <div className="flex flex-col items-center gap-6 px-8 text-center">
        {/* Logo — monochrome */}
        <div
          className="w-36 h-36 overflow-hidden animate-scale-in"
          style={{ animationDuration: "0.6s", animationDelay: "0.2s", animationFillMode: "both" }}
        >
          <img src={alpoLogo} alt="Alpo Fitness AI" className="w-full h-full object-cover" />
        </div>

        {/* Title */}
        <div
          className="animate-fade-in"
          style={{ animationDuration: "0.6s", animationDelay: "0.5s", animationFillMode: "both" }}
        >
          <h1 className="text-4xl font-black tracking-tight text-[#FFFFFF]">
            ALPO <span className="text-primary">FITNESS</span> AI
          </h1>
          <div className="mt-3 space-y-1">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold">A.L.P.O.</p>
            <p className="text-[11px] tracking-[0.15em] text-[#FFFFFF] font-medium">
              Adaptive Lifestyle Performance Optimization
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-16 h-px bg-primary animate-fade-in"
          style={{ animationDuration: "0.4s", animationDelay: "0.8s", animationFillMode: "both" }}
        />

        <p
          className="text-xs text-[#FFFFFF]/70 max-w-[260px] leading-relaxed italic animate-fade-in"
          style={{ animationDuration: "0.5s", animationDelay: "1s", animationFillMode: "both" }}
        >
          Tactical Intelligence for the Elite Athlete
        </p>

        {/* Enter Button */}
        <button
          onClick={() => navigate("/auth")}
          className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold mt-4 animate-pulse animate-fade-in cursor-pointer bg-transparent border-none"
          style={{ animationDuration: "0.4s", animationDelay: "1.4s", animationFillMode: "both" }}
        >
          TAP TO ENTER
        </button>
      </div>
    </div>
  );
};

export default Splash;
