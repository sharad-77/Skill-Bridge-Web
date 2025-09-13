import express from "express";
import { changePassword, login, mentorSignup, signup, studentSignup } from '../controllers/authController.js';
import authMiddleware from "../middleware/authMiddleware.js";
import uploadImage from "../middleware/uploadImage.js";
import { Mentor, Student } from '../models/userModel.js';

// Create a new router object
const authRoute = express.Router();

// Route for user signup
authRoute.post('/signup', signup);

// Routes for student and mentor specific signup steps, protected by auth middleware
authRoute.post('/signup/Mentor', uploadImage, authMiddleware, mentorSignup);
authRoute.post('/signup/Student', uploadImage, authMiddleware, studentSignup);

authRoute.get("/onboarding-status", authMiddleware, async (req, res) => {
  try {
    const { id, role } = req.user;
    let onboarded = false;

    if (!id || !role) {
      return res.status(400).json({
        message: "Invalid user data in token"
      });
    }

    if (role === "student") {
      const student = await Student.findOne({ userId: id });
      onboarded = !!student;
    } else if (role === "mentor") {
      const mentor = await Mentor.findOne({ userId: id });
      onboarded = !!mentor;
    } else {
      return res.status(400).json({
        message: "Invalid user role",
        role: role
      });
    }


    return res.status(200).json({
      onboarded,
      role,
      userId: id
    });
  } catch (error) {
    console.error("Onboarding check failed:", error);

    if (error.name === 'MongoNetworkError' || error.name === 'MongooseError') {
      return res.status(503).json({
        message: "Database connection error"
      });
    }

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

// Route for user login
authRoute.post('/login', login);

// Route to change password, protected by auth middleware
authRoute.post('/changePassword', authMiddleware, changePassword);

// Export the router
export default authRoute;
