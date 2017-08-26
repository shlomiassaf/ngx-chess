const env = 'production';
const flags = [
  'build',
  'prod',
  'aot'
];



const webpack = require("webpack");

const isDev = env.indexOf('dev') === 0;

process.env.npm_lifecycle_event = flags.join(':');
process.env.NODE_ENV = env;

const webpackConfig = require('./config/webpack.prod')({env: env, sim: true});

if (isDev) {
  webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());
}

function compilerCallback(err, stats) {
  if (err) throw err;
}

const compiler = webpack(webpackConfig); // load webpack

if (isDev) {
  compiler.watch({}, compilerCallback);
} else {
  compiler.run(compilerCallback);
}

