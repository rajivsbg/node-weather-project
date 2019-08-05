const request = require('request');

const getGeoLocation = (address, callback) => {
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicmFqaXYtc2FoIiwiYSI6ImNqeXAxZnh2NzE2d3ozZHV3MzNycW85OG0ifQ.6NIs3ozsg__LPnUnaYouDw&limit=1' 
    request({'url': geoCodeUrl, json:true}, (error, { body })=> {
        if(error) {
            callback('Unable to connect location services!!', undefined);
        } else if(body.features.length == 0) {
            callback('Unable to find location, try another search.', undefined);
        } else {
            const data = body.features[0].center;

            const locationObj = {
                'longitude' :  data[0],
                'lattitude' : data[1], 
                'place': body.features[0].place_name
            }
            callback(undefined, locationObj);
        }
    })
}


module.exports = {
    'getGeoLocation': getGeoLocation
}