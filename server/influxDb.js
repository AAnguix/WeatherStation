const { database, database_host } = require('./config');
const Influx = require('influx');

const influx = new Influx.InfluxDB({
    host: database_host,
    database: database,
    schema: [
      {
        measurement: 'temperature',
        fields: {
          value: Influx.FieldType.FLOAT,
          time: Influx.FieldType.STRING
        },
        tags: [
          'host'
        ]
      },
      {
        measurement: 'humidity',
        fields: {
          value: Influx.FieldType.FLOAT,
          time: Influx.FieldType.STRING
        },
        tags: [
          'host'
        ]
      }
    ]
  })

function databaseNames() {
  return influx.getDatabaseNames()
}

function metrics(){
  return influx.query(`select * from ${database}`)
}

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
  exports.databaseNames = databaseNames