const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');

function mkdir(dir) {
  console.log('创建路径', chalk.blue(dir));
  fs.ensureDirSync(dir);
}

function join(...args) {
  return path.join(...args);
}

module.exports = { mkdir, join };
