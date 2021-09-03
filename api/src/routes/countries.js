const { Router } = require("express");
const { Country, Activity, Op } = require("../db");

const router = Router();

// aca entiendo que deberian llegar en la landing page, cuando pones ingresar


router.get('/', async (req, res, next) => {
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
// router.get('/', async (req, res, next) => {
//     try {
//         const countries = await Country.findAll({
//             order: [
//                 ['name', 'ASC']
//             ]
//         });
//         res.json(countries);
//     } catch (error) {
//         res.send(error);
//     }
// });

// faltan hacer validaciones y calcular cantidad total de paginas, seguir viendo tutorial
// son 25 paginas, calcular con el findAndCountAll()
// arreglar si pongo 1a entra a page 1
// si pongo e1 queda trabado
// router.get('/:page', async (req, res) => {
//     const { page } = req.params;
//     const pageNumber = parseInt(page); 
//     try {
//         if (pageNumber === 1) {
//             const size = 9;
//             const countries = await Country.findAndCountAll({
//                 include: Activity,
//                 limit: size,
//                 order: [
//                     ['name', 'ASC']
//                 ]
//             });
//             res.json(countries);
//         }
//         if (pageNumber > 1 && pageNumber <= 26) {
//             const size = 10;
//             const countries = await Country.findAndCountAll({
//                 include: Activity,
//                 limit: size,
//                 offset: (pageNumber * size) - size - 1,
//                 order: [
//                     ['name', 'ASC']
//                 ]
//             });
//             res.json(countries);
//         }
//         if (pageNumber >= 25 || typeof pageNumber !== 'number') {
//             res.json('Not found')
//         }
//     } catch (error) {
//         res.send(error);
//     }
// });

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
        if (pageNumber > 1 && pageNumber <= 26) {
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
// router.get('/:page', async (req, res) => {
//     const { page } = req.params;
//     const pageNumber = parseInt(page);
//     try {
//         if (pageNumber === 1) {
//             const size = 9;
//             const countries = await Country.findAll({
//                 include: Activity,
//                 limit: size,
//                 order: [
//                     ['name', 'ASC']
//                 ]
//             });
//             res.json(countries);
//         }
//         if (pageNumber > 1 && pageNumber <= 26) {
//             const size = 10;
//             const countries = await Country.findAll({
//                 include: Activity,
//                 limit: size,
//                 offset: (pageNumber * size) - size - 1,
//                 order: [
//                     ['name', 'ASC']
//                 ]
//             });
//             res.json(countries);
//         }
//         if (pageNumber >= 25 || typeof pageNumber !== 'number') {
//             res.json('Not found')
//         }
//     } catch (error) {
//         res.send(error);
//     }
// });

// agregar que incluya la actividad
router.get('/search/country', async (req, res) => {
    const { name } = req.query;
    try {
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
// router.get('/search/country', async (req, res) => {
//     const { name } = req.query;
//     try {
//         const country = await Country.findAll({
//             where: {
//                 name: {
//                     [Op.iLike]: `%${name}%`
//                 }
//             }
//         })
//         if (country.length === 0) {
//             res.send('Country not found')
//         }
//         res.json(country)
//     } catch (error) {
//         res.send(error);
//     }
// });

router.get('/order/:order/:page', async (req, res) => {
    const { order, page } = req.params;
    const pageNumber = parseInt(page);
    const size = 10;
    try {
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
    } catch (error) {
        res.send(error)
    }
});
// router.get('/order/:order', async (req, res) => {
//     const { order } = req.params;
//     try {
//         if (order === 'AtoZ') {
//             const countries = await Country.findAll({
//                 order: [
//                     ['name', 'ASC']
//                 ]
//             })
//             res.json(countries || 'Country not found')
//         }
//         if (order === 'ZtoA') {
//             const countries = await Country.findAll({
//                 order: [
//                     ['name', 'DESC']
//                 ]
//             })
//             res.json(countries || 'Country not found')
//         }
//         if (order === 'PopulationUp') {
//             const countries = await Country.findAll({
//                 order: [
//                     ['population', 'ASC']
//                 ]
//             })
//             res.json(countries || 'Not found')
//         }
//         if (order === 'PopulationDown') {
//             const countries = await Country.findAll({
//                 order: [
//                     ['population', 'DESC']
//                 ]
//             })
//             res.json(countries || 'Not found')
//         }
//     } catch (error) {
//         res.send(error)
//     }
// });
// ver de hacerlo dinamico en el otro get de order
router.get('/region/:region/:page', async (req, res) => {
    let { region, page } = req.params;
    const pageNumber = parseInt(page);
    const size = 10;
    region = region.slice(0, 1).toUpperCase().concat(region.slice(1).toLowerCase())
    try {
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
    } catch (error) {
        res.send(error)
    }
});
// router.get('/region/:region', async (req, res) => {
//     let { region } = req.params;
//     region = region.slice(0, 1).toUpperCase().concat(region.slice(1).toLowerCase())
//     try {
//         const countriesByRegion = await Country.findAll({
//             where: {
//                 region: region
//             }
//         })
//         if (!countriesByRegion.length) {
//             res.send('Region not found')
//         }
//         res.send(countriesByRegion)
//     } catch (error) {
//         res.send(error)
//     }
// });

module.exports = router;
