const { database, database_host } = require('./config');

const Influx = require('influx');
const express = require('express')
const http = require('http')
const os = require('os')

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