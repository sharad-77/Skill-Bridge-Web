import { User, Mentor, Student } from "../models/userModel.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let profileData;

    if (user.role === "student") {
      const student = await Student.findOne({ userId });
      profileData = {
        ...user._doc,
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
      profileData = {
        ...user._doc,
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

    return res.json({ profile: profileData });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
 };

export const updateStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, introduction, location, instituteName } = req.body;

    const student = await Student.findOneAndUpdate(
      { userId },
      { name, introduction, location, instituteName },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const updateAccountSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, location, socialMedia } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;

    if (user.role === "student") {
      const student = await Student.findOneAndUpdate(
        { userId },
        {
          location,
          socialMedia,
          introduction: req.body.introduction,
          instituteName: req.body.instituteName,
          gradYear: req.body.gradYear,
        },
        { new: true }
      );

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
    } else if (user.role === "mentor") {
      const mentor = await Mentor.findOneAndUpdate(
        { userId },
        {
          location,
          socialMedia,
          introduction: req.body.introduction,
          currentPosition: req.body.currentPosition,
          yearsOfExperience: req.body.yearsOfExperience,
          expertise: req.body.expertise,
        },
        { new: true }
      );

      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }
    }

    await user.save();

    return res.json({ message: "Account settings updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};
