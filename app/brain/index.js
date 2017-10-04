'use strict';

/**
 * Brain.
 * @module Brain
 */

const mqtt = require('../daemons/mqtt');
const tempData = require('../queries/temp_data');
const ambient = require('./controllers/ambient');
const parser = require('../utils/parser');
const upload = require('../utils/comunications').upload;
const miniponic = require('../../config/miniponic.json');
const takePicture = require('./controllers/photo');

/** Saves the data in the remote database.
* @param {Object} data - miniponic sensor data.
*/
function save(data) {
  upload(data);
  tempData.clear();
}

function think(data) {
  // Thinking Part Logic goes here
  ambient.control(data);
  // End of thinking part
  save(data);
  mqtt.ask();
}

/** Process, think, commands miniponic data. This function is in charge of
* controlling the miniponic sensors and devices.
*/
function process() {
  const data = parser.clean(tempData.get());
  takePicture()
    .then((photo) => {
      data.photo = photo;
      think(data);
    })
    .catch((error) => {
      console.log(error);
      think(data);
    });
}

/** Starts the brain, connecting the mqtt server amd running it. Then Starts
* a heartbeat asking for processing and asking for more data.
*/
function start() {
  mqtt.connect();
  mqtt.run();
  setInterval(process, miniponic.SENDINGTIME);
}

module.exports = {
  start,
};
