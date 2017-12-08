'use strict';

/**
 * SERIAL PORT.
 * @module SERIAL_PORT
 */

const SerialPort = require('serialport');
const serialConfig = require('../../config/serial.json');
const tempdata = require('../queries/temp_data');
const parse = require('../utils/parser').parse;

const port = new SerialPort(serialConfig.PORT, { baudRate: serialConfig.BAUDRATE, autoOpen: false  })
const Readline = SerialPort.parsers.Readline
let parser = null;
/** Connects and subscribes to the miniponic sensors
*/
function connect() {
  console.log('Conecting to arduino...')
  port.open();
  parser = new Readline();
  port.pipe(parser);
  port.on('open', function () {
    console.log('Arduino connected successfully');
  })
}

/** Requests for sensors data
*/
function requestData() {
  port.write('status');
}

/** Handle sensors responses saving them into the storage.
*/
function handleMessages() {
  parser.on('data', function (data) {
    const rawMessage = data;
    const message = parse(rawMessage);
    console.log(message)
    tempdata.add(message);
  })
}

/** Publish a message.
* @param {String} message - message to send.
*/
function publish(message) {
  port.write(Buffer.from(message));
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

module.exports = {
  run,
  ask,
  connect,
  publish,
};

