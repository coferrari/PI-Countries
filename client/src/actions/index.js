import Axios from 'axios';
import {
    GET_COUNTRIES,
    GET_COUNTRY_DETAIL,
    SEARCH_COUNTRIES_REQUEST,
    SEARCH_COUNTRIES_SUCCESS,
    SEARCH_COUNTRIES_FAILURE,
    GET_ACTIVITIES,
    ADD_COUNTRY_FAV,
    REMOVE_COUNTRY_FAV,

    URL_COUNTRIES,
    URL_COUNTRIES_SEARCH_COUNTRY,
    URL_COUNTRY

} from './types';

export const getCountries = () => {
    return (dispatch) => {
        Axios.get(`${URL_COUNTRIES}`)
        .then(response => {
            dispatch({
                type: GET_COUNTRIES,
                payload: response.data
            })
        })
        // .catch(error => {

        // })
    }

};

export const getCountryDetail = (alpha3code) => {
    return (dispatch) => {
        Axios.get(`${URL_COUNTRY}${alpha3code}`)
        .then(response => {
            dispatch({
                type: GET_COUNTRY_DETAIL,
                payload: response.data
            })
        })
                // .catch(error => {

        // })
    }
}

export const searchCountriesRequest = () => {
    return {
        type: SEARCH_COUNTRIES_REQUEST
    }
};

export const searchCountriesSuccess = (name) => {
    return {
        type: SEARCH_COUNTRIES_SUCCESS,
        payload: name
    }
};

export const searchCountriesFailure = (error) => {
    return {
        type: SEARCH_COUNTRIES_FAILURE,
        payload: error
    }
};

// internamente va a retornar una funcion, y eso gracias a thunk va a enviar el dispatch
// no funciona el error
export const searchCountries = (name) => {
    return (dispatch) => {
        dispatch(searchCountriesRequest())
        // Axios.get(`${URL}/${page}`)
        Axios.get(`${URL_COUNTRIES_SEARCH_COUNTRY}${name}`)
        .then(response => {
            dispatch(searchCountriesSuccess(response.data))
        })
        .catch(error => {
            dispatch(searchCountriesFailure(error))
        })
    }
};

export const getActivities = (name) => {
    return {
        type: GET_ACTIVITIES,
        payload: {name}
    }
};

export const addCountryFav = (alpha3code) => {
    return {
        type: ADD_COUNTRY_FAV,
        payload: alpha3code
    }
};

export const removeCountryFav = (alpha3code) => {
    return {
        type: REMOVE_COUNTRY_FAV,
        payload: alpha3code
    }
};