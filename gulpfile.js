var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var webpack = require('gulp-webpack');

gulp.task('default', ['test', 'lint'],function() {});

gulp.task('test', function() {
  return gulp.src('test/test.js')
      .pipe(mocha());
});

gulp.task('lint', function() {
  return gulp.src('*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch(['app/**/*.js', '*.js'], ['build','lint']);
  gulp.watch('app/**/*.html', ['copy']);
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

gulp.task('copy', function() {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['webpack:dev', 'copy']);



