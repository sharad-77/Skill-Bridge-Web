import express from "express";
import { login, mentorSignup, signup, studentSignup, changePassword } from '../controllers/authController.js';
import authMiddleware from "../middleware/authMiddleware.js";

const authRoute = express.Router();

authRoute.post('/signup', signup);

authRoute.post('/signup/Student',authMiddleware, studentSignup);
authRoute.post('/signup/Mentor', authMiddleware, mentorSignup);

authRoute.post('/login', login);

authRoute.post('/changePassword', changePassword);

export default authRoute;
