const { Router } = require('express');
const { Country, Activity } = require('../db');

const router = Router();

// buscar por pais y actividad

// falta incluir los paises
router.get('/', async (req, res) => {
    try {
        const activities = await Activity.findAll({
            include: {
                model: Country,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        if (!activities.length) {
            res.send('No activities found')
        }
        res.send(activities)
    } catch (error) {
        res.send(error)
    }
});

router.get('/order/:season', async (req, res) => {
    let { season } = req.params;
    season = season.toLowerCase()
    'summer', 'fall', 'winter', 'spring'
    if (season === 'summer' || season === 'fall' || season === 'winter' || season === 'spring') {
        try {
            const activitiesByRegion = await Activity.findAll({
                where: {
                    season: season
                }
            })
            if (!activitiesByRegion.length) {
                res.send(`No activities found in ${season}`)
            }
            res.send(activitiesByRegion)
    
        } catch (error) {
            res.send(error)
        }
    } else {
        res.send('Invalid season')
    }
});

router.post('/', async function(req, res) {
    let { name, difficulty, duration, season, countryCode } = req.body;
    name = name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();

    if (name && difficulty && duration && season && countryCode) {
        try {
            const activity = await Activity.findOrCreate({
              where: {
                name: name,
                difficulty: difficulty,
                duration: duration,
                season: season
              },
            });

            if (countryCode.length === 1) {
                const country = await Country.findOne({
                    where: {
                        alpha3Code: countryCode[0]
                    }
                })
                await activity[0].addCountry(country); // [0] pq findOrCreate devuelve un arreglo con 2 elementos
                // await page.addCategories(categories);
                // res.redirect(page.route);
                res.send(country)
            }
            if (countryCode.length > 1) {
                await activity[0].addCountries(countryCode);
                res.send(countryCode)
            }
        } catch (error) {
            res.send(error)
        }
    } else {
        res.send('Missing parameters')
    }
});


module.exports = router;