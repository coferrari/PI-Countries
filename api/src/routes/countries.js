const { Router } = require("express");
const { Country, Activity, Op } = require("../db");

const router = Router();

router.get('/', async (req, res) => {
    try {
        const countries = await Country.findAndCountAll({
            order: [
                ['name', 'ASC']
            ]
        });
        res.json(countries);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:page', async (req, res) => {
    const { page } = req.params;
    const pageNumber = parseInt(page);
    try {
        if (pageNumber === 1) {
            const size = 9;
            const countries = await Country.findAndCountAll({
                include: Activity,
                limit: size,
                order: [
                    ['name', 'ASC']
                ]
            });
            res.json(countries);
        }
        if (pageNumber > 1) {
            const size = 10;
            const countries = await Country.findAndCountAll({
                include: Activity,
                limit: size,
                offset: (pageNumber * size) - size - 1,
                order: [
                    ['name', 'ASC']
                ]
            });
            res.json(countries);
        }
        if (pageNumber >= 25 || typeof pageNumber !== 'number') {
            res.json('Not found')
        }
    } catch (error) {
        res.send(error);
    }
});

router.get('/search/country', async (req, res) => {
    const { name } = req.query;
    try {
        const size = 10
        const country = await Country.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            order: [
                ['name', 'ASC']
            ]
        })
        if (country.length === 0) {
            res.send('Country not found')
        }
        res.json(country)
    } catch (error) {
        res.send(error);
    }
});

router.get('/order/:order/:page', async (req, res) => {
    const { order, page } = req.params;
    const pageNumber = parseInt(page);
    try {
        if (pageNumber === 0) {
            const size = 9;
            if (order === 'AtoZ') {
                const countries = await Country.findAndCountAll({
                    order: [
                        ['name', 'ASC']
                    ],
                    limit: size,
                    offset: (pageNumber * size),
                })
                res.json(countries || 'Country not found')
            }
            if (order === 'ZtoA') {
                const countries = await Country.findAndCountAll({
                    order: [
                        ['name', 'DESC']
                    ],
                    limit: size,
                    offset: (pageNumber * size),
                })
                res.json(countries || 'Country not found')
            }
            if (order === 'PopulationUp') {
                const countries = await Country.findAndCountAll({
                    order: [
                        ['population', 'ASC']
                    ],
                    limit: size,
                    offset: (pageNumber * size),
                })
                res.json(countries || 'Not found')
            }
            if (order === 'PopulationDown') {
                const countries = await Country.findAndCountAll({
                    order: [
                        ['population', 'DESC']
                    ],
                    limit: size,
                    offset: (pageNumber * size),
                })
                res.json(countries || 'Not found')
            }
        }
        if (pageNumber >= 1) {
            const size = 10;
            if (order === 'AtoZ') {
                const countries = await Country.findAndCountAll({
                    order: [
                        ['name', 'ASC']
                    ],
                    limit: size,
                    offset: (pageNumber * size) - 1,
                })
                res.json(countries || 'Country not found')
            }
            if (order === 'ZtoA') {
                const countries = await Country.findAndCountAll({
                    order: [
                        ['name', 'DESC']
                    ],
                    limit: size,
                    offset: (pageNumber * size) - 1,
                })
                res.json(countries || 'Country not found')
            }
            if (order === 'PopulationUp') {
                const countries = await Country.findAndCountAll({
                    order: [
                        ['population', 'ASC']
                    ],
                    limit: size,
                    offset: (pageNumber * size) - 1,
                })
                res.json(countries || 'Not found')
            }
            if (order === 'PopulationDown') {
                const countries = await Country.findAndCountAll({
                    order: [
                        ['population', 'DESC']
                    ],
                    limit: size,
                    offset: (pageNumber * size) - 1,
                })
                res.json(countries || 'Not found')
            }
        }
    } catch (error) {
        res.send(error)
    }
});

router.get('/region/:region/:page', async (req, res) => {
    let { region, page } = req.params;
    const pageNumber = parseInt(page);
    region = region.slice(0, 1).toUpperCase().concat(region.slice(1).toLowerCase())
    try {
        if (pageNumber === 0) {
            const size = 9;
            const countriesByRegion = await Country.findAndCountAll({
                where: {
                    region: region
                },
                limit: size,
                offset: (pageNumber * size),
                order: [
                    ['name', 'ASC']
                ]
            })
            if (!countriesByRegion.count) {
                res.send('Region not found')
            }
            res.send(countriesByRegion)
        }
        if (pageNumber >= 1) {
            const size = 10;
            const countriesByRegion = await Country.findAndCountAll({
                where: {
                    region: region
                },
                limit: size,
                offset: (pageNumber * size) - 1,
                order: [
                    ['name', 'ASC']
                ]
            })
            if (!countriesByRegion.count) {
                res.send('Region not found')
            }
            res.send(countriesByRegion)
        }
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;
