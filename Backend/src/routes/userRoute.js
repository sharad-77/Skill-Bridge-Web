import express from "express"
import { getUserProfile, updateStudentProfile, updateAccountSettings } from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.get('/Profile', getUserProfile);
userRoute.put('/Profile', updateStudentProfile);
userRoute.put('/Account-Settings', updateAccountSettings);

export default userRoute;
