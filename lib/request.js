const fetch = require('node-fetch');
const getCurrentWeather = require('./getCurrentWeather');
const getUrl = require('./getUrl');

module.exports = (service, place) => {
  const url = getUrl(service, place);

  if (url) {
    return fetch(url)
      .then(req => {
        if (req.status >= 200 && req.status < 300) {
          return Promise.resolve(req);
        }
        return Promise.reject(new Error(req.statusText));
      })
      .then(req => req.json())
      .then(weather => getCurrentWeather(service, weather))
      .catch(err => {
        console.log('');
        console.log(err);
      });
  } else {
    console.log(new Error('Invalid service name!'));
  }
};
