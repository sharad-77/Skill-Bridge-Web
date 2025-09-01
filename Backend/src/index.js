import cors from 'cors';
import dotenv from "dotenv";
import express from "express";

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT;
const ORIGIN = process.env.ORIGIN;

// Import database connection and middleware
import DBconnection from "./config/db.js";
import authMiddleware from "./middleware/authMiddleware.js";

// Establish database connection
DBconnection();


// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
    origin: ORIGIN,
    credentials: true,
}));

// Import all routes
import authRoute from "./routes/authRoute.js";
import findMentorRoute from "./routes/findMentorRoute.js";
import projectCollabRoute from "./routes/projectCollabRoute.js";
import skillExchangeRoute from "./routes/skillExchangeRoute.js";
import userRoute from "./routes/userRoute.js";

// Import error handling middleware
import errorMiddleware from "./middleware/errorMiddleware.js";

// Define API routes
app.use('/api/User', authMiddleware, userRoute);
app.use('/api/Collaboration', authMiddleware, projectCollabRoute);
app.use('/api/Skill-Exchange', authMiddleware, skillExchangeRoute);
app.use('/api/Mentor-Match', authMiddleware, findMentorRoute);
app.use('/api/Authentication', authRoute);

// Use the error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
    console.log(`Port Listing ON: ${PORT}`);
})
