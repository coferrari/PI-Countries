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
  FILTER_ACTIVITIES,
  ORDER_COUNTRIES,
  ORDER_FILTERED_COUNTRIES,
  POST_ACTIVITY,
} from "../actions/types";

const initialState = {
  loading: false,
  countries: [],
  countCountries: 0,
  // error: "",
  countriesFav: [],
  countryDetails: {},
  activities: [],
  allActivities: [],
  countriesMatch: [],
  countCountriesMatch: 0,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: payload.rows,
        countCountries: payload.count,
        countriesMatch: [],
        countCountriesMatch: 0,
      };
    case GET_COUNTRY_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_COUNTRY_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        countryDetails: payload,
      };
    case CLEAR_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetails: [],
        countriesMatch: [] //
      };
    case SEARCH_COUNTRIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: [],
        countCountries: 0,
        loading: false,
        countriesMatch: payload.rows,
        countCountriesMatch: payload.count,
        // error: "",
      };
    // case SEARCH_COUNTRIES_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     countries: [],
    //     countCountries: 1,
    //     error: payload,
    //   };
    case ADD_COUNTRY_FAV:
      return {
        ...state,
        countriesFav: [...state.countriesFav, payload],
      };
    case REMOVE_COUNTRY_FAV:
      return {
        ...state,
        countriesFav: state.countriesFav.filter(
          (country) => country.alpha3code !== payload
        ),
      };
    case ORDER_COUNTRIES:
      return {
        ...state,
        countries: payload.rows,
        countCountries: payload.count,
        countriesMatch: [],
        countCountriesMatch: 0,
      };
    case ORDER_FILTERED_COUNTRIES:
      return {
        ...state,
        countries: payload.rows,
        countCountries: payload.count,
        countriesMatch: [],
        countCountriesMatch: 0,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: payload,
        allActivities: payload,
      };
    case FILTER_ACTIVITIES:
      const allActivities = state.allActivities;
      const activitiesFiltered =
        payload === "All Activities"
          ? allActivities
          : allActivities.filter((activity) => activity.season === payload);
      return {
        ...state,
        activities: activitiesFiltered || payload,
        countriesMatch: [],
        countCountriesMatch: 0,
      };
    case POST_ACTIVITY:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default rootReducer;
