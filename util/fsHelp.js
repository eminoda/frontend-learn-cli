const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');

function mkdir(dir) {
  console.log('创建路径', chalk.blue(dir));
  fs.ensureDirSync(dir);
}

function join(...args) {
  try {
    return path.join(...args);
  } catch (err) {
    throw new Error(`${err.message}\n\t路径错误：${args.join()}`);
  }
}

module.exports = { mkdir, join };
