const express = require('express')
const app = express()
const { port } = require('./config');
const { readSensor } = require('./sensor');
const moment = require('moment')

app.get('/metrics', (req, res) => {
        const localTime = moment().format()
  
        readSensor().then(function(data) {
            const sensorData = data.toString()
            const values = sensorData.split("|")
            const result = {
                "temperature": values[0].replace("\r","").replace("\n", ""),
                "humidity": values[1].replace("\r","").replace("\n", ""),
                "error": false,
                "time": localTime,
            }
            res.send(result)
        }).catch(function(error) {
            const result = {
                "temperature": 0,
                "humidity": 0,
                "error": true,
                "time": localTime,
            }
            res.send(result)
        });
    }
)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))