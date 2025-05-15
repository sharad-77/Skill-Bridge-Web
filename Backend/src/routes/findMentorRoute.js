import express from "express";

const findMentorRoute = express.Router();


findMentorRoute.get('/');
findMentorRoute.get("/:id");

export default findMentorRoute;