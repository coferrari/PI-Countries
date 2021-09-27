import React from "react";
import { useSelector } from "react-redux";
import Country from "../Country/Country";
import style from "./Countries.module.css";

const Countries = ({ currentCountries }) => {
  const state = useSelector((state) => state);

  return (
    <>
      {state.loading && <div>Loading...</div>}
      <div className={style.center}>
      <div className={style.countriesContainer}>
        {state.countries.length >= 1 &&
          state.countries.map((country) => (
            <div key={country.alpha3Code}>
              <Country
                name={country.name}
                flag={country.flag}
                region={country.region}
                alpha3Code={country.alpha3Code}
                key={country.alpha3Code}
                capital={country.capital}
              />
            </div>
          ))}
      </div>
      </div>
      <div className={style.center}>
      <div className={style.countriesContainer}>
        {!state.loading &&
          currentCountries &&
          currentCountries?.map((country) => (
            <Country
              name={country.name}
              flag={country.flag}
              region={country.region}
              alpha3Code={country.alpha3Code}
              key={country.alpha3Code}
              capital={country.capital}
            />
          ))}
      </div>
      </div>
      <div className={style.center}>
      <div className={style.noMatch}>
        {!state.loading &&
          !state.currentCountries &&
          typeof state.countriesMatch === "string" && (
            <div>{state.countriesMatch}</div>
          )}
      </div>
      </div>
    </>
  );
};

export default Countries;
