const express = require('express')
const { port } = require('./config');

const app = express()
//app.use('/api/sensor', require('./routes/sensor'));
app.use('/api/health', require('./routes/healthcheck'));
app.use('/api/ping', require('./routes/ping'));

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))