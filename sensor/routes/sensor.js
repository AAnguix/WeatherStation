const express = require('express')
const moment = require('moment')
const router = express.Router({});
const { sensorId } = require('./../config');
const { pythonScript } = require('./../python-script');

router.get('/', async (req, res, _next) => {
	const localTime = moment().format()
  
    const sensor = await readSensor()
    const result = {
        "sensorId": sensorId,
        "temperature": sensor.data[0],
        "humidity": sensor.data[1],
        "error": sensor.error,
        "time": localTime,
    }
    res.send(result)
})

async function readSensor() {
    return await pythonScript('./read-sensor.py')
}

module.exports = router;