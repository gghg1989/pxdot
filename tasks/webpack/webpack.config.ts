import * as webpack from 'webpack';
import * as path from 'path';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as precss from 'precss';
import * as autoprefixer from 'autoprefixer';

import WebpackSystemJSExportPlugin from 'webpack-systemjs-export-plugin';

let env = process.env['NODE_ENV'];
let isProduction = env && env.match(/production/);

const dir = path.join(__dirname, '..', '..');

const config = {
  context: path.join(dir, 'src'),
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './main'
  ],
  output: {
    path: path.join(dir, 'assets'),
    filename: 'hotreload.min.js',
    libraryTarget: 'commonjs2',
    target: 'node',
    publicPath: '/assets/'
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    },
    {
      test: /\.s?css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
    }],
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js'],
    modules: [
      path.resolve('./src'),
      'node_modules'
    ]
  },
  externals: [
    'electron',
    'clarifai'
  ],
  resolveLoader: {
    root: path.join(dir, 'node_modules')
  },
  plugins: [
    new ExtractTextPlugin('main.min.css'),
    new webpack.optimize.OccurenceOrderPlugin(false),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin()
  ],
  ts: {
    transpileOnly: true
  },
  postcss: [
    precss(),
    autoprefixer()
  ]
};

export default config;

export const buildConfig = Object.assign({}, config, {
  entry: {
    main: './main',
    vendor: [
      'react-dom',
      'react-redux',
      'react-router',
      'react',
      'redux',
    ]
  },
  output: {
    path: path.join(dir, 'assets'),
    filename: '[name].min.js',
    publicPath: '/assets/',
    libraryTarget: 'commonjs2',
    target: 'node',
  },
  plugins: [
    new ExtractTextPlugin('main.min.css'),
    new webpack.optimize.OccurenceOrderPlugin(false),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.min.js'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
});

