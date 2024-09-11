const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User')
const web3 = require('web3');

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get project with developer and client details
router.get('/:id', getProject, async (req, res) => {


    console.log('id', req.params.id);
    

    try {
        // Get developer and client from project
        const developer = await User.findById(res.project.developerId);

        console.log('developer', developer);    

        const client = await User.findById(res.project.clientId);

        console.log('client', client);
        

        // If either developer or client is not found
        if (!developer || !client) {
            return res.status(404).json({ message: 'Developer or Client not found' });
        }

        // Return project with developer and client details
        res.json({
            project: res.project,
            developer: developer,
            client: client
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a project
router.post('/', async (req, res) => {
    console.log(req.body);
    

    const project = new Project(req.body);

    console.log('project:', project);
    

    project.status = 'Requested';
    project.jobId = web3.utils.sha3(project._id.toString());


    console.log('project.jobId:', project.jobId);
    

    await project.save();

    console.log('Project created:', project);

    try {
        res.json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// update job id
router.patch('/jobId/:id', getProject, async (req, res) => {

    console.log('req.body:', req.body);

    console.log('res.project:', res.project);

    console.log('res.project.jobId:', res.project.jobId);
    
    
    

    if (req.body.jobId != null) {
        res.project.jobId = req.body.jobId;
    }
    try {
        const updatedProject = await res.project.save();
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Update a project
router.patch('/:id', getProject, async (req, res) => {
    if (req.body.name != null) {
        res.project.name = req.body.name;
    }
    if (req.body.description != null) {
        res.project.description = req.body.description;
    }
    if (req.body.shortDescription != null) {
        res.project.shortDescription = req.body.shortDescription;
    }
    if (req.body.developerId != null) {
        res.project.developerId = req.body.developerId;
    }
    if (req.body.clientId != null) {
        res.project.clientId = req.body.clientId;
    }
    if (req.body.price != null) {
        res.project.price = req.body.price;
    }
    if (req.body.deliveryDate != null) {
        res.project.deliveryDate = req.body.deliveryDate;
    }

    if (req.body.status != null) {
        res.project.status = req.body.status;
    }

    if (req.body.repo != null) {
        res.project.repo = req.body.repo;
    }

    try {
        const updatedProject = await res.project.save();
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a project
router.delete('/:id', getProject, async (req, res) => {
    try {
        await res.project.remove();
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all projects by developer ID
router.get('/developer/:developerId', getProjectsByDeveloperId, (req, res) => {
    res.json(res.projects);
});

// Get all projects by client ID
router.get('/client/:clientId', getProjectsByClientId, (req, res) => {
    res.json(res.projects);
});

// Get all projects by developer ID and client ID
router.get('/user/:userId', async (req, res) => {
    try {
        const projects = await Project.find({ $or: [{ developerId: req.params.userId }, { clientId: req.params.userId }] });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a project by ID
async function getProject(req, res, next) {

    console.log('req.params.id:', req.params.id);

    console.log('req.params:', req.params);


    try {
        const project = await Project.findById(req.params.id);

        console.log('project:', project);

        if (project == null) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.project = project;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Middleware function to get all projects by developer ID
async function getProjectsByDeveloperId(req, res, next) {
    try {
        const projects = await Project.find({ developerId: req.params.developerId });
        if (projects == null) {
            return res.status(404).json({ message: 'Projects not found' });
        }
        res.projects = projects;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Middleware function to get all projects by client ID
async function getProjectsByClientId(req, res, next) {
    try {
        const projects = await Project.find({ clientId: req.params.clientId });
        if (projects == null) {
            return res.status(404).json({ message: 'Projects not found' });
        }
        res.projects = projects;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;