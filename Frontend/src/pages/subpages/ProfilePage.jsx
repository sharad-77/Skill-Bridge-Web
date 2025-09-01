import useUserStore from '../../store/useUserStore';
import MentorProfilePage from './MentorProfilePage';
import StudentProfilePage from './StudentProfilePage';

function ProfilePage() {
  const role = useUserStore(state => state.role);
  const loading = useUserStore(state => state.loading);

  // Enhanced loading with better UX
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Simple role check with fallback
  if (role === "mentor") {
    return <MentorProfilePage />;
  }

  if (role === "student") {
    return <StudentProfilePage />;
  }

  // Fallback for undefined/invalid roles
  return <StudentProfilePage />;
}

export default ProfilePage;
