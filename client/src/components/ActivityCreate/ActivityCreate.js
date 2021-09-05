import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllCountries, postActivities } from "../../actions/index";

function validate(input) {
  let errors = {};
  if (!input.name) errors.name = "* Name required";
  if (!input.difficulty) errors.difficulty = '1 to 5'
  if (!input.duration) input.duration = '30 to 180';
  if (!input.season) errors.season = "Select a season";
  if (!input.countryCode) errors.countryCode = 'Select at least one country'
  return errors;
}

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
  const [errors, setErrors] = useState({});

  // useEffect para que me traiga todos los paises y los pueda renderizar en el select cuando se monta el componente
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
    setErrors(
      validate({
        ...errors,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleRadio(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // setErrors(
    //   validate({
    //     ...errors,
    //     [e.target.name]: e.target.value
    //   })
    // )
  }

  function handleRange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // setErrors(
    //   validate({
    //     ...errors,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  }

  function handleRangeDuration(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // setErrors(
    //   validate({
    //     ...errors,
    //     [e.target.name]: e.target.value,
    //   })
    // );
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
    // setErrors(
    //   validate({
    //     ...errors,
    //     [e.target.name]: e.target.value,
    //   })
    // );
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
      ACTIVIDADES
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
          {errors.name && <p>{errors.name}</p>}
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
        </div>
        <div>
          difficulty
          <label htmlFor={input.value}></label>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            name="difficulty"
            defaultValue="1"
            onInput={(e) => handleRange(e)}
          ></input>
          <p>{input.difficulty}</p>
        </div>
        <div>
          duration
          <label htmlFor={input.value}></label>
          <input
            type="range"
            min="30"
            max="180"
            step="15"
            name="duration"
            defaultValue="30"
            onInput={(e) => handleRangeDuration(e)}
          ></input>
          <p>{input.duration}</p>
        </div>
        <select onChange={(e) => handleSelect(e)}>
          <option>Select a country</option>
          {countries?.map((country) => (
            <option key={country.alpha3Code} value={country.alpha3Code}>
              {country.name}
            </option>
          ))}
        </select>

        <br />
        <br />

        <ul>
          {input.countryCode?.map((country) => (
            <div key={country}>
              <li>{country}</li>
              <button onClick={() => handleRemove(country)}>X</button>
            </div>
          ))}
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
