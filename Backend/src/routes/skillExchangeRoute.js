import express from "express";
import { allSkill, detailSkill, joinSkill, makeReview, newSkill } from "../controllers/skillController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import uploadSkillImage from "../middleware/uploadSkillImage.js";

// Create a new router object
const skillExchangeRoute = express.Router();

// Route to get all skills
skillExchangeRoute.get('/', allSkill);

// Route to create a new skill
skillExchangeRoute.post('/', authMiddleware, uploadSkillImage, newSkill);

// Route to get the details of a specific skill
skillExchangeRoute.get("/:id", detailSkill);

// Route to join a specific skill
skillExchangeRoute.post("/:id/join", authMiddleware, joinSkill);

// Route to add a review to a specific skill
skillExchangeRoute.post("/:id/review", authMiddleware, makeReview);

// Export the router
export default skillExchangeRoute;
