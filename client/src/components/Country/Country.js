import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Country = ({name, flag, region}) => {
    return (
        <div>
            <li>
                <Link to='/country/:alpha3code'>{name}</Link>
            </li>
            <img src={flag} alt={`Flag ${name}`} height='200px' />
            <p>{region}</p>
        </div>
    )


}

export default Country;