const express = require('express')
const moment = require('moment')
const router = express.Router({});
const { pythonScript } = require('./../python-script');

async function i2c() {
    result = await pythonScript('health/i2c.py')
    console.log("i2c")
    console.log(result)
    return isHealthy(result)
}

async function pin() {
    result = await pythonScript('health/pin.py')
    console.log("pin")
    console.log(result)
    return isHealthy(result)
}

async function spi() {
    result = await pythonScript('health/spi.py')
    console.log("spi")
    console.log(result)
    return isHealthy(result)
}

function isHealthy(result) {
    return (result.error === null && result.data === "healthy") ? "healthy" : "unhealthy"
}

router.get('/', async (_req, res, _next) => {
	const healthcheck = {
		uptime: process.uptime(),
		components: [{
            "name": "pin",
            "status": pin()
        },
        {
            "name": "i2c",
            "status": i2c()
        },
        {
            "name": "spi",
            "status": spi()
        }],
		time: moment().format()
	};
	try {
		res.send(healthcheck);
	} catch (e) {
		res.status(503).send();
	}
});

module.exports = router;