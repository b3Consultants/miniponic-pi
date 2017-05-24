'use strict';

const app = require('./app/index').app;
const server = require('./app/index').server;
const Miniponic = require('./app/routes/index');

const port = 8080;

app.use('/', Miniponic);

server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Miniponic rocking the shit out of you on port ${port}!`);
});
