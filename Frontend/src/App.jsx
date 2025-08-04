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
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/forget-password" element={<ForgotPasswordPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/onboarding/student" element={<StudentOnboardingPage />} />
              <Route path="/onboarding/mentor" element={<MentorOnboardingPage />} />
              <Route path="/collaboration" element={<CollaborationPage />} />
              <Route path="/collaboration/project/:projectId" element={<ProjectPage />} />
              <Route path="/learnSkill" element={<SkillPage />} />
              <Route path="/learnSkill/detailedSkill/:id" element={<SkillDetailedPage />} />
              <Route path="/mentor" element={<MentorPage />} />
              <Route path="/mentorship-requests" element={<MentorshipRequestsStudent />} />
              <Route path="/mentorship-requests/mentor" element={<MentorshipRequestsMentor />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/mentor-request" element={<MentorRequestPage />} />
              <Route path="/certificate" element={<CertificatePage />} />
              <Route path="/profile/student" element={<StudentProfilePage />} />
              <Route path="/profile/mentor" element={<MentorProfilePage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
