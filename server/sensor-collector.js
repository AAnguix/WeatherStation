const axios = require('axios');
const { sensor_ips, sensor_api_url, sensor_api_port } = require('./config');
const fs = require('fs')
const moment = require('moment')

collectSensorsMeasurements()

function collectSensorsMeasurements() {
  sensor_ips.forEach(sensor_ip => {
    collectSensorMeasurement(sensor_ip, sensor_api_port, sensor_api_url)
});
}

function collectSensorMeasurement(sensorIP, sensorApiPort, sensorApiUrl) {
  url = sensorIP + ":" + sensorApiPort + sensorApiUrl

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