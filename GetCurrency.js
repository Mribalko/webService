/**
 * Created by mriba on 02.06.2017.
 */
const https = require('https');
const url = 'https://netology-fbb-store-api.herokuapp.com/currency';
function process(data) {
    let curr = JSON.parse(data);
    curr
        .filter(item => item.CharCode === 'USD' || item.CharCode === 'EUR')
        .forEach(item => console.log(item.Name, item.Value));
}
function handler(response) {
    let data = '';

    console.log([
        'Получен ответ',
        response.statusCode,
        response.statusMessage
    ].join(' '));

    if(response.statusCode != 200)
        return;

    response.on('data', function (chunk) {
        data += chunk;
    });
    response.on('end', function () {
        process(data);
    });
}
const request = https.request(url);
request.on('response', handler);
request.end();