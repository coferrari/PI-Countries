import {
  GET_COUNTRIES,
  REQUEST_LOADING,
  GET_COUNTRY_DETAIL_SUCCESS,
  CLEAR_COUNTRY_DETAIL,
  SEARCH_COUNTRIES_SUCCESS,
  GET_ACTIVITIES,
  FILTER_ACTIVITIES,
  ORDER_COUNTRIES,
  ORDER_FILTERED_COUNTRIES,
  POST_ACTIVITY,
  REMOVE_ACTIVITY,
} from "../actions/types";

const initialState = {
  loading: false,
  countries: [],
  countCountries: 0,
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
        loading: false,
        countries: payload.rows,
        countCountries: payload.count,
        countriesMatch: [],
        countCountriesMatch: 0,
      };
    case REQUEST_LOADING:
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
        countriesMatch: []
      };
    case SEARCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: [],
        countCountries: 0,
        loading: false,
        countriesMatch: payload.rows,
        countCountriesMatch: payload.count,
      };
    case ORDER_COUNTRIES:
      return {
        ...state,
        loading: false,
        countries: payload.rows,
        countCountries: payload.count,
        countriesMatch: [],
        countCountriesMatch: 0,
      };
    case ORDER_FILTERED_COUNTRIES:
      return {
        ...state,
        loading: false,
        countries: payload.rows,
        countCountries: payload.count,
        countriesMatch: [],
        countCountriesMatch: 0,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        loading: false,
        activities: payload,
        allActivities: payload,
      };
    case POST_ACTIVITY:
      return {
        ...state,
      };
    case FILTER_ACTIVITIES:
      if (typeof state.allActivities !== 'string') {
        const allActivities = state.allActivities;
        const activitiesFiltered =
          payload === "All Activities"
            ? allActivities
            : allActivities.filter((activity) => activity.season === payload);
        return {
          ...state,
          loading: false,
          activities: activitiesFiltered || payload,
          countriesMatch: [],
          countCountriesMatch: 0,
        };
      } else {
        return {
          ...state,
          loading: false,
          activities: [],
          allActivities: []
        };
      }
    case REMOVE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.id !== payload
        ),
        allActivities: state.allActivities.filter(
          (activity) => activity.id !== payload
        ),
      };
    default:
      return state;
  }
};

export default rootReducer;
