// index.js
'use strict';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reducer from './reducer/reducer.js';
import App from './component/App.jsx';
import '../css/index.less';

const store = createStore(reducer);

const render = process.env.SERVER_SIDE_RENDERING ? ReactDOM.hydrate : ReactDOM.render;
render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app-root')
);
