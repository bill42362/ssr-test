// index.js
'use strict';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import createInitialStore from './createInitialStore.js';
import reducer from './reducer/reducer.js';
import App from './component/App.jsx';
import '../css/index.less';

const isServerSideRendering = process.env.SERVER_SIDE_RENDERING;
if(isServerSideRendering) {
    const preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;
    const store = createStore(reducer, preloadedState);
    ReactDOM.hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('app-root')
    );
} else {
  createInitialStore()
    .then(store => {
      ReactDOM.render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>,
        document.getElementById('app-root')
      );
    })
}
