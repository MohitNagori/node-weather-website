const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/489d3ded771637889299b1e40333faca/${latitude},${longitude}?units=si`;
    
    request({url, json: true } , (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            const daily = body.daily.data[0];
            const data = body.currently;
            callback(undefined,daily.summary + ` It is currently ${data.temperature} degrees out. This high today is ${daily.temperatureHigh} with a low of ${daily.temperatureLow}. There is a ${data.precipProbability}% chance of rain`);
        }
    });
}

module.exports = forecast;



