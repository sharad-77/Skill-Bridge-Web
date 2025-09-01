import mongoose from 'mongoose';

const MentorshipRequest = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
  mentorshipType: String,
  preferredDuration: String,
  goals: String,
  currentExperienceLevel: String,
  availability: String,
  preferredMeetingFormat: String,
  specificQuestionsOrTopics: String,
  additionalInformation: String,
  status: { type: String, default: 'pending' }
}, { timestamps: true });

const MentorshipRequestSchema = mongoose.model('MentorshipRequest', MentorshipRequest);

export default MentorshipRequestSchema;
