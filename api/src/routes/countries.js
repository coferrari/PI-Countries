const { Router } = require("express");
const { Country, Activity, Op } = require("../db");
const axios = require("axios");

const router = Router();

router.get('/', async (req, res, next) => {
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
        res.status(404).json({ error: error })
    }
});

router.get('/search', async (req, res) => {
    const { name } = req.query;
    console.log(name)
    try {
        const country = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })
        if (country.length === 0) {
            res.send('Country not found')
        }
        res.json(country)
    } catch (error) {
        res.send(error);
    }
});

router.get('/order/alphdown', async (req, res) => {
    try {
        const countries = await Country.findAll({
            order: [
                ['name', 'DESC']
            ]
        })
        res.json(countries || 'Country not found')
    } catch (error) {
        res.send(error)
    }
});

router.get('/order/popdown', async (req, res) => {
    try {
        const countries = await Country.findAll({
            order: [
                ['population', 'DESC']
            ]
        })
        res.json(countries || 'Not found')

    } catch (error) {
        res.send(error)
    }
});

router.get('/order/popup', async (req, res) => {
    try {
        const countries = await Country.findAll({
            order: [
                ['population', 'ASC']
            ]
        })
        res.json(countries || 'Not found')

    } catch (error) {
        res.send(error)
    }
});

router.get('/order/:region', async (req, res) => {
    let { region } = req.params;
    region = region.slice(0, 1).toUpperCase().concat(region.slice(1).toLowerCase())
    try {
        const countriesByRegion = await Country.findAll({
            where: {
                region: region
            }
        })
        if (!countriesByRegion.length) {
            res.send('Region not found')
        }
        res.send(countriesByRegion)
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;
