import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { clearCountryDetail, getCountryDetail } from "../../actions";
import style from "./CountryDetails.module.css";
import back from "../../img/back.png";

const CountryDetails = () => {
  const { alpha3code } = useParams();
  const { loading, countryDetails } = useSelector((state) => state);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(getCountryDetail(alpha3code));
    return () => {
      dispatch(clearCountryDetail());
    };
  }, []);

  const handleClick = () => {
    history.push(`/home/countries`);
  };

  const format = (num) => {
    num = num + "";
    var str = "";
    for (var i = num.length - 1, j = 1; i >= 0; i--, j++) {
      if (j % 3 === 0 && i != 0) {
        str += num[i] + ".";
        continue;
      }
      str += num[i];
    }
    return str.split("").reverse().join("");
  };

  return (
    <>
      <div className={style.loading}>
        {loading && <div className={style.loader}></div>}
      </div>
      {!loading && 
      <div className={style.container}>
        {countryDetails && countryDetails.name && (
          <h2 className={style.countryTitle}>{countryDetails.name}</h2>
        )}
        <div className={style.detailsContainer}>
          <div className={style.cards}>
            {countryDetails && countryDetails.flag && (
              <img
                src={countryDetails.flag}
                alt={countryDetails.name}
                className={style.flag}
              />
            )}
          </div>

          <div className={style.cards}>
            {countryDetails && (
              <div>
                <ul>
                  {countryDetails.alpha3Code && (
                    <li className={style.items}>
                      ALPHA-3:
                      <span className={style.highlight}>
                        {countryDetails.alpha3Code}
                      </span>
                    </li>
                  )}
                  {countryDetails.capital && (
                    <li className={style.items}>
                      Capital:{" "}
                      <span className={style.highlight}>
                        {countryDetails.capital}
                      </span>
                    </li>
                  )}
                  {countryDetails.region && (
                    <li className={style.items}>
                      Region:{" "}
                      <span className={style.highlight}>
                        {countryDetails.region}
                      </span>
                    </li>
                  )}
                  {countryDetails.subregion && (
                    <li className={style.items}>
                      Subregion:{" "}
                      <span className={style.highlight}>
                        {countryDetails.subregion}
                      </span>
                    </li>
                  )}
                  {countryDetails.area && (
                    <li className={style.items}>
                      Area:{" "}
                      <span className={style.highlight}>
                        {format(countryDetails.area)} km2
                      </span>
                    </li>
                  )}
                  {countryDetails.population && (
                    <li className={style.items}>
                      Population:{" "}
                      <span className={style.highlight}>
                        {format(countryDetails.population) === 0
                          ? null
                          : format(countryDetails.population)}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className={style.cards}>
            {!loading && countryDetails && (
              <h3 className={style.subtitles}>Activities</h3>
            )}
            {countryDetails.Activities &&
              countryDetails.Activities.map((activity) => (
                <div key={activity.id}>
                  <h4 className={style.items}>{activity.name}</h4>
                  <Link to="/createactivity">
                    plan another activity in {countryDetails.name}
                  </Link>
                </div>
              ))}
            {countryDetails.Activities &&
              countryDetails.Activities.length === 0 && (
                <div>
                  <div className={style.items}>No planned activities</div>
                  {/* <Link to="/createactivity" className={style.linkPlan}>
                plan an activity
              </Link> */}
                </div>
              )}
          </div>
        </div>
        <div>
          <button className={style.btnback} onClick={() => handleClick()}>
            <img className={style.imgBtn} src={back} />
          </button>
        </div>
      </div>
    }
    </>
  );
};

export default CountryDetails;
