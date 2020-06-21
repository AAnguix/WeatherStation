const { database, database_host } = require('./config');
const Influx = require('influx');

export const influx = new Influx.InfluxDB({
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