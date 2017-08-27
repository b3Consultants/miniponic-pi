'use strict';

const parameters = require('../../../config/parameters.json');

/** Resolves the on or off of a device calculating the average value of the sensors
* and comparing to given parameters.
* @param {String} device - device to turn on or off.
* @param {Array} values - sensors values.
* @return {String} command of what to do.
*/
function turn(device, values) {
  const sum = values.reduce((previous, current) => current += previous);
  const avg = sum / values.length;
  if (avg >= parameters[device].on) {
    return 'on';
  }
  if (avg <= parameters[device].off) {
    return 'off';
  }
  return 'nothing';
}

module.exports = {
  turn,
};
