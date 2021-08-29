const { Router } = require('express');
const { Activity } = require('../db');
const { Country } = require('../db');

const router = Router();


router.get('/:countryName', async (req, res) => {
    let { countryName } = req.params
    countryName = countryName.slice(0,1).toUpperCase().concat(countryName.slice(1).toLocaleLowerCase())
    try {
        const activities = Activity.findAll()
    } catch (error) {
        res.send(error)
    }
});
// router.get('/:countryName', async (req, res) => {
//     let { countryName } = req.params
//     countryName = countryName.slice(0,1).toUpperCase().concat(countryName.slice(1).toLocaleLowerCase())
//     try {
//         const countryActivity = await Activity.findAll({
//             where: {
//                 name:countryName
//             },
//             include: [{
//                 model: Activity,
//                 // attributes: ['name'],
//                 // through: {
//                 //     attributes: []
//                 // }
//         }],
//         })
//     } catch (error) {
//         res.send(error)
//     }
// });

router.post('/', async (req, res) => {
    const { name, difficulty, duration, season, countryName } = req.body;
    if (name && difficulty && duration && season && countryName) {
        try {
            const country = await Country.findOne({
                where: {
                    name: countryName
                }
            })
            const newActivity = await Activity.create({
                name,
                difficulty,
                duration,
                season
            });
            res.json(await country.addActivity(newActivity.id))
    
        } catch (error) {
            res.send(error);
        }
    } else {
        res.send('Missing parameters')
    }
})


module.exports = router;