import MentorshipRequestSchema from "../models/mentorshipModel.js";
import { Mentor, Student } from "../models/userModel.js";
import z from "zod";


export const allMentorsController = async (req, res) => {
  try {
    const allDetialsOfMentor = await Mentor.find().populate('userId', 'name');
    const mentors = allDetialsOfMentor.map(mentor => ({
      id: mentor.userId._id,
      mentorId: mentor._id,
      rating: mentor.averageRating,
      name: mentor.userId.name,
      position: mentor.currentPosition,
      location: mentor.location,
      experience: mentor.yearsOfExperience,
      availability: mentor.availability,
      expertise: mentor.expertise,
      profileImage: mentor.profileImage?.url || null
    }));
    res.json(mentors);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export const mentorDetails = async (req, res) => {
  try {
    const mentorId = req.params.id;
    if (!mentorId) return res.status(400).json({ message: 'Missing id param' });
    const mentor = await Mentor.findById(mentorId).populate('userId', 'name');
    if (!mentor) {
      return res.status(400).json({ message: "Invalid Mentor ID" });
    }
    const mentorDetails = {
      image: mentor.profileImage.url,
      name: mentor.userId.name,
      position: mentor.currentPosition,
      location: mentor.location,
      experience: mentor.yearsOfExperience,
      reting: mentor.averageRating,
      Student: mentor.studentsGuided,
      expertise: mentor.expertise,
      availability: mentor.availability
    };
    res.json({ mentorDetails });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export const requestForMentorship = async (req, res) => {
  const mentorId = req.params.id;
  try {
    const mentorshipRequestSchema = z.object({
      typeOfMentorship: z.string(),
      PreferredDuration: z.string(),
      Goals: z.string(),
      currentExperienceLevel: z.string(),
      availability: z.string(),
      preferredMeetingFormat: z.string(),
      specificQuestionsOrTopics: z.string().optional(),
      additionalInformation: z.string().optional(),
    });

    const validation = mentorshipRequestSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid mentorship request data", errors: validation.error.errors });
    }

    const { typeOfMentorship, PreferredDuration, Goals, currentExperienceLevel, availability, preferredMeetingFormat, specificQuestionsOrTopics, additionalInformation } = validation.data;

    const student = await Student.findOne({ userId: req.user.id });
    if (!student) {
      return res.status(404).json({ message: "Student not found, Please try again" });
    }
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    const RequestMentorship = await MentorshipRequestSchema.create({
      studentId: student._id,
      mentorId: mentor._id,
      mentorshipType: typeOfMentorship,
      preferredDuration: PreferredDuration,
      goals: Goals,
      currentExperienceLevel: currentExperienceLevel,
      availability: availability,
      preferredMeetingFormat: preferredMeetingFormat,
      specificQuestionsOrTopics: specificQuestionsOrTopics,
      additionalInformation: additionalInformation
    });
    res.json({ message: "Mentorship Request Sent Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const AllMentorshipRequest = async (req, res) => {
  try {
    if (req.user.role === "student") {
      const student = await Student.findOne({ userId: req.user.id });
      if (!student) return res.status(404).json({ message: "Student not found" });

      const requests = await MentorshipRequestSchema.find({ studentId: student._id })
        .populate({
          path: 'mentorId',
          populate: { path: 'userId', select: 'name email' },
          select: 'currentPosition profileImage'
        })
        .select('mentorshipType preferredDuration goals currentExperienceLevel availability preferredMeetingFormat specificQuestionsOrTopics additionalInformation createdAt updatedAt mentorId status')
        .sort({ createdAt: -1 });

      const formattedRequests = requests.map(req => ({
        mentorName: req.mentorId?.userId?.name || 'Unknown Mentor',
        mentorProfilePhoto: req.mentorId?.profileImage?.url || '/default-avatar.png',
        mentorEmail: req.mentorId?.userId?.email || '',
        mentorCurrentPosition: req.mentorId?.currentPosition || 'Position not specified',
        mentorshipType: req.mentorshipType || 'Not specified',
        preferredMeetingFormat: req.preferredMeetingFormat || 'Not specified',
        duration: req.preferredDuration || 'Not specified',
        dateOfReq: req.createdAt ? new Date(req.createdAt).toLocaleDateString() : '',
        goalOfReq: req.specificQuestionsOrTopics || 'No specific goals mentioned',
        goals: req.goals || '',
        lastUpdate: req.updatedAt ? new Date(req.updatedAt).toLocaleDateString() : new Date(req.createdAt).toLocaleDateString(),
        experienceLevel: req.currentExperienceLevel || '',
        availability: req.availability || '',
        additionalInfo: req.additionalInformation || '',
        status: req.status,
        _id: req._id
      }));

      return res.json({ requests: formattedRequests });

    } else if (req.user.role === "mentor") {
      const mentor = await Mentor.findOne({ userId: req.user.id });
      if (!mentor) return res.status(404).json({ message: "Mentor not found" });

      const requests = await MentorshipRequestSchema.find({ mentorId: mentor._id })
        .populate({
          path: 'studentId',
          populate: {
            path: 'userId',
            select: 'name email',
            model: 'User'
          },
          select: 'instituteName profileImage',
          model: 'Student'
        })
        .select('mentorshipType preferredDuration goals currentExperienceLevel availability preferredMeetingFormat specificQuestionsOrTopics additionalInformation createdAt updatedAt studentId status')
        .sort({ createdAt: -1 });



      const formattedRequests = requests.map(req => ({
        userName: req.studentId?.userId?.name || 'Unknown Student',
        studentProfilePhoto: req.studentId?.profileImage?.url || null,
        instituteName: req.studentId?.instituteName || 'Institute not specified',
        email: req.studentId?.userId?.email || '',
        mentorshipType: req.mentorshipType || 'Not specified',
        preferredMeetingFormat: req.preferredMeetingFormat || 'Not specified',
        duration: req.preferredDuration || 'Not specified',
        dateOfReq: req.createdAt ? new Date(req.createdAt).toLocaleDateString() : '',
        goalOfReq: req.specificQuestionsOrTopics || 'No specific goals mentioned',
        goals: req.goals || '',
        lastUpdate: req.updatedAt ? new Date(req.updatedAt).toLocaleDateString() : (req.createdAt ? new Date(req.createdAt).toLocaleDateString() : ''),
        experienceLevel: req.currentExperienceLevel || '',
        availability: req.availability || '',
        additionalInfo: req.additionalInformation || '',
        status: req.status || 'pending',
        _id: req._id
      }));

      return res.json({ requests: formattedRequests });

    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }
  } catch (error) {
    console.error("Error in AllMentorshipRequest:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const updateMentorshipRequest = async (req, res) => {
  try {
    const updateRequestSchema = z.object({
      requestId: z.string(),
      status: z.enum(["cancelled", "accepted", "rejected"]),
    });

    const validation = updateRequestSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid request data", errors: validation.error.errors });
    }

    const { requestId, status } = validation.data;

    // Find the request first to check ownership
    const existingRequest = await MentorshipRequestSchema.findById(requestId);
    if (!existingRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Check permissions based on user role
    if (req.user.role === "student") {
      // Students can only cancel their own requests
      const student = await Student.findOne({ userId: req.user.id });
      if (!student || existingRequest.studentId.toString() !== student._id.toString()) {
        return res.status(403).json({ message: "You can only cancel your own requests" });
      }
      if (status !== "cancelled") {
        return res.status(400).json({ message: "Students can only cancel requests" });
      }
    } else if (req.user.role === "mentor") {
      // Mentors can only update requests sent to them
      const mentor = await Mentor.findOne({ userId: req.user.id });
      if (!mentor || existingRequest.mentorId.toString() !== mentor._id.toString()) {
        return res.status(403).json({ message: "You can only update requests sent to you" });
      }
      if (!["accepted", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Mentors can only accept or reject requests" });
      }
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }

    // Handle cancellation (deletion)
    if (status === 'cancelled') {
      await MentorshipRequestSchema.findByIdAndDelete(requestId);
      return res.json({ message: "Request cancelled successfully" });
    }

    // Update the request status
    const updatedRequest = await MentorshipRequestSchema.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    )
      .populate({
        path: 'studentId',
        populate: { path: 'userId', select: 'name email' },
        select: 'instituteName profileImage'
      })
      .populate({
        path: 'mentorId',
        populate: { path: 'userId', select: 'name email' },
        select: 'currentPosition profileImage'
      })
      .select('mentorshipType preferredDuration goals currentExperienceLevel availability preferredMeetingFormat specificQuestionsOrTopics additionalInformation createdAt updatedAt studentId mentorId status');

    // If accepted, increment mentor's studentsGuided
    if (status === 'accepted') {
      await Mentor.findByIdAndUpdate(existingRequest.mentorId, { $inc: { studentsGuided: 1 } });
    }

    res.json({
      message: `Request ${status} successfully`,
      request: updatedRequest
    });
  } catch (error) {
    console.error("Error in updateMentorshipRequest:", error);
    res.status(500).json({ message: "Internal Server error", error: error.message });
  }
};
