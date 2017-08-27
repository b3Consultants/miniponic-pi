'use strict';

// Parse incoming messages with "clientId":"sensorName":"data"

/**
 * Parser.
 * @module Parser
 */

/** Parse the incoming data into a data Object
* @param {String} message - incoming data message.
* @param {String} topic - message topic.
* @return {Object} with clientId, sensorName, value and topic as keys
*/
function parse(message, topic) {
  const messageArray = message.split(':');
  return {
    clientId: messageArray[0],
    sensorName: messageArray[1],
    value: messageArray[2],
    topic: topic.split('-')[0],
  };
}

/** Cleans the storage data array into an object of topics and its corresponding values.
* @param {Array} array - array of miniponic data.
* @return {Object} miniponic organized data.
*/
function clean(array) {
  const cleanedData = {};
  for (let i = 0; i < array.length; i++) {
    const data = array[i];
    const topic = data.topic;
    if (!cleanedData[topic]) {
      cleanedData[topic] = [data];
    } else {
      cleanedData[topic].push(data);
    }
  }
  return cleanedData;
}

/** Extracts only the values for a certain topic.
* @param {Array} array - array of miniponic data.
* @return {Array} of topic values.
*/
function extractValues(array) {
  const values = [];
  for (let i = 0; i < array.length; i++) {
    values.push(array[i].value);
  }
  return values;
}

module.exports = {
  parse,
  clean,
  extractValues,
};
