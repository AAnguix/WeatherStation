const { spawn } = require('child_process');

function readSensor() {
    return new Promise(function(success, nosuccess) {

        const python = spawn('python', ['./read-sensor.py']);
    
        python.stdout.on('data', function(data) {
    
            success(data);
        });
    
        python.stderr.on('data', (data) => {
    
            nosuccess(data);
        });
    });
}

exports.readSensor = readSensor 