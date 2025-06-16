import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtsecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "No Token Provided" })
        }

        const decodedToken = jwt.verify(token, jwtsecret);

        if (!decodedToken) {
            return res.status(401).json({ message: "Invalid Token" })
        }

        req.user = decodedToken;
        next();
    } catch (err) {
        return res.status(401).json({ message: "server error" });
    }

};

export default authMiddleware;