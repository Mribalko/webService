
const server = require('http').createServer();
const getHash = require('./GetHash');
const url = require('url');

const port = process.env.POR || 3000;

function handler(req, res) {
    let urlParams = url.parse(req.url, true).query;

    if(urlParams.firstname && urlParams.lastname) {
        res.writeHead(200, 'OK', {'Content-Type': 'application/json'});
        getHash(urlParams.firstname, urlParams.lastname)
            .then(hash => {

                let jsonData = JSON.stringify({
                    firstName: urlParams.firstname,
                    lastName: urlParams.lastname,
                    secretKey: hash
                });
                res.write(jsonData)
            })
            .then(() =>  res.end())
            .catch(err => {
                res.writeHead(500, 'Internal Server Error', {'Content-Type': 'text/plain;charset=utf-8'});
                res.write("Ошбика обработки запроса");
                res.end();
            })
    }
    else {
        res.writeHead(400, 'Bad Request', {'Content-Type': 'text/plain;charset=utf-8'});
        res.write("Переданы неверные параметры");
        res.end();
    }


}


server.on('error', err => console.error(err));
server.on('request', handler);
server.on('listening', () => {
    console.log('Start HTTP on port %d', port);
});

server.listen(port);










