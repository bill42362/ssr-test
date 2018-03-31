// counter.js
'use strict';
import { COUNTER_ADD_NUMBER } from '../ActionTypes.js';

const defaultState = {count: 0};

export const Reducer = (state = defaultState, action) => {
    switch(action.type) {
        case COUNTER_ADD_NUMBER:
            return {count: state.count + action.payload.number};
        default:
            return state;
    }
}

export default Reducer;
