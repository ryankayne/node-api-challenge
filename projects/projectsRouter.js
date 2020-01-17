const express = require('express');

const router = express.Router();

const projectsDb = require('../data/helpers/projectModel.js');

const middleware = require('../middleware/middleware.js');

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

  router.get('/:id', middleware.validateProjectId, (req, res) => {
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

router.delete('/:id', (req, res) => {
    projectsDb.remove(req.params.id)
      .then(count => {
          if (count > 0) {
              res.status(200).json({ message: "The project has been deleted." });
          } else {
              res.status(404).json({ message: "The project with the specified ID does not exist." });
          }
      })
      .catch(error => {
          console.log(error);
          res.status(500).json({ error: "The project could not be removed." })
      });
  });

  router.put('/:id', middleware.validateProject, (req, res) => {
    const changes = req.body;
    const id = req.params.id;
  
    projectsDb.update(id, changes)
    .then(editProject => {
      if (editProject) {
        res.status(200).json(editProject);
      } else {
        res.status(404).json({ message: "The project with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The project information could not be modified." });
    });
  });



module.exports = router;