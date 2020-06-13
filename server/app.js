const express = require('express')
const app = express()
const { influx } = require('./influx-client')
const fs = require('fs')
const { today } = require('./dateUtils')
const { port } = require('./config');

app.get('/api/metrics', (req, res) => {
    getSensorMeasurements(getTodayFiles())
    res.send(results)
})

influx.getDatabaseNames()
.then(names => {
  if (!names.includes(database)) {
    console.error(database + `database doesn't exists. Creating it`);
    return influx.createDatabase(database);
  }
})
.then(() => {
    app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
})
.catch(err => {
    console.error(`Error creating Influx database`);
})

function getSensorMeasurements(fileNames) {
    results = []
    fileNames.forEach(fileName => {

        sensorId = fileName.split("_")[1]
        const data = fs.readFileSync(fileName, {encoding:'utf8', flag:'r'}); 

        fileLines = data.split("\r\n").filter(line => line != null && line != "")
        fileLines.forEach(fileLine => {
            values = fileLine.split("|")
            const measurement = {
                "sensorId": sensorId,
                "time": values[0],
                "temperature": values[1],
                "humidity": values[2],
            } 
            results.push(measurement)
        })
         
    }); 
    return results
}

function getTodayFiles() {
    const fileNames = getSensorFiles("./")
    const date = today()
    return fileNames.filter(fn => fn.startsWith(date))
}

function getSensorFiles(dataFolder) {
    return fs.readdirSync(dataFolder);
}