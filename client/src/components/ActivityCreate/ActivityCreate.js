import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllCountries, postActivities } from "../../actions/index";

const ActivityCreate = () => {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  const history = useHistory();
  const seasons = ["summer", "fall", "winter", "spring"];
  const [input, setInput] = useState({
    name: "",
    difficulty: 0,
    duration: 0,
    season: "",
    countryCode: [],
  });
  const [error, setError] = useState({
    name: "Name required",
    difficulty: "Select from 1 to 5",
    duration: "Select above 0",
    season: "Select a season",
    countryCode: "Select at least one Country",
  });

  useEffect(() => {
    if (countries) {
      dispatch(getAllCountries());
    }
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if (e.target.value) {
      setError({
        ...error,
        name: "",
      });
    }
  }

  function handleRadio(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if (e.target.value) {
      setError({
        ...error,
        season: "",
      });
    }
  }

  function handleRange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if (e.target.value) {
      setError({
        ...error,
        difficulty: "",
      });
    }
  }

  function handleRangeDuration(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if (e.target.value) {
      setError({
        ...error,
        duration: "",
      });
    }
  }

  function handleSelect(e) {
    setInput({
      ...input,
      countryCode: [...input.countryCode, e.target.value]
        .filter((country) => country !== "Select a country")
        .reduce((acc, item) => {
          if (!acc.includes(item)) {
            acc.push(item);
          }
          return acc;
        }, []),
    });
    if (!input.countryCode.length) {
      setError({
        ...error,
        countryCode: "",
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postActivities(input));
    alert("Activity Created!");
    setInput({
      name: "",
      difficulty: 0,
      duration: 0,
      season: "",
      countryCode: [],
    });
    history.push("/home/countries");
  }

  function handleRemove(country) {
    setInput({
      ...input,
      countryCode: input.countryCode.filter((code) => code !== country),
    });
  }

  return (
    <>
      <Link to="/home">
        <button>Back to Countries</button>
      </Link>
      <h2>Create activity</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Activity</label>
          <input
            type="text"
            value={input.name}
            name="name"
            placeholder="Activity"
            onChange={(e) => handleChange(e)}
          ></input>
          {error.name ? <p>{error.name}</p> : null}
        </div>
        <div>
          {seasons.map((season) => (
            <div key={season}>
              <label htmlFor={season}>{season}</label>
              <input
                type="radio"
                value={season}
                name="season"
                onClick={(e) => handleRadio(e)}
              ></input>
            </div>
          ))}
          {error.season ? <p>{error.season}</p> : null}
        </div>
        <div>
          difficulty
          <label htmlFor={input.value}></label>
          <input
            type="range"
            min="0"
            max="5"
            step="1"
            name="difficulty"
            defaultValue="0"
            onInput={(e) => handleRange(e)}
          ></input>
          {error.difficulty ? <p>{error.difficulty}</p> : null}
          <p>{input.difficulty}</p>
        </div>
        <div>
          duration
          <label htmlFor={input.value}></label>
          <input
            type="range"
            min="0"
            max="180"
            step="15"
            name="duration"
            defaultValue="0"
            onInput={(e) => handleRangeDuration(e)}
          ></input>
          <p>{input.duration}</p>
          {error.duration ? <p>{error.duration}</p> : null}
        </div>
        <select onChange={(e) => handleSelect(e)}>
          <option>Select a country</option>
          {countries?.map((country) => (
            <option key={country.alpha3Code} value={country.alpha3Code}>
              {country.name}
            </option>
          ))}
        </select>
        <ul>
          {input.countryCode?.map((country) => (
            <div key={country}>
              <li>{country}</li>
              <button onClick={() => handleRemove(country)}>X</button>
            </div>
          ))}
          {error.countryCode ? <p>{error.countryCode}</p> : null}
        </ul>
        {input.name &&
          input.difficulty !== 0 &&
          input.duration !== 0 &&
          input.season &&
          input.countryCode.length >= 1 && (
            <button type="submit">Create activity!</button>
          )}
      </form>
    </>
  );
};

export default ActivityCreate;
