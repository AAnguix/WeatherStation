const express = require('express')
const moment = require('moment')
const router = express.Router({});
const { sensorId } = require('./../config');
const { pythonScript } = require('./../python-script');

router.get('/', async (req, res, _next) => {
	const localTime = moment().format()
  
    readSensor().then(function(data) {
        const sensorData = data.toString()
        const values = sensorData.split("|")
        const result = {
            "sensorId": sensorId,
            "temperature": values[0].replace("\r","").replace("\n", ""),
            "humidity": values[1].replace("\r","").replace("\n", ""),
            "error": false,
            "time": localTime,
        }
        res.send(result)
    }).catch(function(error) {
        const result = {
            "sensorId": sensorId,
            "temperature": 0,
            "humidity": 0,
            "error": true,
            "time": localTime,
        }
        res.send(result)
    })
})

function readSensor() {
    return pythonScript('./read-sensor.py')
}

module.exports = router;