'use strict';

const http = require('http');
const express = require('express');

const port = 8080;

const app = express();

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Miniponic rocking the shit out of you on port ${port}!`);
  require('./app/index');
});
