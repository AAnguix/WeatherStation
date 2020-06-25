const dotenv = require('dotenv');
const result = dotenv.config({ path: __dirname + '/.env' })
if (result.error) {
    throw result.error;
  }
  
module.exports = {
  sensor_ips: process.env.SENSORS.split(","),
  sensor_api_port: process.env.SENSOR_API_PORT,
  sensor_api_url: process.env.SENSOR_API_URL,
  database: process.env.DATABASE,
  database_host: process.env.DATABASE_HOST,
};