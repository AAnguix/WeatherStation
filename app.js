const express = require('express')
const app = express()
const { port } = require('./config');
const si = require('systeminformation');
const moment = require('moment')

app.get('/metrics', (req, res) => {
        si.cpuTemperature()
        .then(temperature=>{
            const localTime = moment().format()
            const result = {
                "temperature": temperature,
                "humidity": temperature,
                "time": localTime,
            }
            res.send(result)
        });
    }
)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))