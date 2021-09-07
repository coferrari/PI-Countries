import Axios from 'axios';
import {
    GET_COUNTRIES,
    GET_COUNTRY_DETAIL_REQUEST,
    GET_COUNTRY_DETAIL_SUCCESS,
    CLEAR_COUNTRY_DETAIL,
    SEARCH_COUNTRIES_REQUEST,
    SEARCH_COUNTRIES_SUCCESS,
    SEARCH_COUNTRIES_FAILURE,
    GET_ACTIVITIES,
    POST_ACTIVITY,
    ADD_COUNTRY_FAV,
    REMOVE_COUNTRY_FAV,
    FILTER_REGION,
    FILTER_ACTIVITIES,
    ORDER_COUNTRIES,

    URL_COUNTRIES,
    URL_COUNTRIES_SEARCH_COUNTRY,
    URL_COUNTRY,
    URL_FILTER_REGION,
    URL_ORDER,
    URL_POST_ACTIVITY,
    URL_GET_ACTIVITIES

} from './types';


export const getCountries = (path, page) => {
    return (dispatch) => {
        Axios.get(`${URL_COUNTRIES}/${path}/${page}`)
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
//
export const getAllCountries = () => {
    return (dispatch) => {
        Axios.get(`${URL_COUNTRIES}/countries`)
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

export const getCountryDetailRequest = () => {
    return {
        type: GET_COUNTRY_DETAIL_REQUEST
    }
};

export const getCountryDetailSuccess = (alpha3Code) => {
    return {
        type: GET_COUNTRY_DETAIL_SUCCESS,
        payload: alpha3Code
    }
};

export const getCountryDetail = (alpha3code) => {
    return (dispatch) => {
        dispatch(getCountryDetailRequest())
        Axios.get(`${URL_COUNTRY}${alpha3code}`)
            .then(response => {
                dispatch(getCountryDetailSuccess(response.data))
            })
        // .catch(error => {

        // })
    }
}

export const clearCountryDetail = () => {
    return {
        type: CLEAR_COUNTRY_DETAIL
    }
};

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
        Axios.get(`${URL_COUNTRIES_SEARCH_COUNTRY}${name}`)
            .then(response => {
                dispatch(searchCountriesSuccess(response.data))
            })
            .catch(error => {
                dispatch(searchCountriesFailure(error))
            })
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

export const filterRegion = (region, page) => {
    return (dispatch) => {
        Axios.get(`${URL_FILTER_REGION}/${region}/${page}`)
            .then(response => {
                dispatch({
                    type: FILTER_REGION,
                    payload: response.data
                })
            })
        // .catch(error => {

        // })
    }
};

export const orderCountries = (order, page) => {
    return (dispatch) => {
        Axios.get(`${URL_ORDER}/${order}/${page}`)
            .then(response => {
                dispatch({
                    type: ORDER_COUNTRIES,
                    payload: response.data
                })
            })
        // .catch(error => {

        // })
    }
};

export const getActivities = () => {
    return (dispatch) => {
        Axios.get(`${URL_GET_ACTIVITIES}`)
            .then(response => {
                dispatch({
                    type: GET_ACTIVITIES,
                    payload: response.data
                })
            })
        // .catch(error => {

        // })
    }
};

export const filterActivities = (payload) => {
    console.log(payload, 'payload')
    return {
        type: FILTER_ACTIVITIES,
        payload: payload
    }
};

export const postActivities = (payload) => {
    return (dispatch) => {
        const response = Axios.post(`${URL_POST_ACTIVITY}`, payload)
        dispatch({
            type: POST_ACTIVITY
        })
        console.log(response)
        return response;
    }
};
