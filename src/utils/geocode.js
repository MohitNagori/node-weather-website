const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmFnb3JpbW9oaXQiLCJhIjoiY2sxZDdieW9xMDR4djNjbmQxOW9rdWRpYSJ9.k6dzhxfUTF5uV-Ad4WWhMg`;

    request({url, json: true } , (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocode service');
        } else if (!body.features.length) {
            callback('Unable to find location. Try another Search');
        } else {
            callback(undefined, { 
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[1].place_name
            });
        }
    });
}

module.exports = geocode;



