const chalk = require('chalk');

module.exports = function outputHelp(cliName) {
  console.log();
  console.log(`  Run ${chalk.cyan(`${cliName} <command> --help`)} for detailed usage of given command.`);
  console.log();
};
