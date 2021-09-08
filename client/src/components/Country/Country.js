import React from "react";
import { Link } from "react-router-dom";

// const Country = ({name, flag, region, key}) => {
const Country = ({ alpha3Code, name, flag, region }) => {
  return (
    <div>
      <Link to={`/country/${alpha3Code}`}>
        <h4>{name}</h4>
        <img src={flag} alt={`Flag ${name}`} height="100px" />
        <p>{region}</p>
      </Link>
    </div>
  );
};

export default Country;
