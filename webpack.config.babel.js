// webpack.config.babel.js
'use strict';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import EnvConfig from './config.json';

const isProd = process.env.NODE_ENV === 'production';
const nodeEnv = process.env.NODE_ENV || EnvConfig.NODE_ENV || 'develop';
const plugins = [
  new webpack.EnvironmentPlugin(Object.assign({}, EnvConfig, {NODE_ENV: nodeEnv})),
];
const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
];
const prodPlugins = [
  new ExtractTextPlugin({filename: 'css/[name].css', allChunks: true}),
];

// hot middleware
export const hmrConfig = {
  path: '/__webpack_hmr',
  timeout: 20000,
  reload: true,
  logLevel: 'warn',
  log: console.log,
  heartbeat: 10*1000
};
const hotMiddlewareScript
  = `webpack-hot-middleware/client?path=${hmrConfig.path}&timeout=${hmrConfig.timeout}&reload=${hmrConfig.reload}`;

export default {
  entry: {
    bundle: ['babel-polyfill', './src/client/js', hotMiddlewareScript],
  },
  output: {
    filename: 'js/[name].js',
    path: `${__dirname}/dist/client/`,
    publicPath: EnvConfig.STATIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: isProd
        ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', },
            { loader: 'less-loader', },
          ]
        })
        : [
          { loader: 'style-loader', },
          { loader: 'css-loader', },
          { loader: 'less-loader', },
        ],
      },
      {
        test: /\.css/,
        use: isProd
        ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', },
          ]
        })
        : [
          { loader: 'style-loader', },
          { loader: 'css-loader', },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          { loader: 'file-loader', options: {
          limit: 1024,
          name: 'img/[name].[ext]',
        }, },
        { loader: 'img-loader', options: {
          enabled: isProd,
          gifsicle: { interlaced: false },
          mozjpeg: {
            progressive: true,
            arithmetic: false
          },
          optipng: false, // disabled 
          pngquant: {
            floyd: 0.5,
            speed: 2
          },
          svgo: {
            plugins: [
              { removeTitle: true },
              { convertPathData: false }
            ]
          }
        }, },
        ]
      }
    ]
  },
  mode: isProd ? 'production' : 'development',
  plugins: isProd ? [ ...plugins, ...prodPlugins ] : [ ...plugins, ...devPlugins ],
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: `${__dirname}/node_modules/react`,
    },
  },
}
