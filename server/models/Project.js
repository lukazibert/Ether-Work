const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    status: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    developerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
    price: { type: Number, required: true },
    deliveryDate: { type: Date, required: true },
    jobId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { 
        type: String, 
        required: true, 
        enum: ['Requested', 'Request Approved', 'Request Rejected', 'Work Submitted', 'Work Approved', 'Work Rejected', 'Completed']  // Enum for allowed status values
    },
    repo: { type: String }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;


