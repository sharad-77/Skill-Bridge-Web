import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    enrollStudents: { type: Number, default: 0 },
    enrolledStudentsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // <-- NEW
    auther: { type: String, required: true },
    image: { type: String},
    video: { type: String },
    introduction: { type: String, required: true },
    highlights: { type: [String], required: true },
    knowledgeRequirement: { type: [String], required: true },
    allReviews: {
        type: [{
            name: { type: String },
            star: { type: Number, default: 0 },
            comment: { type: String },
        }], default: []
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId }
}, { timestamps: true });

const SkillModel = mongoose.model('Skill', skillSchema);
export default SkillModel;
