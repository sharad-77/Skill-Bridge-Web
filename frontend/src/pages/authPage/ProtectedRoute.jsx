import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { toast } from 'sonner';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isOnBoarded, isInitializing, role } = useAuthStore();


  useEffect(() => {
    if (!isInitializing) {
      if (!isAuthenticated) {
        toast.dismiss();
        toast.warning("Please Login First To Explore The App");
        navigate("/signin", { replace: true });
      } else if (!isOnBoarded) {
        toast.dismiss();
        toast.warning("Please Complete Your Profile First To Explore The App");
        if (role === "student") {
          navigate("/onboarding/student", { replace: true });
        } else if (role === "mentor") {
          navigate("/onboarding/mentor", { replace: true });
        } else {
          navigate("/signup", { replace: true });
        }
      }
    }
  }, [isInitializing, isAuthenticated, isOnBoarded, role, navigate]);

  useEffect(() => {
    if (isInitializing) {
      toast.dismiss();
      toast.loading("Loading The App");
    } else {
      toast.dismiss(); // Dismiss loading toast when done
    }
  }, [isInitializing]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Redirecting to login...</div>
      </div>
    );
  }

  if (!isOnBoarded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Redirecting to onboarding...</div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
