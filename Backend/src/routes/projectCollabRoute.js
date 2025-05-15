import express from "express";

const projectCollabRoute = express.Router();

projectCollabRoute.get('/');
projectCollabRoute.get("/:id");

export default projectCollabRoute;