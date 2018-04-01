// ServerSideRendering.js
'use strict';
import path from 'path';
import webpack from 'webpack';
import MemoryFS from 'memory-fs';
import requireFromString from 'require-from-string';
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
      const createInitialStoreContents = fs.readFileSync(path.resolve(webpackConfig.output.path, 'createInitialStore.js'), 'utf8');
      const renderAppContents = fs.readFileSync(path.resolve(webpackConfig.output.path, 'renderApp.js'), 'utf8');
      const { createInitialStore } = requireFromString(createInitialStoreContents);
      const { renderApp } = requireFromString(renderAppContents);
      resolve({ renderApp, createInitialStore });
    });
  })
};

export default { compiler };
