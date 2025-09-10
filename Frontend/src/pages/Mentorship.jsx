import { MentorshipRequestsMentor, MentorshipRequestsStudent } from "../pages/subpages";
import useAuthStore from '../store/useAuthStore';

function Mentorship() {
  const { role } = useAuthStore();

  if (role === "student") {
    return <MentorshipRequestsStudent />
  } else if (role === "mentor") {
    return <MentorshipRequestsMentor />
  } else {
    return (
      <div>Invalid User Role</div>
    )
  }
}

export default Mentorship
