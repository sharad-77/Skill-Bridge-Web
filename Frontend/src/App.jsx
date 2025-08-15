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
import useAuthRedirect from "./hooks/useAuthRedirect";

// Wrapper to protect routes
function ProtectedPage({ children }) {
  const initAuth = useAuthStore((state) => state.initAuth);
  useAuthRedirect();

  useEffect(() => {
    initAuth();
  }, []);

  return children;
}

const queryClient = new QueryClient();

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-screen-[1352px]">
        <Toaster
          richColors
          toastOptions={{
            className: 'text-base px-5 py-4',
          }}
        />
        <Header />
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/forget-password" element={<ForgotPasswordPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/onboarding/student" element={<StudentOnboardingPage />} />
              <Route path="/onboarding/mentor" element={<MentorOnboardingPage />} />


              <Route path="/learnSkill"
                element={
                  <ProtectedPage>
                    <SkillPage />
                  </ProtectedPage>
                }
              />

              <Route path="/learnSkill/detailedSkill/:id"
                element={
                  <ProtectedPage>
                    <SkillDetailedPage />
                  </ProtectedPage>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/collaboration"
                element={
                  <ProtectedPage>
                    <CollaborationPage />
                  </ProtectedPage>
                }
              />
              <Route
                path="/collaboration/project/:projectId"
                element={
                  <ProtectedPage>
                    <ProjectPage />
                  </ProtectedPage>
                }
              />
              <Route
                path="/mentor"
                element={
                  <ProtectedPage>
                    <MentorPage />
                  </ProtectedPage>
                }
              />
              <Route
                path="/mentorship-requests"
                element={
                  <ProtectedPage>
                    <MentorshipRequestsStudent />
                  </ProtectedPage>
                }
              />
              <Route
                path="/mentorship-requests/mentor"
                element={
                  <ProtectedPage>
                    <MentorshipRequestsMentor />
                  </ProtectedPage>
                }
              />
              <Route
                path="/chat"
                element={
                  <ProtectedPage>
                    <ChatPage />
                  </ProtectedPage>
                }
              />
              <Route
                path="/mentor-request"
                element={
                  <ProtectedPage>
                    <MentorRequestPage />
                  </ProtectedPage>
                }
              />
              <Route
                path="/certificate"
                element={
                  <ProtectedPage>
                    <CertificatePage />
                  </ProtectedPage>
                }
              />
              <Route
                path="/profile/student"
                element={
                  <ProtectedPage>
                    <StudentProfilePage />
                  </ProtectedPage>
                }
              />
              <Route
                path="/profile/mentor"
                element={
                  <ProtectedPage>
                    <MentorProfilePage />
                  </ProtectedPage>
                }
              />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
