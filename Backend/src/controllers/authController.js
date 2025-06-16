import bcrypt from "bcryptjs";
import z from "zod";
import jwt from "jsonwebtoken";
import User from '../models/userModel.js';
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const jwtsecret = process.env.JWT_SECRET;


export const signup = async (req, res) => {
    try {
        const { name, password, email, role, roleDetails } = req.body;

        const userSchema = z.object({
            name: z.string().max(50),
            password: z.string().max(16),
            email: z.string().max(50).email(),
            role: z.enum(["student", "mentor"]),
            roleDetails: z.record(z.any())
        });

        const userValidation = userSchema.safeParse(req.body);

        if (!userValidation.success) {
            return res.status(400).json({
                message: "Please Enter Valid Information"
            });
        }
        const hashedPass = await bcrypt.hash(password, 10);

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        let validRoleDetails = {};

        if (role === "student") {

            const { instituteName, interests } = roleDetails || {};
            if (!instituteName || !Array.isArray(interests)) {
                return res.status(400).json({
                    message: "Student must provide there Intitute Name and at leat 2 Interests"
                })
            }
            validRoleDetails = { instituteName, interests };

        } else if (role === "mentor") {

            const { location, currentPosition, expertise, availability } = roleDetails || {};
            if (!location || !currentPosition || !Array.isArray(expertise) || !availability) {
                return res.status(400).json({
                    message: "Mentor must provide there details"
                })
            }
            validRoleDetails = { location, currentPosition, expertise, availability };
        }

        const userData = await User.create({
            name,
            password: hashedPass,
            email,
            role,
            roleDetails: validRoleDetails
        });

        if (userData) {
            res.status(200).json({
                user: userData
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
};

export const login = async (req, res) => {
    try {
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
                id: userExist._id,
                name: userExist.name,
                role: userExist.role
            },
            jwtsecret
        );

        return res.json({
            token: token,
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
};