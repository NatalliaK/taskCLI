function printToConsole(weather) {
	const {
		city,
		country,
		temp,
		wind,
		overcast
	} = weather;
	console.log('');
	console.log(`city: ${city}`);
	console.log(`country: ${country}`);
	console.log(`temperature: ${temp} degrees Celsius`);
	console.log(`wind: ${wind}mps`);
	console.log(`overcast: ${overcast}`);
}

module.exports = printToConsole;
