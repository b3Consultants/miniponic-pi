'use strict';

const axios = require('axios');
const miniponic = require('../../../config/miniponic.json');

function takePicture() {
  return new Promise((resolve) => {
    //resolve('photo');
    axios.get(
      miniponic.PHOTO_CALL,
      { responseType: 'arraybuffer' },
    )
    .then((response) => {
      const photo = new Buffer(response.data, 'binary').toString('base64');
      console.log(photo);
      resolve(photo);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

module.exports = takePicture;
