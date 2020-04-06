const axios = require('axios');

const getGeocode = (address, callback) => {
  const mapBoxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiYW5pbW9uIiwiYSI6ImNrOGN6enRnNjAzaWszaW4xdTJwZzFzaGUifQ.R4I_1NKa02zXc3eaJSEzZg';

  axios.get(mapBoxURL)
    .then(({ data }) => {
      let features = data.features;

      if (!features.length) callback('Unable to find location. Please enter correct location.', undefined);
      else {
        let [longitude, latitude] = features[0].center;
        let location = features[0].place_name;

        callback(undefined, {
          longitude: longitude,
          latitude: latitude,
          location: location
        });
      }
    })
    .catch((err) => callback('Unable to connect to location services.', undefined))
}

module.exports = getGeocode;