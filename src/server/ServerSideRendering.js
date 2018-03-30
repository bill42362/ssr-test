// ServerSideRendering.js
'use strict';
import path from 'path';
import webpack from 'webpack';
import MemoryFS from 'memory-fs';
import requireFromString from 'require-from-string';
import renderHtml from './renderHtml.js';
import webpackConfig from './server.webpack.config.js';

const outputErrors = (err, stats) => {
  if(err) {
    console.error(err.stack || err);
    if(err.details) { console.error(err.details); }
    return;
  }

  const info = stats.toJson();
  if(stats.hasErrors()) { console.error(info.errors); }
  if(stats.hasWarnings()) { console.warn(info.warnings); }
};

const fs = new MemoryFS();
const webpackCompiler = webpack(webpackConfig);

webpackCompiler.outputFileSystem = fs;

export const compiler = {
  compile: () => new Promise((resolve, reject) => {
    webpackCompiler.run((err, stats) => {
      outputErrors(err, stats);
      const contents = fs.readFileSync(path.resolve(webpackConfig.output.path, webpackConfig.output.filename), 'utf8');
      const { renderApp } = requireFromString(contents, webpackConfig.output.filename);
      resolve(renderApp);
    });
  })
};

export default compiler;
