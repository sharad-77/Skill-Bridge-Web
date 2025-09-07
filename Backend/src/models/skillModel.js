import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    enrollCount: { type: Number, default: 0 },
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    author: { type: String, required: false, default: 'Unknown Author' },
    image: { type: String },
    video: { type: String },
    introduction: { type: String, required: true },
    highlights: { type: [String], required: true },
    knowledgeRequirement: { type: [String], required: true },
    rating: { type: Number, default: 0 },
    allReviews: {
        type: [{
            name: { type: String },
            star: { type: Number, default: 0 },
            comment: { type: String },
        }], default: []
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId }
}, { timestamps: true });

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
