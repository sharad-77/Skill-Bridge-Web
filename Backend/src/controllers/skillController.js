import SkillModel from "../models/skillModel.js"
import User from "../models/userModel.js";

export const allSkill = async (req, res) => {
    try {
        const featureSkill = await SkillModel.find();

        res.json(featureSkill);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal Server error"
        })
    }
}

export const newSkill = async (req, res) => {
    const userName = req.user.name;
    try {
        const { title, category, level, description, duration, image, video, introduction, highlights, knowledgeRequirement } = req.body;

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
            knowledgeRequirement
        })

        const CreatedSkill = await newSkill.save();

        res.status(200).json({
            CreatedSkill,
            message: "New Skill Created"
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const detailSkill = async (req, res) => {
    try {
        const skillDetails = await SkillModel.findById(req.params.id);

        if (!skillDetails) {
            return res.status(404).json({
                message: "Invalid Skill Id"
            })
        }

        res.json({
            Skill: skillDetails
        })

    } catch (error) {

        console.error(error.message)

        res.status(500).json({
            message: "Internal Server Error"
        })

    }
}

export const joinSkill = async (req, res) => {
    const userId = req.user.id;
    const skillId = req.params.id;

    try {
        const skillDetail = await SkillModel.findById(skillId);

        if (!skillDetail) {
            return res.status(404).json({
                message: "Skill Id is Invalid"
            })
        }

        const user = await User.findById(userId);

        const allReadyJoined = user.joinedSkill.some((skillId) =>
            skillId.toString() === skillId.toString()
        )

        if (allReadyJoined) {
            return res.status(400).json({
                message: "You already joined this project"
            })
        }

        skillDetail.enrollStudents += 1;
        await skillDetail.save();

        await User.findByIdAndUpdate(userId, {
            $addToSet: {
                joinedSkill: skillId
            }
        })

        res.status(200).json({
            message: "You Joined Skill Succesfully"
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }

}