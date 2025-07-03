import SkillModel from "../models/skillModel.js";
import { Student, User, Mentor } from "../models/userModel.js";
import z from "zod";

export const allSkill = async (req, res) => {
    try {
        const featureSkill = await SkillModel.find();
        res.json(featureSkill);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal Server error"
        });
    }
};

export const newSkill = async (req, res) => {
    const userName = req.user.name;
    try {
        const newSkillSchema = z.object({
            title: z.string().min(1, "Title is required"),
            category: z.string().min(1, "Category is required"),
            level: z.string().min(1, "Level is required"),
            description: z.string().min(1, "Description is required"),
            duration: z.string().min(1, "Duration is required"),
            image: z.string().url("Image must be a valid URL"),
            video: z.string().url("Video must be a valid URL"),
            introduction: z.string().min(1, "Introduction is required"),
            highlights: z.array(z.string()).min(1, "At least one highlight is required"),
            knowledgeRequirement: z.array(z.string()).min(1, "At least one knowledge requirement is required"),
        });

        const validation = newSkillSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ message: "Invalid skill data", errors: validation.error.errors });
        }

        const { title, category, level, description, duration, image, video, introduction, highlights, knowledgeRequirement } = validation.data;
        const student = await Student.findOne({ userId: req.user.id });
        const newSkill = await SkillModel.create({
            title,
            category,
            level,
            description,
            duration,
            auther: userName,
            image,
            video,
            introduction,
            highlights,
            knowledgeRequirement,
            createdBy: student._id
        });

        res.status(200).json({
            newSkill,
            message: "New Skill Created"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
export const detailSkill = async (req, res) => {
    try {
        const skillDetails = await SkillModel.findById(req.params.id);
        if (!skillDetails) {
            return res.status(404).json({
                message: "Invalid Skill Id"
            });
        }

        res.json({
            Skill: skillDetails
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
export const joinSkill = async (req, res) => {
    const userId = req.user.id;
    const skillId = req.params.id;
    try {
        const joinSkillSchema = z.object({
            skillId: z.string().min(1, "Skill ID is required"),
        });

        const validation = joinSkillSchema.safeParse({ skillId });
        if (!validation.success) {
            return res.status(400).json({ message: "Invalid request data", errors: validation.error.errors });
        }

        const skillDetail = await SkillModel.findById(skillId);
        if (!skillDetail) {
            return res.status(404).json({
                message: "Skill Id is Invalid"
            });
        }
        const student = await Student.findOne({ userId });
        const alreadyJoined = student.joinedSkills.some(
            (joinedSkillId) => joinedSkillId.toString() === skillId.toString()
        );
        if (alreadyJoined) {
            return res.status(400).json({
                message: "You already joined this skill"
            });
        }
        skillDetail.enrollStudents += 1;
        await skillDetail.save();
        await Student.findOneAndUpdate(
            { userId },
            {
                $addToSet: {
                    joinedSkills: skillId
                }
            }
        );

        res.status(200).json({
            message: "You Joined Skill Successfully"
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
export const makeReview = async (req, res) => {
    try {
        const reviewSchema = z.object({
            star: z.number().int().min(1).max(5, "Star rating must be between 1 and 5"),
            comment: z.string().min(1, "Comment cannot be empty"),
        });

        const validation = reviewSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ message: "Invalid review data", errors: validation.error.errors });
        }

        const { star, comment } = validation.data;
        const skillId = req.params.id;
        const userId = req.user.id;
        const skillDetail = await SkillModel.findById(skillId);
        if (!skillDetail) {
            return res.status(404).json({
                message: "Skill Id is Invalid"
            });
        }
        const user = await User.findById(userId);
        const reviews = skillDetail.allReviews ?? [];
        const alreadyReviewed = reviews.some(
            (review) => review.name === user.name
        );
        if (alreadyReviewed) {
            return res.status(400).json({
                message: "You already reviewed this skill"
            });
        }
        skillDetail.allReviews.push({
            name: user.name,
            star,
            comment
        });
        await skillDetail.save();

        res.status(200).json({
            message: "You Reviewed Skill Successfully"
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

