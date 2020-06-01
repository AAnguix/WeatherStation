const express = require('express')
const router = express.Router({});

router.get('/', async (_req, res, _next) => {
    res.status(200).send();
});

module.exports = router;