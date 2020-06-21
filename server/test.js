const { write, databaseNames, temperatures } = require('./influxDb');
const moment = require("moment")

const start = async function(a, b) {
    try {
        const localTime = moment().format()
        temperatures("NAVE1").then(data => console.log(data))
        write('NAVE1', 25.3, 70.2, localTime)
    } catch (e) {
        console.error(e);
    }
  }
  
  start();