import {
    GET_COUNTRIES,
    GET_COUNTRY_DETAIL,
    SEARCH_COUNTRIES_REQUEST,
    SEARCH_COUNTRIES_SUCCESS,
    SEARCH_COUNTRIES_FAILURE,
    GET_ACTIVITIES,
    ADD_COUNTRY_FAV,
    REMOVE_COUNTRY_FAV,
} from '../actions/types';

const initialState = {
    loading: false,
    countries: [],
    error: '',
    countriesFav: [],
    countryDetails: []
};

// para ordenar desde el front, deberia hacer la logica aca // ej .sort() // ojo que si o si devuelva un arreglo nuevo y no modifique el anterior

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: payload
            }
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetails: payload
            }
        case SEARCH_COUNTRIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SEARCH_COUNTRIES_SUCCESS:
            return {
                ...state,
                loading: false,
                countries: payload,
                error: ''
            }
        case SEARCH_COUNTRIES_FAILURE:
            return {
                ...state,
                loading: false,
                countries: [],
                error: payload
            }
        case ADD_COUNTRY_FAV:
            return {
                ...state,
                countriesFav: [...state.countriesFav, payload]
            }
        case REMOVE_COUNTRY_FAV: 
            return {
                ...state,
                countriesFav: state.countriesFav.filter(country => country.alpha3code !== payload)
            }
        default: return state;
    }
}


export default rootReducer;