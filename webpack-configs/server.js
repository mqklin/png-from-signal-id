/* globals module */
/* eslint-disable import/no-nodejs-modules, import/no-commonjs */

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/createImage/index.js',

  target: 'node',

  externals: [nodeExternals()],


  resolve: {
    modules: [
      'node_modules',
    ],
    alias: {
      App: path.resolve('src/createImage/App'),
    },
  },

  output: {
    path: path.resolve('build'),
    filename: 'index.js',
    library: {
      name: 'createImage',
      type: 'umd',
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/env', {
                modules: false,
                targets: {browsers: ['> 0.25%', 'not ie > 0', 'not op_mini all', 'iOS >= 10']},
                useBuiltIns: 'usage',
                corejs: {version: 3, proposals: true},
              }],
              ['@babel/preset-react', {runtime: 'automatic'}],
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(webp|svg|png|jpg|jpeg|gif|otf|ttf|woff|eot|woff2)$/,
        use: [{
          loader: 'url-loader',
          options: {
            esModule: false,
          },
        }],
      },
    ],
  },
};
