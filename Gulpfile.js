'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sync = require('gulp-config-sync');
var bump = require('gulp-bump');
var tag = require('gulp-tag-version');
var filer = require('gulp-filter');
var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var pkg = require(path.join(__dirname, 'package.json'));
var webpackCfg = require(path.join(__dirname,'webpack.config.js'));

var webpackCfgUglify = _.assign({}, webpackCfg, {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'module.min.js',
    libraryTarget: 'umd',
    library: 'angular-jxon',
    sourceMapFilename: 'module.min.map'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({})
  ]
});

var wb = function(options, cb) {

  var config = _.assign({}, webpackCfg, options);

  webpack(config, function(err, stats) {
    if(err) throw new gutils.PluginError('webpack', err);
    gutil.log("[webpack]", stats.toString({}));
  });

  return cb();

}

var inc = function(importance) {
  return gulp.src(['package.json', 'bower.json'])
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('.'))
    .pipe(filter('package.json'))
    .pipe(tag());
}

gulp.task('build', function(cb) {
  
  wb({}, cb);

});

gulp.task('build:watch', function(cb) {

  wb({ watch: true }, cb);

});

gulp.task('build:uglify', function(cb) {

  wb(webpackCfgUglify, cb);

});

gulp.task('sync', function() {
  gulp.src(['bower.json'])
    .pipe(sync())
    .pipe(gulp.dest('.'));

});

gulp.task('tag', function() {
  gulp.src('package.json')
    .pipe(tag());
});

gulp.task('patch', function() {
  return inc('patch');
});

gulp.task('feature', function() {
  inc('minor');
});

gulp.task('release', function() {
  inc('major');
});

gulp.task('dev', ['build:watch']);

gulp.task('default', ['build', 'build:uglify']);