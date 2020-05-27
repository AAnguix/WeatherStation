const { spawn } = require('child_process');

function getMetrics() {
    var dataToSend;
    
    const python = spawn('python', ['read-sensor.py']);
    
    python.stdout.on('data', function (data) {
     dataToSend = data.toString();
    });
   
    return python.on('close', (code) => {
        
        const error = false
        return {
            "error": error,
            "temperature": dataToSend,
            "humidity": dataToSend
        }
    });
}

exports.getMetrics = getMetrics 