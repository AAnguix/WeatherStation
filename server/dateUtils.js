const moment = require('moment')

function today() {
    return moment().format('yyyy-MM-DD')
}

exports.today = today