import React, { Suspense, lazy } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Header, ErrorBoundary, Footer } from "./components";
import {
  StudentOnboardingPage,
  MentorOnboardingPage,
  ProfilePage,
} from "./pages";

const Home = lazy(() => import("./pages/HomePage"));
const Certificate = lazy(() => import("./pages/CertificatePage"));
const Collaboration = lazy(() => import("./pages/CollaborationPage"));
const Mentor = lazy(() => import("./pages/MentorPage"));
const Skill = lazy(() => import("./pages/SkillPage"));
const Signin = lazy(() => import("./pages/SigninPage"));
const Signup = lazy(() => import("./pages/SignupPage"));
const MentorshipRequests = lazy(() => import('./pages/MentorshipRequestsPage'));
const MentorRequest = lazy(() => import('./pages/MentorRequestPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));

function App() {
  return (
    <div className="max-w-screen-[1352px]">
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Collaboration" element={<Collaboration />} />
            <Route path="/LearnSkill" element={<Skill />} />
            <Route path="/Mentor" element={<Mentor />} />
            <Route path="/Mentorship-requests" element={<MentorshipRequests />} />
            <Route path="/Chat" element={<ChatPage />} />
            <Route path="/Mentor-request" element={<MentorRequest />} />
            <Route path="/Certificate" element={<Certificate />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Signin" element={<Signin />} />
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
