import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCountries } from '../../actions'

// como este componente va a despachar acciones, tenemos que invocar al dispatch

const SearchBar = () => {
    const dispatch = useDispatch();
    const [country, setCountry] = useState('');
    return (
        <>
            <input
                type='text'
                value={country}
                onChange={e => {
                    setCountry(e.target.value)
                }}
            >
            </input>
            <button
                onClick={() => {
                    dispatch(searchCountries(country))
                    // setCountry('')
                }}
            >
                Search
                </button>
        </>
    );
}

export default SearchBar;