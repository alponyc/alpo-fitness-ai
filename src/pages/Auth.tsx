import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      if (!name.trim()) {
        setError("Name is required");
        setSubmitting(false);
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        setSubmitting(false);
        return;
      }
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
      </div>
    </div>
  );
};

export default Auth;
