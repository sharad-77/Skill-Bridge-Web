import express from "express";
import authMiddleware from '../middleware/authMiddleware.js';
import userProfileController from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.get('/Profile',authMiddleware,userProfileController);
// userRoute.get("/");

export default userRoute;