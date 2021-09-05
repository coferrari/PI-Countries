import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'
import { clearCountryDetail, getCountryDetail } from '../../actions'

const CountryDetails = () => {
    const { alpha3code } = useParams();
    const state = useSelector(state => state)
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        dispatch(getCountryDetail(alpha3code))
        return () => {
            dispatch(clearCountryDetail())
        }
    }, []);

    // falta map de activities
    // loading no seria necesario con el useEffect, ver de sacar
    // validar solo en los que los datos puedan ser NULL, EL RESTO CREO QUE ES INNNECESARIO

    return (
        <>
            {state.detailsLoading && <div></div>}
            {state.countryDetails && <div>
                {state.countryDetails.alpha3code && <h2>{state.countryDetails.alpha3Code}</h2>}
                {state.countryDetails.name && <h3>{state.countryDetails.name}</h3>}
                {state.countryDetails.flag && <img src={state.countryDetails.flag} height="300px" />}
                <ul>
                    {state.countryDetails.capital && <li>{state.countryDetails.capital}</li>}
                    {state.countryDetails.region && <li>{state.countryDetails.region}</li>}
                    {state.countryDetails.area && <li>{state.countryDetails.area / 1000}</li>}
                    {state.countryDetails.population && <li>{state.countryDetails.population}</li>}
                    {state.countryDetails.Activities && state.countryDetails.Activities.map(activity => (
                        <div>

                        <li>{activity.name}</li>
                        <li>{activity.duration}</li>
                        <li>{activity.season}</li>
                        <li>{activity.difficulty}</li>
                        </div>
                    ))}
                </ul>
            </div>}
            <button onClick={() => history.goBack()}>Go back</button>
        </>
    );
}

export default CountryDetails;