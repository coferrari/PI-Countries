import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectButton from "../SelectButton/SelectButton";
import { orderCountries, getActivities, filterActivities, searchCountries, orderCountriesFiltered } from "../../actions/";
import Countries from '../Countries/Countries';

const ButtonBar = () => {
  const [filter, setFilter] = useState("All Countries");
  const [order, setOrder] = useState("AtoZ");
  const [country, setCountry] = useState("");
  const [activity, setActivity] = useState("All Activities");
  const dispatch = useDispatch();
  const countries = useSelector((state) => state);
  const loading = useSelector((state) => state.loading);

  let [page, setPage] = useState(1);
  const regions = ["All Countries", "Africa", "Americas", "Asia", "Europe", "Oceania"];
  const sort = ["A to Z", "Z to A", "Population Up", "Population Down"];
  const activities = ["All Activities", "Summer", "Fall", "Winter", "Spring"];
  const totalCountries = countries.countCountries;
  const totalPages = [];
  for (let i = 1; i < Math.ceil(totalCountries / 9.75) + 1; i++) {
    totalPages.push(i);
  };

  console.log(filter, 'filter')
  console.log(order, 'order')
  const countriesMatch = useSelector(state => state)
  const totalCountriesMatch = countriesMatch.countCountriesMatch;
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const lastCountry = currentPage * countriesPerPage;
  const firstCountry = lastCountry - countriesPerPage;
  // if ()
  const currentCountries = typeof countries.countriesMatch !== 'string' && countries.countriesMatch.slice(firstCountry, lastCountry);
  
  const totalPagesMatch = [];
  for (let i = 0; i < Math.ceil(totalCountriesMatch / 10); i++) {
    totalPagesMatch.push(i + 1)
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setCountry(e.target.value);
  };

  const handleClickSearch = (e) =>{
    e.preventDefault();
    dispatch(searchCountries(country));
    setCountry('');
    setFilter('Search');
  };

  const handleClickActivities = (e) => {
    e.preventDefault();
    dispatch(getActivities())
  }

  const pagination = (page) => {
    setCurrentPage(page)
  }

  const handleChangeFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const handleChangeOrder = (e) => {
    e.preventDefault();
    setOrder(e.target.value.replace(/ /g, ""));
  };

  const handleChangeActivities = (e) => {
    e.preventDefault();
    setActivity(e.target.value);
  };

  const handleChangePage = (page) => {
    setPage(page);
  };

  // lo tuve que separar para que me resetee el valor de page una vez que selecciono otro filtro/orden
  useEffect(() => {
    if (filter === "All Countries") dispatch(orderCountries(order, 0))
    if (filter !== "All Countries" && filter !== "Search") dispatch(orderCountriesFiltered(filter, order,  0));
  }, [dispatch, filter, order]);

  useEffect(() => {
    if (activity === "All Activities") dispatch(getActivities());
    if (activity !== "All Activities") dispatch(filterActivities(activity.toLowerCase()));

  }, [dispatch, activity])

  useEffect(() => {
    if (filter !== "All Countries" && order) dispatch(orderCountriesFiltered(filter, order, page - 1))
    if (filter === "All Countries" && order) dispatch(orderCountries(order, page - 1));
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
            handleClickSearch(e);
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
          {sort.map((el) => (
            <SelectButton el={el} key={el} />
          ))}
        </select>
        <button onClick={(e) => handleClickActivities(e)}>See Activities</button>
        <select onChange={(e) => handleChangeActivities(e)}>
          {activities.map((el) => (
            <SelectButton el={el} key={el} />
          ))}
        </select>
      </div>
      <br />
      <br />
      {!loading && <div style={{ display: "flex" }}>
        {totalPages &&
          totalPages.map((page) => (
            <button key={page} onClick={() => handleChangePage(page)}>
              {page}
            </button>
          ))}
      </div>}
      {!loading && <div style={{ display: "flex" }}>
        {totalPagesMatch &&
          totalPagesMatch.map((page) => (
            <button key={page} onClick={() => pagination(page)}>
              {page}
            </button>
          ))}
      </div>}



      <Countries currentCountries={currentCountries}/>
      <br />
      <br />
    </>
  );
};

export default ButtonBar;
