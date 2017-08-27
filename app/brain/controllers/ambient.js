'use strict';

const parser = require('../../utils/parser');
const turn = require('./switcher').turn;
const mqtt = require('../../daemons/mqtt');

const cooler = 'fan';
const heater = 'heater';

/** controlls the ambient of the miniponic.
* @param {Object} data - miniponic sensor data.
*/
function control(data) {
  if (data.temperature) {
    const temperatures = parser.extractValues(data.temperature);
    mqtt.publish(cooler, turn(cooler, temperatures));
    mqtt.publish(heater, turn(heater, temperatures));
  }
}

module.exports = {
  control,
};
