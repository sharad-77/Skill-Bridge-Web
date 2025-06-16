import express from "express";
import { AllProject, joinProject, NewProject, ProjectbyId } from "../controllers/projectcollabController.js";

const projectCollabRoute = express.Router();

projectCollabRoute.get('/', AllProject);
projectCollabRoute.post('/', NewProject);
projectCollabRoute.get("/:id", ProjectbyId);
projectCollabRoute.post("/:id/join", joinProject);


export default projectCollabRoute;       