const program = require('commander');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const chalk = require('chalk');
const { mkdir, join } = require('../util').fsHelp;
const rootDir = process.cwd();
const { loadTemplate } = require('../util').ejsHelp;
const defaultQuestions = [
  {
    type: 'list',
    name: 'template',
    message: '请选择模板',
    choices: [{ name: 'express' }, { name: 'vue2' }],
  },
  {
    type: 'input',
    name: 'appName',
    message: '请输入应用名称',
    default() {
      return 'app';
    },
  },
];

const expressQuestions = [
  {
    type: 'checkbox',
    name: 'express.middlewares',
    message: '请选择中间件',
    choices: [
      { name: 'json', checked: true },
      { name: 'urlencoded', checked: false },
    ],
    when(answers) {
      return answers.template == 'express';
    },
  },
];

const questions = [...defaultQuestions, ...expressQuestions];
let projectDir;
module.exports = function createCommand() {
  program
    .command('create')
    .description('创建应用')
    .option('-f', '是否强制创建')
    // .allowUnknownOption()
    .action((options, command) => {
      inquirer.prompt(questions).then(async (answers) => {
        try {
          // 创建目录
          _mkdirProjectDir(answers.appName, options.f);
          _writeFiles([
            { dirtory: 'bin', fileName: 'www', answers },
            { dirtory: 'routes', fileName: 'health.js', answers },
            { dirtory: 'util', fileName: 'index.js', answers },
            { fileName: 'app.js', answers },
            { fileName: 'package.json', answers },
          ]);
        } catch (err) {
          console.log(chalk.red(err.message));
        }
      });
    });
};

function _mkdirProjectDir(appName, f) {
  projectDir = join(rootDir, appName);
  if (fs.pathExistsSync(projectDir) && !f) {
    throw new Error(`已存在 ${projectDir} 路径，创建失败`);
  } else {
    mkdir(projectDir);
  }
}

function _writeFiles(options) {
  for (let i = 0; i < options.length; i++) {
    const { dirtory, fileName, answers } = options[i];
    _writeFile({ dirtory, fileName, answers });
  }
}

function _writeFile({ dirtory = '', fileName, answers }) {
  // 模板路径
  const templateDir = join(__dirname, '../template', answers.template);
  if (!fs.pathExistsSync(templateDir)) {
    throw new Error(`模板路径 ${templateDir} 不存在`);
  }
  const templateFilePath = join(templateDir, dirtory, fileName);
  const filepath = join(projectDir, dirtory);
  if (!fs.pathExistsSync(filepath)) {
    mkdir(filepath);
  }
  const renderData = loadTemplate(templateFilePath).render(answers);
  fs.writeFileSync(join(filepath, fileName), renderData);
}
