var https = require('https');
var fs = require('fs');

var email = 'qaz1006ing@gmail.com',
    password = 'JkNmKmDf6zyty9T',
    data = {
        branch: 'default',         
        modules: {
            // main: 'require("hello");',
            main: fs.readFileSync('./main.js', 'utf8'),
            config_globalMem: fs.readFileSync('./config/globalMem.js', 'utf8'),
        
        }
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

req.write(JSON.stringify(data));
req.end();