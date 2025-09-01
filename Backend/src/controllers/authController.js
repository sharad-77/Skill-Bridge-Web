import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import z from "zod";
dotenv.config();

import { Mentor, Student, User } from "../models/userModel.js";
const jwtsecret = process.env.JWT_SECRET;

export const signup = async (req, res) => {
    try {
        const { name, password, email, role } = req.body;

        const userSchema = z.object({
            name: z.string().max(50),
            password: z.string().min(6).max(32),
            email: z.string().max(100).email(),
            role: z.enum(["student", "mentor"])
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

        const userData = await User.create({
            name,
            password: hashedPass,
            email,
            role,
        });

        res.status(200).json({
            message: "User Created Succesfully",
            userData
        })

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Internal Server Error Occured"
        })
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const loginSchema = z.object({
            email: z.string().email(),
            password: z.string(),
        });

        const loginValidation = loginSchema.safeParse(req.body);

        if (!loginValidation.success) {
            return res.status(400).json({
                message: "Please Enter Valid Information"
            });
        }

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(404).json({ // 404 for not found
                message: "User does not exist. Please signup"
            });
        }

        const passCheck = await bcrypt.compare(password, userExist.password);

        if (!passCheck) {
            return res.status(401).json({ // 401 for unauthorized
                message: "Invalid credentials"
            });
        }

        let onboarded = false;
        if (userExist.role === 'student') {
            const student = await Student.findOne({ userId: userExist._id });
            if (student) {
                onboarded = true;
            }
        } else if (userExist.role === 'mentor') {
            const mentor = await Mentor.findOne({ userId: userExist._id });
            if (mentor) {
                onboarded = true;
            }
        }

        const token = jwt.sign(
            {
                id: userExist._id,
                name: userExist.name,
                role: userExist.role,
                onboarded: onboarded
            },
            jwtsecret,
        );

        return res.json({
            token,
            user: {
                id: userExist._id,
                name: userExist.name,
                role: userExist.role,
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error Occurred"
        });
    }
};

export const studentSignup = async (req, res) => {

    try {
        const userID = req.user.id;

        const { introduction, location, instituteName, gradYear, interestedSkills, socialMedia } = req.body;

        const studentSchema = z.object({
            introduction: z.string(),
            location: z.string(),
            instituteName: z.string(),
            gradYear: z.number(),
            interestedSkills: z.array(z.string()),
            socialMedia: z.array(z.object({
                name: z.string(),
                url: z.string().url(),
            })),
        });

        const studentValidation = studentSchema.safeParse(req.body);

        if (!studentValidation.success) {
            return res.status(400).json({
                message: "Please Enter Valid Information"
            });
        }

        const allReadyExist = await Student.findOne({ userId: userID });

        if (allReadyExist) {
            return res.status(400).json({
                message: "You are allReady Exist"
            })
        }

        const newStudent = await Student.create({
            userId: userID,
            introduction,
            location,
            instituteName,
            gradYear,
            interestedSkills,
            socialMedia
        })

        res.status(200).json({
            message: "Student Created Succesfully",
            newStudent
        })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal Server Error occured"
        })
    }
}

export const mentorSignup = async (req, res) => {
    try {
        const userID = req.user.id;

        const { introduction, location, currentPosition, yearsOfExperience, expertise, socialMedia, availability } = req.body;

        const mentorSchema = z.object({
            introduction: z.string(),
            location: z.string(),
            currentPosition: z.string(),
            yearsOfExperience: z.number(),
            expertise: z.array(z.string()),
            socialMedia: z.array(z.object({
                name: z.string(),
                url: z.string().url(),
            })),
            availability: z.string(),
        });

        const mentorValidation = mentorSchema.safeParse(req.body);

        if (!mentorValidation.success) {
            return res.status(400).json({
                message: "Please Enter Valid Information"
            });
        }

        const allReadyExist = await Mentor.findOne({ userId: userID });

        if (allReadyExist) {
            return res.status(400).json({
                message: "You are allReady Existce"
            })
        }

        const newMentor = await Mentor.create({
            userId: userID,
            introduction,
            location,
            currentPosition,
            yearsOfExperience,
            expertise,
            socialMedia,
            availability,
        });

        res.status(200).json({
            message: "Mentor Created Succesfully",
            newMentor
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal Server Error Occured"
        })
    }
}

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id).select('+password');

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Old password is incorrect"
            })
        }

        const hashedNewPass = await bcrypt.hash(newPassword, 10);

        user.password = hashedNewPass;

        await user.save();

        res.status(200).json({
            message: "Password changed successfully"
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal Server Error Occured"
        })
    }
}
