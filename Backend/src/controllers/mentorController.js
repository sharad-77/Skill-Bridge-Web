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
  try {
    const mentorshipRequestSchema = z.object({
      typeOfMentorship: z.string(),
      PreferredDuration: z.string(),
      Goals: z.string(),
      currentExperienceLevel: z.string(),
      availability: z.string(),
      preferredMeetingFormat: z.string(),
      specificQuestionsOrTopics: z.string(),
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
    const mentor = await Mentor.findOne({ userId: req.params.id });
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
          populate: { path: 'userId', select: 'name' },
          select: 'currentPosition'
        })
        .select('currentExperienceLevel availability preferredMeetingFormat specificQuestionsOrTopics additionalInformation createdAt mentorId status');

      const formattedRequests = requests.map(req => ({
        mentorName: req.mentorId?.userId?.name || '',
        mentorPosition: req.mentorId?.currentPosition || '',
        experienceLevel: req.currentExperienceLevel || '',
        availability: req.availability || '',
        meetingFormat: req.preferredMeetingFormat || '',
        questionsOrTopics: req.specificQuestionsOrTopics || '',
        additionalInfo: req.additionalInformation || '',
        requestedAt: req.createdAt,
        status: req.status
      }));

      return res.json({ requests: formattedRequests });

    } else if (req.user.role === "mentor") {
      const mentor = await Mentor.findOne({ userId: req.user.id });
      if (!mentor) return res.status(404).json({ message: "Mentor not found" });

      const requests = await MentorshipRequestSchema.find({ mentorId: mentor._id })
        .populate({
          path: 'studentId',
          populate: { path: 'userId', select: 'name' },
          select: 'instituteName'
        })
        .select('currentExperienceLevel availability preferredMeetingFormat specificQuestionsOrTopics additionalInformation createdAt studentId status');

      const formattedRequests = requests.map(req => ({
        studentName: req.studentId?.userId?.name || '',
        studentInstitute: req.studentId?.instituteName || '',
        experienceLevel: req.currentExperienceLevel || '',
        availability: req.availability || '',
        meetingFormat: req.preferredMeetingFormat || '',
        questionsOrTopics: req.specificQuestionsOrTopics || '',
        additionalInfo: req.additionalInformation || '',
        requestedAt: req.createdAt,
        status: req.status
      }));

      return res.json({ requests: formattedRequests });

    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }
  } catch (error) {
    console.error("Error in AllMentorshipRequest:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateMentorshipRequest = async (req, res) => {
  try {
    if (req.user.role === "student") {
      return res.status(403).json({ message: "Only mentor can access this route" });
    }

    const updateRequestSchema = z.object({
      requestId: z.string(),
      status: z.enum(["pending", "accepted", "rejected", "reject"]), // Assuming these are the valid statuses
    });

    const validation = updateRequestSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid request data", errors: validation.error.errors });
    }

    const { requestId, status } = validation.data;

    if (status === 'reject') {
      await MentorshipRequestSchema.findByIdAndDelete(requestId);
      return res.json({ message: "Request deleted successfully" });
    }

    const request = await MentorshipRequestSchema.findByIdAndUpdate(requestId, { status }, { new: true })
      .populate('studentId', 'userId.name')
      .populate('mentorId', 'userId.name currentPosition')
      .select('mentorshipType preferredDuration goals created_at studentId mentorId status');

    res.json({ request });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};
