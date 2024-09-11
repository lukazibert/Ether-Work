const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: false },
    shortDescription: { type: String, required: false },
    description: { type: String, required: false },
    skills: { type: Array, required: false },
    imageUrl: { type: String, required: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
