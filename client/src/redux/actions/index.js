import Axios from "axios";
import {
  GET_COUNTRIES,
  REQUEST_LOADING,
  GET_COUNTRY_DETAIL_SUCCESS,
  CLEAR_COUNTRY_DETAIL,
  SEARCH_COUNTRIES_SUCCESS,
  GET_ACTIVITIES,
  POST_ACTIVITY,
  FILTER_ACTIVITIES,
  REMOVE_ACTIVITY,
  ORDER_COUNTRIES,
  ORDER_FILTERED_COUNTRIES,
  // URL_COUNTRIES,
  // URL_COUNTRIES_SEARCH_COUNTRY,
  // URL_COUNTRY,
  // URL_ORDER,
  // URL_POST_ACTIVITY,
  // URL_GET_ACTIVITIES,
  // URL_FILTER_ORDER_COUNTRIES,
  // URL_REMOVE_ACTIVITY,
} from "./types";

export const requestLoading = () => {
  return {
    type: REQUEST_LOADING,
  };
};

export const getAllCountries = () => {
  return (dispatch) => {
    dispatch(requestLoading());
    Axios.get(`/countries`).then((response) => {
      dispatch({
        type: GET_COUNTRIES,
        payload: response.data,
      });
    });
  };
};

export const getCountryDetailSuccess = (alpha3Code) => {
  return {
    type: GET_COUNTRY_DETAIL_SUCCESS,
    payload: alpha3Code,
  };
};

export const getCountryDetail = (alpha3code) => {
  return (dispatch) => {
    dispatch(requestLoading());
    Axios.get(`/country/${alpha3code}`).then((response) => {
      dispatch(getCountryDetailSuccess(response.data));
    });
  };
};

export const clearCountryDetail = () => {
  return {
    type: CLEAR_COUNTRY_DETAIL,
  };
};

export const searchCountriesSuccess = (name) => {
  return {
    type: SEARCH_COUNTRIES_SUCCESS,
    payload: name,
  };
};

// internamente va a retornar una funcion, y eso gracias a thunk va a enviar el dispatch
export const searchCountries = (name) => {
  return (dispatch) => {
    dispatch(requestLoading());
    Axios.get(`/countries/search/country?name=${name}`).then((response) => {
      dispatch(searchCountriesSuccess(response.data));
    });
  };
};

export const removeActivity = (id) => {
  return (dispatch) => {
    Axios.delete(`/activity/${id}`);
    dispatch({
      type: REMOVE_ACTIVITY,
      payload: id,
    });
  };
};

export const orderCountries = (order, page) => {
  return (dispatch) => {
    Axios.get(`/countries/order/${order}/${page}`).then((response) => {
      dispatch({
        type: ORDER_COUNTRIES,
        payload: response.data,
      });
    });
  };
};

export const orderCountriesFiltered = (filter, order, page) => {
  return (dispatch) => {
    Axios.get(`/countries/region/${filter}/${order}/${page}`).then(
      (response) => {
        dispatch({
          type: ORDER_FILTERED_COUNTRIES,
          payload: response.data,
        });
      }
    );
  };
};

export const getActivities = () => {
  return (dispatch) => {
    Axios.get(`/activity`).then((response) => {
      dispatch({
        type: GET_ACTIVITIES,
        payload: response.data,
      });
    });
  };
};

export const filterActivities = (payload) => {
  return {
    type: FILTER_ACTIVITIES,
    payload: payload,
  };
};

export const postActivities = (payload) => {
  return (dispatch) => {
    dispatch(requestLoading());
    const response = Axios.post(`/activity`, payload);
    dispatch({
      type: POST_ACTIVITY,
    });
    return response;
  };
};
