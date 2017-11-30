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
  if (Object.keys(toDatabase.data).length !== 0) {
    const url = `${miniponic.SERVER}/data/saveData/${miniponic.MINIPONIC_ID}`;
    axios.post(url, toDatabase)
    .then(() => {
      console.log('Success!');
    })
    .catch((error) => {
      console.log(error.statusMessage);
    });
  }
}

module.exports = {
  upload,
};
