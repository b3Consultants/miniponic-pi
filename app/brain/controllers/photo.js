'use strict';

const i2b = require('imageurl-base64');
const miniponic = require('../../../config/miniponic.json');
const axios = require('axios');

const url = `${miniponic.SERVER}/data/savePhoto/${miniponic.MINIPONIC_ID}`;

function takePicture() {
  return new Promise((resolve, reject) => {
    i2b(miniponic.PHOTO_CALL, (error, photo) => {
      if (error) reject(error);

      axios.post(url, { photo: photo.base64 })
        .catch((err) => {
          console.log(err.response.statusText);
        });
    });
  });
}

module.exports = takePicture;
