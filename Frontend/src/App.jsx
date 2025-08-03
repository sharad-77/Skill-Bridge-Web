import { Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary, Footer, Header } from "./components";
import { Toaster } from 'sonner';
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



          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
