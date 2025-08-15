import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isOnBoarded, role } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin", { replace: true });
    } else if (!isOnBoarded) {
      if (role === "student") {
        navigate("/onboarding/student", { replace: true });
      } else if (role === "mentor") {
        navigate("/onboarding/mentor", { replace: true });
      } else {
        navigate("/signin", { replace: true });
      }
    }
  }, [isAuthenticated, isOnBoarded, role, navigate]);
};

export default useAuthRedirect;
