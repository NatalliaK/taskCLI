function getUrl(service, cityName) {
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

module.exports = getUrl;
