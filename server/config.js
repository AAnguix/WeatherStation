const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
  }
  
module.exports = {
  port: process.env.PORT,
  sensor_ips: process.env.SENSORS.split(","),
  sensor_api_port: process.env.SENSOR_API_PORT,
  sensor_api_url: process.env.SENSOR_API_URL
};