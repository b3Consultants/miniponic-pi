'use strict';

const TempData = require('../models/TempData');

module.exports = {
  addTempData(topic, id, value) {
    return new Promise(
        (resolve, reject) => {
          TempData.create({
            id,
            topic,
            value,
            timestamp: new Date(),
          }, (error) => {
            if (error) reject(error);
            resolve();
          });
        });
  },
  getTempData() {
    return new Promise(
        (resolve, reject) => {
          const data = {};
          TempData.find({}, (error, tempdatas) => {
            if (error) reject(error);
            if (tempdatas.length !== 0) {
              const time = new Date();
              const lastUploadTime = tempdatas[tempdatas.length - 1].timestamp;
              if (time - lastUploadTime > 2000) {
                for (let i = 0; i < tempdatas.length; i++) {
                  const tempdata = tempdatas[i];
                  const sensor = {};
                  sensor[tempdata.id] = tempdata.value;
                  if (!(tempdata.topic in data)) {
                    data[tempdata.topic] = [sensor];
                  } else {
                    data[tempdata.topic].push(sensor);
                  }
                }
                resolve(data);
              }
            }
          });
        });
  },
  dropTable() {
    return new Promise(
        (resolve, reject) => {
          TempData.remove({}, (error) => {
            if (error) reject(error);
          });
        });
  },
  updateData() {
    return 'Hola';
  },
};
