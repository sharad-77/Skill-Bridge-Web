import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "mentor"], required: true }
}, { timestamps: true });

const studentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    introduction: { type: String, required: true },
    location: { type: String, required: true },
    instituteName: { type: String, required: true },
    gradYear: { type: Number, required: true },
    joinedProjects: { type: [String], default: [] },
    joinedSkills: { type: [String], default: [] },
    mentorShipRequests: { type: [{}], default: {} },
    certificates: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' }], default: [] },
    interestedSkills: { type: [String], required: true },
    socialMedia: [{
        name: { type: String, required: true },
        url: { type: String, required: true }
    }]

})

const mentorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    introduction: { type: String, required: true },
    location: { type: String, required: true },
    currentPosition: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    studentsGuided: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    completedSessions: { type: Number, default: 0 },
    mentorShipRequests: { type: [{}], default: {} },
    expertise: { type: [String], required: true },
    socialMedia: [{
        name: { type: String, required: true },
        url: { type: String, required: true }
    }],
    availability: { type: String, required: true }
})

const User = mongoose.model('User', userSchema);
const Student = mongoose.model('Student', studentSchema);
const Mentor = mongoose.model('Mentor', mentorSchema);

export { Mentor, Student, User };
