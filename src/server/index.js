// index.js
'use strict';
import Express from 'express';
import CookieParser from 'cookie-parser';
import EnvConfig from '../../config.json';
import renderHtml from './renderHtml.js';
import { compiler } from './ServerSideRendering.js';

const nodeEnv = process.env.NODE_ENV || EnvConfig.NODE_ENV || 'develop';
const isProd = nodeEnv === 'production';
const WEB_PORT = process.env.PORT || 3000;
const staticPath = EnvConfig.STATIC_PATH || '';
const expressStaticRoutes = [
  {path: `${staticPath}/img/`, serverPath: '/../client/img'},
  {path: `${staticPath}/css/`, serverPath: '/../client/css'},
  {path: `${staticPath}/js/`, serverPath: '/../client/js'},
];
const app = Express();
app.use(CookieParser());

if(!isProd) {
  const hotReloader = require('./hot-reloader.js');
  app.use(hotReloader.webpackDevMiddleware);
  app.use(hotReloader.webpackHotMiddleware);
}

expressStaticRoutes.forEach(function(route) {
  app.use(route.path, Express.static(__dirname + route.serverPath));
});

if(EnvConfig.SERVER_SIDE_RENDERING) {
  compiler.compile()
    .then(({ renderApp, createInitialStore }) => {
      const handler = (request, response) => {
        const context = {};
        createInitialStore(request)
          .then(store => {
            const app = renderApp({ request, response, store, context });
            if(context.url) {
              response.writeHead(301, {Location: context.url});
              response.end();
            } else {
              response.send(renderHtml({ request, response, app }));
            }
          });
      };
      app.get('/', handler);
      app.get('/:nav', handler);
      app.get('/:nav/:subNav', handler);
      app.get('/:nav/:subNav/:count', handler);
      app.listen(WEB_PORT, () => { console.log('Listening on port', WEB_PORT, '...'); });
    })
} else {
  const handler = (request, response) => {
    response.send(renderHtml({ request, response }));
  };
  app.get('/', handler);
  app.get('/:nav', handler);
  app.get('/:nav/:subNav', handler);
  app.listen(WEB_PORT, () => { console.log('Listening on port', WEB_PORT, '...'); });
}
