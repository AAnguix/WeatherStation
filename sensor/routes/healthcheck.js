const express = require('express')
const moment = require('moment')
const router = express.Router({});
const { pythonScript } = require('./../python-script');

function i2c() {
    return pythonScript('./i2c.py')
}

function pin() {
    return pythonScript('./pin.py')
}

function spi() {
    return pythonScript('./spi.py')
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
		timestamp: moment().format()
	};
	try {
		res.send(healthcheck);
	} catch (e) {
		res.status(503).send();
	}
});

module.exports = router;