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
    const { title, contents } = req.body;
    const newPost = { title, contents };

    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        projectsDb.insert(newPost)
        .then(addedPost => {
            res.json(addedPost);
            res.status(201);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        });
    }
});

module.exports = router;