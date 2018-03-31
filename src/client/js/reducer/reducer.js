// reducer.js
'use strict';
import { combineReducers } from 'redux';
import Counter from './counter.js';

export const reducer = combineReducers({
  Counter,
});

export default reducer;
