import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtsecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    try {
        // Check if JWT_SECRET exists
        if (!jwtsecret) {
            console.error("JWT_SECRET environment variable is not set");
            return res.status(500).json({ message: "Server configuration error" });
        }

        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "No Token Provided" });
        }

        // jwt.verify will throw an error if token is invalid, expired, or malformed
        const decodedToken = jwt.verify(token, jwtsecret);

        // Additional validation - ensure token has required fields
        if (!decodedToken.id || !decodedToken.role) {
            return res.status(401).json({ message: "Invalid Token Structure" });
        }

        req.user = decodedToken;
        next();
    } catch (err) {
        
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token Expired" });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid Token" });
        } else if (err.name === 'NotBeforeError') {
            return res.status(401).json({ message: "Token Not Active Yet" });
        } else {
            console.error("Auth middleware error:", err);
            return res.status(401).json({ message: "Authentication Failed" });
        }
    }
};

export default authMiddleware;
