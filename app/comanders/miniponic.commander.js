'use strict';

const miniponic = require('../../config/miniponic.json');

global.fanCounterON = 0;
global.fanCounterOFF = 0;
global.heaterCounterON = 0;
global.heaterCounterOFF = 0;

module.exports = {
  temperatureController(sensorName, value, client) {
    if (sensorName.split('-').length === 1) {
      if (value > miniponic.PARAMETERS.temperature_for_fan_on) {
        global.fanCounterON += 1;
        if (global.fanCounterON === miniponic.NETWORK.temperature) {
          global.fanCounterON = 0;
          console.log('fan on');
          client.publish('fan', 'on');
        }
      } else if (value > miniponic.PARAMETERS.temperature_for_heater_off &&
        value < miniponic.PARAMETERS.temperature_for_fan_off) {
        global.fanCounterOFF += 1;
        if (global.fanCounterOFF === miniponic.NETWORK.temperature) {
          global.fanCounterOFF = 0;
          console.log('fan off');
          client.publish('fan', 'off');
          console.log('heater off');
          client.publish('heater', 'off')
        }
      } else if (value < miniponic.PARAMETERS.temperature_for_heater_on) {
        global.heaterCounterON += 1;
        if (global.heaterCounterON === miniponic.NETWORK.temperature) {
          global.heaterCounterON = 0;
          console.log('heater on');
          client.publish('heater', 'on');
        }
      }
    }
  },
  getTempData() {
  },
  dropTable() {
  },
  updateData() {
  },
};
