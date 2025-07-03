import express from "express";
import { AllProject, joinProject, NewProject, ProjectbyId } from "../controllers/projectcollabController.js";

// Create a new router object
const projectCollabRoute = express.Router();

// Route to get all projects
projectCollabRoute.get('/', AllProject);

// Route to create a new project
projectCollabRoute.post('/', NewProject);

// Route to get a project by its ID
projectCollabRoute.get("/:id", ProjectbyId);

// Route to join a specific project
projectCollabRoute.post("/:id/join", joinProject);

// Export the router
export default projectCollabRoute;       