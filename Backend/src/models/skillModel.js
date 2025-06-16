import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true }, 
    description: { type: String, required: true },
    duration: { type: String, required: true },
    enrollStudents: {type: Number, default:0},
    auther: { type:String, required: true},
    image: { type: String, required: true }, // For production take String but then take actual image and video
    video: { type: String, required: true },
    introduction: { type: String, required: true },
    highlights: { type: [String], required: true },
    KnowledgeRequirement: { type: [String], required: true }
    
}, {timestamps: true})

const SkillModel = mongoose.model('Skill', skillSchema);

export default SkillModel;