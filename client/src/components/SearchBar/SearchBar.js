import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountries } from "../../actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setCountry(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(searchCountries(country));
    setCountry('');
  }
  return (
    <>
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
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Search
      </button>
    </>
  );
};

export default SearchBar;
