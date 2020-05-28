const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
  }
  
module.exports = {
  port: process.env.PORT,
  sensor_ips: process.env.SENSORS.split(","),
  sensor_api: process.env.SENSOR_API
};