import express from "express";
import { login, signup } from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.get('/signup', signup);
authRoute.get('/login', login);

export default authRoute;