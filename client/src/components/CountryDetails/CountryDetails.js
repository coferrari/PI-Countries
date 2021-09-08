import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { clearCountryDetail, getCountryDetail } from '../../actions';

const CountryDetails = () => {
    const { alpha3code } = useParams();
    const { loading, countryDetails } = useSelector(state => state)
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        dispatch(getCountryDetail(alpha3code))
        return () => {
            dispatch(clearCountryDetail())
        }
    }, []);

    function handleClick() {
        history.push(`/home/countries`);
    }
    // function handleClick() {
    //     history.goBack();
    // }

    // validar solo en los que los datos puedan ser NULL, EL RESTO CREO QUE ES INNNECESARIO

    return (
        <>
            {loading && <div></div>}
            {countryDetails && <div>
                {countryDetails.alpha3code && <h2>{countryDetails.alpha3Code}</h2>}
                {countryDetails.name && <h3>{countryDetails.name}</h3>}
                {countryDetails.flag && <img src={countryDetails.flag} height="300px" />}
                <ul>
                    {countryDetails.capital && <li>{countryDetails.capital}</li>}
                    {countryDetails.region && <li>{countryDetails.region}</li>}
                    {countryDetails.area && <li>{countryDetails.area / 1000}</li>}
                    {countryDetails.population && <li>{countryDetails.population}</li>}
                    {countryDetails.Activities && countryDetails.Activities.map(activity => (
                        <div key={activity.id}>

                        <li>{activity.name}</li>
                        <li>{activity.duration}</li>
                        <li>{activity.season}</li>
                        <li>{activity.difficulty}</li>
                        </div>
                    ))}
                </ul>
            </div>}
            <button onClick={() => handleClick()}>Back to countries</button>
        </>
    );
}

export default CountryDetails;