const axios = require('axios');
const { sensor_ips, sensor_api_url, sensor_api_port } = require('./config');
const fs = require('fs')
const os = require("os");


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
      const data = response.data
      const host = data.sensorId
      writeToInfluxDb(host, data.temperature, data.humidity, data.time)
    })
    .catch(error => {
      console.log(error);
    });
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