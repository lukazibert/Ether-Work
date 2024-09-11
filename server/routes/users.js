const express = require('express');
const User = require('../models/User'); // Ensure this is the correct path to your User model

const router = express.Router();

// GET /users/project-request/:id
router.get('/project-request/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        // Retrieve user data based on the userId from MongoDB
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user data as a response
        res.json({
            id: user._id,
            name: user.name,
            imageUrl: user.imageUrl || 'https://placehold.co/600x400', // Provide a default image if not available
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the user data' });
    }
});

// GET /users/profile/:id
router.get('/profile/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        // Retrieve user data based on the userId from MongoDB
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user data as a response
        res.json({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            imageUrl: user.imageUrl || 'https://placehold.co/600x400',
            shortDescription: user.shortDescription,
            description: user.description,
            role: user.role,
            skills: user.skills,
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the user data' });
    }
});

// POST /users/create
router.post('/create', async (req, res) => {
    const { name, email, password, isDeveloper } = req.body;

    try {
        // Create a new user instance
        const user = new User({
            name,
            email,
            password,
            role: isDeveloper ? 'developer' : 'client',
        });

        // Save the user data to MongoDB
        await user.save();

        // Return the user data as a response
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
});

// PUT /users/update/:id
router.put('/update/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, email, name, skills, imageUrl, description, shortDescription } = req.body;

    try {
        // Update the user data based on the userId in MongoDB
        const user = await User.findByIdAndUpdate(
            userId,
            { name, email, name, skills, imageUrl, description, shortDescription },
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the updated user data as a response
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            imageUrl: user.imageUrl || 'https://placehold.co/600x400',
            shortDescription: user.shortDescription,
            description: user.description,
            skills: user.skills,
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the user data' });
    }
});

// GET /users (Search users by query parameter)
router.get('/', async (req, res) => {
    const searchQuery = req.query.search;

    let users;

    try {
        if (!searchQuery || searchQuery.trim() === '') {
            // Return all developers if no search query is provided
            users = await User.find({ role: 'developer' });
        } else {
            // Perform a case-insensitive search using regex on 'name' and 'username' and only return developers
            users = await User.find({
                role: 'developer', // Ensure that only users with the role of developer are returned
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search on name
                    { username: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search on username
                ],
            });
        }

        // If no users are found, return an empty array instead of 404
        return res.json(users.map(user => ({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            description: user.description,
            shortDescription: user.shortDescription,
            skills: user.skills,
            imageUrl: user.imageUrl || 'https://placehold.co/600x400',
        })));

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while searching for developers' });
    }
});




module.exports = router;
