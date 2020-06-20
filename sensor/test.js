const { pythonScript } = require('./python-script');

const start = async function(a, b) {

    try {
        sensor = await pythonScript('read-sensor.py')
    } catch (e) {
        console.error(e);
    }

    console.log(sensor)
  }
  
  // Call start
  start();