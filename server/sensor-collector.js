const axios = require('axios');
const { sensor_ips, sensor_api_url, sensor_api_port } = require('./config');
const fs = require('fs')
const os = require("os");
const { today } = require("./dateUtils");

collectSensorsMeasurements()

function collectSensorsMeasurements() {
  sensor_ips.forEach(sensor_ip => {
    collectSensorMeasurement(sensor_ip, sensor_api_port, sensor_api_url)
});
}

function collectSensorMeasurement(sensorIP, sensorApiPort, sensorApiUrl) {
  url = "http://" + sensorIP + ":" + sensorApiPort + sensorApiUrl

  axios.get(url)
    .then(response => {
      const sensorId = response.data.sensorId
      const fileName = getFileName(sensorId)
      const content = createContent(response)
      createFileOrAppend(fileName, content)
    })
    .catch(error => {
      console.log(error);
    });
}

function createContent(response) {
  return response.data.time + "|" + response.data.temperature + "|" + response.data.humidity + os.EOL
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
  return today() + "_" + sensorId
}