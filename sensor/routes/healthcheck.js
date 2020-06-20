const express = require('express')
const moment = require('moment')
const router = express.Router({});
const { pythonScript } = require('./../python-script');

async function i2c() {
    try {
        return isHealthy(await pythonScript('health/i2c.py'))
    } catch (e) {
        return "unhealthy"
    }
}

async function pin() {
    try {
        return isHealthy(await pythonScript('health/pin.py'))
    } catch (e) {
        return "unhealthy"
    }
}

async function spi() {
    try {
        return isHealthy(await pythonScript('health/spi.py'))
    } catch (e) {
        return "unhealthy"
    }
}

function isHealthy(result) {
    console.log(result)
    return (result.success  && result.data === "healthy") ? "healthy" : "unhealthy"
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