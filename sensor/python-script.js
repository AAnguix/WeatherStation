let { PythonShell } = require('python-shell');

function pythonScript(script){
    let options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: "./",
    };

    let data = null
    let errorMessage = null
    PythonShell.run(script, options, function (error, pythonResult) {
        data = pythonResult
        if (error) {
            errorMessage = error.message
        }
    })

    return {
        data: data,
        error: errorMessage
    }
}

exports.pythonScript = pythonScript 