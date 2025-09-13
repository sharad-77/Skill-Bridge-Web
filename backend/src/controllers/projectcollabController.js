import z from "zod";
import Project from "../models/projectModel.js";
import { Student, User } from "../models/userModel.js";

export const AllProject = async (req, res) => {
    try {
        const featureProjects = await Project.find();
        res.json(
            featureProjects.map(project => ({
                _id: project._id,
                category: project.category,
                title: project.title,
                description: project.description,
                members: project.members,
                requiredSkills: project.requiredSkill,
                progress: project.progress,
                tags: project.tags,
                createdAt: project.createdAt,
                projectdeadline: project.projectdeadline,
            }))
        );
    } catch (e) {
        console.error(e.message);
        res.status(500).json({
            message: "Internal Server error"
        });
    }
};


export const NewProject = async (req, res) => {
    try {
        const projectSchema = z.object({
            title: z.string().min(1, "Title is required"),
            category: z.string().min(1, "Category is required"),
            description: z.string().min(1, "Description is required"),
            introduction: z.string().min(1, "Introduction is required"),
            projectGoal: z.array(z.string()).min(1, "At least one project goal is required"),
            requiredSkill: z.array(z.string()).min(1, "At least one required skill is required"),
            teamSize: z.number().int().positive("Team size must be a positive integer"),
            members: z.array(z.object({
                position: z.string().optional(),
                userId: z.string(), // Assuming userId is a string representation of ObjectId
                name: z.string(),
            })).optional(),
            projectdeadline: z.string().min(1, "Project deadline is required"), // Consider using z.date() if you expect a Date object
        });

        const validation = projectSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ message: "Invalid project data", errors: validation.error.errors });
        }

        const { title, category, description, introduction, projectGoal, requiredSkill, teamSize, members, projectdeadline } = validation.data;
        const UserId = req.user.id;
        const student = await Student.findOne({ userId: UserId });
        const newProject = await Project.create({
            title,
            category,
            description,
            introduction,
            projectGoal,
            requiredSkill,
            teamSize,
            members,
            projectdeadline,
            createdBy: student._id
        },);
        res.json({
            message: "Project created successfully"
        });
    } catch (error) {
        console.error(error.message);
        res.status(404).json({
            message: error.message
        });
    }
}

export const ProjectbyId = async (req, res) => {
    try {
        const oneProject = await Project.findById(req.params.id);
        if (!oneProject) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            project: oneProject
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const joinProject = async (req, res) => {
    const userId = req.user.id;
    const name = req.user.name;
    const projectId = req.params.id;

    try {
        const joinProjectSchema = z.object({
            projectId: z.string().min(1, "Project ID is required"),
        });

        const validation = joinProjectSchema.safeParse({ projectId });
        if (!validation.success) {
            return res.status(400).json({ message: "Invalid request data", errors: validation.error.errors });
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const currentUserId = userId.toString();
        const alreadyJoined = project.members.some(
            (m) => m.userId && m.userId.toString() === currentUserId
        );

        if (alreadyJoined) {
            return res.status(400).json({ message: "You already joined this project" });
        }

        if (project.members.length >= project.teamSize) {
            return res.status(400).json({ message: "No more space left in project" });
        }

        project.members.push({ userId, name });
        await project.save();

        const user = await User.findById(userId);
        if (user && user.role === "student") {
            await Student.findOneAndUpdate(
                { userId },
                { $addToSet: { joinedProjects: projectId } }
            );
        }

        return res.status(200).json({ message: "Joined project successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
