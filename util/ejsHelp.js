const fs = require('fs-extra');
var ejs = require('ejs')

function loadTemplate(filepath) {
  const templateFilePath = filepath + '.ejs';
  if (!fs.pathExistsSync(templateFilePath)) {
    throw new Error(`模板文件 ${templateFilePath} 不存在`);
  }
  var contents = fs.readFileSync(templateFilePath, 'utf-8');
  function render(data) {
    return ejs.render(contents, data, {});
  }

  return { render };
}

module.exports = { loadTemplate };
