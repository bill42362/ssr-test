// counterAddNumber.js
'use strict';
import { COUNTER_ADD_NUMBER } from '../ActionTypes.js';

export const counterAddNumber = ({ number }) => ({type: COUNTER_ADD_NUMBER, payload: { number }});

export default counterAddNumber;
