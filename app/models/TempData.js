'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('tempData', {
  id: {
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
