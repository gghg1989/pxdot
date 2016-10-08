import * as path from 'path';
import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config';

const app = express();
const compiler = webpack(config);
const dir = path.join(__dirname, '..', '..');

app.use('/assets', express.static(`${dir}/assets`));

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

app.get('*', (req, res) => {
	res.status(200).send(`
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Px.</title>
    <link rel="stylesheet" href="/assets/main.min.css">
  </head>
  <body>
    <div id="app"></div>
    <script src="/assets/main.min.js"></script>
  </body>
</html>
  `);
});

app.listen(8081, 'localhost', (err, result) => {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at http://localhost:8081/');
});