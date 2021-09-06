import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Country from "../Country/Country";
import { useLocation } from "react-router-dom";
import { filterRegion, getCountries, orderCountries } from "../../actions/";

const Countries = () => {
  const state = useSelector(state => state);

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
      {state.error && <span>{state.error}</span>}
    </>
  );
};

export default Countries;


// VIEJO

// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Country from "../Country/Country";
// import { useLocation } from "react-router-dom";

// import { filterRegion, getCountries, orderCountries } from "../../actions/";

// // si pongo un nombre mal, rompe
// const Countries = () => {
//   const state = useSelector((state) => state);

//   const dispatch = useDispatch();
//   const { pathname } = useLocation();

//   const path = pathname.split("/").pop();

//   // useEffect(() => {
//   //     if (path === 'All') {
//   //         let page = 1
//   //         dispatch(getCountries(page))
//   //     }
//   // }, [])
//   // useEffect(() => {
//   //     if (path === 'Africa' || path === 'Americas' || path === 'Asia' || path === 'Europe' || path === 'Oceania') {
//   //         dispatch(filterRegion(path, 2))  // 0 para que me traiga los primeros resultados, y dsp desde el paginado voy obteniendo los siguientes
//   //     }
//   //     if (path === 'AtoZ' || path === 'ZtoA' || path === 'PopulationUp'|| path === 'PopulationDown') {
//   //         dispatch(orderCountries(path, 0))
//   //     }
//   // }, [path])
//   useEffect(() => {
//     if (path === "All") {
//       let page = 1;
//       dispatch(getCountries(page));
//     }
//     if (
//       path === "Africa" ||
//       path === "Americas" ||
//       path === "Asia" ||
//       path === "Europe" ||
//       path === "Oceania"
//     ) {
//       dispatch(filterRegion(path, 0)); // 0 para que me traiga los primeros resultados, y dsp desde el paginado voy obteniendo los siguientes
//     }
//     if (
//       path === "AtoZ" ||
//       path === "ZtoA" ||
//       path === "PopulationUp" ||
//       path === "PopulationDown"
//     ) {
//       dispatch(orderCountries(path, 0));
//     }
//     // })
//   }, [path]);

//   // ver tema de error, sino sacar del estado
//   return (
//     <>
//       {state.loading && <div>Loading...</div>}
//       {state.countries.length >= 1 &&
//         state.countries.map((country) => (
//           <Country
//             name={country.name}
//             flag={country.flag}
//             region={country.region}
//             alpha3Code={country.alpha3Code}
//             key={country.alpha3Code}
//           />
//         ))}
//       {state.error && <span>{state.error}</span>}
//     </>
//   );
// };

// export default Countries;

