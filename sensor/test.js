const { pythonScript } = require('./python-script');

const start = async function(a, b) {

    try {
        result = await pythonScript('health/test.py')
    } catch (e) {
        console.error(e);
    }

    console.log("start")
    console.log(result)
    console.log("finish")
  }
  
  // Call start
  start();