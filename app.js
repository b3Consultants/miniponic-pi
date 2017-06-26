'use strict';

const http = require('http');
const express = require('express');
const metrics = require('express-node-metrics');
const mongoose = require('mongoose');
const database = require('./config/database'); // load the database config
const morgan = require('morgan');
const Miniponic = require('./app/index');

const port = 8080;

const app = express();

mongoose.connect(database.localUrl);
app.use(metrics.middleware);
app.use(morgan('dev'));
app.use(metrics.middleware);

app.get('/metrics', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(metrics.metrics.getAll(req.query.reset));
});

const server = http.createServer(app);

app.use('/', Miniponic);

server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Miniponic rocking the shit out of you on port ${port}!`);
});
