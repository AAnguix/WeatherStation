function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}

const axios = require('axios');
const fs = require('fs');

let configuration_raw = fs.readFileSync('configuration.json');
let configuration = JSON.parse(configuration_raw);

const path = configuration.host + configuration.path
const payload = {
    "temperature": randomInt(20, 25),
    "humidity": randomInt(30, 70)
}

axios.post(path, payload)
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });

