import { Mentor, Student, User } from "../models/userModel.js";
import z from "zod";


export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = user.toObject({ getters: true });
    let profileData = { ...userData };

    if (user.role === "student") {
      const student = await Student.findOne({ userId })
        .populate({
          path: 'joinedProjects',
          select: 'title category description introduction projectGoal requiredSkill teamSize projectdeadline members createdBy status progress',
          populate: { path: 'members.userId createdBy', select: 'name email' }
        })
        .populate({
          path: 'joinedSkills',
          select: 'title category level description duration enrollCount author image video introduction highlights knowledgeRequirement rating'
        });
      if (!student) {
        return res.status(404).json({ message: "Student profile not found" });
      }

      profileData = {
        ...userData,
        introduction: student.introduction,
        location: student.location,
        instituteName: student.instituteName,
        gradYear: student.gradYear,
        joinedProjects: student.joinedProjects || [],
        joinedSkills: student.joinedSkills || [],
        interestedSkills: student.interestedSkills || [],
        socialMedia: student.socialMedia || [],
        certificates: student.certificates || [],
        profileImage: student.profileImage?.url,
      };
    } else if (user.role === "mentor") {
      const mentor = await Mentor.findOne({ userId })
        .populate({
          path: 'expertise',
          select: 'title category level description duration enrollCount author image video introduction highlights knowledgeRequirement rating'
        });
      if (!mentor) {
        return res.status(404).json({ message: "Mentor profile not found" });
      }

      profileData = {
        ...userData,
        introduction: mentor.introduction,
        location: mentor.location,
        currentPosition: mentor.currentPosition,
        yearsOfExperience: mentor.yearsOfExperience,
        studentsGuided: mentor.studentsGuided,
        averageRating: mentor.averageRating,
        completedSessions: mentor.completedSessions,
        expertise: mentor.expertise || [],
        socialMedia: mentor.socialMedia || [],
        availability: mentor.availability,
        allReviews: mentor.allReviews || [],
        profileImage: mentor.profileImage?.url,
      };
    }

    return res.json({ profile: profileData });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profileUpdateSchema = z.object({
      name: z.string().optional(),
      introduction: z.string().optional(),
      location: z.string().optional(),
    });

    const validation = profileUpdateSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid profile data", errors: validation.error.errors });
    }

    const { name, introduction, location } = validation.data;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) {
      user.name = name;
      await user.save();
    }

    let updatedProfile;

    if (user.role === "student") {
      updatedProfile = await Student.findOneAndUpdate(
        { userId },
        { introduction, location },
        { new: true }
      );
      if (!updatedProfile) {
        return res.status(404).json({ message: "Student profile not found" });
      }
    } else if (user.role === "mentor") {
      updatedProfile = await Mentor.findOneAndUpdate(
        { userId },
        { introduction, location },
        { new: true }
      );
      if (!updatedProfile) {
        return res.status(404).json({ message: "Mentor profile not found" });
      }
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }

    return res.json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAccountSettings = async (req, res) => {
  try {
    const userId = req.user.id;

    const accountSettingsSchema = z.object({
      name: z.string().optional(),
      email: z.string().email("Invalid email format").optional(),
      location: z.string().optional(),
      introduction: z.string().optional(),
      socialMedia: z.array(z.object({
        Name: z.string(),
        URL: z.string().url(),
      })).optional(),
    });

    const validation = accountSettingsSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid account settings data", errors: validation.error.errors });
    }

    const { name, email, location, introduction, socialMedia } = validation.data;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();

    const profileUpdates = {};
    if (location) profileUpdates.location = location;
    if (introduction) profileUpdates.introduction = introduction;
    if (socialMedia) profileUpdates.socialMedia = socialMedia;

    let updatedProfile;

    if (user.role === "student") {
      updatedProfile = await Student.findOneAndUpdate({ userId }, profileUpdates, { new: true });
    } else if (user.role === "mentor") {
      updatedProfile = await Mentor.findOneAndUpdate({ userId }, profileUpdates, { new: true });
    }

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const userObject = user.toObject();
    delete userObject.password;

    const fullProfile = { ...userObject, ...updatedProfile.toObject() };

    res.json({
      message: "Account settings updated successfully",
      profile: fullProfile,
    });

  } catch (error) {
    console.error("Error updating account settings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
