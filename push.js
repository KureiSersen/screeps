var https = require('https');
var fs = require('fs');
var path = require('path');

var modules = {};
var pathDir = __dirname + '/src';


function readDir(pathDir){
    const files = fs.readdirSync(pathDir);

    for (const file of files){
        const filePath = path.join(pathDir,file);
        const stat = fs.statSync(filePath);

        if (stat.isFile()){
            var content = fs.readFileSync(filePath, 'utf8')
            modules[file.split('.')[0]] = content;

        } else if (stat.isDirectory()){
            readDir(filePath)
        }

    }
}


var email = 'qaz1006ing@gmail.com',
    password = 'JkNmKmDf6zyty9T',
    data = {
        branch: 'default',         
        modules: modules
    };

var req = https.request({
    hostname: 'screeps.com',
    port: 443,
    path: '/api/user/code',
    method: 'POST',
    auth: email + ':' + password,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});


readDir(pathDir)
console.log(modules)

req.write(JSON.stringify(data));
req.end();
