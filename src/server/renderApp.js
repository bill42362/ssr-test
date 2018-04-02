// renderApp.js
'use strict';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../../src/client/js/component/App.jsx';

export const renderApp = ({ request, response, store, context }) => ReactDOMServer.renderToString(
  <Provider store={store}>
    <StaticRouter location={request.url} context={context}>
      <App />
    </StaticRouter>
  </Provider>,
);

export default renderApp;
