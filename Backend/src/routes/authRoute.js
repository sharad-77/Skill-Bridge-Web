import express from "express";
import { login, mentorSignup, signup, studentSignup, changePassword } from '../controllers/authController.js';
import authMiddleware from "../middleware/authMiddleware.js";

// Create a new router object
const authRoute = express.Router();

// Route for user signup
authRoute.post('/signup', signup);

// Routes for student and mentor specific signup steps, protected by auth middleware
authRoute.post('/signup/Student',authMiddleware, studentSignup);
authRoute.post('/signup/Mentor', authMiddleware, mentorSignup);

// Route for user login
authRoute.post('/login', login);

// Route to change password, protected by auth middleware
authRoute.post('/changePassword', authMiddleware, changePassword);

// Export the router
export default authRoute;
