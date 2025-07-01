import express from "express";
import { allSkill, detailSkill, joinSkill, makeReview, newSkill } from "../controllers/skillController.js";

const skillExchangeRoute = express.Router();

skillExchangeRoute.get('/', allSkill);
skillExchangeRoute.post('/', newSkill);
skillExchangeRoute.get("/:id", detailSkill);
skillExchangeRoute.post("/:id/join", joinSkill);
skillExchangeRoute.post("/:id/review", makeReview);

export default skillExchangeRoute;
