// counterSetNumber.js
'use strict';
import { COUNTER_SET_NUMBER } from '../ActionTypes.js';

export const counterSetNumber = ({ number }) => ({type: COUNTER_SET_NUMBER, payload: { number }});

export default counterSetNumber;
