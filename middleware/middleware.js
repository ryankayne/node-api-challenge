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

module.exports = { validateProject }