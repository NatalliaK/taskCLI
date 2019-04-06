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

module.exports = getCurrentWeather;
