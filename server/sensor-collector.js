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
      const host = response.data.sensorId
      writeToInfluxDb(host, response.data.temperature, response.data.humidity, response.data.time)
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

function writeToInfluxDb(host, temperature, humidity, time) {
  const temperaturePoint = {
    measurement: 'temperature',
    tags: { host: host },
    fields: { value: temperature, time: time },
  }
  const humidityPoint = {
    measurement: 'humidity',
    tags: { host: host },
    fields: { value: humidity, time: time },
  }

  influx.writePoints([
    temperaturePoint,
    humidityPoint
  ]).catch(err => {
    console.error(`Error saving data to InfluxDB! ${err.stack}`)
  })
}


function getFileName(sensorId) {
  return today() + "_" + sensorId
}