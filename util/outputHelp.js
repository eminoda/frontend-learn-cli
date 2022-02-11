const chalk = require('chalk');
const { cliName } = require('./enums');

module.exports = function outputHelp() {
  console.log();
  console.log(`  Run ${chalk.cyan(`${cliName} <command> --help`)} for detailed usage of given command.`);
  console.log();
};
