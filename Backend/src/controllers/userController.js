import { Mentor, Student, User } from "../models/userModel.js";
import z from "zod";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please log in and try again."
      });
    }

    const userData = user.toObject({ getters: true });
    let profileData = { ...userData };

    if (user.role === "student") {
      const student = await Student.findOne({ userId });
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student profile not found. Please complete your student onboarding."
        });
      }

      profileData = {
        ...userData,
        introduction: student.introduction,
        location: student.location,
        instituteName: student.instituteName,
        gradYear: student.gradYear,
        joinedProjects: student.joinedProjects,
        joinedSkills: student.joinedSkills,
        interestedSkills: student.interestedSkills,
        socialMedia: student.socialMedia,
      };

    } else if (user.role === "mentor") {
      const mentor = await Mentor.findOne({ userId });
      if (!mentor) {
        return res.status(404).json({
          success: false,
          message: "Mentor profile not found. Please complete your mentor onboarding."
        });
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
        expertise: mentor.expertise,
        socialMedia: mentor.socialMedia,
        availability: mentor.availability,
      };
    }

    return res.json({
      success: true,
      message: "User profile retrieved successfully.",
      data: { profile: profileData }
    });

  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred on the server. Please try again later."
    });
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
      return res.status(400).json({
        success: false,
        message: "Invalid profile data. Please check your input and try again.",
        errors: validation.error.errors
      });
    }

    const { name, introduction, location } = validation.data;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please log in and try again."
      });
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
        return res.status(404).json({
          success: false,
          message: "Student profile not found. Please complete your student onboarding before updating."
        });
      }
    } else if (user.role === "mentor") {
      updatedProfile = await Mentor.findOneAndUpdate(
        { userId },
        { introduction, location },
        { new: true }
      );
      if (!updatedProfile) {
        return res.status(404).json({
          success: false,
          message: "Mentor profile not found. Please complete your mentor onboarding before updating."
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid user role. Profile update not applicable."
      });
    }

    return res.json({
      success: true,
      message: "Profile updated successfully!",
      data: { profile: updatedProfile },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred on the server. Please try again later."
    });
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
      return res.status(400).json({
        success: false,
        message: "Invalid account settings data. Please check your input and try again.",
        errors: validation.error.errors
      });
    }

    const { name, email, location, introduction, socialMedia } = validation.data;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please log in and try again."
      });
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
      return res.status(404).json({
        success: false,
        message: "User profile not found. Please ensure your profile is complete."
      });
    }

    const userObject = user.toObject();
    delete userObject.password;

    const fullProfile = { ...userObject, ...updatedProfile.toObject() };

    res.json({
      success: true,
      message: "Account settings updated successfully!",
      data: { profile: fullProfile },
    });

  } catch (error) {
    console.error("Error updating account settings:", error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred on the server. Please try again later."
    });
  }
};

