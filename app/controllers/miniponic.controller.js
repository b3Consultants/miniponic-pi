'use strict';

const TempData = require('../models/TempData');

module.exports = {
  addTempData(topic, controllerName, sensorName, value) {
    return new Promise(
        (resolve, reject) => {
          TempData.create({
            controllerName,
            sensorName,
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
          TempData.find({}, (error, tempdatas) => {
            if (error) reject(error);
            if (tempdatas.length !== 0) {
              const datas = [];
              for (let i = 0; i < tempdatas.length; i++) {
                const tempdata = tempdatas[i];
                const data = {
                  controllerName: tempdata.controllerName,
                  sensorName: tempdata.sensorName,
                  topic: tempdata.topic.split('-')[0],
                  value: tempdata.value,
                };
                datas.push(data);
              }
              resolve(datas);
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
