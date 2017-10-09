'use strict';

/**
 * MQTT.
 * @module MQTT
 */

const mqtt = require('mqtt');
const mqttConfig = require('../../config/mqtt.json');
const tempdata = require('../queries/temp_data');
const parse = require('../utils/parser').parse;

const client = mqtt.connect({ host: mqttConfig.HOST });

/** Connects and subscribes to the miniponic sensors
*/
function connect() {
  client.on('connect', () => {
    console.log('Mqtt server is ready...');
    client.subscribe(mqttConfig.TOPICS_RESPONSE);
  });
}

/** Requests for sensors data
*/
function requestData() {
  for (let i = 0; i < mqttConfig.TOPICS.length; i++) {
    const topic = mqttConfig.TOPICS[i];
    client.publish(topic, 'data');
  }
}

/** Handle sensors responses saving them into the storage.
*/
function handleMessages() {
  client.on('message', (topic, incomingMessage) => {
    const rawMessage = incomingMessage.toString();
    const message = parse(rawMessage, topic);
    tempdata.add(message);
    console.log(tempdata.get());
  });
}

/** Runs the server.
*/
function run() {
  requestData();
  handleMessages();
}

/** ask for more data
*/
function ask() {
  requestData();
}

/** Publish a message.
* @param {String} topic - topic to publish.
* @param {String} message - message to send.
*/
function publish(topic, message) {
  client.publish(topic, message);
}

module.exports = {
  run,
  ask,
  connect,
  publish,
};
