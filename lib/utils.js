'use strict';
const path = require('path');
const fs = require('fs');

const getPath = (file) => {
  return path.join(__dirname, '..', file);
}

module.exports = {
  getPath,
  readFile: (file) => {
    return fs.readFileSync(getPath(file), 'utf8');
  },
  getIconPath: () => {
    const name = process.platform === 'win32' ? 'Icon.ico' : 'Icon.png';

    return getPath('icons/' + name);
  }
};