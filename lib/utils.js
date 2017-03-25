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
  }
};