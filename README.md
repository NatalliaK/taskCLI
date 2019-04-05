# taskCLI

Weather
Утилита командной строки, возвращающая информацию о погоде для выбранного города.
Она обращается к двум разным сервисам apixu (https://www.apixu.com/doc/request.aspx) и apiop (https://openweathermap.org/api), каждый из которых выбирается флагом --service.

weather --service <название сервиса> berlin

Example: weather --service apixu berlin

P.s. Для реализации cli использовался commander js, ESLint с конфигурацией airbnb, для поддержки запросов - npm-пакеты 'node-fetch', 'request'.
