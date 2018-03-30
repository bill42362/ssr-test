// index.js
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './component/App.jsx';
import '../css/index.less';

const render = process.env.SERVER_SIDE_RENDERING ? ReactDOM.hydrate : ReactDOM.render;
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app-root')
);
