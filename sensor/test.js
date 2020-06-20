const { pythonScript2 } = require('./python-script');

const start = async function(a, b) {

    try {
        result = await pythonScript2('health/test.py')
    } catch (e) {
        console.error(e);
    }

    console.log("start")
    console.log(result)
    console.log("finish")
  }
  
  // Call start
  start();