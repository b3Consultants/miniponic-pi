'use strict';

class Storage {
  /** Class constructor.
  */
  constructor() {
    this.store = [];
  }

  /** Clears the storage.
  */
  clear() {
    this.store = [];
  }

  /** Returns all the data in the storage.
  * @return {Array} array of miniponic data.
  */
  get() {
    return this.store;
  }

  /** Adds a new data into the storage.
  * @param {Object} data - miniponic data.
  */
  set(value) {
    this.store.push(value);
  }

}

module.exports = {
  storage: Storage,
};
