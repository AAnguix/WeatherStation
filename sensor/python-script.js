const { spawn } = require('child_process');

function pythonScript(script) {
    return new Promise(function(success, nosuccess) {

        const python = spawn('python', [script]);
    
        python.stdout.on('data', function(data) {
    
            success(data);
        });
    
        python.stderr.on('data', (data) => {
    
            nosuccess(data);
        });
    });
}

exports.pythonScript = pythonScript 