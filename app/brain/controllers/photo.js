'use strict';

const axios = require('axios');
const miniponic = require('../../../config/miniponic.json');

function takePicture() {
  return new Promise((resolve) => {
    //resolve('photo');
    axios.get(
      miniponic.PHOTO_CALL,
      { responseType: 'arraybuffer', timeout: 60000, maxContentLength: 20000000 },
    )
    .then((response) => {
      //const photo = new Buffer(response.data, 'binary').toString('base64');
      const photo = response.data
      resolve(photo);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

module.exports = takePicture;
