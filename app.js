'use strict';

const Storage = require('./app/utils/storage').storage;
const http = require('http');
const express = require('express');

global.storage = new Storage();

const port = 8080;

const app = express();

global.storage = new Storage();

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Miniponic rocking the shit out of you on port ${port}!`);
  require('./app/index');
});
