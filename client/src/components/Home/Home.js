import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../../actions'
import Countries from '../Countries/Countries';

const Home = () => {

    const countries = useSelector(state => state.countries)

    let page = 1
    const dispatch = useDispatch();

    useEffect(() => {
        if (!countries.length) {
            dispatch(getCountries('countries', page = page))
        }
    }, []); // [ ]para que solo corra cuando se monta el componente y no se genere un loop infinito de llamados

    return (
        <>
            <Countries />
        </>
    );
}

export default Home;