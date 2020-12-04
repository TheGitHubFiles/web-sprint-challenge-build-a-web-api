const express = require('express');

const server = express();
const helmet = require('helmet');
const projectRouter = require('./projects/projects-router.js');
const actionsRouter = require('./actions/actions-router.js');
const cors = require('cors')

// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use(cors())
server.use(helmet())
server.use(express.json());
server.use("/api/projects", projectRouter)
server.use("/api/actions", actionsRouter)



module.exports = server;
