// webpack.config.babel.js
'use strict';

// https://medium.com/front-end-hacking
//   /adding-a-server-side-rendering-support-for-an-existing-react-application-using-express-and-webpack-5a3d60cf9762

import webpack from 'webpack';
import NodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import EnvConfig from '../../config.json';

const nodeEnv = process.env.NODE_ENV || EnvConfig.NODE_ENV || 'develop';
const isProd = nodeEnv === 'production';
const plugins = [
  new webpack.EnvironmentPlugin(Object.assign({}, EnvConfig, {NODE_ENV: nodeEnv})),
];

export default {
  target: 'node',
  externals: [NodeExternals()],
  entry: `${__dirname}/renderApp.js`,
  output: {
    filename: 'renderApp.js',
    path: `${__dirname}/dist/server/`,
    publicPath: EnvConfig.STATIC_PATH,
    library: 'renderApp',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          { loader: 'css-loader/locals', },
          { loader: 'less-loader', },
        ],
      },
      {
        test: /\.css/,
        use: 'css-loader/locals',
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|otf|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { emitFile: false, },
          },
        ]
      },
      {
        test: /\.(woff|woff2)$/i,
        use: [
          {
            loader: 'url-loader',
            options: { emitFile: false, },
          },
        ]
      },
    ]
  },
  mode: isProd ? 'production' : 'development',
  plugins: plugins,
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: `${__dirname}/node_modules/react`,
    },
  },
}
