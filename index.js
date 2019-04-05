#!/usr/bin/env node

const program = require('commander');
const request = require('./lib/request');
const custEnv = require('custom-env').env(true);

program
  .version('0.0.1', '-v, --version');

program
  .option('--service <service>', 'Get forecast the weather')
  .arguments('<city>')
  .action(city => {
    function cb(serviceName) {
      request(serviceName, city)
        .then(weather => {
          if (weather) {
            printToConsole(weather);
          }
        })
        .catch(() => {
          console.log('');
          console.log('Invalid request');
        });
    }
    cb(program.service);
  });

program.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log('$ weather --help');
  console.log('$ weather -h');
  console.log('$ weather --service <serviceName> <city>');
  console.log('$ weather --service apixu Minsk');
  console.log('$ weather --service apiop Minsk');
});

program.parse(process.argv);

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
