const express = require('express');

const router = express.Router();

const projectsDb = require('../data/helpers/projectModel.js');

router.get('/', (req, res) => {
    projectsDb.get(req.query)
      .then(getProject => {
          res.status(200).json(getProject);
      })
      .catch(error => {
          console.log(error);
          res.status(500).json({ message: 'Error retrieving the project' });
      })
  });

  router.get('/:id', (req, res) => {
      const id = req.params.id;

      projectsDb.get(id)
      .then(projId => {
        res.status(200).json(projId);
      })
      .catch(error => {
          console.log(error);
          res.status(500).json({ message: 'Error retrieving project by id'});
      })
  })

  router.post('/', (req, res) => {
    const { name, description, completed } = req.body;
    const newProject = { name, description, completed };

    if (!name || !description || !completed) {
        res.status(400).json({ errorMessage: "Please provide name, description, and completed for the project." });
    } else {
        projectsDb.insert(newProject)
        .then(addedProject => {
            res.json(addedProject);
            res.status(201);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error while saving the project to the database" });
        });
    }
});

module.exports = router;