var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var webpack = require('gulp-webpack');
var KarmaServer = require('karma').Server;

gulp.task('test', function() {
  return gulp.src('test/mocha-tests/api-test.js')
      .pipe(mocha());
});

gulp.task('lint', function() {
  return gulp.src('*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});


gulp.task('webpack:dev', function() {
  return gulp.src('app/js/client.js')
    .pipe(webpack({
      output:{
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function() {
  return gulp.src('test/karma-tests/entry.js')
    .pipe(webpack({
      output:{
        filename: 'test-bundle.js'
      }
    }))
    .pipe(gulp.dest('test/karma-tests'));
});

gulp.task('copy', function() {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch(['app/**/*.js', '*.js'], ['build', 'lint']);
  gulp.watch('app/**/*.html', ['copy']);
});

gulp.task('karmatest', ['webpack:test'], function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('build', ['webpack:dev', 'copy']);
gulp.task('default', ['test', 'lint']);



