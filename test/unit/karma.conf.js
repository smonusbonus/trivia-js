// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

const webpackConfig = require('../../build/webpack.test.conf');

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    plugins: [
      'karma-coverage',
      'karma-fixture',
      'karma-json-fixtures-preprocessor',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-sinon-chai',
      'karma-sourcemap-loader',
      'karma-spec-reporter',
      'karma-webpack',
    ],
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai', 'fixture'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js', './fixtures/**/*.json'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
      './fixtures/**/*.json': ['json_fixtures'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
      ],
    },
    jsonFixturesPreprocessor: {
      // strip this from the file path \ fixture name
      stripPrefix: 'test',
      // change base path (default is spec/fixtures)
      setBase: 'fixtures/',
      // change the global fixtures variable name
      variableName: '__json__',
      // camelize fixture filenames
      camelizeFilenames: true,
    },
  });
};
