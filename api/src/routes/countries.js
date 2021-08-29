const { Router } = require("express");
const { Country } = require("../db");
const axios = require("axios");

const router = Router();

// router.get('/', async (req, res) => {
//     // res.send('Soy la ruta countries')
//     const countries = await Country.findAll()
//     if (!countries) return res.sendStatus(404);
//     res.json(countries)
// });

// router.get('/', (req, res, next) => {
//     // res.send('Soy la ruta countries')
//     return Country.findAll()
//     .then((countries) => res.send(countries))
//     .catch(error => next(error))
// })

// router.get('/', async (req, res, next) => {
//     try {
//         const countries = await Country.findAll();
//         res.json(countries);
//     } catch (error) {
//         next(error);
//     }
// })



router.get('/', async (req, res) => {
    try {
        const countriesDB = await Country.findAll();
        if (countriesDB.length === 0) {
            const countries = await axios.get('https://restcountries.eu/rest/v2/all')
            if (countries.data) {
                for (let i = 0; i < countries.data.length; i++) {
                    await Country.create({
                        alpha3Code: countries.data[i].alpha3Code,
                        name: countries.data[i].name,
                        flag: countries.data[i].flag,
                        capital: countries.data[i].capital,
                        region: countries.data[i].region,
                        subregion: countries.data[i].subregion,
                        area: countries.data[i].area,
                        population: countries.data[i].population
                    })
                }
            }
            const allCountries = await Country.findAll();
            res.status(200).json(allCountries)
        } else {
            res.status(200).json(countriesDB)
        }
    } catch (error) {
        res.status(404).json({error: error})
    }
});

router.get("/", async (req, res) => {
  // const { name } = req.query;
  // try {
  //     const country = await Country.find
  // } catch (error) {
  //     res.send(error);
  // }
});

module.exports = router;
