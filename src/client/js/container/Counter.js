// Counter.js
'use strict';
import React from 'react';
import { connect } from 'react-redux';
import counterAddNumber from '../action/counterAddNumber.js';
import counterSetNumber from '../action/counterSetNumber.js';
import CounterComponent from '../component/Counter.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    count: state.counter.count,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  addOne: () => dispatch(counterAddNumber({number: 1})),
  minusOne: () => dispatch(counterAddNumber({number: -1})),
  setNumber: ({ number }) => dispatch(counterSetNumber({ number })),
});

export const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterComponent);

export default CounterContainer;
