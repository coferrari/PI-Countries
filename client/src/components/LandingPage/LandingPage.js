import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../img/world_logo.png'

const LandingPage = () => {

    return (
        <>
            <br />
            <NavLink to='/home/countries'>
                <img src={Logo} width="300" height="300" alt='img not found' />
                <button>Entrar</button>
            </NavLink>

        </>
    );
}

export default LandingPage;


