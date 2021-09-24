const { Router } = require("express");
const { Country, Activity, Op } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
    try {
        const countries = await Country.findAndCountAll({
            order: [["name", "ASC"]],
        });
        res.json(countries);
    } catch (error) {
        res.send(error);
    }
});

router.get("/:page", async (req, res) => {
    const { page } = req.params;
    const pageNumber = parseInt(page);
    try {
        const size = 10;
        const countries = await Country.findAndCountAll({
            include: Activity,
            limit: size,
            offset: pageNumber * size,
            order: [["name", "ASC"]],
        });
        res.json(countries);
    } catch (error) {
        res.send(error);
    }
});

router.get("/search/country", async (req, res) => {
    const { name } = req.query;
    try {
        const country = await Country.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            order: [["name", "ASC"]],
        });
        if (country.count === 0) {
            res.send({
                count: 0,
                rows: "Ups! We couldn't find any country matching your search. Please try again!",
            });
        } else {
            res.json(country);
        }
    } catch (error) {
        res.send(error);
    }
});

router.get("/order/:order/:page", async (req, res) => {
    const { order, page } = req.params;
    const pageNumber = parseInt(page);
    try {
        if (pageNumber === 0) {
            const size = 10;
            if (order === "AtoZ") {
                const countries = await Country.findAndCountAll({
                    order: [["name", "ASC"]],
                    limit: size,
                    offset: pageNumber * size,
                });
                res.json(countries || "Country not found");
            }
            if (order === "ZtoA") {
                const countries = await Country.findAndCountAll({
                    order: [["name", "DESC"]],
                    limit: size,
                    offset: pageNumber * size,
                });
                res.json(countries || "Country not found");
            }
            if (order === "AreaUp") {
                const countries = await Country.findAndCountAll({
                    order: [["area", "ASC"]],
                    limit: size,
                    offset: pageNumber * size,
                });
                res.json(countries || "Not found");
            }
            if (order === "AreaDown") {
                const countries = await Country.findAndCountAll({
                    order: [["area", "DESC"]],
                    limit: size,
                    offset: pageNumber * size,
                });
                res.json(countries || "Not found");
            }
        }
        if (pageNumber >= 1) {
            const size = 10;
            if (order === "AtoZ") {
                const countries = await Country.findAndCountAll({
                    order: [["name", "ASC"]],
                    limit: size,
                    offset: pageNumber * size,
                });
                res.json(countries || "Country not found");
            }
            if (order === "ZtoA") {
                const countries = await Country.findAndCountAll({
                    order: [["name", "DESC"]],
                    limit: size,
                    offset: pageNumber * size - 1,
                });
                res.json(countries || "Country not found");
            }
            if (order === "AreaUp") {
                const countries = await Country.findAndCountAll({
                    order: [["area", "ASC"]],
                    limit: size,
                    offset: pageNumber * size - 1,
                });
                res.json(countries || "Not found");
            }
            if (order === "AreaDown") {
                const countries = await Country.findAndCountAll({
                    order: [["area", "DESC"]],
                    limit: size,
                    offset: pageNumber * size - 1,
                });
                res.json(countries || "Not found");
            }
        }
    } catch (error) {
        res.send(error);
    }
});

router.get("/region/:region/:order/:page", async (req, res) => {
    let { region, order, page } = req.params;
    const pageNumber = parseInt(page);
    let condition;
    region = region
        .slice(0, 1)
        .toUpperCase()
        .concat(region.slice(1).toLowerCase());

    if (order === "AtoZ") {
        order = "ASC";
        condition = "name";
    }
    if (order === "ZtoA") {
        order = "DESC";
        condition = "name";
    }
    if (order === "AreaUp") {
        order = "ASC";
        condition = "area";
    }
    if (order === "AreaDown") {
        order = "DESC";
        condition = "area";
    }

    try {
        if (pageNumber === 0) {
            const size = 10;
            const countriesByRegion = await Country.findAndCountAll({
                where: {
                    region: region,
                },
                limit: size,
                offset: pageNumber * size,
                order: [[condition, order]],
            });
            if (!countriesByRegion.count) {
                res.send("Region not found");
            }
            res.send(countriesByRegion);
        }
        if (pageNumber >= 1) {
            const size = 10;
            const countriesByRegion = await Country.findAndCountAll({
                where: {
                    region: region,
                },
                limit: size,
                offset: pageNumber * size,
                order: [[condition, order]],
            });
            if (!countriesByRegion.count) {
                res.send("Region not found");
            }
            res.send(countriesByRegion);
        }
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
