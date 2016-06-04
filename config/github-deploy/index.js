const helpers = require('../helpers');
const execSync = require('child_process').execSync;

const REPO_NAME_RE = /Push  URL: https:\/\/github\.com\/.*\/(.*)\.git/;

function getWebpackConfigModule() {
  if (helpers.hasProcessFlag('github-dev')) {
    return require('../webpack.dev.js');
  } else if (helpers.hasProcessFlag('github-prod')) {
    return require('../webpack.prod.js');
  } else {
    throw new Error('Invalid compile option.');
  }
}

function getRepoName(remoteName) {
  remoteName = remoteName || 'origin';

  var stdout = execSync('git remote show ' + remoteName),
      match = REPO_NAME_RE.exec(stdout);

  if (!match) {
    throw new Error('Could not find a repository on remote ' + remoteName);
  } else {
    return match[1];
  }
}

exports.getWebpackConfigModule = getWebpackConfigModule;
exports.getRepoName = getRepoName;
