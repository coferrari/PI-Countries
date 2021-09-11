/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, conn } = require("../../src/db.js");

const agent = session(app);
const country = {
  name: "Argentina",
};

describe("Country routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Country.sync({ force: true }).then(() =>
      Country.create({
        alpha3Code: "ARG",
        name: "Argentina",
        flag: "https://restcountries.eu/data/arg.svg",
        region: "Americas",
        capital: "Buenos Aires",
        subregion: "South America",
        area: "2780400",
        population: 43590400,
      })
    )
  );
  describe("GET /countries", () => {
    it("should get 200", () => agent.get("/countries").expect(200));
  });

  describe("POST /activity", () => {
    it("should get 200", () => {
      agent
        .post("/activity")
        .send({
          name: "Iguazu Falls",
          season: "spring",
          duration: 180,
          difficulty: 2,
          countryCode: ["ARG", "BRA"],
        })
        .expect(200);
    });
    it("creates an activity in database", () => {
      agent
        .post("activity")
        .send({
          name: "Iguazu Falls",
          season: "spring",
          duration: 180,
          difficulty: 2,
          countryCode: ["ARG", "BRA"],
        })
        .then(() => {
          Activity.findOne({
            where: {
              name: "Iguazu Falls",
            },
          });
        })
        .then((activity) => {
          expect(activity).to.exist;
        });
    });
    it('correctly sets country/countries in database', () => {
      agent.post('/activity')
      .send({
        name: "Iguazu Falls",
        season: "spring",
        duration: 180,
        difficulty: 2,
        countryCode: ["ARG", "BRA"],
      })
      .then(() => {
        Activity.findOne({
          where: {
            name: 'Iguazu Falls'
          },
          include: {
            model: Country
          }
        });
      })
      .then((activity) => {
        expect(activity.countries[0].name).to.equal('Argentina');
        expect(activity.countries[1].name).to.equal('Brazil');

      })
    })
  });
});

