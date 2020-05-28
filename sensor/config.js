const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
  }
  
module.exports = {
  port: process.env.PORT,
  sensorId: process.env.SENSOR_ID
};