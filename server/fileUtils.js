const { today } = require("./dateUtils");

function createFileOrAppend(fileName, content) {
    try{
      if (fs.existsSync(fileName)) {
        fs.appendFile(fileName, content, function (err) {
          if (err) throw err;
        })
      } 
      else {
        fs.writeFileSync(fileName, content);
      }
    }catch (e){
        console.log("Cannot write file ", e);
    }
  }
  
  function getFileName(sensorId) {
    return today() + "_" + sensorId
  }