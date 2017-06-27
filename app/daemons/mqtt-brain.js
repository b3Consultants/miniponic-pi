'use strict';

const miniponic = require('../../config/miniponic.json');
const dataController = require('../controllers/miniponic.controller.js');
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
    client.publish(topic, 'testing');
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
      winston.error = 'error';
      winston.log('error', error);
    });
    dataController.dropTable()
    .catch((error) => {
      winston.error = 'error';
      winston.log('error', error);
    });
    dataAsker();
  })
  .catch((error) => {
    winston.error = 'error';
    winston.log('error', error);
  });
}

// Data Message Handler
function messageHandler() {
  console.log('Handling Messages');
  client.on('message', (topic, message) => {
    const id = message.toString().split('-')[0];
    const value = message.toString().split('-')[1];
    dataController.addTempData(topic, id, value)
    .then(() => {
      console.log('Data Addded Correctly');
    })
    .catch((error) => {
      winston.error = 'error';
      winston.log('error', error);
    });
  });
}

// Run Functions
function run() {
  dataAsker();
  messageHandler();
  setInterval(dataUploader, 1000);
}

setTimeout(run, 5000);
