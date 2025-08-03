import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isOnBoarded, role } = useAuthStore();

  const redirectToProfile = () => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else if (!isOnBoarded) {
      if (role === "student") {
        navigate('/onboarding/student');
      } else if (role === "mentor") {
        navigate('/onboarding/mentor');
      } else {
        navigate('/signin');
      }
    }
  };

  return { redirectToProfile };
};

export default useAuthRedirect;
