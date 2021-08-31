import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCountries } from '../../actions'

// como este componente va a despachar acciones, tenemos que invocar al dispatch

const SearchBar = () => {
    const dispatch = useDispatch();
    const [country, setCountry] = useState('');
    return (
        <>
            SEARCH BAR
            <label>Search:</label>
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
                }}
            >
                Search
                </button>
        </>
    );
}

export default SearchBar;