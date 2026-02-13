import { useState } from "react";
import { Navigate } from "react-router-dom";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { authSchema } from "@/lib/validation";
import alpoLogo from "@/assets/alpo-logo.png";

const SocialButton = ({ onClick, className = "", children }: { onClick: () => void; className?: string; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full flex items-center justify-center gap-2 bg-[#000000] border border-[#FFFFFF] text-[#FFFFFF] font-semibold text-sm py-2.5 rounded-none hover:border-primary hover:text-primary transition-colors ${className}`}
  >
    {children}
  </button>
);

const Auth = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#000000]">
        <div className="animate-pulse text-primary font-bold uppercase tracking-wider">LOADING...</div>
      </div>
    );
  }

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    if (isSignUp) {
      const result = authSchema.safeParse({ email, password, name });
      if (!result.success) {
        setError(result.error.errors[0].message);
        setSubmitting(false);
        return;
      }
    } else {
      const result = authSchema.omit({ name: true }).safeParse({ email, password });
      if (!result.success) {
        setError(result.error.errors[0].message);
        setSubmitting(false);
        return;
      }
    }

    if (isSignUp) {
      const { error } = await signUp(email, password, name.trim());
      if (error) {
        setError(error.message);
      } else {
        setMessage("Check your email to confirm your account, then sign in.");
        setIsSignUp(false);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      }
    }
    setSubmitting(false);
  };

  const inputClass = "bg-[#000000] border border-[#FFFFFF] text-[#FFFFFF] text-sm rounded-none placeholder:text-[#FFFFFF]/40 focus-visible:ring-0 focus-visible:border-primary";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#000000]">
      <div className="flex flex-col items-center gap-6 px-6 w-full max-w-[340px]">
        <div className="w-20 h-20 overflow-hidden border border-[#FFFFFF]">
          <img src={alpoLogo} alt="Alpo Fitness AI" className="w-full h-full object-cover" />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight text-[#FFFFFF]">
            ALPO <span className="text-primary">FITNESS</span> AI
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#FFFFFF] font-bold mt-1">
            {isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-3">
          {isSignUp && (
            <div className="space-y-1.5">
              <Label className="text-xs text-[#FFFFFF] font-semibold uppercase tracking-wider">Full Name</Label>
              <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
            </div>
          )}
          <div className="space-y-1.5">
            <Label className="text-xs text-[#FFFFFF] font-semibold uppercase tracking-wider">Email</Label>
            <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required autoComplete="email" name="email" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-[#FFFFFF] font-semibold uppercase tracking-wider">Password</Label>
            <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} required minLength={6} autoComplete={isSignUp ? "new-password" : "current-password"} name="password" />
          </div>

          {error && <p className="text-xs text-primary font-medium">{error}</p>}
          {message && <p className="text-xs text-primary font-medium">{message}</p>}

          <button type="submit" disabled={submitting} className="w-full bg-primary text-[#FFFFFF] font-bold text-sm py-2.5 rounded-none hover:bg-primary/90 transition-colors disabled:opacity-40 uppercase tracking-wider">
            {submitting ? "STANDBY..." : isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}
          </button>
        </form>

        <button onClick={() => { setIsSignUp(!isSignUp); setError(""); setMessage(""); }} className="text-xs text-[#FFFFFF] hover:text-primary transition-colors uppercase tracking-wider">
          {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
        </button>

        <div className="w-full flex items-center gap-3">
          <div className="flex-1 h-px bg-[#FFFFFF]" />
          <span className="text-[10px] text-[#FFFFFF] uppercase tracking-widest font-bold">OR</span>
          <div className="flex-1 h-px bg-[#FFFFFF]" />
        </div>

        <SocialButton onClick={async () => { setError(""); const { error } = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin }); if (error) setError(error.message); }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#FFFFFF"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#FFFFFF"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FFFFFF"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#FFFFFF"/></svg>
          CONTINUE WITH GOOGLE
        </SocialButton>

        <SocialButton onClick={async () => { setError(""); const { error } = await lovable.auth.signInWithOAuth("apple", { redirect_uri: window.location.origin }); if (error) setError(error.message); }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.53-3.23 0-1.44.62-2.2.44-3.06-.4C4.24 16.7 4.89 10.5 8.82 10.3c1.23.06 2.08.7 2.8.74.96-.2 1.88-.76 2.93-.69 1.24.1 2.18.58 2.79 1.49-2.56 1.53-1.95 4.89.58 5.83-.46 1.17-.99 2.33-1.87 3.61zM12.05 10.23c-.12-2.19 1.68-4.07 3.72-4.23.28 2.42-2.17 4.32-3.72 4.23z"/></svg>
          CONTINUE WITH APPLE
        </SocialButton>

        <SocialButton onClick={() => toast({ title: "Coming Soon", description: "Facebook sign-in will be available soon." })} className="opacity-60">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          CONTINUE WITH FACEBOOK
        </SocialButton>

        <SocialButton onClick={() => toast({ title: "Coming Soon", description: "LinkedIn sign-in will be available soon." })} className="opacity-60">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
          CONTINUE WITH LINKEDIN
        </SocialButton>

        <SocialButton onClick={() => toast({ title: "Coming Soon", description: "X sign-in will be available soon." })} className="opacity-60">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.8-5.974 6.8h-3.31l7.73-8.835L2.6 2.25h6.836l4.713 6.231 5.379-6.231zM17.002 18.807h1.844L6.74 3.556H4.66l12.342 15.251z"/></svg>
          CONTINUE WITH X
        </SocialButton>

        <SocialButton onClick={() => toast({ title: "Coming Soon", description: "TikTok sign-in will be available soon." })} className="opacity-60">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M19.321 5.562a5.122 5.122 0 0 1-.869-.071v.008a5.07 5.07 0 0 1-4.769-5.109v.002a.744.744 0 0 0-.744.742v11.652a3.882 3.882 0 1 1-3.882-3.882.744.744 0 0 0 .744-.745V5.329a.744.744 0 0 0-.745-.742 6.37 6.37 0 1 0 6.37 6.37v-7.1a8.067 8.067 0 0 0 4.551 1.308.743.743 0 0 0 .744-.743V6.304a.744.744 0 0 0-.621-.742z"/></svg>
          CONTINUE WITH TIKTOK
        </SocialButton>
      </div>
    </div>
  );
};

export default Auth;
