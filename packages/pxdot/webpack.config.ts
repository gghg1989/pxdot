import * as webpack from 'webpack';
import * as path from 'path';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as precss from 'precss';
import * as autoprefixer from 'autoprefixer';

let env = process.env['NODE_ENV'];
let isProduction = env && env.match(/production/);

var config = {
  context: path.join(__dirname, 'src'),
  devtool: 'eval',
  entry: ['./dom'],
  output: {
    path: path.join(__dirname, 'assets'),
    libraryTarget: 'commonjs2',
    target: 'node',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { transpileOnly: true, compilerOptions: { module: 'es2015' } }
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            { loader: 'css-loader', options: { modules: true } },
            {
              loader: 'postcss-loader',
              options: {
                // Doesn't work, postcss forces you to use a config file! >:(
                plugins: () => [precss(), autoprefixer()]
              }
            }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    modules: [path.resolve('./src'), 'node_modules']
  },
  externals: ['electron', 'fs'],
  plugins: [new ExtractTextPlugin('main.min.css')]
};

if (isProduction) {
  // Production Mode
  config = {
    ...config,
    plugins: [
      ...config.plugins,
      ,
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('production') }
      })
    ]
  };
}

/**
 * Start Build
 */
const compiler = webpack(config);

if (!process.argv.reduce((prev, cur) => prev || cur === '--watch', false)) {
  compiler.run((err, stats) => {
    if (err)
      return console.error(err);
    else
      console.log('Compilation finished successfully.');
  });
} else {
  compiler.watch({}, (err, stats) => {
    if (err)
      return console.error(err);
  });
}
