const axios = require('axios');
const axiosRetry = require('axios-retry');
const { sensor_ips, sensor_api_url, sensor_api_port } = require('./config');
const fs = require('fs')
const os = require("os");
const { write } = require('./influxDb');

axiosRetry(axios, { retries: 3 });

collectSensorsMeasurements()

function collectSensorsMeasurements() {
  sensor_ips.forEach(sensor_ip => {
    collectSensorMeasurement(sensor_ip, sensor_api_port, sensor_api_url)
});
}

function collectSensorMeasurement(sensorIP, sensorApiPort, sensorApiUrl) {
  url = "http://" + sensorIP + ":" + sensorApiPort + sensorApiUrl

  axios.get(url, { timeout: 5000 })
    .then(response => {
      const data = response.data
      const host = data.sensorId
      write(host, data.temperature, data.humidity, data.time)
    })
    .catch(error => {
      console.log(error);
    });
}