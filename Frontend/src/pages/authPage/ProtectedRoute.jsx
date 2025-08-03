import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isOnBoarded, loading, role } = useAuthStore();

  useEffect(() => {
    console.log("isOnBoarded", isOnBoarded);
  }, [isOnBoarded]);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/signin");
      } else if (!isOnBoarded) {
        if (role === "student") {
          navigate("/onboarding/student");
        } else if (role === "mentor") {
          navigate("/onboarding/mentor");
        } else {
          navigate("/signup");
        }
      }
    }
  }, [loading, isAuthenticated, isOnBoarded, role, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !isOnBoarded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Redirecting...</div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
