const express = require('express')
const app = express()
const fs = require('fs')
const { today } = require('./dateUtils')
const { port } = require('./config');

app.get('/api/metrics', (req, res) => {
    res.send(get_today_files())
})

function get_sensor_files(dataFolder) {
    const fileNames = fs.readdirSync(dataFolder);
    return fileNames
}

function get_today_files() {
    const fileNames = get_sensor_files("./")
    const date = today()
    return fileNames.filter(fn => fn.startsWith(date))
}

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))