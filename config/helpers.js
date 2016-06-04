/**
 * @author: @AngularClass
 */

var path = require('path');

// Helper functions
var ROOT = path.resolve(__dirname, '..');

console.log('root directory:', root() + '\n');

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server$/.exec(process.argv[1]));
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

function stripTrailing(str, char) {
  const startIdx = str[0] === char ? 1 : 0,
    len = str[str.length - 1] === char ? str.length - 1 : str.length;

  return str.substr(1, len - startIdx);
}

exports.hasProcessFlag = hasProcessFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.stripTrailing = stripTrailing;
exports.root = root;
