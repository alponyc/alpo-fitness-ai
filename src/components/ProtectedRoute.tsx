import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/contexts/ProfileContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const { info, loading: profileLoading } = useProfile();

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary font-bold text-sm">Loading...</div>
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  // If the user's primary profile has no goal set, they haven't completed onboarding
  if (!info.goal) return <Navigate to="/onboarding" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
