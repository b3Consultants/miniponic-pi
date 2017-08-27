'use strict';

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
  console.log(toDatabase);
  const url = `${miniponic.SERVER}/data/saveData/${miniponic.MINIPONIC_ID}`;
  console.log('Sending data...');
  axios.post(url, toDatabase)
  .catch((error) => {
    console.log(error);
  });
}

module.exports = {
  upload,
};
