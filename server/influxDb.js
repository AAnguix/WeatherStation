const { influx } = require('./influxClient');

function write(host, temperature, humidity, time) {
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

  exports.write = write