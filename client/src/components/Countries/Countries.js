import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Country from '../Country/Country';

// si pongo un nombre mal, rompe
const Countries = () => {

    // tengo que llamar al estado actual
    const state = useSelector(state => state);
    // const dispatch = useDispatch();      para eventualmente agregar a favoritos

    // ver tema de error, sino sacar del estado
    return (
        <>
            {state.loading && <div>Loading...</div>}
            {console.log(state)}

            {state.countries.length >= 1 && state.countries.map(country =>
                <Country
                    name={country.name}
                    flag={country.flag}
                    region={country.region}
                    alpha3Code={country.alpha3Code}
                    key={country.alpha3Code}
                />
            )}
            {state.error && <span>{state.error}</span>}
        </>
    );
}

export default Countries;