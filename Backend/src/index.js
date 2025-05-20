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

app.use('/api/User', userRoute);
app.use('/api/Collaboration', projectCollabRoute);
app.use('/api/Skill-Exchange', skillExchangeRoute);
app.use('/api/Mentor', findMentorRoute);
app.use('/api/Certificate', certificateRoute);
app.use('/api/Authentication', authRoute);

app.listen(PORT, () => {
    console.log(`Port Listing ON: ${PORT}`);
})