import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_ORDERS,
  ORDER_ERROR,
  UPDATE_ORDER,
  DELETE_ORDER,
  ADD_ORDER,
  GET_ORDER,
  GET_SCORE_CUSTOMER,
  GET_SCORE_FACTORY,
  GET_SCORE_OWNER,
  COMPLETE_ORDER,
  GET_FACTORY_BY_CUSTOMER,
  GET_FACTORY_BY_OWNER,
  FILTER_ORDER
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get posts
export const getOrders = (id) => async (dispatch) => {
  try {
    const res = await api.get(`order/${id}`);
    dispatch({
      type: GET_ORDERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const filterOrder = (filterOrder, id) => async (dispatch) => {
  try {
    if (filterOrder) {
      dispatch({
        type: FILTER_ORDER,
        payload: filterOrder
      });
    } else {
      const res = await api.get(`order/${id}`);
      dispatch({
        type: GET_ORDERS,
        payload: res.data
      });
    }
  } catch {}
};
//Get factory by customer
export const getFactoryByCustomer = (customer) => async (dispatch) => {
  try {
    const res = await api.get(`/order/getFactoryByCustomer/${customer}`);
    dispatch({
      type: GET_FACTORY_BY_CUSTOMER,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert('Customer field is required', 'warning', true));
  }
};
export const getFactoryByOwner = (owner) => async (dispatch) => {
  try {
    const res = await api.get(`/order/getFactoryByOwner/${owner}`);
    dispatch({
      type: GET_FACTORY_BY_OWNER,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert('Owner field is required', 'warning', true));
  }
};

export const getScoreByCustomer = (customer) => async (dispatch) => {
  try {
    const res = await api.get(`order/getScoreCustomer/${customer}`);
    dispatch({
      type: GET_SCORE_CUSTOMER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const getScoreByFactory = (factory) => async (dispatch) => {
  try {
    const res = await api.get(`order/getScoreFactory/${factory}`);
    dispatch({
      type: GET_SCORE_FACTORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const getScoreByOwner = (owner) => async (dispatch) => {
  try {
    const res = await api.get(`order/getScoreOwner/${owner}`);
    dispatch({
      type: GET_SCORE_OWNER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// update order
export const updateOrder = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/order/${id}`, formData);
    dispatch({
      type: UPDATE_ORDER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
//update score
export const updateScore = (id, userId, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/order/complete/${id}/${userId}`, formData);
    dispatch({
      type: COMPLETE_ORDER,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert('Score already exist', 'warning', true));
  }
};

// Delete post
export const deleteOrder = (id) => async (dispatch) => {
  try {
    await api.delete(`/order/${id}`);

    dispatch({
      type: DELETE_ORDER,
      payload: id
    });
    dispatch(setAlert('Order is removed successfully', 'success', true));
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addOrder = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/order/create', formData);
    console.log('add_new', formData);
    dispatch({
      type: ADD_ORDER,
      payload: res.data
    });

    dispatch(setAlert('Order is created successfully', 'success', true));
  } catch (err) {
    dispatch(setAlert('Order information is not enough', 'warning', true));
  }
};

// Get post
export const getOrder = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/order/${id}`);

    dispatch({
      type: GET_ORDER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
