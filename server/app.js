const express = require('express')
const app = express()

app.get('api/metrics', (req, res) => {
    
    sensor_metrics = []
   

    res.send(sensor_metrics)
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))