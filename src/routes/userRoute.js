import express from "express";

const userRoute = express.Router();

userRoute.get('/');
userRoute.get("/:id");

export default userRoute;