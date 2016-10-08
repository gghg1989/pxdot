import * as webpack from 'webpack';
import {buildConfig as config} from './webpack.config';

const compiler = webpack(config);

compiler.run((err, stats) => {
  if (err) 
    return console.error(err);
});