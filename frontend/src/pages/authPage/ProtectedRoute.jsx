import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { toast } from 'sonner';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isOnBoarded, isInitializing, role } = useAuthStore();
  const [toastShown, setToastShown] = useState(false);
  const loadingToastId = useRef(null);
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (isInitializing && !loadingToastId.current) {
      toast.dismiss();
      loadingToastId.current = toast.loading("Loading The App");
    } else if (!isInitializing && loadingToastId.current) {
      toast.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }
  }, [isInitializing]);

  useEffect(() => {
    if (isInitializing) {
      setToastShown(false);
      hasNavigated.current = false;
      return;
    }

    if (toastShown || hasNavigated.current) return;

    const showToastAndNavigate = (message, path) => {
      setToastShown(true);
      hasNavigated.current = true;

      setTimeout(() => {
        toast.warning(message);
        setTimeout(() => navigate(path, { replace: true }), 500);
      }, 100);
    };

    if (!isAuthenticated) {
      showToastAndNavigate(
        "Please Login First To Explore The App",
        "/signin"
      );
    } else if (!isOnBoarded) {
      let redirectPath = "/signup";

      if (role === "student") {
        redirectPath = "/onboarding/student";
      } else if (role === "mentor") {
        redirectPath = "/onboarding/mentor";
      }

      showToastAndNavigate(
        "Please Complete Your Profile First To Explore The App",
        redirectPath
      );
    }
  }, [isInitializing, isAuthenticated, isOnBoarded, role, navigate, toastShown]);

  useEffect(() => {
    return () => {
      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
      }
    };
  }, []);

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
