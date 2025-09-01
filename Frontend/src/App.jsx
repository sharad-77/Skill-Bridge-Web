import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from 'sonner';
import { ErrorBoundary, Footer, Header } from "./components";
import ProtectedRoute from './pages/authPage/ProtectedRoute';
import "./index.css";
import {
  CertificatePage,
  ChatPage,
  CollaborationPage,
  ForgotPasswordPage,
  HomePage,
  MentorOnboardingPage,
  MentorPage,
  MentorRequestPage,
  MentorshipRequestsMentor,
  MentorshipRequestsStudent,
  ProfilePage,
  ProjectPage,
  SigninPage,
  SignupPage,
  SkillDetailedPage,
  SkillPage,
  StudentOnboardingPage
} from "./pages";
import useAuthStore from './store/useAuthStore';

const queryClient = new QueryClient();

function App() {
  const initAuth = useAuthStore(state => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

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

              {/* Protected Routes  */}
              <Route path="/collaboration" element={
                <ProtectedRoute>
                  <CollaborationPage />
                </ProtectedRoute>} />

              <Route path="/collaboration/project/:projectId" element={
                <ProtectedRoute>
                  <ProjectPage />
                </ProtectedRoute>
              } />

              <Route path="/learnSkill" element={
                <ProtectedRoute>
                  <SkillPage />
                </ProtectedRoute>
              } />

              <Route path="/learnSkill/detailedSkill/:id" element={
                <ProtectedRoute>
                  <SkillDetailedPage />
                </ProtectedRoute>
              } />

              <Route path="/mentor" element={
                <ProtectedRoute>
                  <MentorPage />
                </ProtectedRoute>
              } />

              <Route path="/mentorship-requests" element={
                <ProtectedRoute>
                  <MentorshipRequestsStudent />
                </ProtectedRoute>
              } />

              <Route path="/mentorship-requests/mentor" element={
                <ProtectedRoute>
                  <MentorshipRequestsMentor />
                </ProtectedRoute>} />

              <Route path="/chat" element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              } />

              <Route path="/mentor-request" element={
                <ProtectedRoute>
                  <MentorRequestPage />
                </ProtectedRoute>
              } />

              <Route path="/certificate" element={
                <ProtectedRoute>
                  <CertificatePage />
                </ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />

            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
