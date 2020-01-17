const projectModel = require('../data/helpers/projectModel.js');

const actionModel = require('../data/helpers/actionModel.js');

function validateProject(req, res, next) {
    if(Object.entries(req.body).length === 0) {
        res.status(400).json({ message: "Missing project data" })
    } else if (!req.body.name) {
        res.status(400).json({ message: "Missing required Name field" })
    } else if (!req.body.description) {
        res.status(400).json({ message: "Missing required Description field" })
    } else {
        next();
    }
}

function validateProjectId(req, res, next) {
    const id = req.params.id;
    projectModel.get(id)
    .then(projectId => {
        if(!projectId) {
            res.status(404).json({ message: "The project with this ID does not exist." })
        } else {
            next();
        }
    })    
}

function validateAction(req, res, next) {
    if(Object.entries(req.body).length === 0) {
        res.status(400).json({ message: "Missing action data" })
    } else if (!req.body.project_id) {
        res.status(400).json({ message: "Missing required Project ID field" })
    } else if (!req.body.description) {
        res.status(400).json({ message: "Missing required Description field" })
    } else if (!req.body.notes) {
        res.status(400).json({ message: "Missing required Notes field" })
    } else {
        next();
    }
}

function validateActionId(req, res, next) {
    const id = req.params.id;
    actionModel.get(id)
    .then(actionId => {
        if(!actionId) {
            res.status(404).json({ message: "The action with this ID does not exist." })
        } else {
            next();
        }
    })
}

module.exports = { validateProject, validateProjectId, validateAction, validateActionId }