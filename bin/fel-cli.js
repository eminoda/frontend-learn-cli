#!/usr/bin/env node
const pkg = require('../package');
const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const createCommand = require('../commander/create');
const { outputHelp, enhanceErrorMessages, cliName } = require('../util');

enhanceErrorMessages();

program.name(cliName).version(pkg.version);

program.usage('<command> [options]');

createCommand();

// 帮助 help
program.on('--help', () => {
  outputHelp(cliName);
});
program.commands.forEach((c) => c.on('--help', () => outputHelp(cliName)));

// 解析命令行
program.parse(process.argv);
