import {
    GET_COUNTRIES,
    GET_COUNTRY_DETAIL_REQUEST,
    GET_COUNTRY_DETAIL_SUCCESS,
    CLEAR_COUNTRY_DETAIL,
    SEARCH_COUNTRIES_REQUEST,
    SEARCH_COUNTRIES_SUCCESS,
    SEARCH_COUNTRIES_FAILURE,
    GET_ACTIVITIES,
    ADD_COUNTRY_FAV,
    REMOVE_COUNTRY_FAV,
    FILTER_REGION,
    ORDER_COUNTRIES
} from '../actions/types';

const initialState = {
    loading: false,
    countries: [],
    countCountries: 0,
    error: '',
    countriesFav: [],
    countryDetails: {},
    detailsLoading: false,
};

// para ordenar desde el front, deberia hacer la logica aca // ej .sort() // ojo que si o si devuelva un arreglo nuevo y no modifique el anterior

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: payload.rows,
                countCountries: payload.count
            }
        case GET_COUNTRY_DETAIL_REQUEST:
            return {
                ...state,
                detailsLoading: true
            }
        case GET_COUNTRY_DETAIL_SUCCESS:
            return {
                ...state,
                detailsLoading: false,
                countryDetails: payload
            }
        case CLEAR_COUNTRY_DETAIL:
            return {
                ...state, 
                countryDetails: []
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
                countries: payload.rows,
                countCountries: payload.count,
                error: ''
            }
        case SEARCH_COUNTRIES_FAILURE:
            return {
                ...state,
                loading: false,
                countries: [],
                countCountries: 1,
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
        case FILTER_REGION: 
            return {
                ...state,
                countries: payload.rows,
                countCountries: payload.count
            }
        case ORDER_COUNTRIES: 
            return {
                ...state,
                countries: payload.rows,
                countCountries: payload.count
            }
        default: return state;
    }
}


export default rootReducer;