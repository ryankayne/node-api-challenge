const express = require('express');

const server = express();

server.use(express.json());

const projectsRouter = require('./projects/projectsRouter.js');

const actionsRouter = require('./actions/actionsRouter.js');

server.get('/', (req, res) => {
    res.send(`<h2>Sprint Project</h2>`);
  });

  server.use('/projects', projectsRouter);

  server.use('/actions', actionsRouter);

  module.exports = server;