// renderHtml.js
'use strict';
import serialize from 'serialize-javascript';
import EnvConfig from '../../config.json';

const nodeEnv = process.env.NODE_ENV || EnvConfig.NODE_ENV || 'develop';
const isProd = nodeEnv === 'production';
const staticPath = EnvConfig.STATIC_PATH || '';

export const renderHtml = ({ request, response, app = '', preloadedState }) => `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width">
      <meta name="viewport" content="initial-scale=1.0">
      <title>ssr-test</title>

      ${isProd ? `<link rel="stylesheet" href="${staticPath}/css/bundle.css"/>` : ''}
    </head>
    <body>
      <div id="app-root">${app}</div>
      ${
        preloadedState
        ? `<script type="text/javascript" > window.__PRELOADED_STATE__ = ${serialize(preloadedState)} </script>`
        : ''
      }
      <script type="text/javascript" src="${staticPath}/js/bundle.js" ></script>
    </body>
  </html>
`;

export default renderHtml;
