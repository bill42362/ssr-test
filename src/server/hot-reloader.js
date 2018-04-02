// hot-reloader.js
'use strict';

// https://github.com/glenjamin/webpack-hot-middleware/blob/b0af1f912f0da753195776ad4a22bc8a218d5af1/example/server.js

import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig, { hmrConfig } from '../../webpack.config.babel.js';

const compiler = webpack(webpackConfig);

export const webpackDevMiddleware = WebpackDevMiddleware(compiler, {
  logLevel: hmrConfig.logLevel, publicPath: webpackConfig.output.publicPath
});

export const webpackHotMiddleware = WebpackHotMiddleware(compiler, {
  log: hmrConfig.log, path: hmrConfig.path, heartbeat: hmrConfig.heartbeat
});

export default { webpackDevMiddleware, webpackHotMiddleware };
