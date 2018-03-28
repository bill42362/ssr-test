// index.js
'use strict';
import Express from 'express';
import EnvConfig from '../../config.json';

const nodeEnv = process.env.NODE_ENV || EnvConfig.NODE_ENV || 'develop';
const isProd = nodeEnv === 'production';
const WEB_PORT = process.env.PORT || 3000;
const staticPath = EnvConfig.STATIC_PATH || '';
const expressStaticRoutes = [
  {path: `${staticPath}/img/`, serverPath: '/../client/img'},
  {path: `${staticPath}/css/`, serverPath: '/../client/css'},
  {path: `${staticPath}/js/`, serverPath: '/../client/js'},
];
const renderApp = `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width">
      <meta name="viewport" content="initial-scale=1.0">
      <title>announce-backstage</title>

      ${isProd ? `<link rel="stylesheet" href="${staticPath}/css/bundle.css"/>` : ''}
    </head>
    <body>
      <div id="app-root"></div>
      <script type="text/javascript" src="${staticPath}/js/bundle.js" ></script>
    </body>
  </html>
`;
const app = Express();

if(!isProd) {
  const hotReloader = require('./hot-reloader.js');
  app.use(hotReloader.webpackDevMiddleware);
  app.use(hotReloader.webpackHotMiddleware);
}

expressStaticRoutes.forEach(function(route) {
  app.use(route.path, Express.static(__dirname + route.serverPath));
});
app.get('/', (req, res) => { res.send(renderApp); })
app.get('/:nav', (req, res) => { res.send(renderApp); })
app.get('/:nav/:subNav', (req, res) => { res.send(renderApp); })
app.listen(WEB_PORT, () => { console.log('Listening on port', WEB_PORT, '...'); });
