import express from "express";
import { allSkill, detailSkill, joinSkill, makeReview, newSkill } from "../controllers/skillController.js";

// Create a new router object
const skillExchangeRoute = express.Router();

// Route to get all skills
skillExchangeRoute.get('/', allSkill);

// Route to create a new skill
skillExchangeRoute.post('/', newSkill);

// Route to get the details of a specific skill
skillExchangeRoute.get("/:id", detailSkill);

// Route to join a specific skill
skillExchangeRoute.post("/:id/join", joinSkill);

// Route to add a review to a specific skill
skillExchangeRoute.post("/:id/review", makeReview);

// Export the router
export default skillExchangeRoute;
