const { Router } = require('express');
const { Country, Activity } = require('../db');

const router = Router();

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
    // Modificar para que cuando se clickee el botón de "SUBMIT" se cree un nuevo post
    // tomando los datos desde el form y agregándolo a la base de datos
    // (Debe incluir también la categoría a la/s cual/es pertenece)
    // Tu código acá:
    const { name, difficulty, duration, season, countryName } = req.body;
    if (name && difficulty && duration && season && countryName) {
        try {
            const activity = await Activity.findOrCreate({
              where: {
                name: name,
                difficulty: difficulty,
                duration: duration,
                season: season
              },
            });
        
            const country = await Country.findOne({
                where: {
                    name: countryName
                }
            })
          
            // await user[0].addPage(page);
            await activity[0].addCountry(country);
            // await page.addCategories(categories);
            // res.redirect(page.route);
            res.send(activity)
        } catch (error) {
            res.send(error)
        }
    } else {
        res.send('Missing parameters')
    }
  
});

// post que funciona
// router.post('/', async (req, res) => {
//     const { name, difficulty, duration, season, countryName } = req.body;
//     if (name && difficulty && duration && season && countryName) {
//         try {
//             const country = await Country.findOne({
//                 where: {
//                     name: countryName
//                 }
//             })
//             const newActivity = await Activity.create({
//                 name,
//                 difficulty,
//                 duration,
//                 season
//             });
//             res.json(await country.addActivity(newActivity.id))
    
//         } catch (error) {
//             res.send(error);
//         }
//     } else {
//         res.send('Missing parameters')
//     }
// });


module.exports = router;