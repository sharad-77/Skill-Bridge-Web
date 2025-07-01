import Project from "../models/projectModel.js";
import { Student, User } from "../models/userModel.js";

export const AllProject = async (req, res) => {
    try {
        const featureProjects = await Project.find();

        res.json(featureProjects.map(project => ({
            Category: project.category,
            Title: project.title,
            Description: project.description,
            JoinedMembers: project.members,
            Skills: project.requiredSkill
        })));

    } catch (e) {
        console.error(e.message);
        res.status(500).json({
            message: "Internal Server error"
        })
    }

}

export const NewProject = async (req, res) => {
    try {
        const { title, category, description, introduction, projectGoal, requiredSkill, teamSize, members, projectdeadline } = req.body;
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
            createdBy: student._id ///////////////
        });

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
            res.json({
                message: "Invalid Project ID"
            })
        }

        res.json({
            Project: oneProject
        })

    } catch (error) {
        res.json({
            message: error.message
        })

    }

}

export const joinProject = async (req, res) => {
    const userId = req.user.id;
    const name = req.user.name;
    const projectId = req.params.id;

    try {
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

        // the main logic bro

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
