import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "mentor"], required: true }
}, { timestamps: true });


const studentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    introduction: {type: String, required: true, },
    location: { type: String, required: true, },
    instituteName: {type: String, required: true, },
    gradYear: { type: Number, required: true, min: 1900, max: 2050 },
    joinedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    joinedSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    mentorShipRequests: { type: [{}], default: [] },
    certificates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' }],
    interestedSkills: [{ type: String, required: true, }],
    socialMedia: [{ name: { type: String, required: true, }, url: { type: String, required: true, } }],
    profileImage: { url: { type: String, default: null }, publicId: { type: String, default: null } },
}, {
    timestamps: true,
});

const mentorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    introduction: { type: String, required: true },
    location: { type: String, required: true },
    currentPosition: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    studentsGuided: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    completedSessions: { type: Number, default: 0 },
    expertise: [{ type: String, default: [] }],
    socialMedia: [{
        name: { type: String, required: true },
        url: { type: String, required: true }
    }],
    availability: { type: String },
    allReviews: [{
        name: { type: String, required: true },
        star: { type: Number, default: 0 },
        comment: { type: String, required: true }
    }],
    profileImage: {
        url: String,
        publicId: String
    },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
const Student = mongoose.model('Student', studentSchema);
const Mentor = mongoose.model('Mentor', mentorSchema);

export { Mentor, Student, User };
