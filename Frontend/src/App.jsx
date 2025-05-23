import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundry";
import Footer from "./components/Footer";
import { Home, Certificate, Collaboration, Mentor, Skill, Signin, Signup } from "@/pages";

function App() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Collaboration" element={<Collaboration />} />
          <Route path="/Skill" element={<Skill />} />
          <Route path="/Mentor" element={<Mentor />} />
          <Route path="/Certificate" element={<Certificate />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default App;
