import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DBconnection from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

DBconnection();
// middleware
app.use(express.json());
import authMiddleware from "./middleware/authMiddleware.js";

//// All routes
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import skillExchangeRoute from "./routes/skillExchangeRoute.js";
import projectCollabRoute from "./routes/projectCollabRoute.js";
import findMentorRoute from "./routes/findMentorRoute.js";
import certificateRoute from "./routes/certificateRoute.js";

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Internal Server Error"
    })
})

app.use('/api/User',authMiddleware, userRoute);
app.use('/api/Collaboration',authMiddleware, projectCollabRoute);
app.use('/api/Skill-Exchange',authMiddleware, skillExchangeRoute);
app.use('/api/Mentor',authMiddleware, findMentorRoute);
app.use('/api/Certificate',authMiddleware, certificateRoute);
app.use('/api/Authentication', authRoute);

app.listen(PORT, () => {
    console.log(`Port Listing ON: ${PORT}`);
})