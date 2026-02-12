import { useState } from "react";
import { Navigate } from "react-router-dom";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authSchema } from "@/lib/validation";
import alpoLogo from "@/assets/alpo-logo.png";
import splashBg from "@/assets/splash-bg.jpg";

const Auth = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary font-bold">Loading...</div>
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <img src={splashBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-background/70" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 w-full max-w-[340px]">
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <img src={alpoLogo} alt="Alpo Fitness AI" className="w-full h-full object-cover" />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            Alpo <span className="text-primary">Fitness</span> AI
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mt-1">
            {isSignUp ? "Create Account" : "Sign In"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-3">
          {isSignUp && (
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-semibold">Full Name</Label>
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-secondary/50 border-border text-foreground text-sm"
                required
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground font-semibold">Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary/50 border-border text-foreground text-sm"
              required
              autoComplete="email"
              name="email"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground font-semibold">Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-secondary/50 border-border text-foreground text-sm"
              required
              minLength={6}
              autoComplete={isSignUp ? "new-password" : "current-password"}
              name="password"
            />
          </div>

          {error && <p className="text-xs text-destructive font-medium">{error}</p>}
          {message && <p className="text-xs text-primary font-medium">{message}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground font-bold text-sm py-2.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40"
          >
            {submitting ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <button
          onClick={() => { setIsSignUp(!isSignUp); setError(""); setMessage(""); }}
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
        </button>

        <div className="w-full flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <button
          type="button"
          onClick={async () => {
            setError("");
            const { error } = await lovable.auth.signInWithOAuth("google", {
              redirect_uri: window.location.origin,
            });
            if (error) setError(error.message);
          }}
          className="w-full flex items-center justify-center gap-2 bg-secondary/50 border border-border text-foreground font-semibold text-sm py-2.5 rounded-lg hover:bg-secondary/80 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
