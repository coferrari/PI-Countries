import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectButton from "../SelectButton/SelectButton";
import { orderCountries, getActivities, filterActivities, searchCountries, orderCountriesFiltered } from "../../actions/";
import Countries from '../Countries/Countries';
import Activities from '../Activitites/Activities';
import { Link } from "react-router-dom";

const Home = () => {
  // ver de acomodar todo dentro de un objeto
  const [filter, setFilter] = useState("All Countries");
  const [order, setOrder] = useState("AtoZ");
  const [country, setCountry] = useState("");
  const [activity, setActivity] = useState("All Activities");
  const [selected, setSelected] = useState(false);

  const dispatch = useDispatch();

  const { countCountries, countCountriesMatch, countriesMatch, loading } = useSelector(state => state);

  let [page, setPage] = useState(1);
  const regions = ["All Countries", "Africa", "Americas", "Asia", "Europe", "Oceania"];
  const sort = ["A to Z", "Z to A", "Population Up", "Population Down"];
  const activities = ["All Activities", "Summer", "Fall", "Winter", "Spring"];

  const totalPages = [];
  for (let i = 1; i < Math.ceil(countCountries / 9.75) + 1; i++) {
    totalPages.push(i);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const lastCountry = currentPage * countriesPerPage;
  const firstCountry = lastCountry - countriesPerPage;
  const currentCountries = typeof countriesMatch !== 'string' && countriesMatch.slice(firstCountry, lastCountry);

  const totalPagesMatch = [];
  for (let i = 0; i < Math.ceil(countCountriesMatch / 10); i++) {
    totalPagesMatch.push(i + 1)
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setCountry(e.target.value);
  };

  const handleClickSearch = (e) => {
    e.preventDefault();
    dispatch(searchCountries(country));
    setCountry('');
    setFilter('Search');
  };

  const handleChangeFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const handleChangeOrder = (e) => {
    e.preventDefault();
    setOrder(e.target.value.replace(/ /g, ""));
  };

  const handleClickActivities = (e) => {
    e.preventDefault();
    selected ? setSelected(false) : setSelected(true)
  };

  const handleChangeActivities = (e) => {
    e.preventDefault();
    setActivity(e.target.value);
  };

  const handleChangePage = (page) => {
    setPage(page);
  };

  const pagination = (page) => {
    setCurrentPage(page)
  };

  // lo tuve que separar para que me resetee el valor de page una vez que selecciono otro filtro/orden // hace que orderCountries se despache 2 veces

  useEffect(() => {
    if (filter === "All Countries" && order) dispatch(orderCountries(order, 0))
    if (filter !== "All Countries" && filter !== "Search") dispatch(orderCountriesFiltered(filter, order, 0));
  }, [dispatch, filter, order]);

  useEffect(() => {
    if (filter === "All Countries" && order) dispatch(orderCountries(order, page - 1));
    if (filter !== "All Countries" && filter !== "Search" && order) dispatch(orderCountriesFiltered(filter, order, page - 1))
  }, [dispatch, page]);

  return (
    <>
      <div style={{ backgroundColor: "blue" }}>
    {!selected &&
    <>
        <input
          type="text"
          placeholder="Search country..."
          value={country}
          onChange={(e) => {
            handleInputChange(e);
          }}
        ></input>
    </> 
    }
    {country &&
    <button
          type="submit"
          onClick={(e) => {
            handleClickSearch(e);
          }}
        >
          Search
      </button>}
    {selected && <Link to='/activity'></Link> }
      {!selected && 
      <>
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
        </>
      }
        {selected && 
          <>
          <Link to='/createactivity'> <button>Create activity!!</button></Link>
        <select onChange={(e) => handleChangeActivities(e)}>
          {activities.map((el) => (
            <SelectButton el={el} key={el} />
          ))}
        </select>
        </>
        }
        <button onClick={(e) => handleClickActivities(e)}>{selected ? <Link to='/home/countries'>BACK TO COUNTRIES</Link>
         : <Link to='/activities'>EXPLORE ACTIVITIES</Link>}</button>
      </div>
      <br />
      <br />
      {!loading && !selected && <div style={{ display: "flex" }}>
        {totalPages &&
          totalPages.map((page) => (
            <button key={page} onClick={() => handleChangePage(page)}>
              {page}
            </button>
          ))}
      </div>}
      {!loading && !selected && <div style={{ display: "flex" }}>
        {totalPagesMatch &&
          totalPagesMatch.map((page) => (
            <button key={page} onClick={() => pagination(page)}>
              {page}
            </button>
          ))}
      </div>}
      {!selected &&
        <Countries currentCountries={currentCountries} />
      }
      {selected && 
      <Activities activity={activity}/>
      }
      <br />
      <br />
    </>
  );
};

export default Home;
