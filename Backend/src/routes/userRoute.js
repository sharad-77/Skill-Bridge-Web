import express from "express"
import userProfileController from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.get('/Profile',userProfileController);

export default userRoute;