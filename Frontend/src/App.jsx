import React, { Suspense, lazy } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundry";
import Footer from "./components/Footer";
import StudentOnBoarding from "./pages/StudentOnBoarding";
import MentorOnBoarding from "./pages/MentorOnBoarding";
import ProfilePage from './pages/ProfilePage';

const Home = lazy(() => import("./pages/Home"));
const Certificate = lazy(() => import("./pages/Certificate"));
const Collaboration = lazy(() => import("./pages/Collaboration"));
const Mentor = lazy(() => import("./pages/Mentor"));
const Skill = lazy(() => import("./pages/Skill"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const MentorshipRequests = lazy(() => import('./pages/MentorshipRequests'));
const MentorRequest = lazy(() => import('./pages/MentorRequest'));
const ChatPage = lazy(() => import('./pages/Chat'));

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
            <Route path="/onboarding/student" element={<StudentOnBoarding />} />
            <Route path="/onboarding/mentor" element={<MentorOnBoarding />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default App;
