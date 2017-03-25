'use strict';
const path = require('path');
const fs = require('fs');

module.exports = {
  getPath: (file) => {
    return path.join(__dirname, '..', file);
  },
  readFile: (file) => {
    return fs.readFileSync(this.getPath(file), 'utf8');
  }
};