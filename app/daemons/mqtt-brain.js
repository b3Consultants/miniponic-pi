'use strict';

const miniponic = require('../../config/miniponic.json');
const dataController = require('../controllers/miniponic.controller.js');
const dataCommander = require('../comanders/miniponic.commander.js');
const winston = require('winston');
const mqttConfig = require('../../config/mqtt.json');
const mqtt = require('mqtt');
const axios = require('axios');

winston.add(winston.transports.File, { filename: 'error.log' });
const client = mqtt.connect({ host: mqttConfig.HOST });

// Conection to mqtt network
client.on('connect', () => {
  client.subscribe(mqttConfig.TOPICS_RESPONSE);
});

function dataAsker() {
  for (let i = 0; i < mqttConfig.TOPICS.length; i++) {
    const topic = mqttConfig.TOPICS[i];
    // console.log(`publishing to topic: ${topic}`);
    client.publish(topic, 'data');
  }
}

function dataUploader() {
  dataController.getTempData()
  .then((data) => {
    const toDatabase = {
      id: miniponic.MINIPONIC_ID,
      data,
      timestamp: new Date(),
    };
    // request to database
    const url = `${miniponic.SERVER}/data/saveData/${miniponic.MINIPONIC_ID}`;
    console.log('Sending data...');
    axios.post(url, toDatabase)
    .then(() => {
      console.log('done!');
    })
    .catch((error) => {
      console.log(error);
      winston.error = 'error';
      winston.log('error', error);
    });
    dataController.dropTable()
    .catch((error) => {
      console.log('error');
      winston.error = 'error';
      winston.log('error', error);
    });
  })
  .catch((error) => {
    winston.error = 'error';
    winston.log('error', error);
  });
  dataAsker();
}

// Data Message Handler
function messageHandler() {
  console.log('Handling Messages');
  client.on('message', (topic, message) => {
    console.log(message.toString());
    if (message.toString() === 'alive') {
      console.log('All sensors are alive');
    } else {
      const controllerName = message.toString().split(':')[0];
      const sensorName = message.toString().split(':')[1];
      const value = message.toString().split(':')[2];
      dataController.addTempData(topic, controllerName, sensorName, value)
      .catch((error) => {
        winston.error = 'error';
        winston.log('error', error);
      });
      //  ----------------------- LOGIC --------------------------
      if (topic.split('-')[0] === 'temperature') {
        dataCommander.temperatureController(sensorName, value, client);
      }
      // ---------------------------------------------------------
    }
  });
}

// Run Functions
function run() {
  dataAsker();
  messageHandler();
  setInterval(dataUploader, 5000);
}

setTimeout(run, 1000);
