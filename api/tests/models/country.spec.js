const { Country, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Country model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Country.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Country.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Country.create({ name: "Argentina" });
      });
    });
    describe("alpha3Code", () => {
      it("should not create country if alpha3code is null", () => {
        Country.create({
          name: "Argentina",
          flag: "https://restcountries.eu/data/arg.svg",
          region: "Americas",
          capital: "Buenos Aires",
          subregion: "South America",
          area: "2780400",
        })
        .then(() => done('Should not have been created'))
        .catch(() => done());
      });
      it("should not create country if alpha3code is not alpha", () => {
        Country.create({
          alpha3Code: "AR@1!",
          name: "Argentina",
          flag: "https://restcountries.eu/data/arg.svg",
          region: "Americas",
          capital: "Buenos Aires",
          subregion: "South America",
          area: "2780400",
        })
        .then(() => done('Should not have been created'))
        .catch(() => done());
      });
    });
    describe("flag", () => {
      it("should not create country if flag is null", () => {
        Country.create({
          alpha3Code: "ARG",
          name: "Argentina",
          region: "Americas",
          capital: "Buenos Aires",
          subregion: "South America",
          area: "2780400",
        })
        .then(() => done('Should not have been created'))
        .catch(() => done());
      });
    })
    
  });
  
});
