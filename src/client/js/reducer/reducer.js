// reducer.js
'use strict';
import { combineReducers } from 'redux';
import Counter from './Counter.js';

export const reducer = combineReducers({
  counter: Counter,
});

export default reducer;
