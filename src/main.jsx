import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./components/pages/Home.jsx";
import Certificate from "./components/pages/Certificate.jsx";
import Mentor from "./components/pages/Mentor.jsx";
import Skill from "./components/pages/Skill.jsx";
import Collaboration from "./components/pages/Collaboration.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="Collaboration" element={<Collaboration />} />
      <Route path="Skill-Exchange" element={<Skill />} />
      <Route path="Mentor" element={<Mentor />} />
      <Route path="Certificate" element={<Certificate />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

