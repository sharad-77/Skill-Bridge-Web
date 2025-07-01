import dotenv from "dotenv";
import express from "express";
import DBconnection from "./config/db.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

DBconnection();
// middleware
app.use(express.json());

//// All routes
import authRoute from "./routes/authRoute.js";
import findMentorRoute from "./routes/findMentorRoute.js";
import projectCollabRoute from "./routes/projectCollabRoute.js";
import skillExchangeRoute from "./routes/skillExchangeRoute.js";
import userRoute from "./routes/userRoute.js";

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Internal Server Error"
    })
})

app.use('/api/User', authMiddleware, userRoute);
app.use('/api/Collaboration', authMiddleware, projectCollabRoute);
app.use('/api/Skill-Exchange', authMiddleware, skillExchangeRoute);
app.use('/api/Mentor-Match', authMiddleware, findMentorRoute);
app.use('/api/Authentication', authRoute);

app.listen(PORT, () => {
    console.log(`Port Listing ON: ${PORT}`);
})
