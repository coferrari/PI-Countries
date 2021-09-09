import React from "react";
import { Link } from "react-router-dom";
import style from "./Country.module.css";

// const Country = ({name, flag, region, key}) => {
const Country = ({ alpha3Code, name, flag, region, capital }) => {
  return (
    <Link to={`/country/${alpha3Code}`} className={style.cardLink}>
      <div className={style.container}>
        <div>
          <img src={flag} alt={`Flag ${name}`} className={style.flag} />
        </div>
        <div className={style.cardText}>
          <h4 className={style.cardTitle}>{name}</h4>
          <p>capital: {capital ? capital : "-"}</p>
          <p>region: {region}</p>
        </div>
      </div>
    </Link>
  );
};

export default Country;
