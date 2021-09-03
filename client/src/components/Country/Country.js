import React from 'react';
import { Link } from 'react-router-dom';

// const Country = ({name, flag, region, key}) => {
const Country = ({ alpha3Code, name, flag, region}) => {
    // console.log(props)
    return (
        <div>
            <li>
                <Link to={`/country/${alpha3Code}`}>{name}</Link>
            </li>
            <img src={flag} alt={`Flag ${name}`} height='200px' />
            <p>{region}</p>
        </div>
    )
}

export default Country;