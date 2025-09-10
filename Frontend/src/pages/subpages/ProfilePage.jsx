import useAuthStore from '../../store/useAuthStore';
import MentorProfilePage from './MentorProfilePage';
import StudentProfilePage from './StudentProfilePage';

function ProfilePage() {
  const { user, isAuthenticated } = useAuthStore();
  const role = user?.role;

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Please Login</h2>
          <p>You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

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
