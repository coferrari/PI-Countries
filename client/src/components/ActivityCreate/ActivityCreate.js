import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllCountries, postActivities } from "../../redux/actions/index";
import style from "./ActivityCreate.module.css";
import back from "../../img/back.png";

function validate(input) {
  let errors = {};
  if (!input.name) errors.name = "Name activity is required";
  if (!input.season) errors.season = "Select a season";
  if (!input.difficulty) errors.difficulty = "Select from 1 to 5";
  if (!input.duration) errors.duration = "Select above 0";
  if (!input.countryCode.length)
    errors.countryCode = "Select at least one country";
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

  useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleRadio(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleRange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleRangeDuration(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
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
      setErrors({
        ...errors,
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
      <div className={style.cointainerActivity}>
        <div className={style.bgActivity}>
          <Link to="/home/countries">
            <button className={style.btnback}>
              <img src={back} alt="img back" className={style.imgBtn} />
            </button>
          </Link>
          <div className={style.countrySelection}>
            <h2 className={style.titleActivity}>plan an activity</h2>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={style.sections}>
              <label className={style.labels}>name</label>
              <input
                className={style.inputName}
                type="text"
                value={input.name}
                name="name"
                placeholder="Activity"
                onChange={(e) => handleChange(e)}
              ></input>
              {errors.name && <p className={style.errors}>{errors.name}</p>}
            </div>
            <div>
              <h5 className={style.labels}>season</h5>
              {errors.season ? (
                <p className={style.errors}>{errors.season}</p>
              ) : null}
              <div className={style.options}>
                {seasons.map((season) => (
                  <div key={season}>
                    <label htmlFor={season} className={style.labelOptions}>
                      {season}
                      <input
                        type="radio"
                        value={season}
                        name="season"
                        onClick={(e) => handleRadio(e)}
                        className={style.radio}
                      ></input>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className={style.btnGrid}>
              <h5 className={style.labels}>difficulty</h5>
              <div>
                <label htmlFor={input.value}></label>
                <input
                  className={style.range}
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  name="difficulty"
                  defaultValue="0"
                  onInput={(e) => handleRange(e)}
                ></input>
              </div>
              {errors.difficulty ? (
                <p className={style.errors}>{errors.difficulty}</p>
              ) : null}
              <p className={style.labels}>{input.difficulty}</p>
            </div>
            <div className={style.btnGrid}>
              <h5 className={style.labels}>duration</h5>
              <div>
                <label htmlFor={input.value}></label>
                <input
                  className={style.range}
                  type="range"
                  min="15"
                  max="180"
                  step="15"
                  name="duration"
                  defaultValue="0"
                  onInput={(e) => handleRangeDuration(e)}
                ></input>
              </div>
              <p className={style.labels}>{input.duration}'</p>
              {errors.duration ? (
                <p className={style.errors}>{errors.duration}</p>
              ) : null}
            </div>
            <div className={style.countrySelection}>
              <h5 className={style.labels}>country</h5>
              <div className={style.select}>
                <select onChange={(e) => handleSelect(e)}>
                  <option>Select a country</option>
                  {countries?.map((country) => (
                    <option key={country.alpha3Code} value={country.alpha3Code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={style.countrySelection}>
                <ul>
                  {input.countryCode?.map((country) => (
                    <div key={country} className={style.countriesSelected}>
                      <li className={style.list}>{country}</li>
                      <button
                        onClick={() => handleRemove(country)}
                        className={style.btnClose}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </ul>
              </div>
              {errors.countryCode ? (
                <p className={style.errors}>{errors.countryCode}</p>
              ) : null}
            </div>

            <div className={style.containerBtn}>
              {input.name &&
                input.difficulty !== 0 &&
                input.duration !== 0 &&
                input.season &&
                input.countryCode.length >= 1 && (
                  <button type="submit" className={style.btnCreate}>
                    Create activity!
                  </button>
                )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ActivityCreate;
