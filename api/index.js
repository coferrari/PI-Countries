//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const axios = require("axios");

const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Country } = require("./src/db");

server.get('/', (req, res) => {
  res.send('Hola, empezando el PI')
})

// BULK CREATE
// Syncing all the models at once.
// agregar un .catch()
conn.sync({ force: true })
  .then(async () => {
    const countriesApi = await axios.get('https://restcountries.eu/rest/v2/all');
    let countries = countriesApi.data;
    // console.log(countries.data[0])
    if (countries) {countries = countries.map(country => {
      return {
        alpha3Code: country.alpha3Code,
        name: country.name,
        flag: country.flag,
        region: country.region,
        capital: country.capital,
        subregion: country.subregion,
        area: country.area,
        population: country.population
      }
    })
  };
    await Country.bulkCreate(countries);
    server.listen(3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  });

// // Syncing all the models at once.
// conn.sync({ force: true }).then(() => {
//   server.listen(3001, () => {
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//   });
// });
