const http = require('http');


module.exports = function(firstName, lastName) {
    return new Promise(function(resolve, reject) {

        let options = {
            hostname: 'netology.tomilomark.ru',
            path: '/api/v1/hash',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'firstname': firstName
            }
        };

        let requestData = JSON.stringify({
            lastName: lastName
        });

        let request = http.request(options);

        request.on('response', function (response) {
            let data = '';

            console.log([
                'Получен ответ',
                response.statusCode,
                response.statusMessage
            ].join(' '));

            if(response.statusCode != 200){
                return reject("Ошибка ответа сервиса");
            }

            response.on('data', function (chunk) {
                data += chunk;
            });

            response.on('end', () => {

                resolve(JSON.parse(data).hash);
            });
        });

        request.write(requestData);
        request.end();

    });

}
