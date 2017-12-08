'use strict';

/**
 * Comunications.
 * @module Comunications
 */

const axios = require('axios');
const miniponic = require('../../config/miniponic.json');

/** Uploads miniponic data into the remote database.
* @param {Object} data - miniponic data.
*/
function upload(data) {
  const toDatabase = {
    id: miniponic.MINIPONIC_ID,
    data,
    timestamp: new Date(),
  };
  if (toDatabase.data) {
    const url = `${miniponic.SERVER}/data/savData/${miniponic.MINIPONIC_ID}`;
    axios.post(url, toDatabase)
    .then(() => {
      console.log('Success!');
    })
    .catch((error) => {
      console.log(error.response.status, error.response.statusText);
    });
  }
}

module.exports = {
  upload,
};
