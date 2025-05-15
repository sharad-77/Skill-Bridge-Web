import express from "express";

const authRoute = express.Router();

authRoute.get('/signin');
authRoute.get("/signup");

export default authRoute;