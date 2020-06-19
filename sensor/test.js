const { pythonScript } = require('./python-script');

result = await pythonScript('health/i2c.py')
console.log("start")
console.log(result)
console.log("finish")