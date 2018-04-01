// createInitialStore.js
'use strict';
import { createStore } from 'redux';
import XssFilters from 'xss-filters';
import reducer from './reducer/reducer.js';

const _createInitialStore = ({ params, query, cookies }) => {
  const count = +params.count || 0;
  const preloadedState = {
    counter: { count },
  };

  // User will see NOTHING before this promise resolved.
  return new Promise((resolve, reject) => {
    const store = createStore(reducer, preloadedState);
    resolve(store);
  });
};

const filterObject = object => {
  return Object.keys(object).reduce((current, key) => {
    const assignObject = {};
    assignObject[key] = XssFilters.inHTMLData(object[key]);
    return Object.assign({}, current, assignObject);
  }, {});
};

export const createInitialStore = ({ params = {}, query = {}, cookies = {} }) => {
  const safeParams = filterObject(params);
  const safeQuery = filterObject(query);
  const safeCookies = filterObject(cookies);
  return _createInitialStore({
    params: safeParams, query: safeQuery, cookies: safeCookies
  });
};

export default createInitialStore;
