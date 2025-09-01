import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {type: String, unique: true ,required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    introduction: {type: String, required: true},
    projectGoal: {type: [String], required: true},
    requiredSkill: {type: [String], required: true},
    teamSize: {type: Number, required: true},
    projectdeadline: {type: String, required: true},

    members: [{
        position: { type: String },
        userId: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
        name: { type: String },
        _id:false
    }],

    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User'
    }

}, {timestamps: true})

const Project = mongoose.model('Project', projectSchema);

export default Project;