'use strict';

const storage = global.storage;

/** Adds a new data into the storage.
* @param {Object} data - miniponic data.
*/
function add(data) {
  storage.set(data);
}

/** Returns all the data in the storage.
* @return {Array} array of miniponic data.
*/
function get() {
  return storage.get();
}


/** Clears the storage.
*/
function clear() {
  storage.clear();
}

module.exports = {
  add,
  get,
  clear,
};
