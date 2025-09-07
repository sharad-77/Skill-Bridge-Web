import z from "zod";
import SkillModel from "../models/skillModel.js";
import { Mentor, Student, User } from "../models/userModel.js";

// Fetch all skills
export const allSkill = async (req, res) => {
    try {
        const featureSkill = await SkillModel.find().populate('createdBy', 'name');

        const formattedSkills = featureSkill.map(skill => ({
            _id: skill._id,
            title: skill.title,
            category: skill.category,
            level: skill.level,
            description: skill.description,
            duration: skill.duration,
            author: skill.author,
            image: skill.image,
            video: skill.video,
            introduction: skill.introduction,
            highlights: skill.highlights,
            knowledgeRequirement: skill.knowledgeRequirement,
            createdBy: skill.createdBy,
            rating: skill.rating || 4.5,
            students: skill.enrolledStudents,
            price: skill.price || "Free",
            user: {
                name: skill.author || skill.createdBy?.name || 'Unknown Instructor'
            },
            enrolledStudents: skill.enrolledStudents || [],
            allReviews: skill.allReviews || []
        }));

        res.json({ skills: formattedSkills });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server error" });
    }
};

// Create a new skill
export const newSkill = async (req, res) => {
    if (!req.user || !req.user.name) {
        return res.status(400).json({ message: "User not authenticated or name missing" });
    }
    const userName = req.user.name;
    try {
        const newSkillSchema = z.object({
            title: z.string().min(1, "Title is required"),
            category: z.string().min(1, "Category is required"),
            level: z.string().min(1, "Level is required"),
            description: z.string().min(1, "Description is required"),
            duration: z.string().min(1, "Duration is required"),
            image: z.string().url().optional().or(z.literal('')),
            video: z.string().url().optional().or(z.literal('')),
            introduction: z.string().min(1, "Introduction is required"),
            highlights: z.array(z.string()).min(1, "At least one highlight is required"),
            knowledgeRequirement: z.array(z.string()).min(1, "At least one knowledge requirement is required"),
        });

        const validation = newSkillSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ message: "Invalid skill data", errors: validation.error.errors });
        }

        const { title, category, level, description, duration, image, video, introduction, highlights, knowledgeRequirement } = validation.data;

        let creatorDoc, creatorModel;
        if (req.user.role === "student") {
            creatorDoc = await Student.findOne({ userId: req.user.id });
            creatorModel = "Student";
        } else if (req.user.role === "mentor") {
            creatorDoc = await Mentor.findOne({ userId: req.user.id });
            creatorModel = "Mentor";
        }

        if (!creatorDoc) {
            return res.status(400).json({ message: "User profile not found in the corresponding role collection." });
        }

        const newSkill = await SkillModel.create({
            title,
            category,
            level,
            description,
            duration,
            author: userName || 'Unknown Author',
            image: image || '',
            video: video || '',
            introduction,
            highlights,
            knowledgeRequirement,
            createdBy: creatorDoc._id,
            enrolledStudents: [],
            enrollCount: 0,
            rating: 0,
            allReviews: []
        });

        res.status(201).json({ skill: newSkill, message: "New Skill Created Successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get skill details
export const detailSkill = async (req, res) => {
    try {
        const skillDetails = await SkillModel.findById(req.params.id).populate('createdBy', 'name');
        if (!skillDetails) return res.status(404).json({ message: "Invalid Skill Id" });

        const formattedSkill = {
            _id: skillDetails._id,
            title: skillDetails.title,
            category: skillDetails.category,
            level: skillDetails.level,
            description: skillDetails.description,
            duration: skillDetails.duration,
            author: skillDetails.author,
            image: skillDetails.image,
            video: skillDetails.video,
            introduction: skillDetails.introduction,
            highlights: skillDetails.highlights,
            knowledgeRequirement: skillDetails.knowledgeRequirement,
            createdBy: skillDetails.createdBy,
            enrollCount: skillDetails.enrollCount,
            enrolledStudents: skillDetails.enrolledStudents,
            allReviews: skillDetails.allReviews || [],
            rating: skillDetails.rating || 4.5,
            students: skillDetails.enrolledStudents,
            price: skillDetails.price || "Free",
            user: { name: skillDetails.author || skillDetails.createdBy?.name || 'Unknown Instructor' },
            learningPoints: skillDetails.highlights || [],
            requirements: skillDetails.knowledgeRequirement || [],
            courseIncludes: [
                { icon: "Clock", text: `${skillDetails.duration} of content` },
                { icon: "Video", text: "Video lessons" },
                { icon: "FileText", text: "Articles and resources" },
                { icon: "Award", text: "Certificate of completion" }
            ]
        };

        res.json({ Skill: formattedSkill });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const joinSkill = async (req, res) => {
    const userId = req.user.id;
    const skillId = req.params.id;

    try {
        const skillDetail = await SkillModel.findById(skillId);
        if (!skillDetail) return res.status(404).json({ message: "Skill not found" });

        // Check if student already joined
        const alreadyJoined = skillDetail.enrolledStudents.some(id => id.toString() === userId);
        if (alreadyJoined) {
            return res.status(400).json({ message: "You already joined this skill" });
        }

        // Add student to skill
        skillDetail.enrollCount = (skillDetail.enrollCount || 0) + 1;
        skillDetail.enrolledStudents.push(userId);
        await skillDetail.save();

        // Add skill to student's joinedSkills
        await Student.findOneAndUpdate(
            { userId },
            { $addToSet: { joinedSkills: skillId } }
        );

        res.status(200).json({ message: "You joined the skill successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Make a review
export const makeReview = async (req, res) => {
    try {
        const reviewSchema = z.object({
            star: z.number().int().min(1).max(5),
            comment: z.string().min(1),
        });

        const validation = reviewSchema.safeParse(req.body);
        if (!validation.success) return res.status(400).json({ message: "Invalid review data", errors: validation.error.errors });

        const { star, comment } = validation.data;
        const skillId = req.params.id;
        const userId = req.user.id;

        const skillDetail = await SkillModel.findById(skillId);
        if (!skillDetail) return res.status(404).json({ message: "Skill Id is Invalid" });

        const user = await User.findById(userId);
        const alreadyReviewed = (skillDetail.allReviews || []).some(r => r.name === user.name);
        if (alreadyReviewed) return res.status(400).json({ message: "You already reviewed this skill" });

        skillDetail.allReviews.push({ name: user.name, star, comment });
        skillDetail.rating = skillDetail.allReviews.reduce((sum, r) => sum + r.star, 0) / skillDetail.allReviews.length;
        await skillDetail.save();
        res.status(200).json({ message: "You Reviewed Skill Successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
