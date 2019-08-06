const request = require('request');

const getForcast = (lattitude, longitude, callback) => {
    const param = lattitude + ',' + longitude;
    const forcastUrl = 'https://api.darksky.net/forecast/01a4888113662cc657efa8ef0654c865/'+ encodeURIComponent(param) +'?units=si'
    request({'url': forcastUrl, json:true}, (error, { body })=> {
        if(error) {
            callback('Unable to connect weather service.', undefined);
        } else if(body.error) {
            callback(body.error, undefined);
        } else {
            console.log(body);
            const weatherObj = {
                'temperature': body.currently.temperature,
                'preciptation': body.currently.precipProbability,
                'summary': body.currently.summary,
                'humidity': body.currently.humidity
            }
            callback(undefined, weatherObj);
        }
    })
 }

 module.exports = {
    'getForcast': getForcast
}