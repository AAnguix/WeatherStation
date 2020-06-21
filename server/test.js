const { write, databaseNames } = require('./influxDb');
const moment = require("moment")

const start = async function(a, b) {
    const localTime = moment().format()
    console.log(await databaseNames())
    try {
        write('NAVE1', 25.3, 70.2, localTime)
    } catch (e) {
        console.error(e);
    }
  }
  
  start();