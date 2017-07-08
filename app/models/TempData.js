'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('tempData', {
  controllerName: {
    type: String,
    default: '',
  },
  sensorName: {
    type: String,
    default: '',
  },
  topic: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  timestamp: {
    type: Date,
    default: '',
  },
});
