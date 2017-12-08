'use strict';

/**
 * Ambient Controller.
 * @module Ambient
 */

const turn = require('./switcher').turn;
const serialport = require('../../daemons/serialPort');

const cooler = 'fan';
const heater = 'heater';

/** controlls the ambient of the miniponic.
* @param {Object} data - miniponic sensor data.
*/
function control(data) {
  if (data) {
    const temperatures = data.temperature;
    serialport.publish(`${cooler}-${turn(cooler, temperatures)}`);
    serialport.publish(`${heater}-${turn(heater, temperatures)}`);
  }
}

module.exports = {
  control,
};
