var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

gulp.task('default', ['test', 'lint'],function() {});

gulp.task('test', function() {
  gulp.src('test.js')
      .pipe(mocha());
});

gulp.task('lint', function() {
  gulp.src('*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch('*.js', ['test', 'lint']);
});
