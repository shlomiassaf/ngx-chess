/**
 * @author: @AngularClass
 */
const helpers = require('./helpers');
const ghDeploy = require('./github-deploy');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const ghpages = require('gh-pages');
const webpackConfig = ghDeploy.getWebpackConfigModule(); // the settings that are common to prod and dev


/**
 * Webpack Constants
 */
const GIT_REMOTE_NAME = 'origin';
const COMMIT_MESSAGE = 'Updates';
const GH_REPO_NAME = ghDeploy.getRepoName(GIT_REMOTE_NAME);


const METADATA = webpackMerge(webpackConfig.metadata, {
  baseUrl: '/' + GH_REPO_NAME + '/' + helpers.stripTrailing(webpackConfig.metadata.baseUrl) + '/'
});

module.exports = webpackMerge(webpackConfig, {
  /**
   * Merged metadata from webpack.common.js for index.html
   *
   * See: (custom attribute)
   */
  metadata: METADATA,

  output: {
    publicPath: '/' + GH_REPO_NAME + '/'
  },
  plugins: [
    function() {
      this.plugin("done", function(stats) {
        console.log('Starting deployment to GitHub.');

        const logger = function (msg) {
          console.log(msg);
        };

        const options = {
          logger: logger,
          remote: GIT_REMOTE_NAME,
          message: COMMIT_MESSAGE
        };

        ghpages.publish(webpackConfig.output.path, options, function(err) {
          if (err) {
            console.log('GitHub deployment done. STATUS: ERROR.');
            throw err;
          } else {
            console.log('GitHub deployment done. STATUS: SUCCESS.');
          }
        });
      })
    }
  ]
});
