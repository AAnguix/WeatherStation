const { write, databaseNames, metrics } = require('./influxDb');
const moment = require("moment")

const start = async function(a, b) {
    try {
        const localTime = moment().format()
        metrics().then(data => console.log(data))
        write('NAVE1', 25.3, 70.2, localTime)
    } catch (e) {
        console.error(e);
    }
  }
  
  start();