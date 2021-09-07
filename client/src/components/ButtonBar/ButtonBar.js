import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectButton from "../SelectButton/SelectButton";
import { filterRegion, getCountries, orderCountries, getActivities, filterActivities, searchCountries } from "../../actions/";
import { Link } from "react-router-dom";
import Countries from '../Countries/Countries';

const ButtonBar = () => {
  const [state, setState] = useState("All Countries");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const countries = useSelector((state) => state);

  let [page, setPage] = useState(1);
  const regions = ["All Countries", "Africa", "Americas", "Asia", "Europe", "Oceania"];
  const alphaOrder = ["A to Z", "Z to A"];
  const popOrder = ["Population Up", "Population Down"];
  const activities = ["All Activities", "Summer", "Fall", "Winter", "Spring"];
  const totalCountries = countries.countCountries;
  const totalPages = [];
  for (let i = 1; i < Math.round(totalCountries / 9.5) + 1; i++) {
    totalPages.push(i);
  };

  const countriesMatch = useSelector(state => state)
  const totalCountriesMatch = countriesMatch.countCountriesMatch;
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const lastCountry = currentPage * countriesPerPage;
  const firstCountry = lastCountry - countriesPerPage;
  const currentCountries = countries.countriesMatch.slice(firstCountry, lastCountry);
  
  const totalPagesMatch = [];
  for (let i = 0; i < Math.ceil(totalCountriesMatch / 10); i++) {
    totalPagesMatch.push(i + 1)
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setCountry(e.target.value);
  };

  const handleClick = (e) =>{
    e.preventDefault();
    dispatch(searchCountries(country));
    setCountry('');
    setState('Search');
  };

  const pagination = (page) => {
    setCurrentPage(page)
  }

  const handleChangeFilter = (e) => {
    e.preventDefault();
    setState(e.target.value);
  };

  const handleChangeOrder = (e) => {
    e.preventDefault();
    setState(e.target.value.replace(/ /g, ""));
  };

  const handleChangeActivities = (e) => {
    e.preventDefault();
    setState(e.target.value);
  };

  const handleChangePage = (page) => {
    setPage(page);
  };

  // lo tuve que separar para que me resetee el valor de page una vez que selecciono otro filtro/orden
  useEffect(() => {
    if (state === "All Countries"
    )
      dispatch(getCountries("countries", 1));
    if (
      state === "Africa" ||
      state === "Americas" ||
      state === "Asia" ||
      state === "Europe" ||
      state === "Oceania"
    )
      dispatch(filterRegion(state, 0));
    if (
      state === "AtoZ" ||
      state === "ZtoA" ||
      state === "PopulationUp" ||
      state === "PopulationDown"
    )
      dispatch(orderCountries(state, 0));
    if (
      state === "All Activities"
    )
      dispatch(getActivities())

    if (
      state === "Summer" ||
      state === "Fall" ||
      state === "Winter" ||
      state === "Spring"
    )
      dispatch(filterActivities(state.toLowerCase()))

  }, [dispatch, state]);

  useEffect(() => {
    if (state === "All Countries"
    )
      dispatch(getCountries("countries", page));
    if (
      state === "Africa" ||
      state === "Americas" ||
      state === "Asia" ||
      state === "Europe" ||
      state === "Oceania"
    )
      dispatch(filterRegion(state, page - 1));
    if (
      state === "AtoZ" ||
      state === "ZtoA" ||
      state === "PopulationUp" ||
      state === "PopulationDown"
    )
      dispatch(orderCountries(state, page - 1));
  }, [dispatch, page]);

  return (
    <>
      <div style={{ backgroundColor: "blue" }}>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => {
            handleInputChange(e);
          }}
        ></input>
        <button
          type="submit"
          disabled={!country}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Search
      </button>
        <select onChange={(e) => handleChangeFilter(e)}>
          {regions.map((el) => (
            <SelectButton el={el} key={el} />
          ))}
        </select>
        <select onChange={(e) => handleChangeOrder(e)}>
          {alphaOrder.map((el) => (
            <SelectButton el={el} key={el} />
          ))}
        </select>
        <select onChange={(e) => handleChangeOrder(e)}>
          {popOrder.map((el) => (
            <SelectButton el={el} key={el} />
          ))}
        </select>
        <select onChange={(e) => handleChangeActivities(e)}>
          {activities.map((el) => (
            <SelectButton el={el} key={el} />
          ))}
        </select>
      </div>
      <Link to="/activities">Create activity</Link>
      <br />
      <br />
      <div style={{ display: "flex" }}>
        {totalPages &&
          totalPages.map((page) => (
            <button key={page} onClick={() => handleChangePage(page)}>
              {page}
            </button>
          ))}
      </div>
      <div style={{ display: "flex" }}>
        {totalPagesMatch &&
          totalPagesMatch.map((page) => (
            <button key={page} onClick={() => pagination(page)}>
              {page}
            </button>
          ))}
      </div>

      <Countries currentCountries={currentCountries}/>
      <br />
      <br />
    </>
  );
};

export default ButtonBar;
