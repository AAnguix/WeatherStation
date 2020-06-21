const { write, databaseNames } = require('./influxDb');
const moment = require("moment")

const start = async function(a, b) {
    try {
        const localTime = moment().format()
        databaseNames().then(names => {
            console.log(names)
        })
        //write('NAVE1', 25.3, 70.2, localTime)
    } catch (e) {
        console.error(e);
    }
  }
  
  start();