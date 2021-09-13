import React from "react";
import { Link } from "react-router-dom";
import style from "./Activity.module.css";

const Activity = ({
  handleClose,
  id,
  name,
  duration,
  difficulty,
  season,
  Countries,
}) => {
  return (
    <div key={id} className={style.container}>
      <div className={style.containerBtn}>
        <button onClick={() => handleClose(id)} className={style.btnClose}>
          X
        </button>
      </div>
      <div className={style.activity}>
        <div className={style.activity}>
          <h2 className={style.titleActivity}>{name}</h2>
        </div>
        <div className={style.cardSubtitle}>details:</div>
        <ul className={style.cardText}>
          <li className={style.cardList}>
            season: <span className={style.cardHighlight}>{season}</span>
          </li>
          <li className={style.cardList}>
            difficulty:{" "}
            <span className={style.cardHighlight}>{difficulty}</span>
          </li>
          <li className={style.cardList}>
            duration: <span className={style.cardHighlight}>{duration}'</span>
          </li>
        </ul>
        <div className={style.cardSubtitle}>where?</div>

        <div className={style.flagContainer}>
          {Countries?.map((country) => (
            <div key={country.name}>
              <ul className={style.activity}>
                <li className={style.cardText}>{country.name}</li>
                <Link
                  to={`/country/${country.alpha3Code}`}
                  className={style.flagC}
                >
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className={style.flag}
                  />
                </Link>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;
