const fetch = require('node-fetch');

module.exports = (service, place) => {
  const url = getUrl(place);

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
  function getUrl(cityName) {
    const KEY_APIXU = process.env.KEY_APIXU;
    const KEY_APIOP = process.env.KEY_APIOP;
    let urlName;
    if (service === 'apixu') {
      urlName = `https://api.apixu.com/v1/current.json?key=${KEY_APIXU}&q=${cityName}`;
    } else if (service === 'apiop') {
      urlName = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${KEY_APIOP}`;
    }
    return urlName;
  }

  function getCurrentWeather(serviceName, data) {
    let weather;
    if (serviceName === 'apixu') {
      weather = getCurrentWeatherByApixu(data);
    } else {
      weather = getCurrentWeatherByApiOp(data);
    }
    return weather;
  }

  function getCurrentWeatherByApixu(data) {
    const {
      location: { name: city, country },
      current: { temp_c: temp, wind_kph: wind },
      current: { condition: { text: overcast } }
    } = data;
    return {
      city,
      country,
      temp,
      wind,
      overcast
    };
  }

  function getCurrentWeatherByApiOp(data) {
    const {
      name: city,
      sys: { country },
      main: { temp },
      wind: { speed: wind },
      weather: [{ description: overcast }]
    } = data;
    return {
      city, country, temp, wind, overcast
    };
  }
};
