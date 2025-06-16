import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'mentor'], required: true },
    joinedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    joinedSkill: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],

    roleDetails: { type: Object, required: true, default:{} },

}, { timestamps: true })

const User = mongoose.model('User', userSchema);

export default User; 

/* add this input option 
-detail introduction about student

and add this filed in rolo object
-current position for student
-current location for student
-gradutin year for student and

-for mentor how many years of experince he has

*/