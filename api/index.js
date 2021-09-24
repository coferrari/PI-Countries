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
const {
  API_KEY
} = process.env;

// BULK CREATE
// Syncing all the models at once.
conn.sync({ force: true })
  .then(async () => {
    const countriesApi = await axios.get('https://restcountries.com/v3/all');
    let countries = countriesApi.data;
    if (countries) {countries = countries.map(country => {
      return {
        alpha3Code: country.cca3,
        name: country.name.common,
        flag: country.flags[0],
        region: country.region,
        capital: country.capital ? country.capital[0] : null,
        subregion: country.subregion,
        area: country.area,
        demonyms: country.demonyms? country.demonyms.eng.m : null
      }
    })
  };
    await Country.bulkCreate(countries);
    server.listen(3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  });
