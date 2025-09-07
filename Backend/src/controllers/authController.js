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
        const userID = req.user?.id;

        if (!userID) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        const {
            introduction,
            location,
            instituteName,
            gradYear,
            interestedSkills,
            socialMedia = "[]"
        } = req.body;

        const interestedSkillsArray = typeof interestedSkills === 'string'
            ? interestedSkills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0)
            : [];

        let socialMediaArray = [];
        try {
            socialMediaArray = typeof socialMedia === 'string' ? JSON.parse(socialMedia) : socialMedia;
        } catch (parseError) {
            console.error("Error parsing socialMedia:", parseError);
            socialMediaArray = [];
        }

        const studentSchema = z.object({
            introduction: z.string().min(1, { message: "Introduction is required" }),
            location: z.string().min(1, { message: "Location is required" }),
            instituteName: z.string().min(1, { message: "Institute name is required" }),
            gradYear: z.union([z.number(), z.string()]).transform((val) => {
                const num = typeof val === 'string' ? parseInt(val, 10) : val;
                if (isNaN(num) || num === null || num === undefined) {
                    throw new Error("Invalid graduation year");
                }
                return num;
            }).refine((val) => val >= 2020 && val <= 2050, { message: "Graduation year must be between 2020 and 2050" }),
            interestedSkills: z.array(z.string().min(1, { message: "Skill cannot be empty" }))
                .min(1, { message: "At least one skill is required" }),
            socialMedia: z.array(
                z.object({
                    name: z.string().min(1, { message: "Social media name is required" }),
                    url: z.string().url({ message: "Invalid URL format" }),
                })
            ).optional().default([]),
        });

        const validationData = {
            introduction: typeof introduction === 'string' ? introduction.trim() : "",
            location: typeof location === 'string' ? location.trim() : "",
            instituteName: typeof instituteName === 'string' ? instituteName.trim() : "",
            gradYear: gradYear,
            interestedSkills: interestedSkillsArray,
            socialMedia: socialMediaArray
        };


        const studentValidation = studentSchema.safeParse(validationData);

        if (!studentValidation.success) {
            console.log("Validation errors:", studentValidation.error.errors);
            return res.status(400).json({
                message: "Please Enter Valid Information",
                errors: studentValidation.error.errors.map(error => ({
                    field: error.path.join('.'),
                    message: error.message
                }))
            });
        }

        const validatedData = studentValidation.data;

        const existingStudent = await Student.findOne({ userId: userID });
        if (existingStudent) {
            return res.status(400).json({
                message: "Student profile already exists"
            });
        }

        let profileImageData = { url: null, publicId: null };

        if (req.file) {
            profileImageData = {
                url: req.file.path,
                publicId: req.file.filename
            };
        }

        const newStudent = new Student({
            userId: userID,
            introduction: validatedData.introduction,
            location: validatedData.location,
            instituteName: validatedData.instituteName,
            gradYear: validatedData.gradYear,
            interestedSkills: validatedData.interestedSkills,
            socialMedia: validatedData.socialMedia,
            profileImage: profileImageData
        });

        const savedStudent = await newStudent.save();

        await User.findByIdAndUpdate(userID, {
            isOnboarded: true,
            userType: 'Student'
        });

        res.status(201).json({
            message: "Student profile created successfully",

        });

    } catch (error) {
        console.error("Full error:", error);

        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => ({
                field: err.path,
                message: err.message
            }));
            return res.status(400).json({
                message: "Validation failed",
                errors: validationErrors
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                message: "Student profile already exists for this user"
            });
        }

        res.status(500).json({
            message: "Internal server error occurred",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};


export const mentorSignup = async (req, res) => {
    try {
        const userID = req.user.id;

        let { introduction, location, currentPosition, yearsOfExperience, expertise, socialMedia, availability } = req.body;

        expertise = typeof expertise === 'string' ? JSON.parse(expertise) : expertise;
        socialMedia = typeof socialMedia === 'string' ? JSON.parse(socialMedia) : socialMedia;

        const mentorSchema = z.object({
            introduction: z.string().min(1, 'Introduction is required'),
            location: z.string().min(1, 'Location is required'),
            currentPosition: z.string().min(1, 'Current position is required'),
            yearsOfExperience: z.number().min(1, 'Years of experience must be at least 1'),
            expertise: z.array(z.string().min(1)).min(1, 'At least one expertise is required'),
            socialMedia: z.array(
                z.object({
                    name: z.string().min(1, 'Platform name is required'),
                    url: z.string().url('Invalid URL'),
                })
            ).min(1, 'At least one social media link is required'),
            availability: z.string().min(1, 'Availability is required'),
        });

        const mentorValidation = mentorSchema.safeParse({
            introduction,
            location,
            currentPosition,
            yearsOfExperience: Number(yearsOfExperience),
            expertise,
            socialMedia,
            availability,
        });

        if (!mentorValidation.success) {
            return res.status(400).json({
                message: 'Please Enter Valid Information',
                errors: mentorValidation.error.errors,
            });
        }

        const allReadyExist = await Mentor.findOne({ userId: userID });

        if (allReadyExist) {
            return res.status(400).json({
                message: 'You already exist',
            });
        }

        const mentorData = {
            userId: userID,
            introduction,
            location,
            currentPosition,
            yearsOfExperience: Number(yearsOfExperience),
            expertise,
            socialMedia,
            availability,
        };

        if (req.file) {
            mentorData.profileImage = {
                url: req.file.path,
                publicId: req.file.filename,
            };
        } else {
            console.log('No profile image provided');
        }

        const newMentor = await Mentor.create(mentorData);

        res.status(200).json({
            message: 'Mentor Created Successfully',
        });
    } catch (error) {
        console.error('Backend Error:', error.stack);
        res.status(500).json({
            message: 'Internal Server Error Occurred',
            error: error.message,
        });
    }
};

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
