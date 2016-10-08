import * as path from 'path';

const dir = path.join(__dirname, '..');

export default {
  electronBuild: {
    name: 'pxDot',
    version: '1.4.3',
    arch: 'x64',
    asar: true,
    dir: dir,
    icon: path.join(dir, 'assets/brand/icons/icon'),
    ignore: /node_modules|src|docs|tasks/,
    out: path.join(dir, 'builds'),
    overwrite: true,
    platform: process.env.PLATFORM_TARGET || 'all'
  }
}