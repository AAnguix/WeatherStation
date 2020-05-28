const axios = require('axios');
const { sensor_ips, sensor_api } = require('./config');
const fs = require('fs')
const moment = require('moment')

function collectSensorsMeasurements() {
  sensor_ips.forEach(sensor_ip => {
    collectSensorMeasurement(sensor_ip, sensor_api)
});
}

function collectSensorMeasurement(sensorIP, apiUrl) {
  url = sensorIP + apiUrl

  axios.get(url)
    .then(response => {
      console.log(response.data);
      const sensorId = response.data.sensorId
      const fileName = getFileName(sensorId)
      const content = response.data.time + "|" + response.data.temperature + "|" + response.data.humidity
      createFileOrAppend(fileName, content)
    })
    .catch(error => {
      console.log(error);
    });
}

function createFileOrAppend(fileName, content) {
  try{
    if (fs.existsSync(fileName)) {
      fs.appendFile(fileName, content, function (err) {
        if (err) throw err;
      })
    } 
    else {
      fs.writeFileSync(fileName, content);
    }
  }catch (e){
      console.log("Cannot write file ", e);
  }
}

function getFileName(sensorId) {
  const today = moment().format('yyyy-mm-dd');
  return today + sensorId
}

exports.collectSensorsMeasurements = collectSensorsMeasurements 