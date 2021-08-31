import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCountries } from '../../actions'

const LandingPage = () => {
    return (
        <>
            <br/>
            <Link to='/home'>
               <button>Entrar</button>
            </Link>

        </>
    );
}

export default LandingPage;

