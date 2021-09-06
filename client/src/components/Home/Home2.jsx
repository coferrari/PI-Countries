import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries } from '../../actions';
import Pagination2 from '../Pagination/Pagination.js';
import Country from '../Country/Country';
import { Link } from 'react-router-dom';

const HomeS = () => {

    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.countries);
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(10);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirtsCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirtsCountry, indexOfLastCountry);

    function pagination(pageNumber) {
        setCurrentPage(pageNumber)
    }
    
    // useEffect para disparar la accion y llenar el estado
    useEffect(() => {
        dispatch(getAllCountries())
    }, [dispatch])

    return (
        <>
        <Pagination2 
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            pagination={pagination}
        />
        {currentCountries?.map (country => (
            <div>
                <Link to={`/home/${country.alpha3Code}`}>
                <Country 
                alpha3Code={country.alpha3Code} 
                name={country.name} 
                flag={country.flag} 
                region={country.region}/>
                </Link>
            </div>
        ))}
        </>
    );
}
 
export default HomeS;