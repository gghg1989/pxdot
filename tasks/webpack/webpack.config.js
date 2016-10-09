"use strict";
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
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
        filename: 'main.min.js',
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
        'electron'
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
exports.buildConfig = Object.assign({}, config, {
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
        publicPath: '/assets/'
    },
    plugins: [
        new ExtractTextPlugin('main.min.css'),
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = config;
//# sourceMappingURL=webpack.config.js.map