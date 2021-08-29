const { Router } = require('express');
const { Activity } = require('../db');

const router = Router();

router.get('/', (req, res) => {
    res.send('Soy la ruta activity')
});

router.post('/', async (req, res) => {
    const { name, difficulty, duration, season } = req.body;
    try {
        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        });
        res.send(newActivity)

    } catch (error) {
        res.send(error);
    }
})


module.exports = router;