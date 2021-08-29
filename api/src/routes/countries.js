const { Router } = require("express");
const { Country, Activity, Op} = require("../db");
const axios = require("axios");

const router = Router();

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
        res.status(404).json({ error: error })
    }
});


router.get("/", async (req, res) => {
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
        res.json(country || 'Country not found')
    } catch (error) {
        res.send(error);
    }
});

router.get('/:idPais', async (req, res) => {
    const { idPais } = req.params;
    if (idPais.length === 3) {
        try {
            const country = await Country.findByPk(idPais.toUpperCase(), {
                include: [{
                    model: Activity,
                    attributes: ['name', 'difficulty', 'duration', 'season'],
                    through: {
                        attributes: []
                    }
                }],
            })
            res.json(country || 'Country not found')
        } catch (error) {
            res.send(error)
        }
    } else {
        res.status(404).json('Country code should contain 3 characters')
    }
});

module.exports = router;
