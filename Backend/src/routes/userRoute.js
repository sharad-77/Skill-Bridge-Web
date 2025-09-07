import express from "express"
import { getUserProfile, updateUserProfile, updateAccountSettings } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

// Create a new router object
const userRoute = express.Router();

// Route to get the user's profile
userRoute.get('/Profile', authMiddleware, getUserProfile);

// Route to update the user's profile
userRoute.put('/Profile', authMiddleware, updateUserProfile);

// Route to update the user's account settings
userRoute.put('/Account-Settings', authMiddleware, updateAccountSettings);

// Export the router
export default userRoute;
