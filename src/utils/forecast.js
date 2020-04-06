const axios = require('axios');

const darkSkyURL = 'https://api.darksky.net/forecast/d041b75e4745d5a0a2be8ceba7a2372c/';

// Summary - daily.data[0].summary
// temperature - currently.temperature

const getForecast = (latitude, longitude, callback) => {
  let url = `${darkSkyURL}${latitude},${longitude}`;

  axios.get(url, {
    params: {
      units: 'si'
    }
  })
    .then(({ data }) => {
      let { precipProbability, temperature } = data.currently;

      let daliyData = data.daily.data;
      let summary = daliyData[0].summary;

      callback(undefined,
        `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`);
    })
    .catch((err) => {
      if (err.response) callback('Unable to find location. Please enter correct coordiantes.', undefined);
      else callback('Unable to connect to weather services.', undefined);
    })
};

module.exports = getForecast;