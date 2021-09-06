import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../actions";
import ButtonBar from "../ButtonBar/ButtonBar";
import Countries from "../Countries/Countries";
import Pagination from "../Pagination/Pagination";

const Home = () => {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!countries.length) {
      dispatch(getCountries("countries", 1));
    }
  }, []); 

  return (
    <>
      <ButtonBar />
      <Pagination />
      <Countries />
    </>
  );
};

export default Home;

// VIEJO


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getCountries } from '../../actions'
// import Countries from '../Countries/Countries';

// const Home = () => {

    
//     const countries = useSelector(state => state.countries)
//     const dispatch = useDispatch();
    
    
//     // SELENE
//     // const [currentPage, setCurrentPage] = useState(1); //me guardo en un estado local la pagina actual
//     // const [countriesPerPage, setCountriesPerPage] = useState(10);
//     // const indexOfLastCountry = currentPage * countriesPerPage;
//     // const indexOfFirtsCountry = indexOfLastCountry - countriesPerPage;
//     // const currentCharacters = countries.slice(indexOfFirtsCountry, indexOfLastCountry);

//     // const paginado = (pageNumber) => {
//     //     setCurrentPage(pageNumber)
//     // }

//     let page = 1

//     useEffect(() => {
//         if (!countries.length) {
//             dispatch(getCountries('countries', page = page))
//         }
//     }, []); // [ ]para que solo corra cuando se monta el componente y no se genere un loop infinito de llamados

//     return (
//         <>
//             <Countries />
//         </>
//     );
// }

// export default Home;
