import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Country from "../Country/Country";
import { clearCountryDetail } from '../../actions/index';

const Countries = ({currentCountries}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
   console.log(state)
   console.log(currentCountries)

   useEffect(() => {
    return () => {
        dispatch(clearCountryDetail())
    }
}, []);
  // ver tema de error, sino sacar del estado
  return (
    <>
      {state.loading && <div>Loading...</div>}
      {state.countries.length >= 1 &&
        state.countries.map((country) => (
          <Country
            name={country.name}
            flag={country.flag}
            region={country.region}
            alpha3Code={country.alpha3Code}
            key={country.alpha3Code}
          />
        ))}
      {!state.loading && currentCountries && currentCountries?.map((country) => (
        <Country
            name={country.name}
            flag={country.flag}
            region={country.region}
            alpha3Code={country.alpha3Code}
            key={country.alpha3Code}
          />
      ))}
      {!state.loading && !state.currentCountries && typeof state.countriesMatch === 'string' && <div>{state.countriesMatch}</div>}
    </>
  );
};

export default Countries;


