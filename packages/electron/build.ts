import * as packager from 'electron-packager';
import { join } from 'path';

let options = {
  name: 'Px',
  version: '1.4.14',
  arch: 'x64',
  asar: false,
  dir: __dirname,
  icon: join(__dirname, 'assets/brand/icons/icon'),
  ignore: /node_modules|src|docs|webpack/,
  out: join(__dirname, 'build'),
  overwrite: true,
  platform: process.env.PLATFORM_TARGET || 'all'
};

console.log('\u001b[34mBuilding electron app(s)...\n\u001b[0m');

packager(options, (err, appPaths) => {
  if (err) {
    console.error(
      '\u001b[31mError from `electron-packager` when building app...\u001b[0m'
    );
    console.error(err);
  } else {
    console.log('Build(s) successful!');
    console.log(appPaths);

    console.log('\n\u001b[34mDONE\n\u001b[0m');
  }
});
