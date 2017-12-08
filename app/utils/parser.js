'use strict';

// Parse incoming messages with:
// [
//   temperature1,
//   temperature2,
//   humidity1,
//   humidity2,
//   luminosity,
//   fan,
//   heater,
//   weight,
//   moisture1,
//   moisture2
// ]

/**
 * Parser.
 * @module Parser
 */

/** Parse the incoming data into a data Object
* @param {String} message - incoming data message.
* @param {String} topic - message topic.
* @return {Object} with clientId, sensorName, value and topic as keys
*/
function parse(message) {
  const array = message.split(';');
  return {
    temperature: [parseFloat(array[0], 10), parseFloat(array[1], 10)],
    humidity: [parseFloat(array[2], 10), parseFloat(array[3], 10)],
    luminosity: [parseFloat(array[4], 10)],
  };
}

module.exports = {
  parse,
};
