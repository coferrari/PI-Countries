const { Router } = require("express");
const { Country, Activity } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: {
        model: Country,
        attributes: ["name", "flag"],
        through: {
          attributes: [],
        },
      },
    });
    if (!activities.length) {
      res.send("No activities planned");
    } else {
      res.send(activities);
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async function (req, res) {
  let { name, difficulty, duration, season, countryCode } = req.body;
  name = name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();

  if (name && difficulty && duration && season && countryCode) {
    try {
      const activity = await Activity.findOrCreate({
        where: {
          name: name,
          difficulty: difficulty,
          duration: duration,
          season: season,
        },
      });
      if (countryCode.length === 1) {
        const country = await Country.findOne({
          where: {
            alpha3Code: countryCode[0],
          },
        });
        await activity[0].addCountry(country); 
        res.send(country);
      }
      if (countryCode.length > 1) {
        await activity[0].addCountries(countryCode);
        res.send(countryCode);
      }
    } catch (error) {
      res.send(error);
    }
  } else {
    res.send("Missing parameters");
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.destroy({
      where: {
        id: id
      }
    })
    res.json(activity)
  } catch (error) {
    res.send(error)
  }
});

module.exports = router;
