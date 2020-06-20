let { PythonShell } = require('python-shell');

async function pythonScript(script) {
    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: "./",
        };

    const result = await new Promise((resolve, reject) => {
      PythonShell.run(script, options, function(
        err,
        scriptResult
      ) {
        if (err) {
          console.log(err)
          reject({ success: false, data: null, error: err });
        }
        resolve({ success: true, data: scriptResult, error: null });
      });
    });

    return result
  }

exports.pythonScript = pythonScript