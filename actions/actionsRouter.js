const express = require('express');

const router = express.Router();

const actionsDb = require('../data/helpers/actionModel.js');

const middleware = require('../middleware/middleware.js');

router.get('/', (req, res) => {
    actionsDb.get(req.query)
      .then(getAction => {
          res.status(200).json(getAction);
      })
      .catch(error => {
          console.log(error);
          res.status(500).json({ message: 'Error retrieving the action'
          })
      })
  });

  router.get('/:id', middleware.validateActionId, (req, res) => {
    const id = req.params.id;

    actionsDb.get(id)
    .then(actionId => {
      res.status(200).json(actionId);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving action by id'});
    })
})

router.post('/', middleware.validateActionId, middleware.validateAction, (req, res) => {
    // const { project_id, description, notes, completed } = req.body;
    // const newAction = { project_id, description, notes, completed };

    // if (!project_id || !description || !notes || !completed ) {
    //     res.status(400).json({ errorMessage: "Please provide description, notes, completed for the action." });
    // } else {
        actionsDb.insert(req.body)
        .then(addedAction => {
            res.status(201).json(addedAction);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error while saving the action to the database." });
        });
    }
);

router.delete('/:id', (req, res) => {
    actionsDb.remove(req.params.id)
      .then(count => {
          if (count > 0) {
              res.status(200).json({ message: "The action has been deleted." });
          } else {
              res.status(404).json({ message: "The action with the specified ID does not exist." });
          }
      })
      .catch(error => {
          console.log(error);
          res.status(500).json({ error: "The action could not be removed." })
      });
  });

module.exports = router;