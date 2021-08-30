const { Router } = require("express");
const { Country, Activity, Op} = require("../db");

const router = Router();

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