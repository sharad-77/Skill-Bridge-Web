import SkillModel from "../models/skillModel.js";
import { Student, User, Mentor } from "../models/userModel.js";

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
        const { title, category, level, description, duration, image, video, introduction, highlights, knowledgeRequirement } = req.body;
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
        const { star, comment } = req.body;
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

        skillDetail.allReviews = [{
            name: user.name,
            star,
            comment
        }];

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
