const express = require('express')
const app = express()
const { port } = require('./config');
const { getMetrics } = require('./sensor');
const moment = require('moment')

app.get('/metrics', (req, res) => {
        const localTime = moment().format()
        const metrics = getMetrics()
        const result = {
            "temperature": metrics.temperature,
            "humidity": metrics.humidity,
            "error": metrics.error,
            "time": localTime,
        }
        res.send(result)
    }
)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))