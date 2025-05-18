import bcrypt from "bcryptjs";
import z from "zod";
import jwt from "jsonwebtoken";
import User from '../models/userModel.js';
import dotenv from "dotenv";
dotenv.config();

const jwtsecret = process.env.JWT_SECRET;

export const signup = async (req, res) => {
    const { name, password, email, role } = req.body;

    const userSchema = z.object({
        name: z.string().max(50),
        password: z.string().max(16),
        email: z.string().max(50).email(),
        role: z.enum(["student", "mentor"])
    });

    const userValidation = userSchema.safeParse(req.body);

    if (!userValidation.success) {
        return res.status(400).json({
            message: "Please Enter Valid Information"
        });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const userData = await User.create({
        name,
        password: hashedPass,
        email,
        role
    });

    if (userData) {
        res.status(200).json({
            name: userData.name,
            email: userData.email,
            role: userData.role
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
        return res.status(400).send({
            message: "User does not exist Pleas Signup"
        });
    }

    const passCheck = await bcrypt.compare(password, userExist.password);

    if (!passCheck) {
        return res.status(400).send({
            message: "Your Credentials are Wrong"
        });
    }

    const token = jwt.sign(
        {
            name: userExist.name,
            role: userExist.role
        },
        jwtsecret
    );

    res.json({
        token: token,
    });
};

