import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary, Footer, Header } from "./components";
import "./index.css";
import {
  HomePage,
  CollaborationPage,
  ProjectPage,
  SkillPage,
  SkillDetailedPage,
  MentorPage,
  MentorshipRequestsMentor,
  MentorshipRequestsStudent,
  ChatPage,
  MentorRequestPage,
  CertificatePage,
  SigninPage,
  SignupPage,
  ForgotPasswordPage,
  MentorOnboardingPage,
  StudentOnboardingPage,
  MentorProfilePage,
  StudentProfilePage,
 } from "./pages";


function App() {
  return (
    <div className="max-w-screen-[1352px] ">
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Collaboration" element={<CollaborationPage />} />
            <Route path="/Collaboration/Project" element={<ProjectPage  />} />
            <Route path="/LearnSkill" element={<SkillPage />} />
            <Route path="/LearnSkill/DetailedSkill" element={<SkillDetailedPage />} />
            <Route path="/Mentor" element={<MentorPage />} />
            <Route path="/Mentorship-requests" element={<MentorshipRequestsStudent />} />
            <Route path="/Mentorship-requests/Mentor" element={<MentorshipRequestsMentor />} />
            <Route path="/Chat" element={<ChatPage />} />
            <Route path="/Mentor-request" element={<MentorRequestPage />} />
            <Route path="/Certificate" element={<CertificatePage />} />
            <Route path="/ProfileStudent" element={<StudentProfilePage />} />
            <Route path="/ProfileMentor" element={<MentorProfilePage />} />
            <Route path="/Signup" element={<SignupPage />} />
            <Route path="/Signin" element={<SigninPage />} />
            <Route path="/ForgetPassword" element={<ForgotPasswordPage />} />
            <Route path="/onboarding/student" element={<StudentOnboardingPage />} />
            <Route path="/onboarding/mentor" element={<MentorOnboardingPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default App;
