import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from 'sonner';
import { ErrorBoundary, Footer, Header } from "./components";
import "./index.css";
import {
  CertificatePage,
  ChatPage,
  CollaborationPage,
  ForgotPasswordPage,
  HomePage,
  MentorOnboardingPage,
  MentorPage,
  MentorProfilePage,
  MentorRequestPage,
  MentorshipRequestsMentor,
  MentorshipRequestsStudent,
  ProjectPage,
  SigninPage,
  SignupPage,
  SkillDetailedPage,
  SkillPage,
  StudentOnboardingPage,
  StudentProfilePage
} from "./pages";
import useAuthStore from './store/useAuthStore';

const queryClient = new QueryClient();

function App() {

  useEffect(() => {
    useAuthStore.getState().initAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-screen-[1352px] ">
        <Toaster richColors toastOptions={{
          className: 'text-base px-5 py-4',
        }} />
        <Header />
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/Signup" element={<SignupPage />} />
              <Route path="/Signin" element={<SigninPage />} />
              <Route path="/ForgetPassword" element={<ForgotPasswordPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/onboarding/student" element={<StudentOnboardingPage />} />
              <Route path="/onboarding/mentor" element={<MentorOnboardingPage />} />
              <Route path="/Collaboration" element={<CollaborationPage />} />
              <Route path="/collaboration/project/:projectId" element={<ProjectPage />} />
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
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
