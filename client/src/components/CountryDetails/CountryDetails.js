import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCountryDetail } from '../../actions'

const CountryDetails = () => {

    const state = useSelector(state => state.CountryDetails)

    useEffect(() => {
        getCountryDetail(state)
    })

    return (
        <>
        COUNTRY DETAILS
        </>
    );
}
 
export default CountryDetails;