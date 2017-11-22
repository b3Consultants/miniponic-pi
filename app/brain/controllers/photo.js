'use strict';

const i2b = require('imageurl-base64');
const miniponic = require('../../../config/miniponic.json');

function takePicture() {
  return new Promise((resolve, reject) => {
    // resolve('photo');
    i2b(miniponic.PHOTO_CALL, (error, photo) => {
      console.log(error);
      console.log(photo);
      if (error) reject(error);
      resolve(photo);
    });
  });
}

module.exports = takePicture;
