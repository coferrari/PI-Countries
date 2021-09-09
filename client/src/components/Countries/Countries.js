import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Country from "../Country/Country";
import { clearCountryDetail } from "../../actions/index";
import style from "./Countries.module.css";

const Countries = ({ currentCountries }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // no se por que lo puse aca ????????
  //    useEffect(() => {
  //     return () => {
  //         dispatch(clearCountryDetail())
  //     }
  // }, []);
  // ver tema de error, sino sacar del estado
  return (
    <>
      {state.loading && <div>Loading...</div>}
      <div className={style.countriesContainer}>
        {state.countries.length >= 1 &&
          state.countries.map((country) => (
            <div>
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
        {!state.loading &&
          !state.currentCountries &&
          typeof state.countriesMatch === "string" && (
            <div>{state.countriesMatch}</div>
          )}
      </div>
    </>
  );
};

export default Countries;
