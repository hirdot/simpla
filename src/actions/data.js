import {
  GET_DATA,
  GET_DATA_SUCCESSFUL,
  SET_DATA,
  SET_DATA_SUCCESSFUL,
  REMOVE_DATA,
  REMOVE_DATA_SUCCESSFUL
} from '../constants/actionTypes';
import { DATA_PREFIX } from '../constants/state';
import { selectPropByPath } from '../utils/helpers';

export function getData(uid) {
  return {
    type: GET_DATA,
    uid
  };
}

export function getDataSuccessful(uid, response) {
  return {
    type: GET_DATA_SUCCESSFUL,
    response,
    uid
  }
}

export function setData(uid, data) {
  return {
    type: SET_DATA,
    uid,
    data
  };
}

export function setDataSuccessful(uid, response) {
  return {
    type: SET_DATA_SUCCESSFUL,
    response,
    uid
  };
}

export function removeData(uid) {
  return {
    type: REMOVE_DATA,
    uid
  };
}

export function removeDataSuccessful(uid) {
  return {
    type: REMOVE_DATA_SUCCESSFUL,
    uid
  };
}

export function get(uid) {
  return (dispatch, getState) => {
    let state,
        stored;

    dispatch(getData(uid));

    state = getState();
    stored = selectPropByPath(`${DATA_PREFIX}.${uid}`, state);

    return Promise.resolve()
      .then(() => dispatch(getDataSuccessful(uid, stored)));
  };
}

export function set(uid, data) {
  return (dispatch, getState) => {
    dispatch(setData(uid, data));

    return Promise.resolve()
      .then(() => dispatch(setDataSuccessful(uid, data)));
  };
}

export function remove(uid, data) {
  return (dispatch, getState) => {
    dispatch(removeData(uid));

    return Promise.resolve()
      .then(() => dispatch(removeDataSuccessful(uid)));
  };
}
