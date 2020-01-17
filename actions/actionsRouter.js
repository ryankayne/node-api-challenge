const express = require('express');

const router = express.Router();

const actionsDb = require('../data/helpers/actionModel.js');

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

  router.get('/:id', (req, res) => {
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

router.post('/:id', (req, res) => {
    const {  description, notes, completed } = req.body;
    const newAction = { description, notes, completed };

    if (!description || !notes || !completed) {
        res.status(400).json({ errorMessage: "Please provide description, notes, completed for the action." });
    } else {
        actionsDb.insert(newAction)
        .then(addedAction => {
            res.status(201).json(addedAction);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error while saving the action to the database" });
        });
    }
});

module.exports = router;