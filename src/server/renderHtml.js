// renderHtml.js
'use strict';
import EnvConfig from '../../config.json';

const nodeEnv = process.env.NODE_ENV || EnvConfig.NODE_ENV || 'develop';
const isProd = nodeEnv === 'production';
const staticPath = EnvConfig.STATIC_PATH || '';

export const renderHtml = ({ request, response, app = '' }) => `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width">
      <meta name="viewport" content="initial-scale=1.0">
      <title>announce-backstage</title>

      ${isProd ? `<link rel="stylesheet" href="${staticPath}/css/bundle.css"/>` : ''}
    </head>
    <body>
      <div id="app-root">${app}</div>
      <script type="text/javascript" src="${staticPath}/js/bundle.js" ></script>
    </body>
  </html>
`;

export default renderHtml;
