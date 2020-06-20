const express = require('express')
const moment = require('moment')
const router = express.Router({});
const { sensorId } = require('./../config');
const { pythonScript } = require('./../python-script');

router.get('/', async (req, res, _next) => {
	const localTime = moment().format()
  
    const sensor = await readSensor()
    console.log(sensor)
    const data = sensor.data[0]
    const values = data.split("|")
    const result = {
        "sensorId": sensorId,
        "temperature": values[0].replace("\r","").replace("\n", ""),
        "humidity": values[1].replace("\r","").replace("\n", ""),
        "error": sensor.error,
        "time": localTime,
    }
    res.send(result)
})

async function readSensor() {
    return await pythonScript('./read-sensor.py')
}

module.exports = router;