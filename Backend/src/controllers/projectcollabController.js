import Project from "../models/projectModel.js";
import User from "../models/userModel.js";

export const AllProject = async (req, res) => {
    try {
        const featureProjects = await Project.find();

        res.json(featureProjects.map(project => ({
            Category: project.category,
            Title: project.title,
            Description: project.description,
            JoinedMembers: project.member,
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
            createdBy: UserId
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
          return res.status(404).json({
                message: "Project not found"
            })
        }

        const currentUserId = userId.toString();

        const allreadyJoined = project.members.some(
            (m) => m.userId && m.userId.toString() === currentUserId
        );

        if (allreadyJoined) { return res.status(404).json({ message: "You all ready joined this project" }) }

        const TeamSize = project.teamSize;
        let currentMemberCount = project.members.length;

        if (currentMemberCount >= TeamSize) {
            return res.status(404).json({
                message: "No More Space Left In Project"
            })
        }

        project.members.push({ userId, name });
        await project.save();

        await User.findByIdAndUpdate(userId, {
            $addToSet: { joinedProjects: projectId },
        })

        res.status(200).json({ message: "Joined project successfully" });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

} 