const chalk = require('chalk');
const program = require('commander');

// https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/bin/vue.js#L219
var enhanceErrorMessages = (methodName, log) => {
  program.Command.prototype[methodName] = function (...args) {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return;
    }
    this.outputHelp();
    console.log(`  ` + chalk.red(log(...args)));
    console.log();
    process.exit(1);
  };
};

module.exports = function start() {
  // 命令错误（command）
  program.on('command:*', ([cmd]) => {
    program.outputHelp();
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
    console.log();
    process.exitCode = 1;
  });

  // 缺少参数值
  enhanceErrorMessages('missingArgument', (argName) => {
    return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`;
  });

  // 参数错误（option）
  enhanceErrorMessages('unknownOption', (optionName) => {
    return `Unknown option ${chalk.yellow(optionName)}.`;
  });

  // 缺少参数值（option）
  enhanceErrorMessages('optionMissingArgument', (option, flag) => {
    return `Missing required argument for option ${chalk.yellow(option.flags)}` + (flag ? `, got ${chalk.yellow(flag)}` : ``);
  });
};
